import { Component, OnInit } from '@angular/core';  
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'; 
import { AuthenticationService } from '../../authentication.service';
import { Router } from '@angular/router';    

@Component({
  selector: 'app-login-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../common.component.css']
})

export class LoginDashboardComponent implements OnInit {	   
  
  id:any;  
  userId: number | null = null;
  userEmail: string | null = null;
  userMembership: string | null = null;
  authToken: string | null = null;
  userAccess: string | null = null; 
  userRenew: string | null = null; 

  constructor(private authService: AuthenticationService,private http: HttpClient,private router: Router) { 	
	this.id = this.authService.getUserId();    	     		
  }   

  ngOnInit(): void {
    // Retrieve values from AuthenticationService
    this.userId = this.authService.getUserId();		
    this.userEmail = this.authService.getUserEmail();
	  this.userAccess = this.authService.getUserAccess();      
    this.userMembership = this.authService.getUserMembership();
    this.authToken = this.authService.getAuthToken();  	
    this.userRenew = this.authService.getUserRenew();     	    		
  }    

  logout() {
    // Remove session storage values
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('userMembership');
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('userPack');
    sessionStorage.removeItem('userRenew');
    sessionStorage.removeItem('userAccess');


    // Navigate to the login route
    this.router.navigate(['/login'])
    .then(() => window.location.reload());
    
  }  

}
