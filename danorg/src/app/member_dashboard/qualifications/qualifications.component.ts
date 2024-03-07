import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';  
import { Router } from '@angular/router';    
import { FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms';      
import { ToastrService } from "ngx-toastr";  


@Component({
  selector: 'qualifications-dashboard',
  templateUrl: './qualifications.component.html',
  styleUrls: ['./qualifications.component.css']
})
  
export class QualificationsMember implements OnInit{
  
  userId: number | null = null;
  userEmail: string | null = null;
  userMembership: string | null = null;
  userAccess: string | null = null;   
  authToken: string | null = null;
  userRenew: string | null = null;     

  qualifyForm:any;   
  form!: FormGroup;
  formSubmitted: boolean = false;    	
  formError: boolean = false; 
  row_id:any;  	     
  successMsg:any;        
  courses:any;
  qualifications:any;		
  data: any; 
  private apiUrl = 'https://danshopapi.devworktdmc.com/trainer/add';     		  
  
  constructor(private authService: AuthenticationService,private formbulider: FormBuilder,private http: HttpClient,private router: Router, private toastr: ToastrService) {
	this.userId = this.authService.getUserId();  	
    this.row_id = this.authService.getUserId();  	  	
	this.getCourses(this.userId);     
	this.getQualify(this.userId);     	
  }

  ngOnInit(): void {
    // Retrieve values from AuthenticationService
    this.userId = this.authService.getUserId();
    this.userEmail = this.authService.getUserEmail();
    this.userMembership = this.authService.getUserMembership();
    this.authToken = this.authService.getAuthToken();
	this.userAccess = this.authService.getUserAccess();  
	this.userRenew = this.authService.getUserRenew();     	    		
	
	if ((this.router.url == '/qualifications') && (this.userAccess !='paid') || (this.userRenew ==='renew'))      
	{
		this.router.navigate(['dashboard']);                                                       			  		                    	  		  
	}	
	
	this.qualifyForm = this.formbulider.group({
	  course_id: ['', [Validators.required]],   
	  row_id:['', [Validators.required]],     	 			
	});  
	
  }  

  formDataError: any = {
    msg: '',
    error_field: ''  
  };  
  
  addTrainer(data:any): Observable<any> {
	return this.http.post<any>(this.apiUrl,data);	      		    							
  }  

  onSave() {      

	if (this.qualifyForm.invalid)  
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
		const form_data = this.qualifyForm.value;   
		
		this.addTrainer(form_data).subscribe(		  
			response => {
			  console.log('Success:', response);  			  
			  this.getCourses(this.userId);         
			  this.getQualify(this.userId);    	     	
			  this.successMsg='Trainer added successfully';   	
			  this.qualifyForm.controls['course_id'].reset();  
			  this.toastr.success(this.successMsg,'Success');	  		
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
		  return true;       
	  }	 	  
  }  

  getCourses(id:any)  
  {
	  this.http.get('https://danshopapi.devworktdmc.com/annual/courses/'+id).subscribe((response) => {
		   this.courses = response;      			          				   
	  });   
  }
  
  getQualify(id:any)  
  {
	  this.http.get('https://danshopapi.devworktdmc.com/annual/qualifications/'+id).subscribe((response) => {
		    this.qualifications = response;       		
	  });   
  }

}
