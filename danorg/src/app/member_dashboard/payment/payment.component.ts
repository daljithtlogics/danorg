import { Component, OnInit } from '@angular/core';  
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';    
import { Router } from '@angular/router';      
import { AuthenticationService } from '../../authentication.service';      
import { FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms';     
import {NgForm} from '@angular/forms';    
import { ToastrService } from "ngx-toastr";    

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']  
})

export class PaymentComponent implements OnInit {	  
  
  user_id:any; 
  user_type:any;      
  userId: number | null = null;
  userEmail: string | null = null;
  userMembership: string | null = null;						
  authToken: string | null = null;
  payForm:any; 
  form!: FormGroup;
  formSubmitted: boolean = false;    	
  formError: boolean = false; 	
  pack_price:any;     
  pay_type:any;    
  pack_name:any;     
  successMsg:any;      
  data: any; 	    
  private apiUrl = 'https://danshopapi.devworktdmc.com/common_membership/';     
  
  constructor(private authService: AuthenticationService,private formbulider: FormBuilder,private http: HttpClient,private router: Router, private toastr: ToastrService) { 	
	this.user_id = this.authService.getUserId();  
	this.user_type = this.authService.getUserMembership();        	  
  }   

  ngOnInit(): void {
    // Retrieve values from AuthenticationService
    this.userId = this.authService.getUserId();
    this.userEmail = this.authService.getUserEmail();
    this.userMembership = this.authService.getUserMembership();			
    this.authToken = this.authService.getAuthToken();
	this.getDetail(this.userId);  		
	
	this.payForm = this.formbulider.group({ 		  	
	  user_id: ['', [Validators.required]], 
	  user_type: ['', [Validators.required]],  
	  pay_type: ['', [Validators.required]],            	
	});   
	
  }
  
  formDataError: any = {
    msg: '',
    error_field: ''    
  };

  addAmount(data:any): Observable<any> {
    return this.http.post<any>(this.apiUrl+"payment_save",data);	     		 				    		    							
  }  	

  onSave(f:any) {  
		
    if (this.payForm.invalid)
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
		
		const form_data = this.payForm.value;    
		
		this.addAmount(form_data).subscribe(		  
			response => {           								
			  this.successMsg='Payment Done';
			  // const successMessage = response['message'];   
			  this.toastr.success(this.successMsg,'Success');	  		
			  f.resetForm();	     
			  sessionStorage.setItem('userAccess','paid');    			  
			  setTimeout(() => {
					this.router.navigate(['dashboard']);  
			  }, 2000);    			  
			},	
			error => { 			  
			  this.formDataError.msg=error.error.error;
			  this.formDataError.error_field=error.error.error_field;			 			  
			  console.log(error.error.error);
			  console.log(error.error.error_field);		
			}
		  );

		return true;        	
	
	}          
		
  }	

  getDetail(id:any) {   		
	this.http.get('https://danshopapi.devworktdmc.com/common_membership/edit/'+id).subscribe((response) => {
		this.data = response;  
		this.pack_name=(this.data.length >0)?this.data[0].package_name:'';       
		this.pack_price=(this.data.length >0)?this.data[0].package_price:'';   
	});
  }	

}
