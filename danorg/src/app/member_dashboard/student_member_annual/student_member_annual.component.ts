import { Component, OnInit } from '@angular/core'; 
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'; 
import { AuthenticationService } from '../../authentication.service';  
import { FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms';   		   		
import { Router } from '@angular/router';  
import { ToastrService } from "ngx-toastr";   
import { NgForm } from '@angular/forms';   

@Component({
  selector: 'student_member_annual-dashboard',
  templateUrl: './student_member_annual.component.html',
  styleUrls: ['./student_member_annual.component.css'],
})

export class StudentMemberAnnual implements OnInit {
  
  userId: number | null = null;
  userEmail: string | null = null;
  userMembership: string | null = null;	
  authToken: string | null = null;		
  userAccess: string | null = null; 
  userPack: string | null = null;   
  userRenew: string | null = null;     

  id: any;  
  instructor_id:any;     
  annualRecords:any;	
  studentAnnualForm: any;      
  form!: FormGroup;
  formSubmitted: boolean = false;    	
  formError: boolean = false; 	
  studAnnual_title:any; 
  studAnnual_fname:any;
  studAnnual_sname:any;
  studAnnual_dob:any; 
  studAnnual_passport:any;  
  studAnnual_address1: any;
  studAnnual_address2:any;
  studAnnual_city:any;
  studAnnual_province:any;
  studAnnual_post:any;
  studAnnual_country:any;
  studAnnual_home:any;    	 
  studAnnual_cellphone:any; 
  studAnnual_email:any;   	   
  studAnnual_aid:any;  	  
  studAnnual_aid_no:any; 
  studAnnual_course:any;            
  successMsg:any;
  studAnnual:any; 
  edit_studAnnual:any; 
  delete_studAnnual:any;  
  auth_type: any;   
  data: any;   
  isEditMode: boolean = false;

  formDataError: any = {
		msg: '',
		error_field: ''
	};
	  
  private apiUrl = 'https://danshopapi.devworktdmc.com/common_membership/add_stud_annual';  		  

  constructor(private authService: AuthenticationService, private formbulider: FormBuilder,private http: HttpClient,private router: Router,private toastr: ToastrService) {
    this.instructor_id = this.authService.getUserId();  
  }

  ngOnInit(): void {
    // Retrieve values from AuthenticationService
    this.userId = this.authService.getUserId();
    this.userEmail = this.authService.getUserEmail();
    this.userMembership = this.authService.getUserMembership();
    this.authToken = this.authService.getAuthToken();  
	this.userAccess = this.authService.getUserAccess();       
	this.userPack = this.authService.getUserPack();    
	this.userRenew = this.authService.getUserRenew();     	    		
    
	
	if ((this.router.url == '/student-membership') && (this.userAccess !='paid') || (this.userRenew ==='renew'))      
	{
		this.router.navigate(['dashboard']);     		                     			  		                    	  		  
	}		
	
    this.getAnnual(this.instructor_id);    	
    this.getStudAnnual(this.instructor_id);     
	
    this.studentAnnualForm = this.formbulider.group({
		  studAnnual_title: ['', [Validators.required]], 		  		   
		  studAnnual_fname: ['', [Validators.required]], 		  		   
		  studAnnual_sname: ['', [Validators.required]],  		  	 		    
		  studAnnual_passport: [],   	 	    
		  studAnnual_address1: ['', [Validators.required]],   	 		    
		  studAnnual_address2: [],   	 		    
		  studAnnual_city: ['', [Validators.required]],   	 		    
		  studAnnual_province: ['', [Validators.required]],   	 		    
		  studAnnual_post: ['', [Validators.required]],   	 		    
		  studAnnual_country: ['', [Validators.required]],   	 	 		    
		  studAnnual_home: [], 
		  studAnnual_cellphone: ['', [Validators.required]], 	
		  studAnnual_email: ['', [Validators.required, Validators.email]],  
		  studAnnual_dob: ['', [Validators.required,Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],   	
		  studAnnual_course: ['', [Validators.required,Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],	
		  studAnnual_aid: ['', [Validators.required]], 		  	
		  studAnnual_aid_no: ['', [Validators.required]], 	    		  
		  instructor_id: [this.userId]    
		});   
      
  }

  addStudAnnual(data:any): Observable<any> {
		return this.http.post<any>(this.apiUrl,data);	      		    							
	}   

  updateStudAnnual(id:any,data:any): Observable<any> {
    return this.http.post<any>('https://danshopapi.devworktdmc.com/common_membership/update_stud_annual/'+id,data);	           		    							
  }  
  
  onSubmit(btn:any,myForm:any) {      	  
       
	if(myForm.valid) 
	{
		this.formSubmitted = false;       
		
		if (this.isEditMode) {   

		  // console.log('edit mode on');
		  this.formDataError.msg='';
		  this.formDataError.error_field='';		
		  this.successMsg='';
		
		  const form_data = this.studentAnnualForm.value;    
		//   console.log(form_data);  
		  // console.log('dive id is',this.id);  
		  
		  this.updateStudAnnual(this.id,form_data).subscribe(		  
			(response) => {
			  // console.log('Success:', response);	
			  const successMessage = response['message'];
			  this.toastr.success(successMessage, 'Success');	
			  this.getStudAnnual(this.userId);  		

			  this.resetForm();         
			  this.studentAnnualForm.patchValue({
				studAnnual_title: '', 		  		   
				studAnnual_fname: '', 		  		   
				studAnnual_sname: '', 
				studAnnual_dob: '',   	 		    
				studAnnual_passport: '',   	 	    
				studAnnual_address1: '',   	 		    
				studAnnual_address2: '',   	 		    
				studAnnual_city: '',   	 		    
				studAnnual_province: '',   	 		    
				studAnnual_post: '',   	 		    
				studAnnual_country: '',   	 	 		    
				studAnnual_home: '', 
				studAnnual_cellphone: '', 	
				studAnnual_email: '',  	
				studAnnual_aid: '', 		  	
				studAnnual_aid_no: '', 	    		  
				studAnnual_course: '', 		 
				instructor_id: this.userId,
			  });   
			},	
			(error) => {
			  if (error.status === 500 && error.error.message === 'Email already exists') {
				this.toastr.error('Email already exists. Please use a different email address.', 'Error');
			  }else{
				console.error('Error:', error);
				this.formDataError.msg=error.error.error;
				this.formDataError.error_field=error.error.error_field;            
			  }	  
			}
		);
		}else{

		  this.formDataError.msg='';
		  this.formDataError.error_field='';		
		  this.successMsg='';
		
		  const form_data = this.studentAnnualForm.value;    

		  const title=(typeof this.studentAnnualForm.get('studAnnual_title').value=="undefined")?'':this.studentAnnualForm.get('studAnnual_title').value;    
		  const fname=(typeof this.studentAnnualForm.get('studAnnual_fname').value=="undefined")?'':this.studentAnnualForm.get('studAnnual_fname').value;  
		  const sname=(typeof this.studentAnnualForm.get('studAnnual_sname').value=="undefined")?'':this.studentAnnualForm.get('studAnnual_sname').value;   
		  const dob=(typeof this.studentAnnualForm.get('studAnnual_dob').value=="undefined")?'0000-00-00':this.studentAnnualForm.get('studAnnual_dob').value;   
		  
		  const passport=(typeof this.studentAnnualForm.get('studAnnual_passport').value=="undefined")?'':this.studentAnnualForm.get('studAnnual_passport').value;  
		  const address1=(typeof this.studentAnnualForm.get('studAnnual_address1').value=="undefined")?'':this.studentAnnualForm.get('studAnnual_address1').value;         
		  const address2=(typeof this.studentAnnualForm.get('studAnnual_address2').value=="undefined")?'':this.studentAnnualForm.get('studAnnual_address2').value;  
		  const city=(typeof this.studentAnnualForm.get('studAnnual_city').value=="undefined")?'':this.studentAnnualForm.get('studAnnual_city').value;   
		  
		  const province=(typeof this.studentAnnualForm.get('studAnnual_province').value=="undefined")?'':this.studentAnnualForm.get('studAnnual_province').value;  
		  const post=(typeof this.studentAnnualForm.get('studAnnual_post').value=="undefined")?'':this.studentAnnualForm.get('studAnnual_post').value;         
		  const country=(typeof this.studentAnnualForm.get('studAnnual_country').value=="undefined")?'':this.studentAnnualForm.get('studAnnual_country').value;   
		  
		  const homephone=(typeof this.studentAnnualForm.get('studAnnual_home').value=="undefined")?'':this.studentAnnualForm.get('studAnnual_home').value;  
		  const cellphone=(typeof this.studentAnnualForm.get('studAnnual_cellphone').value=="undefined")?'':this.studentAnnualForm.get('studAnnual_cellphone').value;        
		  const email=(typeof this.studentAnnualForm.get('studAnnual_email').value=="undefined")?'':this.studentAnnualForm.get('studAnnual_email').value;  
		  const aid=(typeof this.studentAnnualForm.get('studAnnual_aid').value=="undefined")?'':this.studentAnnualForm.get('studAnnual_aid').value;        
		  const aid_no=(typeof this.studentAnnualForm.get('studAnnual_aid_no').value=="undefined")?'':this.studentAnnualForm.get('studAnnual_aid_no').value;  
		  const start_date=(typeof this.studentAnnualForm.get('studAnnual_course').value=="undefined")?'0000-00-00':this.studentAnnualForm.get('studAnnual_course').value;   
			  
			if(btn=='pay')		
			{			
				this.router.navigate(['/paynow'], {			
				  queryParams: {
					title:title, 
					f_name:fname,       
					s_name:sname,       
					dob:dob,       
					passport:passport, 
					address1:address1,       
					address2:address2,  
					city:city,       
					province:province,  
					post:post,       
					country:country,  
					home_phone:homephone,        	  		 
					cell_phone:cellphone,  
					email:email,       
					aid:aid,  
					aid_no:aid_no,       
					start_date:start_date,       	
				  },   
				}); 			
			}
			else
			{  			 
				  this.addStudAnnual(form_data).subscribe(		  
					  (response) => {
						// console.log('Success:', response);	
						const successMessage = response['message'];
						this.toastr.success(successMessage, 'Success');	 
			  			this.getStudAnnual(this.userId);  		
			  
						this.resetForm();
						this.studentAnnualForm.patchValue({
						  studAnnual_title: '', 		  		   
						  studAnnual_fname: '', 		  		   
						  studAnnual_sname: '', 
						  studAnnual_dob: '',   	 		    
						  studAnnual_passport: '',   	 	    
						  studAnnual_address1: '',   	 		    
						  studAnnual_address2: '',   	 		    
						  studAnnual_city: '',   	 		    
						  studAnnual_province: '',   	 		    
						  studAnnual_post: '',   	 		    
						  studAnnual_country: '',   	 	 		    
						  studAnnual_home: '', 
						  studAnnual_cellphone: '', 	
						  studAnnual_email: '',  	
						  studAnnual_aid: '', 		  	
						  studAnnual_aid_no: '', 	    		  
						  studAnnual_course: '', 		 
						  instructor_id: this.userId,
						});   
					  },	
					  (error) => {
						if (error.status === 500 && error.error.message === 'Email already exists') {
						  // Handle specific error case: Email already exists
						  this.toastr.error('Email already exists. Please use a different email address.', 'Error');
						}else{
						  console.error('Error:', error);
						  this.formDataError.msg=error.error.error;
						  this.formDataError.error_field=error.error.error_field;     	      
						}
					  }
				  );  			  
					
			}
		  
		}
		 //
		 
	} else {
		 this.formSubmitted = true;   
		 console.log('invalid form');       
	}
	  
    
  }	

  resetForm() {
    this.studentAnnualForm.reset();
    this.isEditMode = false;
  }

  getStudAnnual(instructor_id:any)
  {
	  this.http.get('https://danshopapi.devworktdmc.com/common_membership/fetch_studAnnual/'+instructor_id).subscribe((response) => {
		this.studAnnual = response;            
	  });   
  }

  

  getAnnual(instructor_id:any)
  {
	  this.http.get('https://danshopapi.devworktdmc.com/common_membership/edit/'+instructor_id).subscribe((response) => {
         this.annualRecords = response;  
	  });   
  }

  editStudAnnual(id:any)
  {
	  this.http.get('https://danshopapi.devworktdmc.com/common_membership/edit/'+id).subscribe((response) => {
		this.edit_studAnnual = response;    
        this.getStudAnnual(this.userId);
        this.isEditMode = true;
        this.id = id;

        this.studAnnual_title=(this.edit_studAnnual.length >0)?this.edit_studAnnual[0].title1:'';       
        this.studAnnual_fname=(this.edit_studAnnual.length >0)?this.edit_studAnnual[0].fname1:'';    
        this.studAnnual_sname=(this.edit_studAnnual.length >0)?this.edit_studAnnual[0].sname1:'';    		
        this.studAnnual_dob=(this.edit_studAnnual.length >0)?this.formatDate(this.edit_studAnnual[0].dob1):'';     
        this.studAnnual_passport=(this.edit_studAnnual.length >0)?this.edit_studAnnual[0].passport1:'';       
        this.studAnnual_address1=(this.edit_studAnnual.length >0)?this.edit_studAnnual[0].address1:'';        	
        this.studAnnual_address2=(this.edit_studAnnual.length >0)?this.edit_studAnnual[0].address2:'';     
        this.studAnnual_city=(this.edit_studAnnual.length >0)?this.edit_studAnnual[0].city1:'';     	
        this.studAnnual_province=(this.edit_studAnnual.length >0)?this.edit_studAnnual[0].province1:'';      
        this.studAnnual_post=(this.edit_studAnnual.length >0)?this.edit_studAnnual[0].postcode1:'';    
        this.studAnnual_country=(this.edit_studAnnual.length >0)?this.edit_studAnnual[0].country1:'';     	
        this.studAnnual_home=(this.edit_studAnnual.length >0)?this.edit_studAnnual[0].telephone1:'';      
        this.studAnnual_cellphone=(this.edit_studAnnual.length >0)?this.edit_studAnnual[0].cellphone1:'';  
        this.studAnnual_email=(this.edit_studAnnual.length >0)?this.edit_studAnnual[0].email1:''; 
        this.studAnnual_aid=(this.edit_studAnnual.length >0)?this.edit_studAnnual[0].medical_aid:''; 
        this.studAnnual_aid_no=(this.edit_studAnnual.length >0)?this.edit_studAnnual[0].medical_aid_no:''; 
        this.studAnnual_course=(this.edit_studAnnual.length >0)?this.formatDate(this.edit_studAnnual[0].startdate):'';     
	  });   
  }

  deleteStudAnnual(id: any): void {
    const confirmed = window.confirm('Are you sure to delete this record?');
  
    if (confirmed) {
      this.http.get('https://danshopapi.devworktdmc.com/common_membership/delete/' + id).subscribe(
        () => {
          this.toastr.success('Record deleted successfully', 'Success');     
          this.getStudAnnual(this.userId);      
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    }
  }    
  
  formatDate(date_now : any) 
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

}
