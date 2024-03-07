import { Component } from '@angular/core';
import { CartService } from '../CartService';
import { gql, Apollo } from "apollo-angular";
import { ToastrService } from "ngx-toastr";

import { Order, ErrorResult, InsufficientStockError } from '../types';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})

export class CheckoutComponent{
	
	
	
}
