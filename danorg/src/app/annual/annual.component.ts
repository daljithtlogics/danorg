import { Component } from '@angular/core';
import { Router, NavigationExtras  } from '@angular/router';
import { RenewalService } from '../renewal.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-annual',
  templateUrl: './annual.component.html',
  styleUrls: ['./annual.component.css']
})
export class AnnualComponent {

  constructor(private router: Router, private renewalService: RenewalService, private dataService: DataService) {}

  // signup(membership: string, packageName: string, packagePrice: string, packageFor: string) {
  //   const data = {
  //     membership: membership,
  //     packageName: packageName,
  //     packagePrice: packagePrice,
  //     packageFor: packageFor
  //   };

  //   this.dataService.setSignupData(data);
  //   const currentUrl = this.router.url;
  //   // const dynamicUrl = `${currentUrl}-application`;
  //   const dynamicUrl = `${currentUrl}-application`;
  //   this.router.navigate([dynamicUrl]);
  // }

  // signup(packageName: string, packagePrice: string, packageFor: string) {
  //   const currentUrl = this.router.url;
  //   // console.log('Current URL:', currentUrl);

  //   const dynamicUrl = `${currentUrl}-application`;
    
  //   console.log('Dynamic URL:', dynamicUrl);
  //   console.log('packageName:', packageName);
  //   console.log('packagePrice:', packagePrice);
  //   console.log('packageFor:', packageFor);

  //   this.router.navigate([dynamicUrl, { packageName, packagePrice, packageFor }]);
  // }

  // Function to redirect to login with renew parameter
  // redirectToLoginWithRenew(): void {
  //   // Define the navigation extras including the renew parameter
  //   const navigationExtras: NavigationExtras = {
  //     queryParams: { renew: true },
  //   };

  //   // Programmatically navigate to the login page with the defined extras
  //   this.router.navigate(['/login'], navigationExtras);
  // }

  redirectToLoginWithRenew(): void {
    // Set the renew flag in RenewalService
    this.renewalService.setRenewFlag(true);

    // Programmatically navigate to the login page
    this.router.navigate(['/login']);
  }

}
