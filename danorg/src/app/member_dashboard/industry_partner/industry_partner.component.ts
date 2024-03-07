import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';  
import { Router } from '@angular/router';     
import { FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms';     	 
import { ToastrService } from "ngx-toastr";   

@Component({
  selector: 'industry-partner-dashboard',
  templateUrl: './industry_partner.component.html',				
  styleUrls: ['./industry_partner.component.css'],			
})

export class IndustryPartner implements OnInit {   

  userId: number | null = null;
  userEmail: string | null = null;
  userMembership: string | null = null;
  authToken: string | null = null;
  userAccess: string | null = null;   
  userRenew: string | null = null;     
			
  industryForm:any;   
  form!: FormGroup;
  formSubmitted: boolean = false;    	
  formError: boolean = false; 	
  editMode: boolean = false;  	
  partners:any;    
  parent_id: any;  
  title:any;
  fname: any;     
  sname: any;     
  dob: any; 
  start_date: any;   
  passport: any;     
  address1: any;     
  address2: any;     
  city: any;     
  state: any;     
  postal_code: any;     
  country: any;     
  phonehome: any;        
  cellphone: any;     
  email_address: any;
  medical_aid: any;
  medical_no: any;
  data: any;
  id:any;
  edit_id:any;		

  private apiUrl = 'https://danshopapi.devworktdmc.com/industry_partner/add';  
  private appUrl = 'https://danshopapi.devworktdmc.com/industry_partner/update';    
  
  constructor(private authService: AuthenticationService,private formbulider: FormBuilder,private http: HttpClient,private router: Router, private toastr: ToastrService) {
	this.userId = this.authService.getUserId();  	
    this.parent_id = this.authService.getUserId();    		   	       
  }

  ngOnInit(): void {
    // Retrieve values from AuthenticationService
    this.userId = this.authService.getUserId();
    this.userEmail = this.authService.getUserEmail();
    this.userMembership = this.authService.getUserMembership();  
	this.userAccess = this.authService.getUserAccess();      
    this.authToken = this.authService.getAuthToken();
	this.userRenew = this.authService.getUserRenew();     	    		

	if ((this.router.url == '/industry-partner') && ((this.userAccess !='paid') || (this.userRenew ==='renew')))      
	{
		this.router.navigate(['dashboard']);  		                    	    	                     			  		                    	  		  
	} 

	this.getProvider(this.userId);   	

	this.industryForm = this.formbulider.group({
		parent_id: ['', [Validators.required]], 	      	  
		title: ['', [Validators.required]], 		  		   
		fname: ['', [Validators.required]], 		  		   
		sname: ['', [Validators.required]], 
		dob: ['', [Validators.required]],   	 		    
		start_date: ['', [Validators.required]],   	 		    		
		address1: ['', [Validators.required]],    		
		country: ['', [Validators.required]],   	
		cellphone: ['', [Validators.required]], 	
		email_address: ['', [Validators.required, Validators.email]],  	    
		passport: [''], 	
		address2: [''], 
		city: [''], 
		state: [''],              
		postal_code: [''], 	
		phonehome: [''],  		    		  
		medical_aid: [''], 		
		medical_no: [''],  	
	});          	
	    
	            
  }  

  formDataError: any = {
    msg: '',
    error_field: ''  
  };   

  addPartner(data:any): Observable<any> {
    return this.http.post<any>(this.apiUrl,data);								
  }  
  
  updatePartner(id:any,data:any): Observable<any> {
    return this.http.post<any>(this.appUrl+'/'+id,data);		  			    		    							
  }   
  
  onSubmit() {   

	if(this.editMode)
	{
		if (this.industryForm.invalid)    
		{
			this.formError = true;   
			this.formSubmitted = true;   							
			return false;  
		}      
		else
		{ 		  		   	
			this.formError = false;   
			this.formSubmitted = false;     
			this.formDataError.msg='';
			this.formDataError.error_field='';						
			
			const form_data = this.industryForm.value;   						
			  
			this.updatePartner(this.edit_id,form_data).subscribe(		
				response => {  			  
				  this.toastr.success(response['message'],'Success');	  			 				  
				},
				error => {
				  console.error('Error:', error);
				  this.formDataError.msg=error.error.error;
				  this.formDataError.error_field=error.error.error_field; 
				  this.toastr.error(error.error.error,'Error');   	
				  console.log(error.error.error);
				  console.log(error.error.error_field);
				  // Handle error, show an error message, etc.		  
				}
			  );
			  
			  return true; 	
			  
		 }  	  
		//	
	}
	else 
	{
		if (this.industryForm.invalid)    
		{
			this.formError = true;   
			this.formSubmitted = true;   			
			return false;  
		}      
		else
		{ 		  		   	
			this.formError = false;   
			this.formSubmitted = false;     
			this.formDataError.msg='';
			this.formDataError.error_field='';						
			
			const form_data = this.industryForm.value;   				
			
			this.addPartner(form_data).subscribe(	  	
				response => {  			  
				  this.toastr.success(response['message'],'Success');	  			
				  
				  this.industryForm.controls['title'].reset();   	  	   		  		 	
				  this.industryForm.controls['fname'].reset();      		  
				  this.industryForm.controls['sname'].reset();     	
				  
				  this.industryForm.controls['dob'].reset();   	  	   		  		 	
				  this.industryForm.controls['start_date'].reset();      		  
				  this.industryForm.controls['passport'].reset();   

				  this.industryForm.controls['address1'].reset();   	  	   		  		 	
				  this.industryForm.controls['address2'].reset();      		  
				  this.industryForm.controls['city'].reset();   	
				  
				  this.industryForm.controls['state'].reset();   	  	   		  		 	
				  this.industryForm.controls['postal_code'].reset();      		  
				  this.industryForm.controls['country'].reset();    
				  
				  this.industryForm.controls['phonehome'].reset();   	  	   		  		 	
				  this.industryForm.controls['cellphone'].reset();      		  
				  this.industryForm.controls['email_address'].reset();   

				  this.industryForm.controls['medical_aid'].reset();   	  	   		  		 	
				  this.industryForm.controls['medical_no'].reset();      		  
				  this.industryForm.controls['passport'].reset();   	
				  
				},
				error => {
				  console.error('Error:', error);
				  this.formDataError.msg=error.error.error;
				  this.formDataError.error_field=error.error.error_field; 
				  this.toastr.error(error.error.error,'Error');   	
				  console.log(error.error.error);
				  console.log(error.error.error_field);
				  // Handle error, show an error message, etc.		  
				}
			  );
			  
			  return true; 	
			  
		 }  	  
		//
	}  	
			
  } 

  onEdit(id:any)
  {
	  this.http.get('https://danshopapi.devworktdmc.com/industry_partner/edit/'+id).subscribe((response) => {
		  this.data = response;   	    	    		  

		  this.title=(this.data.length >0)?this.data[0].title1:'';     
		  this.fname=(this.data.length >0)?this.data[0].fname1:'';   		  
		  this.sname=(this.data.length >0)?this.data[0].sname1:'';  
		  
		  this.dob=(this.data.length >0)?this.formatDate(this.data[0].dob1):'';   		  
		  this.start_date=(this.data.length >0)?this.formatDate(this.data[0].startdate):'';   	 
		  
		  this.passport=(this.data.length >0)?this.data[0].passport1:'';   

		  this.address1=(this.data.length >0)?this.data[0].address1:'';     
		  this.address2=(this.data.length >0)?this.data[0].address2:'';   		  
		  this.city=(this.data.length >0)?this.data[0].city1:'';    

		  this.state=(this.data.length >0)?this.data[0].province1:'';     
		  this.postal_code=(this.data.length >0)?this.data[0].postcode1:'';   		  
		  this.country=(this.data.length >0)?this.data[0].country1:'';  

		  this.phonehome=(this.data.length >0)?this.data[0].telephone2:'';     
		  this.cellphone=(this.data.length >0)?this.data[0].cellphone1:'';   		  
		  this.email_address=(this.data.length >0)?this.data[0].email1:'';  

		  this.medical_aid=(this.data.length >0)?this.data[0].medical_aid:'';     
		  this.medical_no=(this.data.length >0)?this.data[0].medical_aid_no:'';   

		  this.edit_id=id;    	
		  
		  this.editMode=true;     		
		  
	  });	
  }  
  
  getProvider(id:any) { 
	  this.http.get('https://danshopapi.devworktdmc.com/industry_partner/get_members/'+id).subscribe((response) => {
      this.partners = response;   	    	   
	  
    });
  }  

  formatDate(date_now:any) 	
  {  	
		if (date_now != null)
		{
			var d = new Date(date_now),   
			month = '' + (d.getMonth() + 1),	
			day = '' + d.getDate(),
			year = d.getFullYear();

			if (month.length < 2) 
				month = '0' + month;
			if (day.length < 2) 
				day = '0' + day;

			return [year, month, day].join('-');	
		}
		else
		{
			return '';    
		}  	
	
   }   

} 