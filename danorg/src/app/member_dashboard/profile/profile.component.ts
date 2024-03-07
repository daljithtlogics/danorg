import { Component } from '@angular/core';
import { Router } from '@angular/router';      
import { AuthenticationService } from '../../authentication.service';
import { HttpClient } from '@angular/common/http'; 

@Component({
  selector: 'profile-dashboard',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileMember {
  
  userId: number | null = null;
  userEmail: string | null = null;
  userMembership: string | null = null;
  userAccess: string | null = null;     
  authToken: string | null = null;   
  userRenew: string | null = null;     
  
  common_id:any;     
  membeRecords:any;    
    
  constructor(private authService: AuthenticationService,private router: Router, private http: HttpClient) { 			
	
  }

  ngOnInit(): void {
    // Retrieve values from AuthenticationService
    this.userId = this.authService.getUserId();
    this.userEmail = this.authService.getUserEmail();
    this.userMembership = this.authService.getUserMembership();    
	  this.userAccess = this.authService.getUserAccess();      
    this.authToken = this.authService.getAuthToken();
    this.userRenew = this.authService.getUserRenew();     	    		

    this.getMembers(this.userId);    	

    if ((this.router.url == '/profile') && (this.userAccess !='paid') || (this.userRenew ==='renew'))      
    {
      this.router.navigate(['dashboard']);                                                      			  		                    	  		  
    }	    
	
  }

  getMembers(common_id:any)
  {
	  this.http.get('https://danshopapi.devworktdmc.com/common_membership/edit/'+common_id).subscribe((response) => {
         this.membeRecords = response;  
	  });   
  }

}
