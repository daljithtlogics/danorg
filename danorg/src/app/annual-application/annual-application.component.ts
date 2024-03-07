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
  selector: 'app-annual-application',
  templateUrl: './annual-application.component.html',
  styleUrls: ['./annual-application.component.css']
})

export class AnnualApplicationComponent implements OnInit{

    dynamicUrl: string = '';
    isNextButtonClickedFirst: boolean = false;
    isNextButtonClickedLast: boolean = false;
    isEmailExists: boolean = false;
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
        // console.log("Dynamic URL part:", this.dynamicUrl);              


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
            email_address: ['',Validators.required],
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
            package_name : ['', Validators.required],
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
    
        // Subscribe to changes in the email_address form control
        this.myForm.get('email_address')?.valueChanges.subscribe((email: string) => {
          if (email) {
              // Make HTTP request to check if email already exists
              this.http.get<{ exists: boolean }>(`https://danshopapi.devworktdmc.com/common_membership/checkEmail/${email}`).subscribe(
                  (response) => {                  
                      // console.log("response is", response.exists);
                      if (response.exists) {
                          // Show error if email exists
                          this.myForm.get('email_address')?.setErrors({ 'emailExists': true });
                      } else {
                          // Move to next step if email doesn't exist
                          this.myForm.get('email_address')?.setErrors(null);
                      }
                  },
                  (error) => {
                      console.error('Error occurred while checking email:', error);
                  }
              );
          }
        });

        $(".next-btn").click((e: any) => {
            e.preventDefault(); // Prevent default anchor tag behavior
            var id = parseInt($(e.target).attr('data-id'));
            // console.log('working');  
            // console.log(id);
    
            if (id === 1) {
              this.isNextButtonClickedFirst = true;
            }

            if (!this.myForm.get('email_address')?.invalid) {
              var next_id = id + 1;
              $(".form-steps").hide();
              $("#step_" + next_id + "").show();
              $('html, body').animate({
                  scrollTop: $(".title").offset().top
              }, 100);
            }
        });
    
        $(".back-btn").click((e: any) => {
            e.preventDefault(); // Prevent default anchor tag behavior
            var id = parseInt($(e.target).attr('data-id'));
            // console.log('working');
            // console.log(id);
            var next_id = id - 1;
            $(".form-steps").hide();
            $("#step_" + next_id + "").show();
            $('html, body').animate({
                scrollTop: $(".title").offset().top
            }, 100);
        });
      });

    }

    

    postData(formData: any): Observable<any> {
      return this.http.post(this.apiUrl+"annual_register",formData);													
    }

    onSubmit(f: any) {  
      if (this.myForm.valid) {
        
        this.diver_typeValues = Object.keys(this.diver_typeCheckbox)
          .filter(key => this.diver_typeCheckbox[key])
          .join(', ');
        // console.log('diver_type Values:', this.diver_typeValues);

        this.diver_type1Values = Object.keys(this.diver_type1Checkbox)
        .filter(key => this.diver_type1Checkbox[key])
        .join(', ');
        // console.log('diver_type1 Values:', this.diver_type1Values);

        this.diver_type2Values = Object.keys(this.diver_type2Checkbox)
        .filter(key => this.diver_type2Checkbox[key])
        .join(', ');
        // console.log('diver_type2 Values:', this.diver_type2Values);

        this.diver_type3Values = Object.keys(this.diver_type3Checkbox)
        .filter(key => this.diver_type3Checkbox[key])
        .join(', ');
        // console.log('diver_type3 Values:', this.diver_type3Values);

        this.diver_type4Values = Object.keys(this.diver_type4Checkbox)
        .filter(key => this.diver_type4Checkbox[key])
        .join(', ');
        // console.log('diver_type4 Values:', this.diver_type4Values);

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
			        f.resetForm();   
              const successMessage = response['message'];
              this.toastr.success(successMessage, 'Success');		 				  

              setTimeout(() => {
                this.router.navigate(['/application-submit-success']); // Replace with your desired URL
              }, 2000);
           },
           (error) => {
             console.error('Error:', error.error.error);		
			      // console.error('Error:', error); 
			      console.error(error.error.error,'Error');    		 
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
