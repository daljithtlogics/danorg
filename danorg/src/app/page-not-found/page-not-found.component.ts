import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit{

  constructor(
		private route: ActivatedRoute
	) {}

  ngOnInit(): void {
    // Error Handling with Netcash Controller of backend (netcash.controller.ts)

    // payment-success
    this.route.queryParams.subscribe(params => {
    if (params['error-payment-success'] === 'error') { // error in catch block
        Swal.fire({
          icon: 'info',
          title: 'Payment Processed',
          text: 'An error occured while processing your payment.',
          confirmButtonText: 'Ok'
        });
      } else if (params['error-payment-success'] === 'transaction-id-mismatch') {
        Swal.fire({
          icon: 'error',
          title: 'Payment Processed',
          text: 'A transaction mismatch error occured while processing your payment. Please contact support for assistance.',
          confirmButtonText: 'Ok'
        });
      }

      // payment-declined
      else if (params['error-payment-declined'] === 'error') { // error in catch block
        Swal.fire({
          icon: 'error',
          title: 'Payment Declined',
          text: 'An error occured during redirecting back to the Cart page to retry payment.',
          confirmButtonText: 'Ok'
        });
      } 
      
      // payment-redirect
      else if (params['error-payment-redirect'] === 'error') { // error in catcb block
        Swal.fire({
          icon: 'error',
          title: 'Payment Redirecting',
          text: 'An error occured during redirecting to the All Products page.',
          confirmButtonText: 'Ok'
        });
      }
    });
  }

}
