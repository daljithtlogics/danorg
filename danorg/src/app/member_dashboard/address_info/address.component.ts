import { Component } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';

@Component({
  selector: 'address-dashboard',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})

export class AddressInfo {
  
  userId: number | null = null;
  userEmail: string | null = null;
  userMembership: string | null = null;
  authToken: string | null = null;

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    // Retrieve values from AuthenticationService
    this.userId = this.authService.getUserId();
    this.userEmail = this.authService.getUserEmail();
    this.userMembership = this.authService.getUserMembership();
    this.authToken = this.authService.getAuthToken();
  }

}
