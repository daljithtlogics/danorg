import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'; 
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';       		
import { ToastrService } from "ngx-toastr";
import { Router } from '@angular/router';
@Component({
  selector: 'request-legal-advice',
  templateUrl: './request-legal-advice.component.html',
  styleUrls: ['./request-legal-advice.component.css']
})
export class RequestLegalAdviceComponent implements OnInit  {

  legalForm:FormGroup = new FormGroup({});
  isNextButtonClicked: boolean = false;
  successMsg:any;
  data:any;

  private apiUrl = 'https://danshopapi.devworktdmc.com/legal_advice/';  		  

  constructor(private formbulider: FormBuilder, private http: HttpClient,private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {   	    		
    this.legalForm = this.formbulider.group({		  		   
		  first_name: ['', [Validators.required]], 		  		   
		  last_name: ['', [Validators.required]], 
		  cell_phone: ['', [Validators.required]],   	 		    
		  email_address: ['', [Validators.required, Validators.email]],  	
		  dan_mem: ['', [Validators.required]], 	
		  country: [],   	 	
		  // attachments: [null],   	 	
		  question: ['', [Validators.required]],
		  agree: ['', [Validators.required]]
		}); 
    
    Object.keys(this.legalForm.controls).forEach(key => {
      this.legalForm.get(key)?.markAsTouched();
    });
  }

  addLegalReq(data:any): Observable<any> {
		return this.http.post<any>(this.apiUrl+"add", data);	      		    							
	}  

  onSubmit() {      	  
    if (this.legalForm.valid) {
    
      const form_data = this.legalForm.value;    
      console.log(form_data);    

      const formData = new FormData();
      // Object.keys(form_data).forEach(key => {
      //   if (key === 'attachments') {
      //     const file = form_data[key];
      //     formData.append(key, file, file.name);
      //   } else {
      //     formData.append(key, form_data[key]);
      //   }
      // });
      // console.log(formData);    

    
      this.addLegalReq(form_data).subscribe(		  
          (response) => {
            const successMessage = response['message'];
            this.toastr.success(successMessage, 'Success');	  		
  
            this.resetForm();
            this.legalForm.patchValue({
              first_name: '', 		  		   
              last_name: '', 
              cell_phone: '',   	 		    
              email_address: '',  	
              dan_mem: '', 	
              country: '',   	 	
              question: '',
              attachments: '',
              agree: ''
            });  
            this.isNextButtonClicked = false;
          },	
          (error) => {
            if (error.status === 400 && error.error.message === 'Email already exists') {
              // Handle specific error case: Email already exists
              this.toastr.error('Email already exists. Try again with another email address', 'Error');
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
    this.legalForm.reset();
  }

  private highlightFirstInvalidControl() {
    const invalidControl = Object.keys(this.legalForm.controls).find(key => this.legalForm.get(key)?.invalid);
    if (invalidControl) {
      this.legalForm.get(invalidControl)?.markAsTouched();
    }
  }

  // upload image
  // uploadImage(event: any){
  //   // debugger;
  //   const file = event.currentTarget.files[0];
  //   const formObj = new FormData();
  //   formObj.append('uploadFile',file);
  //   this.http.post(this.apiUrl+"attachments",formObj).subscribe ((res: any) => {
  //     debugger;
  //   })
  // }


}
