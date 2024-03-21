import { PageMetadataService,SharedModule } from '@vendure/admin-ui/core';    
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormControl,FormGroup,FormsModule } from '@angular/forms';					  		
import {NgForm} from '@angular/forms'; 



@Component({
    selector: 'addstudent',  
    templateUrl: './addstudentmemberships.component.html',		  			
	  styleUrls: ['./addstudentmemberships.component.css'],       
    standalone: true,
    imports: [SharedModule,FormsModule],
})
export class AddStudentmembershipsComponent implements OnInit {     
    greeting = 'Student';
	reasons:any; 
	sub_reasons:any;	 
	users: any = [];	   	
    responseData: any;
    data: any;
    private apiUrl = 'https://danshopapi.devworktdmc.com/student/add'; // Replace this with your API endpoint

	constructor(private http: HttpClient,private pageMetadataService: PageMetadataService) {
		this.getReasons();   
		pageMetadataService.setBreadcrumbs([
			{ link: ['./extensions/memberships/student'], label: 'Student Members' },   		
			{ link: ['./'], label: 'Add Student' },   			  		 						     		
		]);  	
	  } 

	ngOnInit() { 			
		this.getProfiles();     
      }	

  onChange(event: any) {
		  
		const opt_id = event.currentTarget.options[event.currentTarget.options.selectedIndex].value;
		
		if(opt_id !='')
		{ 			
			this.http.get('https://danshopapi.devworktdmc.com/annual/subreasons/'+opt_id).subscribe((response) => {
			  this.sub_reasons = response;  					                   		               					
			});	
		}
		else
		{
			this.sub_reasons = [];   		
		} 			
		
	}
  
  handleClick(cityName) {
    // console.log('New title'+cityName);  
      var i, tabcontent, tablinks;
      tabcontent = document.getElementsByClassName("tabcontent");
      tablinks = document.getElementsByClassName("tablinks");  
  
   for (i = 0; i < tabcontent.length; i++) 
   {
   
     if(tabcontent[i].id==cityName)
     {
       tabcontent[i].style.display = "block";   
       tabcontent[i].className = tabcontent[i].className.replace("fade","active");  
     }	
     else		
     {
       tabcontent[i].style.display = "none";
       tabcontent[i].className = tabcontent[i].className.replace("active","fade");      
     }
   
   }


   for (i = 0; i < tablinks.length; i++) 
   {
     if(tabcontent[i].id==cityName)
     {
       tablinks[i].className += " active";			
     }
     else
     {
       tablinks[i].className = tablinks[i].className.replace("active","");				
     }
   
   }
 
  }

  formData: any = {
    infoTitle : '',
    firstName : '',
    surName : '',
    infoDob : '',
    infoPassport : '',
    medicalAid : '',
    instructor : '',
    medicalAidNo : '',
    startDate : '',
    infoAddress1 : '',
    infoAddress2 : '',
    infoCity : '',
    infoProvince : '',
    postCode : '',
    infoCountry : '',
    telHome : '',
    telWork : '',
    cellPhone: '',
    fax: '',
    infoEmail: '',
    mainReason: '',
    subReason: '',
    comment : ''
  };



  formDataError: any = {
    msg: '',
    error_field: ''
  };
  successMsg:any;

  addStudent(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  onSubmit(f: NgForm) {
    this.formDataError.msg='';
    this.formDataError.error_field='';
    this.successMsg='';
    this.addStudent(this.formData).subscribe(
        response => {
          console.log('Success:', response);
          // Handle success, show a success message, refresh student data, etc.
          //this.getStudentData(); // Refresh student data after adding a new student
         this.successMsg='Data Added';
         f.resetForm(); 
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

  getReasons(){
	this.http.get('https://danshopapi.devworktdmc.com/annual/reasons').subscribe((response) => {
      this.reasons = response;                   		               					
    });
  }    
  
  getProfiles() {
    this.http.get('https://danshopapi.devworktdmc.com/annual/active_members').subscribe((response) => {
      this.users = response;     		           					
    });
  }

}