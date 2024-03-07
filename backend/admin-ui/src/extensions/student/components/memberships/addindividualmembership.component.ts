import { SharedModule } from '@vendure/admin-ui/core';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms';       	
import {NgForm} from '@angular/forms';    

@Component({
    selector: 'addindividual',			
    templateUrl: './addindividualmembership.component.html',						  								
	styleUrls: ['./addindividualmembership.component.css'],         		            
    standalone: true,
    imports: [SharedModule],		
})
export class AddIndividualMembershipComponent implements OnInit {   
	  greeting = 'add individual';	 					  
	  id:any; 
	  broker_id:any; 
	  indvForm:any; 	 
	  form!: FormGroup;    
	  formSubmitted: boolean = false;    	  			
	  formError: boolean = false; 	
	  infoTitle:any; 	  
	  firstName:any; 
	  surName:any; 
	  kinTelHome:any;  
	  kinTelWork:any; 
	  member_no:any;   
	  infoAddress1:any; 	
	  infoAddress2:any;   	  
	  infoCity:any; 
	  infoPassport:any;			
	  address_2:any; 
	  city:any;   
	  infoProvince:any; 
	  postCode:any; 
	  infoCountry:any; 
	  telHome:any; 
	  telWork:any;  
	  cellPhone:any;	  
	  fax:any;
	  doctor_name:any; 	
	  doctor_phone:any;   
      infoEmail:any;  
      member_type:any;
	  professional:any;    
	  rejoin:any;
	  medical_aid:any;  
	  medical_no:any;  	
	  infoDob:any; 
	  start_date:any;  	
	  capture_date:any;
	  join_date:any;  
	  update_date:any;  
	  status:any;
	  paid:any; 
	  debt:any;  
	  alert_action:any;  
	  researcher:any; 
	  certification:any; 
	  restriction:any;  
	  class_name:any; 
	  history:any;   
	  kinTitle:any; 
	  relation:any;  
	  kinFirstName:any; 
	  kinCellPhone:any;  
	  kinEmail:any; 
	  kinPassport:any; 
	  kinSurName:any;  
	  kinCity:any; 
	  kinProvince:any; 
	  kinPostCode:any; 
	  kinCountry:any; 
	  kinAddress1:any;  
	  kinAddress2:any;  
	  kinDob:any;  
	  registration_no:any; 	
	  emergency_contact:any; 
	  emergency_phone:any; 
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
	  brokers:any; 	
	  sub_reasons:any;	 
      responseData: any;     					   
	  staffs:any; 
	  data: any; 	  
	  private apiUrl = 'https://danshopapi.devworktdmc.com/individual/add'; // Replace this with your API endpoint

	  constructor(private formbulider: FormBuilder,private http: HttpClient) {
	    this.member_type='COMMERCIAL INDIVIDUAL';     			     		    
		this.getReasons();        
	  }
	  
	  ngOnInit() {
			this.getBroker();    
			this.indvForm = this.formbulider.group({ 				 		
				 firstName: ['', [Validators.required,Validators.minLength(2)]],  
				 infoEmail: ['', [Validators.required,Validators.email]], 	
				 kinEmail: ['', [Validators.required,Validators.email]], 	  	
				 infoAddress1: ['', [Validators.required]],  
				 infoCity: ['', [Validators.required]],  				 
				 postCode: ['', [Validators.required]], 	
				 infoCountry: ['', [Validators.required]],   
				 cellPhone: ['', [Validators.required]],    	   				 
				 member_type: ['', [Validators.required]],    
				 infoDob: ['', [Validators.required,Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],   
				 start_date: ['', [Validators.required,Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],    
				 expire_date: ['', [Validators.required,Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],  
				 join_date: ['', [Validators.required,Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],   
				 kinDob: ['', [Validators.required,Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],  	
				 kinCountry: ['', [Validators.required]],     
				 pay_method: ['', [Validators.required]],    
				 member_no: ['', [Validators.required]],    
				 status: ['', [Validators.required]], 
				 institute: ['', [Validators.required]],   	
				 branch: ['', [Validators.required]],  
				 relation: ['', [Validators.required]],  			  		
				 account_type: ['', [Validators.required]], 
				 account_no: ['', [Validators.required]],   	
				 main_reason: ['', [Validators.required]], 	 
				 sub_reason: ['', [Validators.required]],  	
				 broker_id: ['', [Validators.required]],  	
				 kinFirstName: ['', [Validators.required]],    
				 kinCellPhone: ['', [Validators.required]], 
				 infoPassport:['', [Validators.required]],   
				 registration_no:['', [Validators.required]],  	
				 kinPassport:['', [Validators.required]],  
				 kinAddress1:['', [Validators.required]], 	
				 kinCity:['', [Validators.required]], 	  
				 kinPostCode:['', [Validators.required]], 	   
				 infoTitle:[],  
				 telHome:[],   	
				 telWork:[],   
				 surName:[], 
				 kinTelHome:[],  
				 kinTelWork:[],  				 	 
				 infoAddress2:[],
				 infoProvince:[],  				 
				 professional:[],   
				 medical_aid:[], 
				 medical_no:[], 
				 capture_date:[], 
				 update_date:[],   				 	
				 rejoin:[], 
				 pay_period:[],
				 account_holder:[],  	
				 paid:[],     
				 fax:[],
				 debt:[],
				 alert_action:[],  	
				 doctor_name:[],
				 doctor_phone:[], 	
				 researcher:[],  
				 certification:[],  
				 restriction:[],   
				 history:[],  
				 class_name:[],
				 kinTitle:[],
				 kinSurName:[],  					 
				 kinProvince:[],  				 			  
				 kinAddress2:[], 				   			 				 
				 emergency_contact:[], 	  		
				 emergency_phone:[], 	       
				 auth_sign:[],  	
				 branch_code:[],    
				 comment:[],    
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

  addIndividual(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);						
  }
  
  counter(i: number) {
    return new Array(i);				
  }

  onSubmit(f: NgForm) { 
  
	if (this.indvForm.invalid)
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
		
		const form_data = this.indvForm.value;   				
		
		this.addIndividual(form_data).subscribe(	  	
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
  
  getBroker() {   
    this.http.get('https://danshopapi.devworktdmc.com/partner/get').subscribe((response) => {
      this.brokers = response;        
    });
  }
				
}	