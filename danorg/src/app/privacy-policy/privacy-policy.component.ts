import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';       		
import { ToastrService } from "ngx-toastr";
import { Router } from '@angular/router';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit {

  feedbackForm:FormGroup = new FormGroup({});
  isNextButtonClicked: boolean = false;
  successMsg:any;
  data:any;

  private apiUrl = 'https://danshopapi.devworktdmc.com/cancel_request/';  		  

  constructor(private formbulider: FormBuilder, private http: HttpClient,private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {   	    		
    this.feedbackForm = this.formbulider.group({		  		   
		  fname: ['', [Validators.required]], 		  		   
		  sname: [''], 	 		    
		  email_address: ['', [Validators.required, Validators.email]], 
      slug: ['privacy-policy'],	  	 	    
		  message:['']	
		}); 
    
    Object.keys(this.feedbackForm.controls).forEach(key => {
      this.feedbackForm.get(key)?.markAsTouched();
    });
  }

  addFeedback(data:any): Observable<any> {
		return this.http.post<any>(this.apiUrl+"addFeedback", data);	      		    							
	}  

  onSubmit() {      	  
    if (this.feedbackForm.valid) {
    
      const form_data = this.feedbackForm.value;    
      // console.log(form_data);    
    
      this.addFeedback(form_data).subscribe(		  
          (response) => {
            const successMessage = response['message'];
            this.toastr.success(successMessage, 'Success');	  		
  
            this.resetForm();
            this.feedbackForm.patchValue({
              fname: '',
              sname: '',
              email_address: '',
              slug: 'privacy-policy',
              message: ''
            });  
            this.isNextButtonClicked = false;
          },	
          (error) => {
            if (error.status === 400 && error.error.message === 'Email already exists') {
              this.toastr.error('Email already exists. Try with another email address.', 'Error');
            }else{
              console.error('Error saving form data:', error);
            }
          }
      );
    }else{
        console.log('Form is invalid. Please check the errors.');
        this.toastr.error('Please fill in all required fields.', 'Error');
        this.isNextButtonClicked = true;
        this.highlightFirstInvalidControl();
    }
  }	

  resetForm() {
    this.feedbackForm.reset();
  }

  private highlightFirstInvalidControl() {
    const invalidControl = Object.keys(this.feedbackForm.controls).find(key => this.feedbackForm.get(key)?.invalid);
    if (invalidControl) {
      this.feedbackForm.get(invalidControl)?.markAsTouched();
    }
  }

}
