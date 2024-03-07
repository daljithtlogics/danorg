import { Injectable } from '@nestjs/common';
import {
  ID,
  Order,
  RequestContext,
  ProductVariantService,
  TransactionalConnection,
  Logger,
  EntityNotFoundError,
} from '@vendure/core';
import axios from 'axios';

// Bobgo header
const apiKey = process.env.BOBGO_API_KEY;
const HEADERS = { 
  'Authorization': `Bearer ${apiKey}`,
  'Content-Type': 'application/json',
};

@Injectable()
export class BobgoService {

  constructor(
    private productVariantService: ProductVariantService,
    private connection: TransactionalConnection,
  ){}

  /**
   * Update the order custom fields with the bobgo id and channel number
   */
  public async updateOrderCustomFields(ctx: RequestContext, orderId: ID, customFields: { [key: string]: any }): Promise<Order | undefined> {
    try {
      const orderRepository = this.connection.getRepository(ctx, Order);
      const existingOrder = await orderRepository.findOne({
        where: { id: orderId }
      });
      if (!existingOrder) { throw new EntityNotFoundError('Order', orderId) }
      
      // Update the custom fields on the order
      await orderRepository.update(orderId, {
        customFields: {
          ...existingOrder.customFields,
          ...customFields
        }
      });

      // Fetch and return the updated order to verify the changes
      const updatedOrder = await orderRepository.findOne({
        where: { id: orderId },
        relations: [
          'customer', 
          'lines', 
          'lines.productVariant', 
          'lines.productVariant.assets', 
          'shippingLines', 
          'shippingLines.shippingMethod',
          'shippingLines.shippingMethod.translations', 
          'payments', 
        ]
      });

      return updatedOrder ?? undefined;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error with updating custom fields'
      Logger.error(`Failed to update custom fields for order with ID ${orderId}: ${errorMessage}`);
      return undefined;
    }
  }

  /**
   * CREATE ORDER.
   */
  async createOrderInBobgo(ctx: RequestContext, orderId: ID): Promise<any> {
    try {
      // Fetch the order using getRepository
      const orderRepository = this.connection.getRepository(ctx, Order);
      let orderData = await orderRepository.findOne({
        where: { id: orderId },
        relations: [
          'customer',
          'lines', 
          'lines.productVariant', 
          'lines.productVariant.assets', 
          'lines.productVariant.translations', 
          'shippingLines',
          'shippingLines.shippingMethod',
          'shippingLines.shippingMethod.translations', 
          'payments'
        ],
      });
  
      if (!orderData) {
        console.error("Order not found.");
        throw new Error(`Order with ID ${orderId} not found.`);
      }
  
      // Prepare order items for Bobgo, including fetching image URLs
      const orderItemsWithImages = await Promise.all(
        orderData.lines.map(async (orderLine) => {
          const imageUrl = await this.getProductImageUrl(ctx, orderLine.productVariant.id);
          return {
            description: orderLine.productVariant.translations[0]?.name,
            image_url: imageUrl,
            vendor: 'Danshop',
            sku: orderLine.productVariant.sku,
            unit_price: orderLine.unitPriceWithTax / 100, 
            qty: orderLine.quantity,
          };
        })
      );
  
      // Order payload for Bobgo
      const OrderData = {
        // Customer Information
        customer_name: orderData.customer?.firstName,
        customer_surname: orderData.customer?.lastName,
        customer_email: orderData.customer?.emailAddress,
        customer_phone: orderData.customer?.phoneNumber,

        // Delivery Address (existing & geolocalisable)
        delivery_address: this.constructAddress(orderData),

        // Order Information
        currency: orderData.currencyCode, // 'ZAR'
        buyer_selected_shipping_cost: this.getShippingCost(orderData),
        buyer_selected_shipping_method: this.getShippingMethodName(orderData),
        payment_status: 'paid', // paid / unpaid / partially-paid

        // Order Items (array)
        order_items: orderItemsWithImages,
      };
  
      // Send the constructed order to Bobgo
      const response = await axios.post('https://api.sandbox.bobgo.co.za/v2/orders', OrderData, { headers: HEADERS });
      
      // Extract the Channel Order Number & Bobgo order ID from API response.
      const channel_order_number = response.data.channel_order_number;
      const bobgoOrderId = response.data.id;
      console.log(
        'Bobgo Channel Order Number from response - channelOrderNumber:', channel_order_number, 
        '\nBobgo Order ID from response - bobgoOrderId:', bobgoOrderId);
      console.log('=================================================================');

      // update custom fields
      if(bobgoOrderId && channel_order_number) {
        const stored = await this.updateOrderCustomFields(ctx, orderId, {
          bobgoOrderId: bobgoOrderId,
          channel_order_number: channel_order_number
        });
        console.log('Are they stored in DB? - ', stored?.customFields,
        '\n=================================================================');
      } else { 
          console.error('BobgoOrderID or ChannelOrderNumber not found in response:', response.data);
      }

      return response.data;
    } catch (error) {
      console.error("Error creating order in Bobgo:", error);
      throw error;
    }
  }

