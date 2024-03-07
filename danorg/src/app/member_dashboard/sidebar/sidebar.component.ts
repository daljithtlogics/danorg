import { Component, OnInit } from '@angular/core';  
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'; 
import { AuthenticationService } from '../../authentication.service';
import { Router } from '@angular/router';    
import { ActivatedRoute } from '@angular/router';       		

@Component({
  selector: 'member-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent {
  
  id:any;   
  userId: number | null = null;
  userEmail: string | null = null;
  userMembership: string | null = null;
  userAccess: string | null = null;     
  userPack: string | null = null;      
  authToken: string | null = null;     
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
	  this.userPack = this.authService.getUserPack();     	    		
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