import { SharedModule } from '@vendure/admin-ui/core';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { ApiService } from './student.service';



@Component({
    selector: 'student',
    templateUrl: './addstudentmemberships.component.html',		  			
	styleUrls: ['./addstudentmemberships.component.css'],       
    standalone: true,
    imports: [SharedModule],
})
export class AddStudentmembershipsComponent {
    greeting = 'Student';
    responseData: any;

 

  data: any;

  constructor(private http: HttpClient) {}

  getData() {
    this.http.get('http://157.245.36.128:4500/api/get_student_data').subscribe((response) => {
      this.data = response;
      console.log(response);
    });
  }
    // Call the createStudentReview function when needed

    // constructor(private studentService: StudentService) { }
    // ngOnInit(): void {
    //     const firstName = 'John'; // Static first name
    //     const lastName = 'Doe';   // Static last name
    
    //     this.studentService.createStudentReview(firstName, lastName)
    //       .then(
    //         (student) => {
    //           console.log('Student created:', student);
    //           // Handle success, e.g., show a success message to the user
    //         },
    //         (error) => {
    //           console.error('Error creating student:', error);
    //           // Handle error, e.g., show an error message to the user
    //         }
    //       );
    //   }
}