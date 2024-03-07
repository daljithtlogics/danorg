// 10 nov 2023 annual-app.component.ts file 12:50pm
import { Component, OnInit } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any; // Declare jQuery to avoid TypeScript errors

@Component({
  selector: 'app-verify-application',
  templateUrl: './verify-application.component.html',
  styleUrls: ['./verify-application.component.css']
})
export class VerifyApplicationComponent implements OnInit{

    email_address: string = '';
    myForm: FormGroup = new FormGroup({}); 

    private apiUrl = 'https://danshopapi.devworktdmc.com/common_membership/verify/'; // Replace with your API	endpoint
    constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private toastr: ToastrService, private fb: FormBuilder) {}

    ngOnInit(): void {
      this.route.params.subscribe((params) => {
        const email_address = params['email_address'];
        this.email_address = params['email_address'];
        // console.log(email_address);

        this.http.get(`${this.apiUrl}${email_address}`).subscribe(
          (response) => {
            console.log('Email verified:', response);
            // const msg = response['message'];
            this.toastr.success('Email verified successfully. You can now log in.', 'Success');
            this.router.navigate(['/login']);
          },
          (error) => {
            console.error('Error verifying email:', error);

            if (error.status === 404) {
              this.toastr.error('Email address not found in our records.', 'Error');
              this.router.navigate(['/not-found']);
            } else if (error.status === 400) {
              this.toastr.error('This email is already verified.', 'Error');
              this.router.navigate(['/login']);
            } else {
              this.toastr.error('Error verifying email. Please try again later.', 'Error');
              this.router.navigate(['/error']);
            }
          }
        );
      });
    }
}
