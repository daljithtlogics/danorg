import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { Router } from '@angular/router';   
import { FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms';
import { ToastrService } from "ngx-toastr";
declare var $: any; // Declare jQuery to avoid TypeScript errors

@Component({
  selector: 'inst_student-dashboard',
  templateUrl: './inst_student.component.html',
  styleUrls: ['./inst_student.component.css']
})
                    
export class InstructorStudent implements OnInit {
  
  userId: number | null = null;
  userEmail: string | null = null;
  userMembership: string | null = null;
  userAccess: string | null = null;   
  authToken: string | null = null;  
  userRenew: string | null = null;    
  userPack: string | null = null;     

  provideForm:any;   
  form!: FormGroup;
  formSubmitted: boolean = false;    	
  formError: boolean = false; 
  parent_id:any;  	     
  successMsg:any;        
  courses:any;
  instructor_students:any;
  edit_instructor_student:any;	  	
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
  stud_type: any;
  medication:any;
  chronic_ill: any;
  permission: any;

  private apiUrl = 'https://danshopapi.devworktdmc.com/instructor/';    		          
  
  constructor(private authService: AuthenticationService,private formbulider: FormBuilder,private http: HttpClient,private router: Router, private toastr: ToastrService) {
	this.userId = this.authService.getUserId();  	
    this.parent_id = this.authService.getUserId();  	  	 
    this.getInstStudent(this.userId);  	  
  }

  ngOnInit(): void {
    // Retrieve values from AuthenticationService
    this.userId = this.authService.getUserId();
    this.userEmail = this.authService.getUserEmail();
    this.userMembership = this.authService.getUserMembership();
    this.authToken = this.authService.getAuthToken();
	this.userAccess = this.authService.getUserAccess();  
	this.userRenew = this.authService.getUserRenew(); 
	this.userPack = this.authService.getUserPack();     	    		


	if ((this.router.url == '/instructor-students') && (this.userAccess !='paid') || (this.userRenew ==='renew'))      
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
		city: ['', Validators.required],
		state: ['', Validators.required],
		postal_code: ['', Validators.required],
		country: ['', Validators.required],
		tel_home: [''],
		tel_work: [''],
		cell_phone: ['', Validators.required],
		email_address: ['', Validators.required],
		aid: ['', Validators.required],
		aid_no: ['', Validators.required],
		start_date : ['', Validators.required],
		fax: [''],
		stud_type: ['', Validators.required],
		medication: [''],
		chronic_ill: [''],
		permission: ['']
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
	return this.http.post(this.apiUrl+"inst_student_save", formData);
  }

  updateData(id:any,formData: any): Observable<any> {
	return this.http.post(this.apiUrl+"inst_student_update/"+id, formData);
  }
                   
  onSave() {      
	if (this.isEditMode) {
		if (this.myForm.valid) {
			const formData = this.myForm.value;
			
			this.updateData(this.id,formData).subscribe(
			  (response) => {
				const successMessage = response['message'];
				this.toastr.success(successMessage, 'Success');
				this.getInstStudent(this.userId);
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
					stud_type: '',
					medication: '',
					chronic_ill: '',
					permission: ''	
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
				this.getInstStudent(this.userId);
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
					stud_type: '',
					medication: '',
					chronic_ill: '',
					permission: ''		
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

  getInstStudent(id:any)
  {
	  this.http.get('https://danshopapi.devworktdmc.com/instructor/fetch_inst_student/'+id).subscribe((response) => {
		    this.instructor_students = response; 
			this.getInstStudent(this.userId);
	  });   
  }

 	editInstructorStudent(id:any)
	  {
		  this.http.get('https://danshopapi.devworktdmc.com/common_membership/edit/'+id).subscribe((response) => {
			this.edit_instructor_student= response;  
			this.getInstStudent(this.userId);
			this.isEditMode = true;
			this.id = id;
	
			this.title=(this.edit_instructor_student.length >0)?this.edit_instructor_student[0].title1:'';       
			this.first_name=(this.edit_instructor_student.length >0)?this.edit_instructor_student[0].fname1:'';    
			this.last_name=(this.edit_instructor_student.length >0)?this.edit_instructor_student[0].sname1:'';    		
			this.dob=(this.edit_instructor_student.length >0)?this.formatDate(this.edit_instructor_student[0].dob1):'';  
			this.start_date=(this.edit_instructor_student.length >0)?this.formatDate(this.edit_instructor_student[0].startdate):'';  
			this.stud_type=(this.edit_instructor_student.length >0)?this.edit_instructor_student[0].package_name:'';    		
			this.passport_no=(this.edit_instructor_student.length >0)?this.edit_instructor_student[0].passport1:'';       
			this.address1=(this.edit_instructor_student.length >0)?this.edit_instructor_student[0].address1:''; 
			this.address2=(this.edit_instructor_student.length >0)?this.edit_instructor_student[0].address2:'';       
			this.city=(this.edit_instructor_student.length >0)?this.edit_instructor_student[0].city1:'';       
			this.state=(this.edit_instructor_student.length >0)?this.edit_instructor_student[0].province1:'';       
			this.postal_code=(this.edit_instructor_student.length >0)?this.edit_instructor_student[0].postcode1:'';       
			this.country=(this.edit_instructor_student.length >0)?this.edit_instructor_student[0].country1:'';       
			this.tel_home=(this.edit_instructor_student.length >0)?this.edit_instructor_student[0].telephone1:'';        	
			this.tel_work=(this.edit_instructor_student.length >0)?this.edit_instructor_student[0].telephone2:'';     
			this.cell_phone=(this.edit_instructor_student.length >0)?this.edit_instructor_student[0].cellphone1:'';     	
			this.email_address=(this.edit_instructor_student.length >0)?this.edit_instructor_student[0].email1:'';      
			this.aid=(this.edit_instructor_student.length >0)?this.edit_instructor_student[0].medical_aid:'';    
			this.aid_no=(this.edit_instructor_student.length >0)?this.edit_instructor_student[0].medical_aid_no:''; 
			this.medication=(this.edit_instructor_student.length >0)?this.edit_instructor_student[0].medication:''; 
			this.chronic_ill=(this.edit_instructor_student.length >0)?this.edit_instructor_student[0].chronic_ill:''; 
			this.permission=(this.edit_instructor_student.length >0)?this.edit_instructor_student[0].permission:''; 
		  });   
	}

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
