import { SharedModule } from '@vendure/admin-ui/core';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'; 
import { FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms';   		
import {NgForm} from '@angular/forms';  
import { ActivatedRoute } from '@angular/router';   

@Component({
    selector: 'createdive',    		
    templateUrl: './createdivefamily.component.html',		  		  						
	styleUrls: ['./addannualmemberships.component.css'],       						  
    standalone: true,
    imports: [SharedModule],
})
export class CreateDiveFamilyComponent implements OnInit {	          
      greeting = 'dive family';       
	  id: any;  
	  tab_id:any;     
	  diveForm: any;   
      responseData: any;       	  
	  form!: FormGroup;  	
	  info_title:any; 
	  info_dob:any;  	
	  f_name:any; 
	  freediver:any;  	
	  data: any;
	  
	  private apiUrl = 'https://danshopapi.devworktdmc.com/diver/add';  		
	
	constructor(private formbulider: FormBuilder,private http: HttpClient,private route: ActivatedRoute) {
        this.id = this.route.snapshot.paramMap.get('id');  
		this.tab_id = this.route.snapshot.paramMap.get('id');  	
    }		
	
	ngOnInit(): void { 
	
	
	this.diveForm = this.formbulider.group({
		  fname: ['', [Validators.required]], 		  		   
		  relation: ['', [Validators.required]], 		  	
		  cellphone: ['', [Validators.required]], 	 	
		  qualification: ['', [Validators.required]], 	  
		  email: ['', [Validators.required, Validators.email]],     
		  status: ['', [Validators.required]], 	  
		  title: [],    
		  sname: [],   
		  dob: [], 
		  passport: [], 
		  phonehome: [], 
		  phonework: [], 
		  agency: [], 
		  workdiver: [], 
		  freediver: [],  		  
		  capturedate: [], 
		  updatedate: [],   
		  paid:[],   
		  tab_id:[],  
		});   
		
      }  	  
	
	handleClick(tabName) {
       // console.log('New title'+tabName);  		
		 var i, tabcontent, tablinks;
         tabcontent = document.getElementsByClassName("tabcontent");
		 tablinks = document.getElementsByClassName("tablinks");  
		 
		  for (i = 0; i < tabcontent.length; i++) 
		  { 		  
				if(tabcontent[i].id.toUpperCase()==tabName.toUpperCase())		
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
				if(tabcontent[i].id.toUpperCase()==tabName.toUpperCase())		
				{
					tablinks[i].className += " active";			
				}
				else
				{
					tablinks[i].className = tablinks[i].className.replace("active","");				
				} 			
		  } 
		
      }
	  
	  formDataError: any = {
		msg: '',
		error_field: ''
	  };
	  
	  successMsg:any;

	  addDive(data:any): Observable<any> {
		return this.http.post<any>(this.apiUrl,data);	      		    							
	  }   

	 onSubmit(f: NgForm) {      	
    	  
    this.formDataError.msg='';
    this.formDataError.error_field='';		
    this.successMsg='';
	
	const form_data = this.diveForm.value;    
	console.log(form_data);    
	
    this.addDive(form_data).subscribe(		  
        response => {
          console.log('Success:', response);		
          // Handle success, show a success message, refresh student data, etc.
          //this.getStudentData(); // Refresh student data after adding a new student
         this.successMsg='Data Added';   		
		 //f.resetForm();      
		 
		 this.diveForm.controls['title'].reset();     
		 this.diveForm.controls['fname'].reset();   
		 
		 this.diveForm.controls['sname'].reset();     
		 this.diveForm.controls['dob'].reset();   
		 
		 this.diveForm.controls['passport'].reset();     
		 this.diveForm.controls['relation'].reset();   
		 
		 this.diveForm.controls['phonehome'].reset();     
		 this.diveForm.controls['phonework'].reset();   
		 
		 this.diveForm.controls['cellphone'].reset();     
		 this.diveForm.controls['email'].reset();   
		 
		 this.diveForm.controls['qualification'].reset();     
		 this.diveForm.controls['agency'].reset();   
		 
		 this.diveForm.controls['workdiver'].reset();     
		 this.diveForm.controls['freediver'].reset();   
		 
		 this.diveForm.controls['status'].reset();     
		 this.diveForm.controls['capturedate'].reset();     
		 
		 this.diveForm.controls['updatedate'].reset();     
		 this.diveForm.controls['paid'].reset();     		
          
        },	
        error => {
          console.error('Error:', error);
          this.formDataError.msg=error.error.error;
          this.formDataError.error_field=error.error.error_field;            
          // Handle error, show an error message, etc.		  
        }
      );
  }	
	
}    