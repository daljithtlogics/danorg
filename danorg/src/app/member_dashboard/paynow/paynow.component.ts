import { Component, OnInit } from '@angular/core';  
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';    
import { Router } from '@angular/router';      
import { AuthenticationService } from '../../authentication.service';      
import { FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms';     
import {NgForm} from '@angular/forms';    
import { ToastrService } from "ngx-toastr";  
import { ActivatedRoute } from '@angular/router';        

@Component({
  selector: 'app-paynow',
  templateUrl: './paynow.component.html',   
  styleUrls: ['./paynow.component.css']
})

export class PaynowComponent implements OnInit {	  
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
  title:any;
  fname:any;		
  sname:any;
  dob:any;		
  passport:any;		
  address1:any;
  address2:any;				
  city:any;
  province:any;		
  post:any;   
  country:any;     
  phonehome:any;  
  cellphone:any;    
  email:any;  
  aid:any;  
  aid_no:any;  
  start_date:any;     
  user_id:any; 
  user_type:any; 	
  successMsg:any;      
  data: any; 	    
  private apiUrl = 'https://danshopapi.devworktdmc.com/common_membership/paynow_stud';             
  
  constructor(private authService: AuthenticationService,private formbulider: FormBuilder,private http: HttpClient,private router: Router,private _router: ActivatedRoute, private toastr: ToastrService) { 	
	this.user_id = this.authService.getUserId();  
	this.user_type = this.authService.getUserMembership();    

	this._router.queryParams.subscribe(params => {
		this.title = params['title'];    
        this.fname = params['f_name'];  
		this.sname = params['s_name'];    
		this.dob = params['dob'];   
		this.passport = params['passport'];  
		this.address1 = params['address1'];   
		this.address2 = params['address2'];  
		this.city = params['city'];   
		this.province = params['province'];  		
		this.post = params['post'];   
		this.country = params['country'];  
		this.phonehome = params['home_phone'];     
		this.cellphone = params['cell_phone'];  
		this.email = params['email']; 
		this.aid = params['aid'];  
		this.aid_no = params['aid_no'];   
		this.start_date = params['start_date'];      				
    });	  
	
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
		title:['', [Validators.required]],  
		fname:['', [Validators.required]],  
		sname:['', [Validators.required]],  
		dob:['', [Validators.required,Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],  
		passport:[], 	
		address1:['', [Validators.required]],     
		address2:[],    
		city:['', [Validators.required]],   	   
		post:['', [Validators.required]],    
		province:['', [Validators.required]],    
		country:['', [Validators.required]],    
		phonehome:['', [Validators.required]],      
		cellphone:['', [Validators.required]],    
		email:['', [Validators.required, Validators.email]],    
		aid:['', [Validators.required]],  
		aid_no:['', [Validators.required]],       
		start_date:['', [Validators.required,Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],  
	});   
	
  }
  
  formDataError: any = {
    msg: '',
    error_field: ''    
  };

  addAmount(data:any): Observable<any> {
    return this.http.post<any>(this.apiUrl,data);	     		 				    		    							
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
		
		console.log(form_data);   
		
		this.addAmount(form_data).subscribe(		  
			response => {           								
			  this.successMsg='Payment Done';
			  // const successMessage = response['message'];   
			  this.toastr.success(this.successMsg,'Success');	  		
			  f.resetForm();	     
			  setTimeout(() => {
					this.router.navigate(['student-membership']);  		  
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