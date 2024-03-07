import { Component, OnInit } from '@angular/core';
import { CartItem } from "../models/CartItem";
import { CartService } from "../CartService";
import { ToastrService } from "ngx-toastr";
import { ActiveCustomerService } from '../active-customer.service';
import { Observable, filter, map } from 'rxjs';
import { StateService } from '../state.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

import { AddItemToOrderMutation, AddItemToOrderMutationVariables, Order, ErrorResult, InsufficientStockError, removeOrderLineMutation, removeOrderLineMutationVariables,	OrderModificationError, ActiveCustomer } from '../types';
	
@Component({
  selector: "app-danshop-inner-header",
  templateUrl: "./danshop-inner-header.component.html",
  styleUrls: ["./danshop-inner-header.component.css"],
})
export class DanshopInnerHeaderComponent implements OnInit{
	cart: CartItem[] = [];
	activeOrder: Order | undefined;
	subtotal = 0;
	total = 0;
	tax = 0;
	signedIn$!: Observable<boolean>;
	activeCustomer: ActiveCustomer | undefined;
	
	currentRoutePath: string = '';
	
	constructor(private cartService: CartService, private toastrService: ToastrService, private activeCustomerService: ActiveCustomerService, private stateService: StateService,  private route: ActivatedRoute, private router: Router) {	

		// Listen to route changes
		this.router.events.pipe(
		  filter(event => event instanceof NavigationEnd)
		).subscribe(() => {
		  // Update currentRoutePath with the current route's path
		  this.currentRoutePath = this.router.url;
		});
		
		this.cartService.activeOrder$.subscribe((activeOrder: Order | undefined) => {
			this.activeOrder = activeOrder;
		});
	}
	ngOnInit() {
		
		// Subscribe to cart changes to update the activeOrder when an item is added to the cart
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
		
		this.activeCustomerService.getActiveCustomer().subscribe((activeCustomer: ActiveCustomer | undefined) => {			
			if (activeCustomer !== null && activeCustomer !== undefined) {
				this.activeCustomer = activeCustomer;
				console.log("active customer", this.activeCustomer);
				this.stateService.setState('signedIn', true);
			} else {
				// Handle the case when activeCustomer is null or undefined
			}
		});
		
		//check customer Signin
	    this.signedIn$ = this.stateService.select(state => state.signedIn);
	}
	
  
	onRemoveCart(id: number){	
		const productId = id;
		this.cartService.removeOrderLine(productId).subscribe(
			(response: removeOrderLineMutation['removeOrderLine']) => {          
			  if ('id' in response && response.id) {
				const removeOrderLine = response as Order;
				if (id) {
					console.log(removeOrderLine, removeOrderLine.id + ' Success');
					this.cartService.getActiveOrder().subscribe((activeOrder: Order | undefined) => {
						// Update the activeOrderSubject in the CartService
						this.cartService.updateActiveOrder(activeOrder);
					});
					this.toastrService.success('Product removed from the cart.', 'Success!');				
				}
			  } else {
			  
					const errorResponse = response as OrderModificationError;
					this.toastrService.error(errorResponse.message, 'Error!');
					  
			  } 
			},
			error => {
			  // Handle the API call error
			  console.error('API Error:', error);
			}
		);
	}
  
}
