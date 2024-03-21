import { Injectable } from '@nestjs/common';
import {
  ID,
  Order,
  OrderLine,
  RequestContext,
  TransactionalConnection,
  Logger,
  EntityNotFoundError,
  EntityHydrator,
} from '@vendure/core';
import axios from 'axios';

// Bobgo header
const apiKey = process.env.BOBGO_API_KEY;
const HEADERS = { 
  'Authorization': `Bearer ${apiKey}`,
  'Content-Type': 'application/json',
};

/*
  to display product image order items in the Bobgo platform
  */

// LOCALHOST Base Url
// const baseURL = 'https://04a2-169-0-105-39.ngrok-free.app/' + 'assets/'; // localhost, hosted online with ngRok
// const baseURL = 'http://localhost:3000/' + 'assets/';

// LIVE Base Url
const baseURL = 'https://danshopadmin.devworktdmc.com/' + 'assets/';
// const baseURL = 'http://157.245.36.128:3000/' + 'assets/';

@Injectable()
export class BobgoService {

  constructor(
    private connection: TransactionalConnection,
    private entityHydrator: EntityHydrator,
  ){}

  ////////////////////////////////////////////////////////////////
  /* ------- CREATE NEW ORDER and UPDATE EXISTING ORDER ------- */
  ////////////////////////////////////////////////////////////////

  /**
   * CREATE ORDER.
   */
  async createOrderInBobgo(ctx: RequestContext, orderId: ID): Promise<any> {
    try {
      // Use the helper method to fetch order details
      let orderData = await this.fetchOrderDetails(ctx, orderId);

      // Prepare order items for Bobgo, including fetching image URLs
      const orderItemsWithImages = await this.prepareOrderItemsWithImages(ctx, orderData.lines)

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
      const response = await axios.post('https://api.sandbox.bobgo.co.za/v2/orders', OrderData, { headers: HEADERS })
      .catch((error) => {
        console.error("Error response:", error.response.data);
        throw error;
      });
      
      // Extract the Channel Order Number & Bobgo order ID from API response.
      const channel_order_number = response.data.channel_order_number;
      const bobgoOrderId = response.data.id;
      console.log('BOBGO FIELDS FROM RESPONSE Log:',
        '\n----------------------------',
        '\n- Channel Order Number:', channel_order_number, 
        '\n- Bobgo Order ID:', bobgoOrderId,
        '\n=================================================================');

      // update custom fields
      if(bobgoOrderId && channel_order_number) {
        const stored = await this.updateOrderCustomFields(ctx, orderId, {
          bobgoOrderId: bobgoOrderId,
          channel_order_number: channel_order_number
        });
        console.log(
          'STORING IN ORDER CUSTOM FIELDS Log:',
          '\n----------------------------',
          '\nStored in DB?: ', stored?.customFields,
          '\n=================================================================');
      } else { 
        console.error('bobgoOrderID or channelOrderNumber not found in response:', response.data);
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
  async updateOrderInBobgo(ctx: RequestContext, storedBobgoID: any, orderId: ID): Promise<any> {
    try {
      // Use the helper method to fetch order details
      let updateOrder = await this.fetchOrderDetails(ctx, orderId);

      const storedBobgoID = (updateOrder.customFields as any).bobgoOrderId;
      console.log("Ready to update Order - BobgoOrderId:", storedBobgoID,
      '\n=================================================================');

      const endpoint = `https://api.sandbox.bobgo.co.za/v2/orders?id=${storedBobgoID}`;

      // Prepare order items for Bobgo, including fetching image URLs
      const orderItemsWithImages = await this.prepareOrderItemsWithImages(ctx, updateOrder.lines)

      // Update order payload, fields to update
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

      // Send updated fields of the existing order to Bobgo
      const updatedResponse = await axios.patch(endpoint, mappedUpdateData, { headers: HEADERS })
      .catch((error) => {
        console.error("Error in updated order response:", error.updatedResponse.data);
        throw error;
      });

      return updatedResponse.data;
    } catch (error) {
      console.error("Error updating the existing order in Bobgo:", error);
      throw error;
    }
  }

  ////////////////////////////////////
  /* ------- HELPER METHODS ------- */
  ////////////////////////////////////

  // fetch an order with detailed relations
  private async fetchOrderDetails(ctx: RequestContext, orderId: ID): Promise<Order> {
    const orderRepository = this.connection.getRepository(ctx, Order);
    const order = await orderRepository.findOne({
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

    if (!order) {
      console.error("Order not found.");
      throw new Error(`Order with ID ${orderId} not found.`);
    }

    return order;
  }

  // Hydrate order lines and prepare items for Bobgo
  private async prepareOrderItemsWithImages(ctx: RequestContext, orderLines: OrderLine[]): Promise<any[]> {
    return Promise.all(orderLines.map(async (orderLine) => {
      await this.entityHydrator.hydrate(ctx, orderLine, {
        relations: [
          'featuredAsset',
          'productVariant',
          'productVariant.featuredAsset',
          'productVariant.assets'
        ]
      });
  
      const image_url_preview = `${baseURL}${orderLine.featuredAsset.preview}`; // Ensure baseURL is correctly formatted, localhost or live
      const image_url_source = `${baseURL}${orderLine.featuredAsset.source}`;
  
      console.log(
        "Object Image Featured Asset: ", orderLine.featuredAsset,
        '\nIMAGE URLs COMBINED WITH BASE URL Log:',
        '\n*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-',
        '\n- Asset URL preview: ', image_url_preview, 
        '\n- Asset URL source: ', image_url_source, 
        '\n=================================================================',
      );

      // order items array payload
      return {
        description: orderLine.productVariant.translations[0]?.name,
        channel_image_url: image_url_preview,
        vendor: 'Danshop',
        sku: orderLine.productVariant.sku,
        unit_price: orderLine.unitPriceWithTax / 100,
        qty: orderLine.quantity,
      };
    }));
  }

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

  /////////////////////////////////////////////////////////////////////////////////
  /* ------- UPDATE ORDER CUSTOM FIELDS WITH BOBGO ID AND CHANNEL NUMBER ------- */
  /////////////////////////////////////////////////////////////////////////////////

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
}