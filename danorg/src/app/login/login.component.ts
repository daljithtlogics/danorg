import { Component, OnInit } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { RenewalService } from '../renewal.service';
declare var $: any; 
declare var bootstrap: any; // Declare Bootstrap variable

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  
    loginForm: FormGroup = new FormGroup({}); // Initialize with an empty FormGroup
    forgotForm: FormGroup = new FormGroup({}); // Initialize with an empty FormGroup
    isNextButtonClicked: boolean = false;
    isNextButtonClicked2: boolean = false;
    errorMsg = '';
    resendMsg = '';
    showResendEmailLink = false;     
	  public openMode : boolean = false;	

    constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private toastr: ToastrService, private http: HttpClient, private authService: AuthenticationService, private renewalService: RenewalService) {}

    private apiUrl = 'https://danshopapi.devworktdmc.com/common_membership/'; // Replace with your API	endpoint
                            
    // openModal() {
    //   $('#forgotPasswordModal').modal('show');
    // }

    showModal(open : boolean) : void {
      this.openMode = open; 
      this.isNextButtonClicked2 = false;   
    }	   

    resetClick()
	  {  
		  this.openMode = false;   
      this.isNextButtonClicked2 = false;   
	  }
      
    ngOnInit(): void {

      this.loginForm = this.fb.group({
          email: ['', [Validators.required, Validators.email]], 
          password: ['', Validators.required],
      });

      // Set the 'touched' state of the form controls to trigger error messages
      Object.keys(this.loginForm.controls).forEach(key => {
          this.loginForm.get(key)?.markAsTouched();
      });

      // forgot password
      this.forgotForm = this.fb.group({
        email2: ['', [Validators.required, Validators.email]]
      });

      // Set the 'touched' state of the form controls to trigger error messages
      Object.keys(this.forgotForm.controls).forEach(key => {
          this.forgotForm.get(key)?.markAsTouched();
      });
    }                                     
        
    postData(formData: any): Observable<any> {
      return this.http.post(this.apiUrl+"login_to_dashboard", formData);
    }
   
    onSubmit() {
        if (this.loginForm.valid) {
          const formData = this.loginForm.value;
          // console.log(formData);      

          // Check if 'renew' query parameter is present
          const renewQueryParam = this.renewalService.getRenewFlag();
          
          // Call the postData method to save the form data in the database
          this.postData(formData).subscribe(
            (response) => {
              // console.log('Login success:', response);
              const successMessage = response['message'];
              const accessKey= (response['data'][0].verifyAmount==null)?'':response['data'][0].verifyAmount;   
              const authKey = (response['data'][0].package_name==null)?'':response['data'][0].package_name;    
              const packageFor = (response['data'][0].package_for==null)?'':response['data'][0].package_for;    
              const choose_membership = (response['data'][0].choose_membership==null)?'':response['data'][0].choose_membership;    

              let renew = '';
              const startDate = response['data'][0].startdate || '';

              const endDate = new Date(startDate);

              if (packageFor === 'year' || packageFor === '') {
                endDate.setFullYear(endDate.getFullYear() + 1);
              } else if (packageFor === 'month') {
                endDate.setMonth(endDate.getMonth() + 1);
              }else if (packageFor === 'day') {
                endDate.setDate(endDate.getDate() + 1);
              } else if (packageFor === '5days') {
                endDate.setDate(endDate.getDate() + 5);
              } else if (packageFor === '10days') {
                endDate.setDate(endDate.getDate() + 10);
              } else if (packageFor === '15days') {
                endDate.setDate(endDate.getDate() + 15);
              } else{
                console.log('oops no date find');
              }

              renew = endDate < new Date() ? 'renew' : 'not_renew';

              this.toastr.success(successMessage,'Success');          

              // Call the login method in AuthenticationService upon successful login
              this.authService.login(response['data'][0].id, formData.email,choose_membership,accessKey,authKey,renew);                  

              // Redirect to the specified URL after a delay of 2000 ms
              if (renewQueryParam && renew === 'renew') {
                // Redirect to pay-renewal page
                setTimeout(() => {      
                  this.router.navigate(['/pay-renewal']);
                }, 2000);
              } else {
                setTimeout(() => {
                  // console.log('Navigating to dashboard...');       
                  this.router.navigate(['/dashboard']);
                }, 2000);
              }

            },
            (error) => {
              if (error.status === 401) {
                // this.toastr.error('Email is not verified. Please verify your email address.', 'Error');
                this.errorMsg= 'Email is not verified. Please verify your email address';
                this.showResendEmailLink = true;
              }else if (error.status === 400) {
                this.showResendEmailLink = false;
                this.toastr.error('Invalid credentials', 'Error');
              }else{
                console.error('Error saving form data:', error);
              }
            }                             
          );
        } else {
          // Form is invalid, show error messages
          console.log('Form is invalid. Please check the errors.');
          this.toastr.error('Please fill in all required fields.', 'Error');

          this.isNextButtonClicked = true;
          // Highlight the first invalid control for better user experience
          this.highlightFirstInvalidControl();
        }     
    }

   
    private highlightFirstInvalidControl() {
      const invalidControl = Object.keys(this.loginForm.controls).find(key => this.loginForm.get(key)?.invalid);
      if (invalidControl) {
        this.loginForm.get(invalidControl)?.markAsTouched();
      }
    }

    
	
    resendData(formData: any): Observable<any> {
      return this.http.post(this.apiUrl+'resend', formData);
    }

    resendEmail(): void {
      const formData = this.loginForm.value;                                 

      // Call your authentication service resend email method here
      this.resendData(formData).subscribe(
        (response) => {
          this.showResendEmailLink = false;
          this.resendMsg = 'Verification email resent successfully';
        },
        (error) => {
          // Handle error
          console.error('Error resending verification email:', error);
        }
      );
    }

    // forgot password
    forgotData(formData: any): Observable<any> {
      return this.http.post(this.apiUrl+'forgot', formData);
    }

    onForgot() {   
      if (this.forgotForm.valid) {
        const formData = this.forgotForm.value;
        // console.log(formData);            

        this.forgotData(formData).subscribe(
          (response) => {        
            const successMessage = response['message'];      
            this.toastr.success(successMessage, 'Success');   
		        this.openMode = false;   
            this.forgotForm.patchValue({
              email2: ''
            });
          },
          (error) => {
            if (error.status === 401) {
              this.toastr.error('Email is not verified. Please verify your email address', 'Error');
            }else if (error.status === 400) {
              this.toastr.error('Your email doesn\'t match our records. Please double-check.', 'Error');
            } else {
              console.error('Error saving form data:', error);    
            }
          }                             
        );
      } else {
        this.toastr.error('Please fill in all required fields.', 'Error');
        this.isNextButtonClicked2 = true;   
        this.highlightFirstInvalidControl2();    
      }     
  }

 
    private highlightFirstInvalidControl2() {
      const invalidControl = Object.keys(this.forgotForm.controls).find(key => this.forgotForm.get(key)?.invalid);
      if (invalidControl) {
        this.forgotForm.get(invalidControl)?.markAsTouched();
      }
    }
  
}
