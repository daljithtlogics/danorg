import { Component, OnInit } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
declare var $: any; // Declare jQuery to avoid TypeScript errors

@Component({
  selector: 'report-an-incident',
  templateUrl: './report-an-incident.component.html',
  styleUrls: ['./report-an-incident.component.css']
})
export class ReportIncidentComponent implements OnInit{

    selectedFitnessLevel: string = '';

    myForm: FormGroup = new FormGroup({}); // Initialize with an empty FormGroup
    constructor(private fb: FormBuilder, private toastr: ToastrService, private http: HttpClient, private router: Router) { }
    private apiUrl = 'https://danshopapi.devworktdmc.com/travel_notification/'; // Replace with your API	endpoint	

    // Add a property in your component class
    isNextButtonClicked: boolean = false;
    isNextButtonClickedLast: boolean = false;


    // incident_type checkboxes start
    incidentTypeOptions: { label: string, value: string }[] = [
      { label: 'SCUBA diving', value: 'SCUBA diving' },
      { label: 'Rebreather diving', value: 'Rebreather diving' },
      { label: 'Breath-Hold / Freediving / Snorkeling', value: 'Breath-Hold/Freediving/Snorkeling' },
      { label: 'Surface supply', value: 'Surface supply' },
      { label: 'Technical diving', value: 'Technical diving' },
      { label: 'Commercial diving', value: 'Commercial diving' },
      { label: 'Military diving', value: 'Military diving' },
      { label: 'Civil diving', value: 'Civil diving' },
      { label: 'Pre-dive incident', value: 'Pre-dive incident' },
      { label: 'Non-diving activity', value: 'Non-diving activity' },
      { label: 'Operational or management incident', value: 'Operational or management incident' },
      { label: 'Boating incident/accident', value: 'Boating incident/accident' },
      { label: 'Equipment related', value: 'Equipment related' },
      { label: 'Recompression chamber incident', value: 'Recompression chamber incident' },
      { label: 'Health-related', value: 'Health-related' },
      { label: 'Medical treatment related', value: 'Medical treatment related' },
      { label: 'Others (please specify)', value: 'Others' }
    ];
    incidentCheckbox: { [key: string]: boolean } = {};
    incidentTextField: string = ''; // Add this line
    incidentValues: string = '';

    onIncidentCheckboxChange(incidentValue: string) {
      if (!this.incidentCheckbox[incidentValue]) {
        this.incidentTextField = '';
      }
    }
    // incident_type checkboxes end

    // medical condition checkboxes start
    medicalTypeOptions: { label: string, value: string }[] = [
      { label: 'Cardiac Issues (Coronary artery disease, heart failure, enlarged heart, LVH,...)', value: 'Cardiac Issues' },
      { label: 'Pulmonary issues (COPD, shortness of breath, asthma, feeling of fluid in lungs,...)', value: 'Pulmonary issues' },
      { label: 'Neurological issues', value: 'Neurological issues' },
      { label: 'Insomnia', value: 'Insomnia' },
      { label: 'Anxiety or panic syndrome', value: 'Anxiety or panic syndrome' },
      { label: 'Obesity', value: 'Obesity' },
      { label: 'Sleep apnea', value: 'Sleep apnea' },
      { label: 'Blood clotting disorder', value: 'Blood clotting disorder' },
      { label: 'Diabetes', value: 'Diabetes' },
      { label: 'Immune / Autoimmune disorder', value: 'Immune / Autoimmune disorder' },
      { label: 'Cancer', value: 'Cancer' },
      { label: 'I don\'t know', value: 'Idk' },
      { label: 'None of the above', value: 'Nota' },
      { label: 'Others', value: 'Others' }
    ];
    medicalCheckbox: { [key: string]: boolean } = {};
    medicalTextField: string = ''; // Add this line
    medicalValues: string = '';

    onMedicalCheckboxChange(medicalValue: string) {
      if (!this.medicalCheckbox[medicalValue]) {
        this.medicalTextField = '';
      }
    }
    // medical condition checkboxes end

    // discipline checkboxes start
    disciplineTypeOptions: { label: string, value: string }[] = [
      { label: 'Victim is not a diver (continue to next page)', value: 'Victim is not a diver' },
      { label: 'Open Circuit SCUBA (Recreational/Technical) without decompression', value: 'Open Circuit SCUBA (Recreational/Technical) without decompression' },
      { label: 'Open Circuit SCUBA (Recreational/Technical) with decompression', value: 'Open Circuit SCUBA (Recreational/Technical) with decompression' },
      { label: 'Closed Circuit (Rebreather) without decompression', value: 'Closed Circuit (Rebreather) without decompression' },
      { label: 'Closed Circuit (Rebreather) with decompression', value: 'Closed Circuit (Rebreather) with decompression' },
      { label: 'Spearfishing/Hunting/Collecting on open/closed circuit', value: 'Spearfishing/Hunting/Collecting on open/closed circuit' },
      { label: 'Overhead Environments', value: 'Overhead Environments' },
      { label: 'Scientific Diving', value: 'Scientific Diving' },
      { label: 'Public Safety Diving', value: 'Public Safety Diving' },
      { label: 'Commercial Diving', value: 'Commercial Diving' },
      { label: 'Freediving Recreational', value: 'Freediving Recreational' },
      { label: 'Freediving Competitive', value: 'Freediving Competitive' },
      { label: 'Freediving Spearfishing/Hunting/Collecting', value: 'Freediving Spearfishing/Hunting/Collecting' },
      { label: 'I don\'t know', value: 'Idk' },
      { label: 'Others', value: 'Others' }
    ];
    disciplineCheckbox: { [key: string]: boolean } = {};
    disciplineTextField: string = ''; // Add this line
    disciplineValues: string = '';

