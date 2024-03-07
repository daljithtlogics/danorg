import { Component, OnInit } from '@angular/core';  
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'; 
import { FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms';    
import { Router } from '@angular/router';   
import { AuthenticationService } from '../../authentication.service'; 
import { ToastrService } from "ngx-toastr";    

@Component({
  selector: 'personal-dashboard',
  templateUrl: './personal.component.html',  
  styleUrls: ['./personal.component.css']
})

export class PersonalInfo implements OnInit {	  
  id: any;    
  userId: number | null = null;
  userEmail: string | null = null;
  userMembership: string | null = null;
  authToken: string | null = null;  
  userAccess: string | null = null;   
  userRenew: string | null = null;     	
  	  
  anualForm:any; 
  tempForm:any; 
  studentForm:any; 	     
  form!: FormGroup;
  formSubmitted: boolean = false;    	
  formError: boolean = false; 	
  info_title:any;  
  f_name:any; 
  s_name:any;    
  first_name:any; 
  sur_name:any;
  last_name:any;    
  info_passport:any;  
  info_dob:any; 
  info_address1:any;    
  info_address2:any; 
  info_city:any; 
  info_email:any;       
  info_province:any; 
  info_country:any; 
  tel_home:any;    
  tel_work:any; 
  post_code:any;  
  passport_no:any;    
  cell_phone:any; 
  medical_aid:any;    
  medical_no:any;    
  medical_aid_dep:any;
  tab_id:any;  
  fax:any;       
  successMsg:any;    
  data: any; 	    
  private apiUrl = 'https://danshopapi.devworktdmc.com/annual_frontend/update';
  private tempApiUrl = 'https://danshopapi.devworktdmc.com/temporary_frontend/update'; 
  private studApiUrl = 'https://danshopapi.devworktdmc.com/student_frontend/update'   
  
  constructor(private authService: AuthenticationService,private formbulider: FormBuilder,private http: HttpClient,private router: Router, private toastr: ToastrService) { 	
	this.id = this.authService.getUserId();  
  }

  ngOnInit(): void {
    // Retrieve values from AuthenticationService 	
    this.userId = this.authService.getUserId();
    this.userEmail = this.authService.getUserEmail();
    this.userMembership = this.authService.getUserMembership();
	this.userAccess = this.authService.getUserAccess();        
    this.authToken = this.authService.getAuthToken(); 
	this.userRenew = this.authService.getUserRenew();     	    		
	
	this.getData(this.id);     

	if ((this.router.url == '/personal-info') && (this.userAccess !='paid') || (this.userRenew ==='renew'))      
	{
		this.router.navigate(['dashboard']);        		 				                     			  		                    	  		  
	} 	

	this.anualForm = this.formbulider.group({
	  info_title: ['', [Validators.required]], 	
	  first_name: ['', [Validators.required]], 	 	
	  sur_name: ['', [Validators.required]], 	 	  
	  info_city: ['', [Validators.required]], 	 
	  info_country: ['', [Validators.required]],  
	  info_address1: ['', [Validators.required]],   
	  info_province: ['', [Validators.required]], 
	  post_code: ['', [Validators.required]], 	 
	  cell_phone: ['', [Validators.required]], 
	  info_email: ['', [Validators.required,Validators.email]], 			
	  info_dob: ['', [Validators.required,Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
	  info_passport:[],   
	  info_address2:[],  
	  tel_home:[],  
	  tel_work:[], 
	  medical_aid:[], 
	  medical_no:[], 
	  medical_aid_dep:[],
      fax:[], 
	  tab_id:[],		 	
	});   
	
	this.tempForm = this.formbulider.group({ 		  	
	  info_title: ['', [Validators.required]], 	
      f_name: ['', [Validators.required]], 
	  s_name: ['', [Validators.required]],   	
	  info_dob: ['', [Validators.required,Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]], 	  
	  info_address1: ['', [Validators.required]],    
	  info_city: ['', [Validators.required]],   
      info_province: ['', [Validators.required]],    	  
	  post_code: ['', [Validators.required]], 
	  info_country: ['', [Validators.required]],
	  cell_phone: ['', [Validators.required]],  	  
	  info_email: ['', [Validators.required,Validators.email]],  	  
	  tel_home:[],  
	  tel_work:[],  
	  info_address2:[],   
	  info_passport:[],   
	  medical_aid:[],  
	  medical_no:[],  	    
      fax:[],  	  
	});   
	
	this.studentForm = this.formbulider.group({ 		  	
	  info_title: ['', [Validators.required]], 
	  first_name: ['', [Validators.required]], 	   	
	  last_name: ['', [Validators.required]], 	
	  info_email: ['', [Validators.required,Validators.email]],    
	  info_dob: ['', [Validators.required,Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
	  info_address1: ['', [Validators.required]],
	  info_city: ['', [Validators.required]],   
	  info_province: ['', [Validators.required]], 
      post_code: ['', [Validators.required]], 
	  info_country: ['', [Validators.required]], 
	  cell_phone: ['', [Validators.required]],  	
	  passport_no:[],  	
	  info_address2:[], 		
	  tel_home:[],  	
	  tel_work:[],  	  
	  fax:[],  	    
	});   
	
  }
  
  formDataError: any = {
    msg: '',
    error_field: ''
  };    

  updateAnnual(id:any,data:any): Observable<any> {
    return this.http.post<any>(this.apiUrl+'/'+id,data);	    				    		    							
  }  
  
  updateTemporary(id:any,data:any): Observable<any> {
    return this.http.post<any>(this.tempApiUrl+'/'+id,data);					    		    							
  }

  updateStudent(id:any,data:any): Observable<any> {
    return this.http.post<any>(this.studApiUrl+'/'+id,data);					    		    							
  }   	
  
  onSubmit() {  
		
    if (this.anualForm.invalid)
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
		
		const form_data = this.anualForm.value;    		
		
		this.updateAnnual(this.id,form_data).subscribe(		  
			response => {           								
			  this.successMsg='Details Updated';  
			  this.toastr.success(this.successMsg, 'Success');	
			},	
			error => { 			  
			  this.formDataError.msg=error.error.error;
			  this.formDataError.error_field=error.error.error_field;			 			  
			  console.log(error.error.error);
			  console.log(error.error.error_field);		
			}
		  );	  
	
		}
        
		return true;      
  }	
  
  onSave(){
		if (this.tempForm.invalid)
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
			
			const form_data = this.tempForm.value;    
			
			this.updateTemporary(this.id,form_data).subscribe(		  
				response => {           		
							
				  this.successMsg='Data Updated';   	  			
			  		this.toastr.success(this.successMsg, 'Success');	
				  
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
  
  onUpdate()
  {
		if (this.studentForm.invalid)
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
			
			const form_data = this.studentForm.value;    
			
			this.updateStudent(this.id,form_data).subscribe(		  
				response => {   					
				  this.successMsg='Details Updated'; 
			  		this.toastr.success(this.successMsg, 'Success');	
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
  
  getData(id:any) {   
	if(this.userMembership=='annual')
	{  	
		this.http.get('https://danshopapi.devworktdmc.com/common_membership/edit/'+id).subscribe((response) => {
		  this.data = response; 
		  this.info_title=(this.data.length >0)?this.data[0].title1:'';  
		  this.first_name=(this.data.length >0)?this.data[0].fname1:'';  
		  this.sur_name=(this.data.length >0)?this.data[0].sname1:'';       
		  this.info_dob=(this.data.length >0)?this.formatDate(this.data[0].dob1):'';  	
		  this.info_passport=(this.data.length >0)?this.data[0].passport1:'';   
		  this.info_address1=(this.data.length >0)?this.data[0].address1:'';     	
		  this.info_address2=(this.data.length >0)?this.data[0].address2:'';   
		  this.info_city=(this.data.length >0)?this.data[0].city1:'';  	
		  this.info_province=(this.data.length >0)?this.data[0].province1:'';   
		  this.post_code=(this.data.length >0)?this.data[0].postcode1:'';    
		  this.info_country=(this.data.length >0)?this.data[0].country1:'';     
		  this.tel_home=(this.data.length >0)?this.data[0].telephone1:'';     
		  this.tel_work=(this.data.length >0)?this.data[0].telephone2:'';     
		  this.cell_phone=(this.data.length >0)?this.data[0].cellphone1:'';          
		  this.info_email=(this.data.length >0)?this.data[0].email1:'';  
		  this.medical_aid=(this.data.length >0)?this.data[0].medical_aid:'';  			
		  this.medical_no=(this.data.length >0)?this.data[0].medical_aid_no:'';  	
		  this.medical_aid_dep=(this.data.length >0)?this.data[0].aid_dependent:''; 
		  this.fax=(this.data.length >0)?this.data[0].fax:''; 
		  this.tab_id='personal_info';	  
		});
		
	}
	else if(this.userMembership=='temporary')    
	{
		  this.http.get('https://danshopapi.devworktdmc.com/common_membership/edit/'+id).subscribe((response) => {
		  this.data = response;       
		  this.info_title=(this.data.length >0)?this.data[0].title1:'';  		
		  this.f_name=(this.data.length >0)?this.data[0].fname1:'';      
		  this.s_name=(this.data.length >0)?this.data[0].sname1:'';  
		  this.info_dob=(this.data.length >0)?this.formatDate(this.data[0].dob1):'';  
		  this.info_passport=(this.data.length >0)?this.data[0].passport1:'';    	
		  this.info_address1=(this.data.length >0)?this.data[0].address1:'';    
		  this.info_address2=(this.data.length >0)?this.data[0].address2:'';    
		  this.info_city=(this.data.length >0)?this.data[0].city1:'';     
		  this.info_province=(this.data.length >0)?this.data[0].province1:'';   
		  this.post_code=(this.data.length >0)?this.data[0].postcode1:'';    
		  this.info_country=(this.data.length >0)?this.data[0].country1:'';     
		  this.tel_home=(this.data.length >0)?this.data[0].telephone1:'';    
		  this.tel_work=(this.data.length >0)?this.data[0].telephone2:'';   
		  this.cell_phone=(this.data.length >0)?this.data[0].cellphone1:'';     
		  this.info_email=(this.data.length >0)?this.data[0].email1:''; 
		  this.medical_aid=(this.data.length >0)?this.data[0].medical_aid:''; 
		  this.medical_no=(this.data.length >0)?this.data[0].medical_aid_no:'';      
		  this.fax=(this.data.length >0)?this.data[0].fax:'';          		  		
		  
		});
	}
	else if(this.userMembership=='student')       
	{
		  this.http.get('https://danshopapi.devworktdmc.com/common_membership/edit/'+id).subscribe((response) => {
		  this.data = response;   		   
		  this.info_title=(this.data.length >0)?this.data[0].title1:'';  	  	
		  this.first_name=(this.data.length >0)?this.data[0].fname1:''; 
		  this.last_name=(this.data.length >0)?this.data[0].sname1:''; 
		  this.info_dob=(this.data.length >0)?this.formatDate(this.data[0].dob1):'';    	    
		  this.passport_no=(this.data.length >0)?this.data[0].passport1:''; 
		  this.info_address1=(this.data.length >0)?this.data[0].address1:''; 
		  this.info_address2=(this.data.length >0)?this.data[0].address2:'';     	
		  this.info_city=(this.data.length >0)?this.data[0].city1:'';  
		  this.info_province=(this.data.length >0)?this.data[0].province1:'';   	
		  this.post_code=(this.data.length >0)?this.data[0].postcode1:'';     
		  this.info_country=(this.data.length >0)?this.data[0].country1:'';   	  
		  this.tel_home=(this.data.length >0)?this.data[0].telephone1:'';       
		  this.tel_work=(this.data.length >0)?this.data[0].telephone2:'';    	
		  this.cell_phone=(this.data.length >0)?this.data[0].cellphone1:'';  	
		  this.info_email=(this.data.length >0)?this.data[0].email1:'';    
		  this.fax=(this.data.length >0)?this.data[0].fax:'';     		  
		});
	}
	else
	{
		this.data = []; 
	}
	
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
