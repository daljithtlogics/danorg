import { SharedModule } from '@vendure/admin-ui/core';		
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms';       	
import {NgForm} from '@angular/forms';    

@Component({
    selector: 'addcompanymembership',			
    templateUrl: './addschoolmembership.component.html',			  								
	styleUrls: ['./addschoolmembership.component.css'],               
    standalone: true,
    imports: [SharedModule],		
})
export class AddSchoolMembershipComponent implements OnInit {   
	  greeting = 'add school';	 	  
	  id:any; 
	  schForm:any; 	 
	  form!: FormGroup;    
	  formSubmitted: boolean = false;    	  
	  formError: boolean = false; 	
	  school_name:any; 	  	  
	  instructor_name:any; 
	  address_1:any; 		
	  web_address:any; 
	  city:any;   
	  company_registration:any; 
	  pincode:any; 
	  country:any; 
	  province:any; 
	  phonework:any;  
	  cellphone:any;	  
	  fax:any;  
      school_email:any;  
      registration_no:any;  	    
	  diver_class:any;
	  address_2:any;  
	  medical_aid:any;  
	  medical_no:any;  		  
	  status:any;		 	  		 	  
	  main_reason:any;
	  sub_reason:any;	
	  comment:any;     
	  successMsg:any;
	  reasons:any;   
	  sub_reasons:any;	     
	  data: any; 
	  private apiUrl = 'https://danshopapi.devworktdmc.com/school/add'; // Replace this with your API endpoint

	  constructor(private formbulider: FormBuilder,private http: HttpClient) {  	      		  
		this.getReasons();   									
	  }
	  
	  ngOnInit() {
			this.schForm = this.formbulider.group({
				 school_name: ['', [Validators.required,Validators.minLength(2)]],  						 
				 school_email: ['', [Validators.required,Validators.email]], 
				 instructor_name: ['', [Validators.required]],  
				 address_1: ['', [Validators.required]],  
				 city: ['', [Validators.required]], 
				 pincode: ['', [Validators.required]], 	
				 country: ['', [Validators.required]],   
				 cellphone: ['', [Validators.required]],    	   				 
				 registration_no: ['', [Validators.required]],     						  
				 status: ['', [Validators.required]], 								
				 main_reason: ['', [Validators.required]], 	 
				 sub_reason: ['', [Validators.required]],  
				 company_registration:[], 	
				 web_address:[], 
				 diver_class:[], 	  
				 province:[],   	
				 phonework:[],				    
				 medical_aid:[], 
				 medical_no:[], 	
				 address_2:[],   	  	
				 comment:[],   		 				 			 					 
				 fax:[],									   
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
	  
	  handleClick(tabName) {
       // console.log('New title'+tabName);  
		 var i, tabcontent, tablinks;
         tabcontent = document.getElementsByClassName("tabcontent");
		 tablinks = document.getElementsByClassName("tablinks");  
		 
		  for (i = 0; i < tabcontent.length; i++) 
		  {
		  
				if(tabcontent[i].id==tabName)
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
				if(tabcontent[i].id==tabName)
				{
					tablinks[i].className += " active";			
				}
				else
				{
					tablinks[i].className = tablinks[i].className.replace("active","");				
				}
			
		  }    
		
      }  	 

  formDataError: any = {
    msg: '',
    error_field: ''
  };  

  addSchool(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);						
  }
  
  counter(i: number) {
    return new Array(i);				
  }

  onSubmit(f: NgForm) { 
  
	if (this.schForm.invalid)
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
		
		const form_data = this.schForm.value;   				
		
		this.addSchool(form_data).subscribe(	  	
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