  /**
   * UPDATE ORDER.
   */
  async updateOrderInBobgo(ctx: RequestContext, storedBobgoID: any, orderId: ID): Promise<any> 
  {
    try {
      const orderRepository = this.connection.getRepository(ctx, Order);
      let updateOrder = await orderRepository.findOne({
        where: { id: orderId },
        relations: [
          'customer',
          'lines', 
          'lines.productVariant', 
          'lines.productVariant.assets', 
          'lines.productVariant.translations', 
          'shippingLines',
          'shippingLines.shippingMethod',
          'shippingLines.shippingMethod.translations', 
          'payments',
        ],
      });

      if (!updateOrder) {
        console.error("Order not found.");
        throw new Error(`Order with ID ${orderId} not found.`);
      }

      const storedBobgoID = (updateOrder.customFields as any).bobgoOrderId;
      console.log("Ready to update Order - BobgoOrderId:", storedBobgoID,
      '\n=================================================================');

      const endpoint = `https://api.sandbox.bobgo.co.za/v2/orders?id=${storedBobgoID}`;

			const orderItemsWithImages = await Promise.all(
        updateOrder.lines.map(async (orderLine) => {
          const imageUrl = await this.getProductImageUrl(ctx, orderLine.productVariant.id);
          return {
            description: orderLine.productVariant.translations[0]?.name,
            image_url: imageUrl,
            vendor: 'Danshop',
            sku: orderLine.productVariant.sku,
            unit_price: orderLine.unitPriceWithTax / 100, 
            qty: orderLine.quantity,
          };
        })
      );

      // fields to update
      const mappedUpdateData = {
        id: storedBobgoID, // Bobgo Order ID stored in DB

        // Customer Information
        customer_name: updateOrder.customer?.firstName,
        customer_surname: updateOrder.customer?.lastName,
        customer_email: updateOrder.customer?.emailAddress,
        customer_phone: updateOrder.customer?.phoneNumber, 

        // Delivery Address (existing & geolocalisable)
        delivery_address: this.constructAddress(updateOrder), 

        // Order Information
        currency: updateOrder.currencyCode, // 'ZAR'
        buyer_selected_shipping_cost: this.getShippingCost(updateOrder),
        buyer_selected_shipping_method: this.getShippingMethodName(updateOrder),
        payment_status: 'paid', // paid | partially paid | unpaid

        // Order Items (array)
        order_items: orderItemsWithImages,
        };

      const response = await axios.patch(endpoint, mappedUpdateData, { headers: HEADERS }).catch((error) => {
        console.error("Error response:", error.response.data);
        throw error;
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /*** HELPERS ***/

  /* selected shipping cost */
  private getShippingCost(orderData: Order): number {
    if (!orderData.shippingLines) {
      console.warn("Warning: shippingLines is undefined.");
      return 0; // Return a default value
    }
    return orderData.shippingLines.length > 0 ? orderData.shippingLines[0].priceWithTax / 100 : 0;
  }

  /* selected shipping method name */
  private getShippingMethodName(orderData: Order): string {
    if (orderData.shippingLines.length > 0 && orderData.shippingLines[0].shippingMethod) {

      // Access the translations array of the shipping method
      const translations = orderData.shippingLines[0].shippingMethod.translations;

      // Find the translation for English
      const translation = translations.find(t => t.languageCode === 'en');

      // Return shipping method name
      return translation ? translation.name : 'No Shipping Method';
    } else {
      console.log("No shipping method found for order", orderData.id); // Debug log 
      return 'No Shipping Method'; // Default fallback shipping method name
    }
  }

  /* Construct the delivery address */
  private constructAddress(orderData: Order) {
    return {
      company: orderData.shippingAddress.company,
      street_address: orderData.shippingAddress.streetLine1,
      local_area: orderData.shippingAddress.streetLine2,
      city: orderData.shippingAddress.city,
      zone: orderData.shippingAddress.province,
      code: orderData.shippingAddress.postalCode,
      country: orderData.shippingAddress.country,
    };
  }

  /* Get the product image from Vendure */
  async getProductImageUrl(ctx: RequestContext, productVariantId: ID): Promise<string | null> {
    try {
      const productVariant = await this.productVariantService.findOne(ctx, productVariantId);

      // Check if productVariant exists and has assets
      if (productVariant && productVariant.assets && productVariant.assets.length > 0) {
        return productVariant.assets[0].asset.preview ?? null; // first asset being the main image
      } else {
        console.log(`No assets found for product variant ID: ${productVariantId}`,
        '\n=================================================================');
        return null;
      }
    } catch (error) {
      console.error('Error fetching product variant image:', error);
      return null;
    }
  }
}