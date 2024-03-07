import { SharedModule } from '@vendure/admin-ui/core';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


@Component({
    selector: 'addcommercial',  
    templateUrl: './addcommercialmemberships.component.html',		  								
	styleUrls: ['./addstudentmemberships.component.css'],             
    standalone: true,
    imports: [SharedModule,FormsModule],
})
export class AddCommercialmembershipsComponent {   
    greeting = 'commercial';
    responseData: any;      

	  data: any;
	  private apiUrl = 'https://danshopapi.devworktdmc.com/api/commercial/add'; // Replace this with your API endpoint

	  constructor(private http: HttpClient) {}
	  formData: any = {
		firstName: '',
		lastName: '',
		email: '',
		mobile: '',
		password: ''
	  };  

  formDataError: any = {
    msg: '',
    error_field: ''
  };
  successMsg:any;

  addCommercial(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);						
  }

  onSubmit() {
    this.formDataError.msg='';
    this.formDataError.error_field='';
    this.successMsg='';
    this.addCommercial(this.formData).subscribe(		
        response => {
          console.log('Success:', response);
          // Handle success, show a success message, refresh student data, etc.
          //this.getStudentData(); // Refresh student data after adding a new student
         this.successMsg='Data Added';
          
        },
        error => {
          console.error('Error:', error);
          this.formDataError.msg=error.error.error;
          this.formDataError.error_field=error.error.error_field;

          console.log(error.error.error);
          console.log(error.error.error_field);
          // Handle error, show an error message, etc.		
        }
      );
  }

  getData() {
    this.http.get('https://danshopapi.devworktdmc.com/api/commercial/get').subscribe((response) => {
      this.data = response;
      console.log(response);					
    });
  }
				
}