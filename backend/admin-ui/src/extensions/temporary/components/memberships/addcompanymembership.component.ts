import { SharedModule } from '@vendure/admin-ui/core';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms';       	
import {NgForm} from '@angular/forms';    

@Component({
    selector: 'addcompanymembership',			
    templateUrl: './addcompanymembership.component.html',			  								
	styleUrls: ['./addtemporarymemberships.component.css'],             
    standalone: true,
    imports: [SharedModule],		
})
export class AddCompanyMembershipComponent implements OnInit {   
	  greeting = 'add company';	 	  
	  id:any; 
	  compForm:any; 	 
	  form!: FormGroup;    
	  formSubmitted: boolean = false;    	  
	  formError: boolean = false; 	
	  person_name:any; 	  
	  company_name:any; 
	  registration_no:any; 
	  address_1:any; 		
	  address_2:any; 
	  city:any;   
	  province:any; 
	  pincode:any; 
	  country:any; 
	  phonehome:any; 
	  phonework:any;  
	  cellphone:any;	  
	  fax:any;  
      company_email:any;  
      member_type:any;
	  professional:any;    
	  rejoin:any;
	  slot_no:any;  
	  medical_aid:any;  
	  medical_no:any;  	
	  start_date:any;    
	  capture_date:any;
	  join_date:any;  
	  update_date:any;  
	  status:any;
	  paid:any; 
	  debt:any;  
	  auth_sign:any;  
	  pay_method:any;  	
	  pay_period:any;  
	  account_holder:any;  
	  institute:any; 
	  branch:any;  	
	  branch_code:any;
	  account_type:any;  
	  account_no:any;
	  expire_date:any;  			 	  
	  main_reason:any;
	  sub_reason:any;	
	  comment:any;     
	  successMsg:any;
	  reasons:any;   
	  sub_reasons:any;	 
      responseData: any;     					   
	  staffs:any; 
	  data: any; 	  
	  private apiUrl = 'https://danshopapi.devworktdmc.com/company/add'; // Replace this with your API endpoint

	  constructor(private formbulider: FormBuilder,private http: HttpClient) {
	    this.member_type='COMPANY';    		  
		this.getReasons();        
	  }
	  
	  ngOnInit() {
			this.compForm = this.formbulider.group({
				 person_name: ['', [Validators.required,Validators.minLength(2)]],
				 company_name: ['', [Validators.required,Validators.minLength(2)]],  
				 company_email: ['', [Validators.required,Validators.email]], 
				 registration_no: ['', [Validators.required]],  
				 address_1: ['', [Validators.required]],  
				 city: ['', [Validators.required]], 
				 pincode: ['', [Validators.required]], 	
				 country: ['', [Validators.required]],   
				 cellphone: ['', [Validators.required]],    	   				 
				 member_type: ['', [Validators.required]],    
				 start_date: ['', [Validators.required,Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],   
				 expire_date: ['', [Validators.required,Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],  
				 join_date: ['', [Validators.required,Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],    	
				 pay_method: ['', [Validators.required]],    
				 status: ['', [Validators.required]], 
				 institute: ['', [Validators.required]],   	
				 branch: ['', [Validators.required]],  
				 account_type: ['', [Validators.required]], 
				 account_no: ['', [Validators.required]],   	
				 main_reason: ['', [Validators.required]], 	 
				 sub_reason: ['', [Validators.required]],  						
				 comment:[],   			
				 address_2:[],
				 province:[], 
				 phonehome:[],   	
				 phonework:[],
				 professional:[],   
				 medical_aid:[], 
				 medical_no:[], 
				 capture_date:[], 
				 update_date:[],   				 	
				 rejoin:[], 
				 slot_no:[],   
				 pay_period:[],
				 account_holder:[],  	
				 paid:[],     
				 fax:[],
				 debt:[],  
				 auth_sign:[],  	
				 branch_code:[],    
			});   	
	  }
	  
	  onChange(event: any) {
		const opt_id = event.currentTarget.options[event.currentTarget.options.selectedIndex].value;  			

		if(opt_id !='')
		{ 			
			this.http.get('https://danshopapi.devworktdmc.com/annual/subreasons/'+opt_id).subscribe((response) => {
			  this.sub_reasons = response;  	  				                   		               					
			});	
		}
		else
		{
			this.sub_reasons = [];   
		} 			
		
	  }
	  
	  handleClick(cityName) {
       // console.log('New title'+cityName);  
		 var i, tabcontent, tablinks;
         tabcontent = document.getElementsByClassName("tabcontent");
		 tablinks = document.getElementsByClassName("tablinks");  
		 
		  for (i = 0; i < tabcontent.length; i++) 
		  {
		  
				if(tabcontent[i].id==cityName)
				{
					tabcontent[i].style.display = "block";   
					tabcontent[i].className = tabcontent[i].className.replace("fade","active");  
				}	
				else		
				{
					tabcontent[i].style.display = "none";
					tabcontent[i].className = tabcontent[i].className.replace("active","fade");      
				}
			
		  }
  
  
		  for (i = 0; i < tablinks.length; i++) 
		  {
				if(tabcontent[i].id==cityName)
				{
					tablinks[i].className += " active";			
				}
				else
				{
					tablinks[i].className = tablinks[i].className.replace("active","");				
				}
			
		  }
		  
 // document.getElementById(cityName).style.display = "block";	
 
 // evt.currentTarget.className += " active";
		
      }  	 

  formDataError: any = {
    msg: '',
    error_field: ''
  };  

  addCompany(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);						
  }
  
  counter(i: number) {
    return new Array(i);				
  }

  onSubmit(f: NgForm) { 
  
	if (this.compForm.invalid)
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
		
		const form_data = this.compForm.value;   				
		
		this.addCompany(form_data).subscribe(	  	
			response => {
			  console.log('Success:', response);     
			  this.successMsg='Data Added';
			  f.resetForm();   
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
	 }  	  
  }  
  
  getReasons(){
	this.http.get('https://danshopapi.devworktdmc.com/annual/reasons').subscribe((response) => {
      this.reasons = response;                   		               					
    });
  }    
				
}	