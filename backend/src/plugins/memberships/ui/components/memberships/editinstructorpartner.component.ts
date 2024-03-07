import { SharedModule } from '@vendure/admin-ui/core';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'; 
import { FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms';     
import { ActivatedRoute } from '@angular/router';   

@Component({
    selector: 'createdive',    		
    templateUrl: './editinstructorpartner.component.html',	 		 								  		  						
	styleUrls: ['./addannualmemberships.component.css'],      		 						  
    standalone: true,
    imports: [SharedModule],
})
export class EditInstructorPartnerComponent implements OnInit {	          
      greeting = 'Edit instructor';         
	  id: any;   	   
	  instrucForm: any;            	  
	  form!: FormGroup;
	  formSubmitted: boolean = false;    	
	  formError: boolean = false; 	  			
	  fname:any; 
	  sname:any;  	
	  title:any; 
	  dob:any;   
	  passport:any; 
	  address1:any; 
	  address2:any;  	
	  city:any; 
	  province:any;  
	  postal:any; 
	  country:any;  	
	  phonework:any; 
	  cellphone:any; 
	  phonehome:any; 
	  fax:any;  	
	  email:any;
	  agency:any; 
	  successMsg:any;   
	  data: any;
	  responseData: any;      
	  private apiUrl = 'https://danshopapi.devworktdmc.com/instructor/update';  				
	
	constructor(private formbulider: FormBuilder,private http: HttpClient,private route: ActivatedRoute) {
        this.id = this.route.snapshot.paramMap.get('id');  
    }		
	
	ngOnInit(): void { 
	
		this.getData(this.id); 	  
	
		this.instrucForm = this.formbulider.group({
		  fname: ['', [Validators.required]], 
		  cellphone: ['', [Validators.required]], 	 	
		  city: ['', [Validators.required]], 	  
		  country: ['', [Validators.required]], 	  		
		  passport: ['', [Validators.required]], 				
		  postal: ['', [Validators.required]], 		  	
		  email: ['', [Validators.required, Validators.email]], 
		  dob: ['', [Validators.required,Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],  		   
		  title: [],    
		  sname: [],     
		  fax: [],  		  		
		  phonehome: [], 
		  phonework: [], 
		  agency: [],  		  
		  address1:[],   
		  address2:[], 
		  province: [], 	
		});   
		
      }  	  	
	  
	  formDataError: any = {
		msg: '',
		error_field: ''
	  };	

	  updateInstructor(id:any,data:any): Observable<any> {
		return this.http.post<any>(this.apiUrl+'/'+id,data);	  				    		    							
	  }	

	onSubmit() { 

	if (this.instrucForm.invalid)
	{
		this.formError = true;   
		this.formSubmitted = true;  		
		this.successMsg='';   	
		return false;  
	}      
    else
	{ 	
	
		this.formError = false;   
		this.formSubmitted = false;       
		this.formDataError.msg='';
		this.formDataError.error_field='';	  

		const form_data = this.instrucForm.value;    

		this.updateInstructor(this.id,form_data).subscribe(		  
		response => {
		 console.log('Success:', response);	  		
		 this.successMsg='Data Updated';   		  		  
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
  
   getData(id) { 
	  this.http.get('https://danshopapi.devworktdmc.com/instructor/edit/'+id).subscribe((response) => {
      this.data = response;  
	  this.title=(this.data.length >0)?this.data[0].title1:'';   	
	  this.fname=(this.data.length >0)?this.data[0].fname1:'';  
	  this.sname=(this.data.length >0)?this.data[0].sname1:''; 		
	  this.passport=(this.data.length >0)?this.data[0].passport1:'';       				    
	  this.dob=(this.data.length >0)?this.formatDate(this.data[0].dob1):'';   			
	  this.address1=(this.data.length >0)?this.data[0].address1:'';	
	  this.address2=(this.data.length >0)?this.data[0].address2:'';	  
	  this.city=(this.data.length >0)?this.data[0].city1:'';    
	  this.province=(this.data.length >0)?this.data[0].province1:'';     
	  this.postal=(this.data.length >0)?this.data[0].postcode1:'';   	
	  this.country=(this.data.length >0)?this.data[0].country1:'';      
	  this.phonework=(this.data.length >0)?this.data[0].telephone2:'';   
	  this.cellphone=(this.data.length >0)?this.data[0].cellphone1:''; 
	  this.phonehome=(this.data.length >0)?this.data[0].telephone1:'';    
	  this.fax=(this.data.length >0)?this.data[0].fax:'';   
	  this.email=(this.data.length >0)?this.data[0].email1:'';   
	  this.agency=(this.data.length >0)?this.data[0].agency:'';     				
	
    });
  }  
  
  formatDate(date_now) 
  {  	
	if (date_now != null)
	{
		var d = new Date(date_now),   
		month = '' + (d.getMonth() + 1),	
		day = '' + d.getDate(),
		year = d.getFullYear();

		if (month.length < 2) 
			month = '0' + month;
		if (day.length < 2) 
			day = '0' + day;

		return [year, month, day].join('-');			
	}
	else
	{
		return '';  
	}  	
	
   }   
	
}    