    onDisciplineCheckboxChange(disciplineValue: string) {
      if (!this.disciplineCheckbox[disciplineValue]) {
        this.disciplineTextField = '';
      }
    }
    // discipline checkboxes end

    // certification checkboxes start
    certificationTypeOptions: { label: string, value: string }[] = [
      { label: 'No Certification', value: 'No Certification' },
      { label: 'Open Water / Advanced Open Water', value: 'Open Water / Advanced Open Water' },
      { label: 'Rescue Diver', value: 'Rescue Diver' },
      { label: 'Dive Master or equivalent', value: 'Dive Master or equivalent' },
      { label: 'Instructor', value: 'Instructor' },
      { label: 'Technical Diver', value: 'Technical Diver' },
      { label: 'Commercial Diver', value: 'Commercial Diver' },
      { label: 'Police Diver', value: 'Police Diver' },
      { label: 'Research Diver', value: 'Research Diver' },
      { label: 'I don\'t know', value: 'Idk' }
    ];
    certificationCheckbox: { [key: string]: boolean } = {};
    certificationValues: string = '';
    
    // certification checkboxes end


    ngOnInit(): void {
      
      this.myForm = this.fb.group({
        fname1: ['', Validators.required],
        sname1: ['', Validators.required],
        cellphone1: ['', Validators.required],
        email1: ['', [Validators.required, Validators.email]],
        dan_member: [''],
        incident_type: [''],
        othersInputValue:[''],
        involved: [''],
        victim: [''],
        units: [''],
        gender: [''],
        height: [''],
        weight: [''],
        age: [''],
        fitness_level: [''],
        medical: [''],
        medicalInputValue:[''],
        discipline: [''],
        disciplineInputValue:[''],
        certification: [''],
        frequency: [''],
        lifetime_dives: [''],
        date_incident: [''],
        country_loc: ['', Validators.required],
        divesite_loc: ['', Validators.required],
        citytown_loc: ['', Validators.required],
        prob_situation: [''],
        the_dive: [''],
        outcome: [''],
        emergency_response: [''],
        contributing_factors: [''],
        lessons: [''],
        willing_talk: [''],
        doc_upload1: [''],
        doc_upload2: ['']
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
          
        // Check if data-id is 2
        if (id === 2) {
          this.isNextButtonClicked = true;

          if (this.myForm.get('fname1')?.valid && this.myForm.get('sname1')?.valid && this.myForm.get('cellphone1')?.valid && this.myForm.get('email1')?.valid) {       
            var next_id = id + 1;
            $(".form-steps").hide();
            $("#step_" + next_id + "").show();
            $('html, body').animate({
              scrollTop: $(".title").offset().top
            }, 100);
          } else {
            this.toastr.error('Please fill in all required fields.', 'Error');
          }
        } else if (id === 5) {
          this.isNextButtonClickedLast = true;
  
          if (this.myForm.get('country_loc')?.valid && this.myForm.get('divesite_loc')?.valid && this.myForm.get('citytown_loc')?.valid) {
            // Proceed to the next step
            var next_id = id + 1;
            $(".form-steps").hide();
            $("#step_" + next_id + "").show();
            $('html, body').animate({
                scrollTop: $(".title").offset().top
            }, 100);
          } else {
            this.toastr.error('Please fill in all required fields.', 'Error');
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
        // console.log('working');
        // console.log(id);
        var next_id = id - 1;
        $(".form-steps").hide();
        $("#step_" + next_id + "").show();
        $('html, body').animate({
        scrollTop: $(".title").offset().top
        }, 100);
      });	
    }

    postData(formData: any): Observable<any> {
      return this.http.post(this.apiUrl+"save_report_incident", formData);
    }
 
  onSubmit() {
      
      if (this.myForm.valid) {
          // Handle form submission
          this.incidentValues = Object.keys(this.incidentCheckbox)
          .filter(key => this.incidentCheckbox[key])
          .join(', ');
          console.log('incident type Values:', this.incidentValues);

          this.medicalValues = Object.keys(this.medicalCheckbox)
          .filter(key => this.medicalCheckbox[key])
          .join(', ');
          console.log('medical type Values:', this.medicalValues);

          this.disciplineValues = Object.keys(this.disciplineCheckbox)
          .filter(key => this.disciplineCheckbox[key])
          .join(', ');
          console.log('discipline type Values:', this.disciplineValues);

          this.certificationValues = Object.keys(this.certificationCheckbox)
          .filter(key => this.certificationCheckbox[key])
          .join(', ');
          console.log('certification Values:', this.certificationValues);

          const formData = this.myForm.value;
          formData.incident_type = this.incidentValues;
          formData.medical = this.medicalValues;
          formData.discipline = this.disciplineValues;
          formData.certification = this.certificationValues;

          console.log(formData);
          

          // Call the postData method to save the form data in the database
          // this.postData(formData).subscribe(
          //   (response) => {
          //     console.log('Form data successfully saved:', response);
          //     const successMessage = response['message'];
          //     this.toastr.success(successMessage, 'Success');

          //     // Redirect to the specified URL after a delay of 2000 ms
          //   setTimeout(() => {
          //     this.router.navigate(['/application-submit-success']); // Replace with your desired URL
          //   }, 4000);

          //   },
          //   (error) => {
          //     if (error.status === 500 && error.error.message === 'Email already exists') {
          //       // Handle specific error case: Email already exists
          //       this.toastr.error('Email already exists. Please use a different email address.', 'Error');
          //     }else{
          //       console.error('Error saving form data:', error);
          //     }
          //   }
          // );
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
      const invalidControl = Object.keys(this.myForm.controls).find(key => this.myForm.get(key)?.invalid);
      if (invalidControl) {
        this.myForm.get(invalidControl)?.markAsTouched();
      }
    }
	
}
