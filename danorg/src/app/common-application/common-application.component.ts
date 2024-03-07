// 10 nov 2023 annual-app.component.ts file 12:50pm
import { Component, OnInit } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import {NgForm} from '@angular/forms';   
declare var $: any; // Declare jQuery to avoid TypeScript errors

@Component({
  selector: 'app-common-application',
  templateUrl: './common-application.component.html',
  styleUrls: ['./common-application.component.css']
})
export class CommonApplicationComponent implements OnInit{

    dynamicUrl: string = '';
    isNextButtonClickedLast: boolean = false;


    myForm: FormGroup = new FormGroup({}); // Initialize with an empty FormGroup

    constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private toastr: ToastrService, private http: HttpClient) {}

    private apiUrl = 'https://danshopapi.devworktdmc.com/common_membership/'; // Replace with your API	endpoint

    diver_typeTypeOptions: { label: string, value: string }[] = [
      { label: 'Scuba Diver', value: 'Scuba Diver' },
      { label: 'Technical Diver', value: 'Technical Diver' },
      { label: 'Freediver', value: 'Freediver' },
      { label: 'Spearfisherman', value: 'Spearfisherman' },
      { label: 'Snorkeler', value: 'Snorkeler' },
    ];
    diver_typeCheckbox: { [key: string]: boolean } = {};
    diver_typeValues: string = '';

    diver_type1TypeOptions: { label: string, value: string }[] = [
      { label: 'Scuba Diver', value: 'Scuba Diver' },
      { label: 'Technical Diver', value: 'Technical Diver' },
      { label: 'Freediver', value: 'Freediver' },
      { label: 'Spearfisherman', value: 'Spearfisherman' },
      { label: 'Snorkeler', value: 'Snorkeler' },
    ];
    diver_type1Checkbox: { [key: string]: boolean } = {};
    diver_type1Values: string = '';

    diver_type2TypeOptions: { label: string, value: string }[] = [
      { label: 'Scuba Diver', value: 'Scuba Diver' },
      { label: 'Technical Diver', value: 'Technical Diver' },
      { label: 'Freediver', value: 'Freediver' },
      { label: 'Spearfisherman', value: 'Spearfisherman' },
      { label: 'Snorkeler', value: 'Snorkeler' },
    ];
    diver_type2Checkbox: { [key: string]: boolean } = {};
    diver_type2Values: string = '';

    diver_type3TypeOptions: { label: string, value: string }[] = [
      { label: 'Scuba Diver', value: 'Scuba Diver' },
      { label: 'Technical Diver', value: 'Technical Diver' },
      { label: 'Freediver', value: 'Freediver' },
      { label: 'Spearfisherman', value: 'Spearfisherman' },
      { label: 'Snorkeler', value: 'Snorkeler' },
    ];
    diver_type3Checkbox: { [key: string]: boolean } = {};
    diver_type3Values: string = '';

    diver_type4TypeOptions: { label: string, value: string }[] = [
      { label: 'Scuba Diver', value: 'Scuba Diver' },
      { label: 'Technical Diver', value: 'Technical Diver' },
      { label: 'Freediver', value: 'Freediver' },
      { label: 'Spearfisherman', value: 'Spearfisherman' },
      { label: 'Snorkeler', value: 'Snorkeler' },
    ];
    diver_type4Checkbox: { [key: string]: boolean } = {};
    diver_type4Values: string = '';

    ngOnInit(): void {

        const currentUrl = this.router.url;
        const parts = currentUrl.split('/');
        const secondPart = parts[1];
        const subParts = secondPart.split('-');
        this.dynamicUrl = subParts[0]; // Extracting "annual"
        console.log("Dynamic URL part:", this.dynamicUrl);


      this.myForm = this.fb.group({
            title: [''],
            first_name: [''],
            last_name: [''],
            dob: [''],
            passport: [''],
            street: [''],
            city: [''],
            state: [''],
            postal_code: [''],
            tel_home: [''],
            tel_work: [''],
            cell_phone: [''],
            email_address: [''],
            country: [''],
            qualification: [''],
            agency: [''],
            working_as: [''],
            diver_type: [''],                     
            ref_dive_centre: [''],                        
            ref_dive_instructor: [''],            
            aid: [''],           
            aid_no: [''],
            medication: [''],
            chronic_ill: [''], 
            family_title1: [''],
            family_fname1: [''], 
            family_sname1: [''], 
            family_dob1: [''], 
            family_passport1: [''], 
            family_email1: [''], 
            family_phone1: [''], 
            family_diver1: [''], 
            diver_type1: [''], 
            family_workingAs1: [''], 
            family_medication1: [''], 
            family_chronic1: [''], 
            family_title2: [''],
            family_fname2: [''], 
            family_sname2: [''], 
            family_dob2: [''], 
            family_passport2: [''], 
            family_email2: [''], 
            family_phone2: [''], 
            family_diver2: [''], 
            diver_type2: [''], 
            family_workingAs2: [''], 
            family_medication2: [''], 
            family_chronic2: [''], 
            family_title3: [''],
            family_fname3: [''], 
            family_sname3: [''], 
            family_dob3: [''], 
            family_passport3: [''], 
            family_email3: [''], 
            family_phone3: [''], 
            family_diver3: [''], 
            diver_type3: [''], 
            family_workingAs3: [''], 
            family_medication3: [''], 
            family_chronic3: [''], 
            family_title4: [''],
            family_fname4: [''], 
            family_sname4: [''], 
            family_dob4: [''], 
            family_passport4: [''], 
            family_email4: [''], 
            family_phone4: [''], 
            family_diver4: [''], 
            diver_type4: [''], 
            family_workingAs4: [''], 
            family_medication4: [''], 
            family_chronic4: [''], 
            kin_title: [''],        
            kin_fname: [''],   
            kin_sname: [''],
            kin_dob: [''],
            kin_passport: [''],
            kin_street: [''],
            kin_city: [''],
            kin_state: [''],
            kin_postal_code: [''],
            kin_home: [''],
            kin_work: [''],
            kin_mobile: [''],
            kin_email_address: [''],
            kin_relation : [''],
            start_date : [''],
            package_name : [''],
            members_add: [''],
            family_packageName1 : [''],
            family_packageName2 : [''],
            family_packageName3 : [''],
            family_packageName4 : [''],
            payment_opt: [''],
            agree: ['',Validators.required]
      });

      // Set the 'touched' state of the form controls to trigger error messages
      Object.keys(this.myForm.controls).forEach(key => {
        this.myForm.get(key)?.markAsTouched();
      });

      $(document).ready(() => {
        $(".form-steps").hide();
        $("#step_1").show();
    
        $(".next-btn").click((e: any) => {
            e.preventDefault(); // Prevent default anchor tag behavior
            var id = parseInt($(e.target).attr('data-id'));
            console.log('working');  
            console.log(id);
    
          // Your existing code for handling next button clicks...
          // if (id === 1) {
          //     this.isNextButtonClicked = true;

          //     // Check if necessary fields are filled up
          //     if (this.myForm.get('title')?.valid && this.myForm.get('first_name')?.valid && this.myForm.get('last_name')?.valid && this.myForm.get('dob')?.valid && this.myForm.get('street')?.valid && this.myForm.get('city')?.valid && this.myForm.get('state')?.valid && this.myForm.get('postal_code')?.valid && this.myForm.get('country')?.valid && this.myForm.get('cell_phone')?.valid && this.myForm.get('email_address')?.valid) {
          //         // Proceed to the next step
          //         var next_id = id + 1;
          //         $(".form-steps").hide();
          //         $("#step_" + next_id + "").show();
          //         $('html, body').animate({
          //             scrollTop: $(".title").offset().top
          //         }, 100);
          //     } else {
          //         // Display a toast message
          //         this.toastr.error('Please fill in all required fields.', 'Error');
          //     }
          // } else if (id === 2) {
          //     // Check additional conditions for the second step
          //     this.isNextButtonClicked2 = true;

          //     if (this.myForm.get('agency')?.valid && this.myForm.get('qualification')?.valid) {
          //         // Proceed to the next step
          //         var next_id = id + 1;
          //         $(".form-steps").hide();
          //         $("#step_" + next_id + "").show();
          //         $('html, body').animate({
          //             scrollTop: $(".title").offset().top
          //         }, 100);
          //     } else {
          //         // Display a toast message or handle as needed
          //         this.toastr.error('Additional conditions for the second step are not met.', 'Error');
          //     }
          // } else if (id === 3) {
          //     // Check additional conditions for the second step
          //     this.isNextButtonClicked3 = true;

          //     if (this.myForm.get('aid')?.valid && this.myForm.get('aid_no')?.valid && this.myForm.get('aid_dep')?.valid) {
          //         // Proceed to the next step
          //         var next_id = id + 1;
          //         $(".form-steps").hide();
          //         $("#step_" + next_id + "").show();
          //         $('html, body').animate({
          //             scrollTop: $(".title").offset().top
          //         }, 100);
          //     } else {
          //         // Display a toast message or handle as needed
          //         this.toastr.error('Additional conditions for the third step are not met.', 'Error');
          //     }
          // } else if (id === 5) {
          //     this.isNextButtonClicked5 = true;

          //     // Check if necessary fields are filled up
          //     if (this.myForm.get('kin_title')?.valid && this.myForm.get('kin_first_name')?.valid && this.myForm.get('kin_last_name')?.valid && this.myForm.get('kin_dob')?.valid && this.myForm.get('kin_street')?.valid && this.myForm.get('kin_city')?.valid && this.myForm.get('kin_state')?.valid && this.myForm.get('kin_postal_code')?.valid && this.myForm.get('kin_country')?.valid && this.myForm.get('kin_cell_phone')?.valid && this.myForm.get('kin_email_address')?.valid && this.myForm.get('kin_relation')?.valid) {
          //         // Proceed to the next step
          //         var next_id = id + 1;
          //         $(".form-steps").hide();
          //         $("#step_" + next_id + "").show();
          //         $('html, body').animate({
          //             scrollTop: $(".title").offset().top
          //         }, 100);
          //     } else {
          //         // Display a toast message
          //         this.toastr.error('Please fill in all required fields.', 'Error');
          //     }
          // } else if (id === 6) {
          //     this.isNextButtonClicked6 = true;

          //     // Check if necessary fields are filled up
          //     if (this.myForm.get('start_date')?.valid && this.myForm.get('join_date')?.valid && this.myForm.get('package')?.valid) {
                  
          //         $(".form-steps").hide();
          //         $('html, body').animate({
          //             scrollTop: $(".title").offset().top
          //         }, 100);
          //     } else {
          //         // Display a toast message
          //         this.toastr.error('Please fill in all required fields.', 'Error');
          //     }
          // } else {
              // For other steps, proceed to the next step without additional checks
              var next_id = id + 1;
              $(".form-steps").hide();
              $("#step_" + next_id + "").show();
              $('html, body').animate({
                  scrollTop: $(".title").offset().top
              }, 100);
          // }
        });
    
        $(".back-btn").click((e: any) => {
            e.preventDefault(); // Prevent default anchor tag behavior
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
      });
    }

    // Custom validator for confirming passwords
    passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
      const password = control.get('new_pwd')?.value;
      const confirmPassword = control.get('confirm_pwd')?.value;

      return password === confirmPassword ? null : { mismatch: true };
    }

    // Validator to check if either password or confirm_pwd has an error
    checkPasswords(group: AbstractControl): ValidationErrors | null {
      const password = group.get('new_pwd');
      const confirmPwd = group.get('confirm_pwd');
      return password && confirmPwd && password.value === confirmPwd.value ? null : { mismatch: true };
    }

    postData(formData: any): Observable<any> {
      return this.http.post(this.apiUrl+"annual_register",formData);													
    }


    // onSubmit() {
    //     if (this.myForm.valid) {
    //       const formData = this.myForm.value;
    //       console.log(formData);
          
    //       // Call the postData method to save the form data in the database
    //       // this.postData(formData).subscribe(
    //       //   (response) => {
    //       //     // console.log('Form data successfully saved:', response);
    //       //     const successMessage = response['message'];
    //       //     this.toastr.success(successMessage, 'Success');

    //       //     // Redirect to the specified URL after a delay of 2000 ms
    //       //   setTimeout(() => {
    //       //     this.router.navigate(['/application-submit-success']); // Replace with your desired URL
    //       //   }, 2000);

    //       //   },
    //       //   (error) => {
    //       //     if (error.status === 500 && error.error.message === 'Email already exists') {
    //       //       // Handle specific error case: Email already exists
    //       //       this.toastr.error('Email already exists. Please use a different email address.', 'Error');
    //       //     }else{
    //       //       console.error('Error saving form data:', error);
    //       //     }
    //       //   }
    //       // );
    //     } else {
    //       // Form is invalid, show error messages
    //       // console.log('Form is invalid. Please check the errors.');
    //       this.toastr.error('Please fill in all required fields.', 'Error');

    //       this.isNextButtonClicked = true;
    //       // Highlight the first invalid control for better user experience
    //       this.highlightFirstInvalidControl();
    //     }
    // }

    onSubmit(f: any) {  
      if (this.myForm.valid) {
        
        this.diver_typeValues = Object.keys(this.diver_typeCheckbox)
          .filter(key => this.diver_typeCheckbox[key])
          .join(', ');
        console.log('diver_type Values:', this.diver_typeValues);

        this.diver_type1Values = Object.keys(this.diver_type1Checkbox)
        .filter(key => this.diver_type1Checkbox[key])
        .join(', ');
        console.log('diver_type1 Values:', this.diver_type1Values);

        this.diver_type2Values = Object.keys(this.diver_type2Checkbox)
        .filter(key => this.diver_type2Checkbox[key])
        .join(', ');
        console.log('diver_type2 Values:', this.diver_type2Values);

        this.diver_type3Values = Object.keys(this.diver_type3Checkbox)
        .filter(key => this.diver_type3Checkbox[key])
        .join(', ');
        console.log('diver_type3 Values:', this.diver_type3Values);

        this.diver_type4Values = Object.keys(this.diver_type4Checkbox)
        .filter(key => this.diver_type4Checkbox[key])
        .join(', ');
        console.log('diver_type4 Values:', this.diver_type4Values);

        const formData = this.myForm.value;
        formData.diver_type = this.diver_typeValues;
        formData.diver_type1 = this.diver_type1Values;
        formData.diver_type2 = this.diver_type2Values;
        formData.diver_type3 = this.diver_type3Values;
        formData.diver_type4 = this.diver_type4Values;
        // console.log(formData);
    
        // Call the postData method to save the form data in the database
        this.postData(formData).subscribe(
           (response) => {
             console.log('Form data successfully saved:', response);
			 f.resetForm();    				  
             this.toastr.success('Form data successfully saved!', 'Success');		
           },
           (error) => {
             console.error('Error:', error.error.error);		
			 // console.error('Error:', error); 
			 this.toastr.error(error.error.error,'Error');    		 
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
