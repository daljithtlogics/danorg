import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { Router } from '@angular/router';   
import { FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms';    

@Component({
  selector: 'provider-dashboard',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})

export class ProviderMember implements OnInit {
  
  userId: number | null = null;
  userEmail: string | null = null;
  userMembership: string | null = null;
  userAccess: string | null = null;   
  authToken: string | null = null;  
  userRenew: string | null = null;     
    
  provideForm:any;   
  form!: FormGroup;
  formSubmitted: boolean = false;    	
  formError: boolean = false; 
  row_id:any;  	     
  successMsg:any;        
  courses:any;
  providers:any;	  	
  data: any; 
  private apiUrl = 'https://danshopapi.devworktdmc.com/provider_frontend/add';    		          
  
  constructor(private authService: AuthenticationService,private formbulider: FormBuilder,private http: HttpClient,private router: Router) {
	this.userId = this.authService.getUserId();  	
    this.row_id = this.authService.getUserId();  	  	
	this.getCourses(this.userId);   
    this.getProvider(this.userId);   	  
  }

  ngOnInit(): void {
    // Retrieve values from AuthenticationService
    this.userId = this.authService.getUserId();
    this.userEmail = this.authService.getUserEmail();
    this.userMembership = this.authService.getUserMembership();
    this.authToken = this.authService.getAuthToken();
	this.userAccess = this.authService.getUserAccess();  
	this.userRenew = this.authService.getUserRenew();     	    		

	if ((this.router.url == '/provider') && (this.userAccess !='paid') || (this.userRenew ==='renew'))      
	{
		this.router.navigate(['dashboard']);          		                                                 			  		                    	  		  
	}	  
	this.provideForm = this.formbulider.group({
	  row_id:['', [Validators.required]],   	
	  first_name: ['', [Validators.required]],   
	  provider_course: ['', [Validators.required]],  				
	  passport_no: [],  
	  city: [],    
	  postcode: [],  
	  provider_country: [],    	 	         
	  sur_name:[],  
	  title:[],   
	  postaddr1:[],  	
	  postaddr2:[], 
	  province:[], 
	  pack_no:[],  							
	});  	
	
  }
  
  formDataError: any = {
    msg: '',
    error_field: ''  
  };  

  addProvider(data:any): Observable<any> {
	return this.http.post<any>(this.apiUrl,data);	  		    		    							
  }  

  onSave() {      

	if (this.provideForm.invalid)  
	{
		this.formError = true;   
		this.formSubmitted = true;       				  
		this.successMsg=''; 	 			
		return false;  
	}      
	else
	{ 		  		   				
		this.formError = false;   
		this.formSubmitted = false;     
		this.formDataError.msg='';
		this.formDataError.error_field='';	   
		const form_data = this.provideForm.value;     
		
		this.addProvider(form_data).subscribe(		  
			response => {
			  console.log('Success:', response);  			  
			  this.getCourses(this.userId);         
			  this.getProvider(this.userId);      	     	
			  this.successMsg='Provider Added';      	

			  this.provideForm.controls['title'].reset();   		  	
			  this.provideForm.controls['first_name'].reset();      					
			  this.provideForm.controls['sur_name'].reset();      
			  
			  this.provideForm.controls['passport_no'].reset();   		  	
			  this.provideForm.controls['postaddr1'].reset();      		
			  this.provideForm.controls['postaddr2'].reset();   
			  
			  this.provideForm.controls['city'].reset();   		  	
			  this.provideForm.controls['province'].reset();      		
			  this.provideForm.controls['postcode'].reset();   
			  
			  this.provideForm.controls['provider_country'].reset();   		  	
			  this.provideForm.controls['provider_course'].reset();      		
			  this.provideForm.controls['pack_no'].reset();     			    	
			  
			},
			error => {
			  console.error('Error:', error);
			  this.formDataError.msg=error.error.error;
			  this.formDataError.error_field=error.error.error_field;

			  console.log(error.error.error);
			  console.log(error.error.error_field);
			  // Handle error, show an error message, etc.		
			}
		);  		
		
		return true;       
		
	  }	 	  
  }  

  getCourses(id:any)  
  {
	  this.http.get('https://danshopapi.devworktdmc.com/annual/courses/'+id).subscribe((response) => {
		   this.courses = response;      			          				   
	  });   
  }
  
  getProvider(id:any)
  {
	  this.http.get('https://danshopapi.devworktdmc.com/annual/providers/'+id).subscribe((response) => {
		    this.providers = response;      
	  });   
  }
  

}
