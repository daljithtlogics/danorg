import { Component, ChangeDetectorRef, OnInit } from "@angular/core";
import { gql, Apollo } from "apollo-angular";
import { Productdetail } from "../models/productdetail";
import { ActivatedRoute } from "@angular/router";
import { CartService } from "../CartService";
import { CartItem } from "../models/CartItem";
import { ToastrService } from "ngx-toastr";
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { switchMap, tap, catchError, mergeMap  } from 'rxjs/operators';
import { of } from 'rxjs';
import { StateService } from '../state.service';

import { Order, ErrorResult, InsufficientStockError, AddItemToOrderMutation } from '../types';

const Get_Product = gql`
  query GetProduct($slug: String) {
    product(slug: $slug) {   
      id
      slug
      name
      description
      featuredAsset {
        source
      }
      assets {
        id
        name
        preview
        source
        height
        width
      }
      variants {
        id
        name
        price
        priceWithTax
        options {
          code
          name
        }
        price
        priceWithTax
        sku
        stockLevel
		currencyCode
      }
      collections {
        id
		name
        slug
        breadcrumbs {
          id
          name
          slug
        }
      }     
    }  
  }
`;

type GetProductResponse = {
  product: Productdetail["product"];
};

type Variant = NonNullable<GetProductResponse['product']>['variants'][number];

@Component({
	selector: "app-product-details",
	templateUrl: "./product-details.component.html",
	styleUrls: ["./product-details.component.css"],
})

export class ProductDetailsComponent  implements OnInit{
	
	activeOrder: Order | undefined;
	
    product: Productdetail["product"] = {
		id: 1,
		slug: "",
		name: "",
		price: 10,
		collections: [{ id: 0, name: "", slug: "" }],
		featuredAsset: {
			source: "/assets/images/no_photo_available.jpg",
		},
		assets:[{
			id:1,
			name:"",
			preview:"",
			source:"",
			height:0,
			width:0,
		}] ,
		description: "",
		variants: [
			{   
			    id: 0,
			    name: "",
				price: 1,
				sku: "",
				stockLevel: "",
				priceWithTax: 0,
				currencyCode: ""
			},
		],
	};
	
    selectedVariant: Variant | null = null;
	
	id: "";
	quantity = 1;
	cart: CartItem[] = [];
	order: Observable<Order | undefined> | undefined;
	subtotal = 0;
	inFlight = false;
	constructor(
		private apollo: Apollo,
		private _Activatedroute: ActivatedRoute,
		private cartService: CartService,
		private toastrService: ToastrService,
		private stateService: StateService,
		private cdr: ChangeDetectorRef
		
	){
		this.id = this._Activatedroute.snapshot.params["id"];
		this.quantity = 1;
		//this.subtotal = this.cartService.getSubtotal();
		//console.log(this.id);
		this.getData();
		
		this.cartService.getActiveOrder().subscribe((activeOrder: Order | undefined) => {
			// Update the activeOrderSubject in the CartService
			this.cartService.updateActiveOrder(activeOrder);
		});
		
		this.cartService.activeOrder$.subscribe((activeOrder: Order | undefined) => {
			this.activeOrder = activeOrder;
			console.log('Order:', activeOrder); // You should see the active order data here.
		});
		
	}
	
	getData() {
		this.apollo.watchQuery<any>({
			query: Get_Product,
			variables: { slug: this.id }
		})
		.valueChanges.subscribe(({ data, loading }) => {
			this.product = data.product;
			this.selectedVariant = this.product.variants[0];
			console.log(this.product);
		});
	}

	increaseQuant(event: any): void {
		event.preventDefault();
		console.log("test");
		this.quantity = this.quantity + 1;
	}
	
	dencreaseQuant(event: any): void {
		event.preventDefault();
		if (this.quantity > 1) {
			this.quantity = this.quantity - 1;
		}
	}
	
	//addtocart
	addToCart(variant: number, qty: number) {
	  this.inFlight = true;
	  const productVariantId = variant;
	  const quantity = qty;

	  this.cartService.addItemToOrder(productVariantId, quantity).subscribe(
		(response: AddItemToOrderMutation['addItemToOrder']) => {
		  this.inFlight = false;            
		  if ('id' in response && response.id) {
			const addItemToOrder = response as Order;
			this.stateService.setState('activeOrderId', addItemToOrder ? addItemToOrder.id : null);
			if (variant) {
				console.log(addItemToOrder, addItemToOrder.id + ' Success');
				this.cartService.getActiveOrder().subscribe((activeOrder: Order | undefined) => {
					// Update the activeOrderSubject in the CartService
					this.cartService.updateActiveOrder(activeOrder);
				});
				this.toastrService.success('Product Added to Cart', 'Success!');				
			}
		  } else {
		  
				const errorResponse = response as ErrorResult | InsufficientStockError;
				this.toastrService.error(errorResponse.message, 'Error!');
			      
		  } 
		},
		error => {
		  // Handle the API call error
		  console.error('API Error:', error);
		}
	  );
	}
	
	ngOnInit() {
		this.cartService.getActiveOrder().subscribe(
			(order: Order | undefined) => {
				// Handle the order data
				this.activeOrder = order
				console.log('Order Header:', order);
			},
			(error: any) => {
				// Handle the error
				console.error('API Error:', error);
			},
			() => {
				// Handle the case when no active order is found
				//console.log('No active order found.');
			}
		);
	}
	
}