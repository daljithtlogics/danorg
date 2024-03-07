import { Component, OnInit } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
declare var $: any; // Declare jQuery to avoid TypeScript errors

@Component({
	selector: 'app-travel-notification',
	templateUrl: './travel-notification.component.html',
	styleUrls: ['./travel-notification.component.css']
})

export class TravelNotificationComponent implements OnInit {

	myForm: FormGroup = new FormGroup({}); // Initialize with an empty FormGroup
    constructor(private fb: FormBuilder, private toastr: ToastrService, private http: HttpClient, private router: Router) { }
    private apiUrl = 'https://danshopapi.devworktdmc.com/travel_notification/'; // Replace with your API	endpoint	

	// Add a property in your component class
    isNextButtonClicked: boolean = false;
    isNextButtonClickedLast: boolean = false;


	ngOnInit(): void {
	
		this.myForm = this.fb.group({
			fname1: ['', Validators.required],
			sname1: ['', Validators.required],
			email1: ['', [Validators.required, Validators.email]],
			cellphone1: ['', Validators.required],
			dan_member: [''],
			dan_no: [''],
			passport1: [''],
			dob1: [''],
			fname2: [''],
			sname2: [''],
			cellphone2: [''],
			email2: [''],
			dive_trip: [''],
			professional: [''],
			destination: [''],
			dive_site: [''],
			dep_date: [''],
			return_date: [''],
			dive_done: [''],
			depth: [''],
			medical: [''],
			medical_name: [''],
			medical_no: [''],
			travel: [''],
			travel_name: [''],
			travel_no: [''],
			diving_family: [''],
			family_fname1: [''],
			family_sname1: [''],
			family_age1: [''],
			family_fname2: [''],
			family_sname2: [''],
			family_age2: [''],
			family_fname3: [''],
			family_sname3: [''],
			family_age3: [''],
			family_fname4: [''],
			family_sname4: [''],
			family_age4: [''],
			nondiving_family: [''],
			nonfamily_fname1: [''],
			nonfamily_sname1: [''],
			nonfamily_age1: [''],
			nonfamily_fname2: [''],
			nonfamily_sname2: [''],
			nonfamily_age2: [''],
			nonfamily_fname3: [''],
			nonfamily_sname3: [''],
			nonfamily_age3: [''],
			nonfamily_fname4: [''],
			nonfamily_sname4: [''],
			nonfamily_age4: [''],
			additional_info: [''],
			prophylactic: [''],
			examination: [''],
			willing_info: [''],
			pregnant: [''],
			pregnant_month: [''],
			ear: [''],
			ear_issue: [''],
			cardiac: [''],
			cardiac_issue: [''],
			diabetic: [''],
			high_bp: [''],
			lung: [''],
			lung_issue: [''],
			gastro: [''],
			epilepsy: [''],
			epilepsy_issue: [''],
			psychological: [''],
			psychological_issue: [''],
			anaemic: [''],
			medication: [''],
			medication_reason: [''],
			operation: [''],
			operation_reason: [''],
			agree: ['', Validators.required],
        });

        // Set the 'touched' state of the form controls to trigger error messages
        Object.keys(this.myForm.controls).forEach(key => {
            this.myForm.get(key)?.markAsTouched();
        });

		$(document).ready(() => {
		  $(".form-steps").hide();
		  $("#step_1").show();
		});

		$(".next-btn").click((e: any) => {
			e.preventDefault();
			var id = parseInt($(e.target).attr('data-id'));
			// console.log('working');
			// console.log(id);

			if (id === 1) {
                this.isNextButtonClicked = true;

                // Check if necessary fields are filled up
                if (this.myForm.get('fname1')?.valid && this.myForm.get('sname1')?.valid && this.myForm.get('cellphone1')?.valid && this.myForm.get('email1')?.valid) {
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
            }else{
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
    	return this.http.post(this.apiUrl+"save", formData);
    }

	onSubmit() {
        if (this.myForm.valid) {
          // Handle form submission
          const formData = this.myForm.value;
		//   console.log(formData);
      
          // Call the postData method to save the form data in the database
          this.postData(formData).subscribe(
            (response) => {
              const msg = response['message'];
              this.toastr.success(msg, 'Success');
			  setTimeout(() => {
				this.router.navigate(['/travel-notification-thank-you']); // Replace with your URL
			  }, 2000);
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
        } else {
          // Form is invalid, show error messages
          console.log('Form is invalid. Please check the errors.');
          this.toastr.error('Please fill in all required fields.', 'Error');
		  this.isNextButtonClickedLast = true;
		  this.highlightFirstInvalidControl();
        }
    }

	private highlightFirstInvalidControl() {
		const invalidControl = Object.keys(this.myForm.controls).find(key => this.myForm.get(key)?.invalid);
		if (invalidControl) {
		  this.myForm.get(invalidControl)?.markAsTouched();
		}
	}
}