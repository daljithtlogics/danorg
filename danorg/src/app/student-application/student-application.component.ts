// 10 nov 2023 annual-app.component.ts file 12:50pm
import { Component, OnInit } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
declare var $: any; // Declare jQuery to avoid TypeScript errors

@Component({
  selector: 'app-student-application',
  templateUrl: './student-application.component.html',
  styleUrls: ['./student-application.component.css']
})
export class StudentApplicationComponent implements OnInit{

    studentAppForm: FormGroup = new FormGroup({}); // Initialize with an empty FormGroup
    constructor(private fb: FormBuilder, private toastr: ToastrService, private http: HttpClient, private router: Router) { }
    private apiUrl = 'http://157.245.36.128:4500/student_frontend/add'; // Replace with your API	endpoint	

    // Add a property in your component class
    isNextButtonClicked: boolean = false;
    isNextButtonClicked2: boolean = false;
    isNextButtonClicked3: boolean = false;
    isNextButtonClicked5: boolean = false;
    isNextButtonClicked6: boolean = false;
    
	ngOnInit(): void {
	
        this.studentAppForm = this.fb.group({
            title: ['', Validators.required],
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            dob: ['', Validators.required],
            address1: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required],
            postal_code: ['', Validators.required],
            country: ['', Validators.required],
            cell_phone: ['', Validators.required],
            email_address: ['', Validators.required],
            agency: ['', Validators.required],
            qualification: ['', Validators.required],
            aid: ['', Validators.required],
            aid_no: ['', Validators.required],
            instructor: ['', Validators.required],                                                                                                                                                      
            start_date : ['', Validators.required],
        });

        // Set the 'touched' state of the form controls to trigger error messages
        Object.keys(this.studentAppForm.controls).forEach(key => {
            this.studentAppForm.get(key)?.markAsTouched();
        });

		$(document).ready(() => {
		  $(".form-steps").hide();
		  $("#step_1").show();
		});

        $(".next-btn").click((e: any) => {
            e.preventDefault();
            var id = parseInt($(e.target).attr('data-id'));
            console.log('working');
            console.log(id);
        
            // Check if data-id is 1
            if (id === 1) {
                this.isNextButtonClicked = true;

                // Check if necessary fields are filled up
                if (this.studentAppForm.get('title')?.valid && this.studentAppForm.get('first_name')?.valid && this.studentAppForm.get('last_name')?.valid && this.studentAppForm.get('dob')?.valid && this.studentAppForm.get('address1')?.valid && this.studentAppForm.get('city')?.valid && this.studentAppForm.get('state')?.valid && this.studentAppForm.get('postal_code')?.valid && this.studentAppForm.get('country')?.valid && this.studentAppForm.get('cell_phone')?.valid && this.studentAppForm.get('email_address')?.valid) {
                    // Proceed to the next step
                    var next_id = id + 1;
                    $(".form-steps").hide();
                    $("#step_" + next_id + "").show();
                    $('html, body').animate({
                        scrollTop: $(".title").offset().top
                    }, 100);
                } else {
                    // Display a toast message
                    this.toastr.error('Please fill in all required fields.', 'Error');
                }
            } else if (id === 2) {
                // Check additional conditions for the second step
                this.isNextButtonClicked2 = true;

                if (this.studentAppForm.get('instructor')?.valid && this.studentAppForm.get('start_date')?.valid && this.studentAppForm.get('aid')?.valid && this.studentAppForm.get('aid_no')?.valid) {
                    // Proceed to the next step
                    var next_id = id + 1;
                    $(".form-steps").hide();
                    $("#step_" + next_id + "").show();
                    $('html, body').animate({
                        scrollTop: $(".title").offset().top
                    }, 100);
                } else {
                    // Display a toast message or handle as needed
                    this.toastr.error('Additional conditions for the second step are not met.', 'Error');
                }
            } else {
                // For other steps, proceed to the next step without additional checks
                var next_id = id + 1;
                $(".form-steps").hide();
                $("#step_" + next_id + "").show();
                $('html, body').animate({
                    scrollTop: $(".title").offset().top
                }, 100);
            }
        });
        

		$(".back-btn").click((e: any) => {
			e.preventDefault();
			var id = parseInt($(e.target).attr('data-id'));
			console.log('working');
			console.log(id);
			var next_id = id - 1;
			$(".form-steps").hide();
			$("#step_" + next_id + "").show();
			$('html, body').animate({
			scrollTop: $(".title").offset().top
			}, 100);
		});	
   }

    postData(formData: any): Observable<any> {
        return this.http.post(this.apiUrl, formData);
    }

    onSubmit() {
        if (this.studentAppForm.valid) {
          // Handle form submission
          const formData = this.studentAppForm.value;
      
          // Combine form data with additional data
            // const combinedData = { ...formData, ...this.additionalData };

            console.log(formData);
            
          // Call the postData method to save the form data in the database
        //   this.postData(combinedData).subscribe(
        //     (response) => {
        //       console.log('Form data successfully saved:', response);
        //       this.toastr.success('Student application form saved successfully!', 'Success');

        //       // Redirect to the specified URL after a delay of 2000 ms
        //         setTimeout(() => {
        //             this.router.navigate(['/application-submit-success']); // Replace with your desired URL
        //         }, 2000);
        //     },
        //     (error) => {
        //       console.error('Error saving form data:', error);
        //     }
        //   );
        } else {
          // Form is invalid, show error messages
          console.log('Form is invalid. Please check the errors.');
          this.toastr.error('Please fill in all required fields.', 'Error');
        }
    }
      
  
	
}
