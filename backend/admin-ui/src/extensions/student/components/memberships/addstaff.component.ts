import { SharedModule } from '@vendure/admin-ui/core';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms';       	  
import { Router } from '@angular/router';    
import { ActivatedRoute } from '@angular/router';       

@Component({
    selector: 'addstaff',			
    templateUrl: './addstaff.component.html',		  	  								
	styleUrls: ['./addstaff.component.css'],       		        
    standalone: true,
    imports: [SharedModule],		
})
export class AddStaffComponent implements OnInit {   
	  greeting = 'add staff';	 			  
	  id:any; 
	  staffForm:any; 	 
	  form!: FormGroup;    
	  formSubmitted: boolean = false;    	  
	  formError: boolean = false; 	
	  person_name:any; 	  
	  company_name:any; 
	  passport_no:any; 
	  address_1:any; 		
	  address_2:any; 
	  city:any;   
	  province:any; 
	  pincode:any; 
	  country:any; 
	  certification:any;  
	  phonehome:any; 
	  phonework:any;  
	  cellphone:any;	  
	  fax:any;  
	  duty:any;  
	  dob:any;  
	  doctor:any;	
	  doctor_no:any;
      email:any;  
      member_type:any;
	  professional:any;    
	  rejoin:any;
	  medical_aid:any;  
	  medical_no:any;  	
	  start_date:any;    
	  capture_date:any;
	  join_date:any;  
	  update_date:any;   
	  status:any;
	  paid:any; 
	  restriction:any;  
	  grade:any; 
	  history:any; 
	  class_name:any; 							
	  person:any; 	
	  person_no:any;   
	  registration_no:any; 	 
	  main_reason:any;
	  sub_reason:any;	
	  comment:any;     
	  successMsg:any;
	  reasons:any;   
	  sub_reasons:any;	 
      responseData: any;    
	  data: any; 	  
	  private apiUrl = 'https://danshopapi.devworktdmc.com/staff/add'; // Replace this with your API endpoint

	  constructor(private formbulider: FormBuilder,private http: HttpClient,private route: ActivatedRoute,private _router: Router) {
	    this.member_type='COMPANY';   
		this.id = this.route.snapshot.paramMap.get('id');  	      	
		this.getReasons();   				
	  }
	  
	  ngOnInit() {
			this.staffForm = this.formbulider.group({
				 id: ['', [Validators.required]],       
				 person_name: ['', [Validators.required,Validators.minLength(2)]],				
				 company_name: ['', [Validators.required,Validators.minLength(2)]],  		
				 email: ['', [Validators.required,Validators.email]], 
				 passport_no: ['', [Validators.required]],  
				 address_1: ['', [Validators.required]],  
				 city: ['', [Validators.required]], 
				 pincode: ['', [Validators.required]], 	
				 country: ['', [Validators.required]],   
				 cellphone: ['', [Validators.required]],    	   				 
				 member_type: ['', [Validators.required]],    
				 start_date: ['', [Validators.required,Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],   				 
				 join_date: ['', [Validators.required,Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],    	
				 dob: ['', [Validators.required,Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],    	  				 
				 status: ['', [Validators.required]],  				 				 				 				  	
				 main_reason: ['', [Validators.required]], 	 
				 sub_reason: ['', [Validators.required]],  	
				 grade: ['', [Validators.required]],   	 				  	  
				 registration_no: ['', [Validators.required]],     		
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
				 doctor_no:[], 	 				 				 
				 paid:[],     
				 fax:[],		
				 duty:[],						 
				 certification:[],	
				 doctor:[],
				 restriction:[],  
				 history:[],	
				 class_name:[],  
				 person:[],
				 person_no:[],	  				 	
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

  addStaff(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);								
  }

  onSubmit() { 
	    
	if (this.staffForm.invalid)
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
		
		const form_data = this.staffForm.value;  
		
		this.addStaff(form_data).subscribe(	  	
			response => {
			  console.log('Success:', response);  
			  
			  this.staffForm.controls['person_name'].reset();   								  			 		 	
			  this.staffForm.controls['company_name'].reset();      					
			  this.staffForm.controls['passport_no'].reset();    

			  this.staffForm.controls['dob'].reset();   								  			 		 	
			  this.staffForm.controls['address_1'].reset();      					
			  this.staffForm.controls['address_2'].reset(); 	
			  
			  this.staffForm.controls['city'].reset();   								  			 		 	
			  this.staffForm.controls['province'].reset();      					
			  this.staffForm.controls['pincode'].reset();      
			  
			  this.staffForm.controls['country'].reset();   								  			 		 	
			  this.staffForm.controls['phonehome'].reset();      					
			  this.staffForm.controls['phonework'].reset();    

			  this.staffForm.controls['cellphone'].reset();   								  			 		 	
			  this.staffForm.controls['fax'].reset();      					
			  this.staffForm.controls['email'].reset(); 	
			  
			  this.staffForm.controls['certification'].reset();   								  			 		 	
			  this.staffForm.controls['doctor'].reset();      					
			  this.staffForm.controls['doctor_no'].reset();
			  
			  this.staffForm.controls['restriction'].reset();   								  			 		 	
			  this.staffForm.controls['grade'].reset();      					
			  this.staffForm.controls['history'].reset();    

			  this.staffForm.controls['person'].reset();   								  			 		 	
			  this.staffForm.controls['person_no'].reset();      					
			  this.staffForm.controls['class_name'].reset(); 	

			  this.staffForm.controls['registration_no'].reset();   								  			 		 	
			  this.staffForm.controls['member_type'].reset();      					
			  this.staffForm.controls['rejoin'].reset(); 	
			  
			  this.staffForm.controls['professional'].reset();   								  			 		 	
			  this.staffForm.controls['medical_aid'].reset();      					
			  this.staffForm.controls['medical_no'].reset();

			  this.staffForm.controls['start_date'].reset();   								  			 		 	
			  this.staffForm.controls['capture_date'].reset();      					
			  this.staffForm.controls['join_date'].reset();    

			  this.staffForm.controls['update_date'].reset();   								  			 		 	
			  this.staffForm.controls['status'].reset();      					
			  this.staffForm.controls['paid'].reset(); 		
			  this.staffForm.controls['duty'].reset(); 	  
			  
			  this.staffForm.controls['main_reason'].reset();   								  			 		 	
			  this.staffForm.controls['sub_reason'].reset();      					
			  this.staffForm.controls['comment'].reset();         
			  
			  this.successMsg='Staff Added';	  			  	       
			  
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