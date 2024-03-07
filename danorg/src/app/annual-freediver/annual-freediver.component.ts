import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RenewalService } from '../renewal.service';

@Component({
  selector: 'app-annual-freediver',
  templateUrl: './annual-freediver.component.html',
  styleUrls: ['./annual-freediver.component.css']
})
export class AnnualFreediverComponent {
  constructor(private router: Router, private renewalService: RenewalService) {}

  // signup(packageName: string, packagePrice: string) {
  //   const currentUrl = this.router.url;
  //   const dynamicUrl = `${currentUrl}-application`;
  //   this.router.navigate([dynamicUrl, { packageName, packagePrice }]);
  // }

  redirectToLoginWithRenew(): void {
    // Set the renew flag in RenewalService
    this.renewalService.setRenewFlag(true);

    // Programmatically navigate to the login page
    this.router.navigate(['/login']);
  }
}
