import { SharedModule } from '@vendure/admin-ui/core';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms';       	
import { ActivatedRoute } from '@angular/router';       

@Component({
    selector: 'editcompanymembership',			
    templateUrl: './editschoolmembership.component.html',			  								
	styleUrls: ['./editschoolmembership.component.css'],               
    standalone: true,
    imports: [SharedModule],		
})
export class EditSchoolMembershipComponent implements OnInit {   
	  greeting = 'edit school';	 	  		
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
	  students:any;						
	  sub_reasons:any; 	  
	  comments: any;    	
	  data: any; 	  
	  private apiUrl = 'https://danshopapi.devworktdmc.com/school/update'; // Replace this with your API endpoint

	  constructor(private formbulider: FormBuilder,private http: HttpClient,private route: ActivatedRoute) {  
		this.id = this.route.snapshot.paramMap.get('id');     
		this.getReasons();            
	  }
	  
	  ngOnInit() {
			this.getData(this.id);     
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
					this.loadData(tabName);     
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
  
  updateSchool(id:any,data:any): Observable<any> {
    return this.http.post<any>(this.apiUrl+'/'+id,data);					    		    							
  } 
  
  counter(i: number) {
    return new Array(i);				
  }

  onSubmit() { 
  
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
		
		this.updateSchool(this.id,form_data).subscribe(	  
			response => {
			  console.log('Success:', response);     
			  this.successMsg='Data Updated';   
			  this.schForm.controls['main_reason'].reset();   	  	     		  		 	
			  this.schForm.controls['sub_reason'].reset();      		
			  this.schForm.controls['comment'].reset();   
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
  
  getData(id) { 
	  this.http.get('https://danshopapi.devworktdmc.com/school/edit/'+id).subscribe((response) => {
      this.data = response;   	  
	  this.school_name=(this.data.length >0)?this.data[0].company_name:'';       	  			
	  this.school_email=(this.data.length >0)?this.data[0].email1:'';     
	  this.instructor_name=(this.data.length >0)?this.data[0].contact_person:'';       	
	  this.web_address=(this.data.length >0)?this.data[0].address3:'';  
	  this.company_registration=(this.data.length >0)?this.data[0].account_no:'';       	  			
	  this.registration_no=(this.data.length >0)?this.data[0].registration_no:'';   
	  this.diver_class=(this.data.length >0)?this.data[0].class_name:'';       	  			
	  this.medical_aid=(this.data.length >0)?this.data[0].medical_aid:'';    	
	  this.medical_no=(this.data.length >0)?this.data[0].medical_aid_no:'';   	  
	  this.address_1=(this.data.length >0)?this.data[0].address1:'';       	  			
	  this.address_2=(this.data.length >0)?this.data[0].address2:'';   
	  this.city=(this.data.length >0)?this.data[0].city1:'';       	  			
	  this.province=(this.data.length >0)?this.data[0].province1:'';  
	  this.pincode=(this.data.length >0)?this.data[0].postcode1:'';       	  			
	  this.country=(this.data.length >0)?this.data[0].country1:'';    
	  this.phonework=(this.data.length >0)?this.data[0].telephone2:'';       	  			
	  this.cellphone=(this.data.length >0)?this.data[0].cellphone1:'';   
	  this.fax=(this.data.length >0)?this.data[0].fax:'';       	  			
	  this.status=(this.data.length >0)?this.data[0].status1:'';     	
	  
    });
  } 
  
  getReasons(){
	this.http.get('https://danshopapi.devworktdmc.com/annual/reasons').subscribe((response) => {
      this.reasons = response;                   		               					
    });
  }    
  
  getComment(id)    
  {
	  this.http.get('https://danshopapi.devworktdmc.com/school/comments/'+id).subscribe((response) => {
		 this.comments = response;   			
	  });   
  }	
  
  getScholar(id)
  {
	  this.http.get('https://danshopapi.devworktdmc.com/school/students/'+id).subscribe((response) => {
		    this.students = response;    					   				   
	  });   
  }
  
  loadData(tab) { 	  
	
	if(tab=="student")
	{
		this.getScholar(this.id);  		
	}	
	
	if(tab=="note")
	{
		this.getComment(this.id);  	  	  		
	}		
	
  }	
				
}	