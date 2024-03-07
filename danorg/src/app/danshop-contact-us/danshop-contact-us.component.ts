import { Component, OnInit } from '@angular/core';  
import { Observable } from 'rxjs'; 
import { HttpClient } from '@angular/common/http';   
import { ReCaptchaV3Service } from 'ng-recaptcha';     
import { ToastrService } from "ngx-toastr";     
import { FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms';    

@Component({
  selector: 'app-danshop-contact-us',
  templateUrl: './danshop-contact-us.component.html',
  styleUrls: ['./danshop-contact-us.component.css']
})
export class DanshopContactUsComponent implements OnInit {	

	contactForm:any; 	     
	form!: FormGroup;
	formSubmitted: boolean = false;    	
	formError: boolean = false; 	
	contact_name:any;  
    contact_email:any;  
	contact_enquiry:any;  	
	captcha:any;  	
	token:any;    
	secret:any;  
	successMsg:any;    
    data: any; 	    
    private apiUrl = 'https://danshopapi.devworktdmc.com/contact/send';       	       	
	
	constructor(private formbulider:FormBuilder,private http:HttpClient,private recaptchaV3Service: ReCaptchaV3Service,private toastr: ToastrService) 
	{ 	
		this.secret='6LfMMEIpAAAAAHSw-dkqVoc8QxMvkh59CFEutZiq';            
    }
	
	ngOnInit(): void {    
	
	this.recaptchaV3Service.execute('importantAction').subscribe((token: string) => { 			
		this.captcha=token;                	 
	}); 
	
	this.contactForm = this.formbulider.group({ 	  	  	
	  contact_name: ['', [Validators.required]],   
	  contact_enquiry: ['', [Validators.required]],   	     
	  contact_email: ['', [Validators.required,Validators.email]],	     	  
	  secret: ['', [Validators.required]],     
	  captcha: [''],     		
	});   
	
  }
  
  formDataError: any = {
    msg: '',
    error_field: ''
  }; 
  
  sendQuery(data:any): Observable<any> {
	return this.http.post<any>(this.apiUrl,data);	        		    							
  }  

  onSubmit() {    	

	this.recaptchaV3Service.execute('importantAction').subscribe((token: string) => { 			
		this.captcha=token;                	 
	}); 	
		
    if (this.contactForm.invalid)
	{
		this.formError = true;   
		this.formSubmitted = true;    
		this.successMsg=''; 

		for (const control of Object.keys(this.contactForm.controls)) {
			this.contactForm.controls[control].markAsTouched();
		}       
		
		return false;  
	}      
    else
	{ 		  		   				
		this.formError = false;   
		this.formSubmitted = false;     
		this.formDataError.msg='';
		this.formDataError.error_field='';	 		 
 		
		const form_data = this.contactForm.value;     
		
		   
		this.sendQuery(form_data).subscribe(  
			response => {           								
			   this.successMsg='Thank you for contacting with us.'; 			
			   this.toastr.success(this.successMsg,'Success');	  				
			   this.contactForm.controls['contact_name'].reset();   								  			 		 	 
			   this.contactForm.controls['contact_email'].reset();      					
			   this.contactForm.controls['contact_enquiry'].reset();              
			},	
			error => { 			  
			  this.formDataError.msg=error.error.error;
			  this.formDataError.error_field=error.error.error_field;	
			  console.log(error.error.error_field);		
			  console.log(error.error.error);   			  	
			}
		  );	  
			
		}  		
				 		
        
		return true;      
		
	} 	
	
} 