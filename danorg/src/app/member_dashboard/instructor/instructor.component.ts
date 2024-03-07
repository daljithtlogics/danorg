import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';  
import { Router } from '@angular/router';     
import { FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms';     
import { ToastrService } from "ngx-toastr";  

@Component({
  selector: 'instructor-dashboard',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.css']
})
  
export class InstructorMember implements OnInit {
  
  userId: number | null = null;
  userEmail: string | null = null;
  userMembership: string | null = null;
  authToken: string | null = null;
  userAccess: string | null = null;   
  userRenew: string | null = null;     
  
  formError: boolean = false; 
  parent_id:any;  	     
  successMsg:any;        
  courses:any;
  instructors:any;
  edit_instructor:any;	  	
  data: any; 
  myForm: FormGroup = new FormGroup({}); // Initialize with an empty FormGroup
  isNextButtonClicked: boolean = false;
  isEditMode: boolean = false;  	

  id:any;
  title: any;
  first_name: any;
  last_name: any;
  dob: any;
  passport_no: any;
  address1: any;
  address2: any;
  city: any;
  state: any;
  postal_code: any;
  country: any;
  tel_home: any;
  tel_work: any;
  cell_phone: any;
  email_address: any;
  aid: any;
  aid_no: any;
  start_date : any;
  fax: any;
  ins_type: any;

  private apiUrl = 'https://danshopapi.devworktdmc.com/instructor/';    		          
  
  constructor(private authService: AuthenticationService,private formbulider: FormBuilder,private http: HttpClient,private router: Router, private toastr: ToastrService) {
	this.userId = this.authService.getUserId();  	
    this.parent_id = this.authService.getUserId();  	  	 
    this.getInstructor(this.userId);  	  
  }

  ngOnInit(): void {
    // Retrieve values from AuthenticationService
    this.userId = this.authService.getUserId();
    this.userEmail = this.authService.getUserEmail();
    this.userMembership = this.authService.getUserMembership();
    this.authToken = this.authService.getAuthToken();
	this.userAccess = this.authService.getUserAccess();  
	this.userRenew = this.authService.getUserRenew(); 

	if ((this.router.url == '/instructor') && (this.userAccess !='paid') || (this.userRenew ==='renew'))      
	{
		this.router.navigate(['dashboard']);          		                                                 			  		                    	  		  
	}	         
	                          
	this.myForm = this.formbulider.group({
		parent_id: [this.userId],
		title: ['', Validators.required],
		first_name: ['', Validators.required],
		last_name: ['', Validators.required],
		dob: ['', Validators.required],
		passport_no: [''],
		address1: ['', Validators.required],
		address2: [''],
		city: [''],
		state: [''],
		postal_code: [''],
		country: [''],
		tel_home: [''],
		tel_work: [''],
		cell_phone: ['', Validators.required],
		email_address: ['', Validators.required],
		aid: [''],
		aid_no: [''],
		start_date : ['', Validators.required],
		fax: [''],
		ins_type: ['', Validators.required]
	});

	// Set the 'touched' state of the form controls to trigger error messages
	Object.keys(this.myForm.controls).forEach(key => {
		this.myForm.get(key)?.markAsTouched();
	});
	
  }
  
  formDataError: any = {
    msg: '',
    error_field: ''  
  };  

  postData(formData: any): Observable<any> {
	return this.http.post(this.apiUrl+"annual_inst_add", formData);
  }

  updateData(id:any,formData: any): Observable<any> {
	return this.http.post(this.apiUrl+"annual_inst_update/"+id, formData);
  }
                   
  onSave() {      
	if (this.isEditMode) {
		if (this.myForm.valid) {
			const formData = this.myForm.value;
			
			this.updateData(this.id,formData).subscribe(
			  (response) => {
				const successMessage = response['message'];
				this.toastr.success(successMessage, 'Success');
				this.getInstructor(this.userId);
				this.resetForm();
				this.myForm.patchValue({
					parent_id: this.userId,      	  
					title: '',
					first_name: '',
					last_name: '',
					dob: '',
					passport_no: '',
					address1: '',
					address2: '',
					city: '',
					state: '',
					postal_code: '',
					country: '',
					tel_home: '',
					tel_work: '',
					cell_phone: '',
					email_address: '',
					aid: '',
					aid_no: '',
					start_date : '',
					fax: '',
					ins_type: ''	
				});   
			  },
			  (error) => {
				if (error.status === 500 && error.error.message === 'Email already exists') {
				  this.toastr.error('Email already exists. Please use a different email address.', 'Error');
				}else{
				  console.error('Error saving form data:', error);
				}
			  }
			);
		} else {
			this.toastr.error('Please fill in all required fields.', 'Error');
			this.isNextButtonClicked = true;
			this.highlightFirstInvalidControl();
		} 	  
	}else{
		if (this.myForm.valid) {
			const formData = this.myForm.value;
			// console.log(formData);
			
			this.postData(formData).subscribe(
			  (response) => {
				const successMessage = response['message'];
				this.toastr.success(successMessage, 'Success');
				this.getInstructor(this.userId);
				this.resetForm();
				this.myForm.patchValue({
					parent_id: this.userId,      	  
					title: '',
					first_name: '',
					last_name: '',
					dob: '',
					passport_no: '',
					address1: '',
					address2: '',
					city: '',
					state: '',
					postal_code: '',
					country: '',
					tel_home: '',
					tel_work: '',
					cell_phone: '',
					email_address: '',
					aid: '',
					aid_no: '',
					start_date : '',
					fax: '',
					ins_type: ''	
				});   
			  },
			  (error) => {
				if (error.status === 500 && error.error.message === 'Email already exists') {
				  this.toastr.error('Email already exists. Please use a different email address.', 'Error');
				}else{
				  console.error('Error saving form data:', error);
				}
			  }
			);
		} else {
			this.toastr.error('Please fill in all required fields.', 'Error');
			this.isNextButtonClicked = true;
			this.highlightFirstInvalidControl();
		} 	  
	}
	
  }  
             
  private highlightFirstInvalidControl() {
	const invalidControl = Object.keys(this.myForm.controls).find(key => this.myForm.get(key)?.invalid);
	if (invalidControl) {
	  this.myForm.get(invalidControl)?.markAsTouched();
	}
  }
  
  resetForm() {
    this.myForm.reset();
	this.isNextButtonClicked = false;
    this.isEditMode = false;
  }

  getInstructor(id:any)
  {
	  this.http.get('https://danshopapi.devworktdmc.com/instructor/fetch_instructor/'+id).subscribe((response) => {
		    this.instructors = response; 
			this.getInstructor(this.userId);
	  });   
  }

 	editInstructor(id:any)
	  {
		  this.http.get('https://danshopapi.devworktdmc.com/common_membership/edit/'+id).subscribe((response) => {
			this.edit_instructor= response;  
			this.getInstructor(this.userId);
			this.isEditMode = true;
			this.id = id;
	
			this.title=(this.edit_instructor.length >0)?this.edit_instructor[0].title1:'';       
			this.first_name=(this.edit_instructor.length >0)?this.edit_instructor[0].fname1:'';    
			this.last_name=(this.edit_instructor.length >0)?this.edit_instructor[0].sname1:'';    		
			this.dob=(this.edit_instructor.length >0)?this.formatDate(this.edit_instructor[0].dob1):'';  
			this.start_date=(this.edit_instructor.length >0)?this.formatDate(this.edit_instructor[0].startdate):'';  
			this.ins_type=(this.edit_instructor.length >0)?this.edit_instructor[0].package_name:'';    		
			this.passport_no=(this.edit_instructor.length >0)?this.edit_instructor[0].passport1:'';       
			this.address1=(this.edit_instructor.length >0)?this.edit_instructor[0].address1:''; 
			this.address2=(this.edit_instructor.length >0)?this.edit_instructor[0].address2:'';       
			this.city=(this.edit_instructor.length >0)?this.edit_instructor[0].city1:'';       
			this.state=(this.edit_instructor.length >0)?this.edit_instructor[0].province1:'';       
			this.postal_code=(this.edit_instructor.length >0)?this.edit_instructor[0].postcode1:'';       
			this.country=(this.edit_instructor.length >0)?this.edit_instructor[0].country1:'';       
			this.tel_home=(this.edit_instructor.length >0)?this.edit_instructor[0].telephone1:'';        	
			this.tel_work=(this.edit_instructor.length >0)?this.edit_instructor[0].telephone2:'';     
			this.cell_phone=(this.edit_instructor.length >0)?this.edit_instructor[0].cellphone1:'';     	
			this.email_address=(this.edit_instructor.length >0)?this.edit_instructor[0].email1:'';      
			this.aid=(this.edit_instructor.length >0)?this.edit_instructor[0].medical_aid:'';    
			this.aid_no=(this.edit_instructor.length >0)?this.edit_instructor[0].medical_aid_no:''; 
			this.fax=(this.edit_instructor.length >0)?this.edit_instructor[0].fax:'';     	
		  });   
	}

	
	// deleteInstructor(id: any): void {
	// 	const confirmed = window.confirm('Are you sure to delete this record?');
	  
	// 	if (confirmed) {
	// 	  this.http.get('https://danshopapi.devworktdmc.com/instructor/delete_instructor/' + id).subscribe(
	// 		() => {
	// 		  this.toastr.success('Record deleted successfully', 'Success');
	// 		  // Update the list of instructor after deletion
	// 		  this.getInstructor(this.userId);
	// 		},
	// 		(error) => {
	// 		  console.error('Error:', error);
	// 		  // Handle error, show an error message, etc.
	// 		}
	// 	  );
	// 	}
	// }

	formatDate(date_now : any) { 
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
