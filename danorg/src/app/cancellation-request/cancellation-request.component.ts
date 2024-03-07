import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'; 
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';       		
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cancellation-request',
  templateUrl: './cancellation-request.component.html',
  styleUrls: ['./cancellation-request.component.css']
})
export class CancellationRequestComponent implements OnInit {

  cancelForm:FormGroup = new FormGroup({});
  isNextButtonClicked: boolean = false;
  successMsg:any;
  data:any;

  private apiUrl = 'https://danshopapi.devworktdmc.com/cancel_request/';  		  

  constructor(private formbulider: FormBuilder, private http: HttpClient,private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {   	    		
    this.cancelForm = this.formbulider.group({		  		   
		  fname: ['', [Validators.required]], 		  		   
		  sname: ['', [Validators.required]], 
		  phone: ['', [Validators.required]],   	 		    
		  email_address: ['', [Validators.required, Validators.email]],  	
		  member_no: ['', [Validators.required]], 	
		  passport: [],   	 	    
		  more_info:[]	
		}); 
    
    Object.keys(this.cancelForm.controls).forEach(key => {
      this.cancelForm.get(key)?.markAsTouched();
    });
  }

  addCancelReq(data:any): Observable<any> {
		return this.http.post<any>(this.apiUrl+"add", data);	      		    							
	}  
  
  onSubmit() {      	  
    if (this.cancelForm.valid) {
    
      const form_data = this.cancelForm.value;    
      console.log(form_data);    
    
      this.addCancelReq(form_data).subscribe(		  
          (response) => {
            const successMessage = response['message'];
            this.toastr.success(successMessage, 'Success');	  		
  
            this.resetForm();
            this.cancelForm.patchValue({
              fname: '',
              sname: '',
              phone: '',
              email_address: '',
              member_no: '',
              passport: '',
              more_info: ''
            });  
            this.isNextButtonClicked = false;
          },	
          (error) => {
            if (error.status === 400 && error.error.message === 'DAN membership no already exists') {
              // Handle specific error case: Email already exists
              this.toastr.error('DAN membership no. already exists.', 'Error');
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
    this.cancelForm.reset();
  }

  private highlightFirstInvalidControl() {
    const invalidControl = Object.keys(this.cancelForm.controls).find(key => this.cancelForm.get(key)?.invalid);
    if (invalidControl) {
      this.cancelForm.get(invalidControl)?.markAsTouched();
    }
  }


}
