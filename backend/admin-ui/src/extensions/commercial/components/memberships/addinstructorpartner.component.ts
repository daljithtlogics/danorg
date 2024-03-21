import { PageMetadataService,SharedModule } from '@vendure/admin-ui/core';  
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'; 
import { FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms';   
import {NgForm} from '@angular/forms';  
import { ActivatedRoute } from '@angular/router';   

@Component({
    selector: 'createdive',    		
    templateUrl: './addinstructorpartner.component.html',	  								  		  						
	styleUrls: ['./addannualmemberships.component.css'],       						  
    standalone: true,
    imports: [SharedModule],
})
export class AddInstructorPartnerComponent implements OnInit {	          
      greeting = 'New instructor';       
	  id: any;  
	  row_id:any;     
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
	  private apiUrl = 'https://danshopapi.devworktdmc.com/instructor/create';  	  			
	
	constructor(private formbulider: FormBuilder,private http: HttpClient,private pageMetadataService: PageMetadataService,private route: ActivatedRoute) {
        this.id = this.route.snapshot.paramMap.get('id');  
		this.row_id = this.route.snapshot.paramMap.get('id'); 
		pageMetadataService.setBreadcrumbs([
            { link: ['./extensions/memberships/partner'], label: 'Partner Members' },        
			{ link: ['./extensions/memberships/partner/editpartner/'+this.id], label: 'Edit Partner' },    
            { link: ['./'], label: 'Add Instructor' },  				   	           			     		    		
        ]);    	
    }		
	
	ngOnInit(): void { 
	
	
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
		  row_id:[],  
		});   
		
      }  	  	
	  
	  formDataError: any = {
		msg: '',
		error_field: ''
	  };	

	  addInstructor(data:any): Observable<any> {
		return this.http.post<any>(this.apiUrl,data);	      		    							
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

		this.addInstructor(form_data).subscribe(		  
		response => {
		 console.log('Success:', response);	
		 this.successMsg='Data Added';   			    
		 
		 this.instrucForm.controls['title'].reset();    	 
		 this.instrucForm.controls['fname'].reset();   	
		 this.instrucForm.controls['sname'].reset();     
		 this.instrucForm.controls['passport'].reset();   	  
		 
		 this.instrucForm.controls['dob'].reset();     
		 this.instrucForm.controls['address1'].reset();   		 
		 this.instrucForm.controls['address2'].reset();     
		 this.instrucForm.controls['city'].reset();   	
		 
		 this.instrucForm.controls['province'].reset();     
		 this.instrucForm.controls['postal'].reset();   

		 this.instrucForm.controls['country'].reset();     
		 this.instrucForm.controls['phonework'].reset();   	
		 this.instrucForm.controls['cellphone'].reset();     
		 this.instrucForm.controls['phonehome'].reset();   	

		 this.instrucForm.controls['fax'].reset();     
		 this.instrucForm.controls['agency'].reset();   		
		 this.instrucForm.controls['email'].reset();       		
		  
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
	
}    