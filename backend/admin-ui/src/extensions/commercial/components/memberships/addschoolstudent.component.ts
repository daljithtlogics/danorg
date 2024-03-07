import { SharedModule } from '@vendure/admin-ui/core';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms';       	
import { ActivatedRoute } from '@angular/router';       

@Component({
    selector: 'addscholar',			
    templateUrl: './addschoolstudent.component.html',			  								
	styleUrls: ['./addschoolstudent.component.css'],               
    standalone: true,
    imports: [SharedModule],				
})
export class AddSchoolStudentComponent implements OnInit {   
	  greeting = 'add school student';	 	  		
	  id:any; 
	  row_id:any;   
	  studForm:any; 	 
	  form!: FormGroup;    
	  formSubmitted: boolean = false;    	  
	  formError: boolean = false; 	
	  medical_aid:any;  
	  medical_no:any;  	
	  start_date:any; 
	  end_date:any;
	  student_title:any;  	
	  student_name:any; 	  	  
	  surname:any; 
	  dob:any;  
	  address_1:any; 			  
	  city:any;   
	  id_number:any; 
	  pincode:any; 
	  country:any; 
	  province:any;  	  	  	  
	  paid:any;   
      student_email:any;        		 	  
	  address_2:any;       	  	 	  		 	  
	  main_reason:any;
	  sub_reason:any;	
	  comment:any;     
	  successMsg:any;
	  reasons:any;  	  					
	  sub_reasons:any;
	  comments: any;  	  
	  data: any; 	  
	  private apiUrl = 'https://danshopapi.devworktdmc.com/school/student_register'; // Replace this with your API endpoint

	  constructor(private formbulider: FormBuilder,private http: HttpClient,private route: ActivatedRoute) {  
		this.id = this.route.snapshot.paramMap.get('id');  
		this.row_id = this.route.snapshot.paramMap.get('id');  	    	
		this.getReasons();            
	  }
	  
	  ngOnInit() {
			
			this.studForm = this.formbulider.group({
				 student_name: ['', [Validators.required,Validators.minLength(2)]],  										 
				 student_email: ['', [Validators.required,Validators.email]],   			
				 dob: ['', [Validators.required,Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],   
				 start_date: ['', [Validators.required,Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],   				 								 	
				 address_1: ['', [Validators.required]],  					
				 city: ['', [Validators.required]], 
				 pincode: ['', [Validators.required]], 			
				 country: ['', [Validators.required]],   				   				 				   								  				 					
				 main_reason: ['', [Validators.required]], 	 							
				 sub_reason: ['', [Validators.required]],  				
				 student_title:[],		
				 id_number:[], 					 				 
				 province:[],   					 		    
				 medical_aid:[], 
				 medical_no:[], 	
				 address_2:[],   	  	
				 comment:[],   		 				 			 					  				 
				 paid:[],
				 surname:[],
				 end_date: [],  	    
				 row_id:[], 	
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
  
  addStudent(data:any): Observable<any> {
    return this.http.post<any>(this.apiUrl,data);					    		    							
  } 
  
  counter(i: number) {
    return new Array(i);				
  }

  onSubmit() { 
  
	if (this.studForm.invalid)
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
		
		const form_data = this.studForm.value;   				
		
		this.addStudent(form_data).subscribe(	  
			response => {
			  console.log('Success:', response);     
			  this.successMsg='Data Added';   
			  this.studForm.controls['main_reason'].reset();   	  	     		  		 	
			  this.studForm.controls['sub_reason'].reset();      		
			  this.studForm.controls['comment'].reset();   
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