import { Component, OnInit } from '@angular/core';  
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'; 
import { FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms';   
import { Router } from '@angular/router';     
import { AuthenticationService } from '../../authentication.service';   
import { ToastrService } from "ngx-toastr";    

@Component({
  selector: 'membership-dashboard',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.css']
})

export class MembershipInfo implements OnInit {  
  id: any;      
  userId: number | null = null;
  userEmail: string | null = null;
  userMembership: string | null = null;
  authToken: string | null = null;
  userAccess: string | null = null;  
  userRenew: string | null = null;     
  
  anualForm:any; 
  form!: FormGroup;
  formSubmitted: boolean = false;    	
  formError: boolean = false; 	  
  tab_id:any; 
  broker:any; 
  agency:any;    
  member_type:any;   
  member_level:any;
  work_diver:any;
  qualification:any; 
  start_date:any;
  join_date:any;			
  successMsg:any;    
  data: any; 	
  
  tempForm:any;
  temp_session_id:any;
  temp_dive_loc:any;  
  temp_agency:any;  	
  temp_spear_dive:any;  	
  temp_recr_dive:any;  	
  temp_qualification:any;  	
  temp_start_date:any;  	
  temp_end_date:any;  	

  studentForm:any;
  stud_session_id:any;
  stud_instructor:any;
  stud_start_date:any;
  stud_aid:any;
  stud_aid_no:any;
  users: any = [];	   	


  private apiUrl = 'https://danshopapi.devworktdmc.com/annual_frontend/update'; 
  
  constructor(private authService: AuthenticationService,private formbulider: FormBuilder,private http: HttpClient,private router: Router,private toastr: ToastrService) { 	
	this.id = this.authService.getUserId();    
	this.temp_session_id = this.authService.getUserId();    
	this.stud_session_id = this.authService.getUserId();    
	this.getProfiles();     
  }

  ngOnInit(): void {
    // Retrieve values from AuthenticationService
    this.userId = this.authService.getUserId();
    this.userEmail = this.authService.getUserEmail();
    this.userMembership = this.authService.getUserMembership();
    this.authToken = this.authService.getAuthToken();
	this.userAccess = this.authService.getUserAccess(); 
	this.userRenew = this.authService.getUserRenew();     	    		   
	
	if ((this.router.url == '/membership-info') && (this.userAccess !='paid') || (this.userRenew ==='renew'))      
	{
		this.router.navigate(['dashboard']);     	    	                     			  		                    	  		  
	}   
	
	this.getData(this.id);    
	
	this.anualForm = this.formbulider.group({ 	  
	    tab_id:[],  
		member_type:[],
		member_level:[], 
		broker:[],
		agency:[],  
		work_diver:[], 
		qualification:[],   
		start_date:[],
		join_date:[],			
	});   	

	// temporary data
	this.getTemporaryData(this.temp_session_id);    
	this.tempForm = this.formbulider.group({  		
		temp_dive_loc: ['', [Validators.required]], 
		temp_agency: ['', [Validators.required]], 
		temp_spear_dive:[],
		temp_recr_dive:[],  	
		temp_qualification: ['', [Validators.required]],  		    
		temp_start_date: ['', [Validators.required]],   
	}); 
	
	//student data
	this.getStudentData(this.stud_session_id);    
	this.studentForm = this.formbulider.group({  		
		stud_instructor: ['', [Validators.required]], 
		stud_start_date: ['', [Validators.required]], 	
		stud_aid: ['', [Validators.required]],  		    
		stud_aid_no: ['', [Validators.required]]
	}); 
  }
  
  formDataError: any = {
    msg: '',
    error_field: ''
  };    

  updateAnnual(id:any,data:any): Observable<any> {
    return this.http.post<any>(this.apiUrl+'/'+id,data);	  				    		    							
  }  
  
  onSubmit() {  
	if(this.userMembership === 'annual'){	
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
			//   this.successMsg='Details Updated';  
			  const successMessage = response['message'];
			  this.toastr.success(successMessage, 'Success');	
			},	
			error => { 			  
			  this.formDataError.msg=error.error.error;
			  this.formDataError.error_field=error.error.error_field;			 			  
			  console.log(error.error.error);
			  console.log(error.error.error_field);		
			}
		);	  
	}
	}

	if(this.userMembership === 'temporary'){	  		   				
		this.formError = false;   
		this.formSubmitted = false;     
		this.formDataError.msg='';
		this.formDataError.error_field='';						
		
		const form_data = this.tempForm.value;    
		
		this.updateTemporary(this.temp_session_id,form_data).subscribe(		  
			(response) => {           					
				const successMessage = response['message'];
				this.toastr.success(successMessage, 'Success');	
			},	
			(error) => {
			  
			  this.formDataError.msg=error.error.error;
			  this.formDataError.error_field=error.error.error_field;			

			  console.log(error.error.error);
			  console.log(error.error.error_field);		
					  
			}
		);	
	}

	if(this.userMembership === 'student'){	  		   				
		this.formError = false;   
		this.formSubmitted = false;     
		this.formDataError.msg='';
		this.formDataError.error_field='';						
		
		const form_data = this.studentForm.value;    
		
		this.updateStudent(this.stud_session_id,form_data).subscribe(		  
			(response) => {           					
				const successMessage = response['message'];
				this.toastr.success(successMessage, 'Success');	
			},	
			(error) => {
			  
			  this.formDataError.msg=error.error.error;
			  this.formDataError.error_field=error.error.error_field;			

			  console.log(error.error.error);
			  console.log(error.error.error_field);		
					  
			}
		);	
	}
        
	return true;      
  }	
  
  getData(id:any) {   
    this.http.get('https://danshopapi.devworktdmc.com/common_membership/edit/'+id).subscribe((response) => {
      this.data = response;  
	  this.member_type=(this.data.length >0)?this.data[0].membertype:'';   
	  this.member_level=(this.data.length >0)?this.data[0].package_name:'';  
	  this.broker=(this.data.length >0)?this.data[0].broker_id:'';    
	  this.agency=(this.data.length >0)?this.data[0].agency:'';    	
	  this.work_diver=(this.data.length >0)?this.data[0].work_diver:'';  
	  this.qualification=(this.data.length >0)?this.data[0].qualification:'';  
	  this.start_date=(this.data.length >0)?this.formatDate(this.data[0].startdate):'';	  	  
	  this.join_date=(this.data.length >0)?this.formatDate(this.data[0].joindate):'';		
	  this.tab_id='membership_info';	    
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

  updateTemporary(temp_session_id:any,data:any): Observable<any> {
    return this.http.post<any>('https://danshopapi.devworktdmc.com/common_membership/update_temp_membership/'+temp_session_id,data);					    		    							
  }  

  getTemporaryData(temp_session_id:any) { 
	this.http.get('https://danshopapi.devworktdmc.com/common_membership/edit/'+temp_session_id).subscribe((response) => {
		this.data = response;   
			
		this.temp_dive_loc=(this.data.length >0)?this.data[0].dive_location:'';    			
		this.temp_agency=(this.data.length >0)?this.data[0].agency:'';    
		this.temp_spear_dive=(this.data.length >0)?this.data[0].spear_diver:'';    
		this.temp_recr_dive=(this.data.length >0)?this.data[0].creational:'';      
		this.temp_qualification=(this.data.length >0)?this.data[0].qualification:'';   		
		this.temp_start_date=(this.data.length >0)?this.formatDate(this.data[0].startdate):'';           
  	});
  } 
  
  
  updateStudent(stud_session_id:any,data:any): Observable<any> {
    return this.http.post<any>('https://danshopapi.devworktdmc.com/common_membership/update_student_membership/'+stud_session_id,data);					    		    							
  }  

  getStudentData(stud_session_id:any) { 
	this.http.get('https://danshopapi.devworktdmc.com/common_membership/edit/'+stud_session_id).subscribe((response) => {
		this.data = response;   
			
		this.stud_instructor=(this.data.length >0)?this.data[0].instructor_id:'';    			
		this.stud_start_date=(this.data.length >0)?this.formatDate(this.data[0].startdate):'';    
		this.stud_aid=(this.data.length >0)?this.data[0].medical_aid:'';    
		this.stud_aid_no=(this.data.length >0)?this.data[0].medical_aid_no:'';         
  	});
  } 


  getProfiles() {
    this.http.get('https://danshopapi.devworktdmc.com/common_membership/fetch_all').subscribe((response) => {
      this.users = response;         		       					
    });
  }

}
