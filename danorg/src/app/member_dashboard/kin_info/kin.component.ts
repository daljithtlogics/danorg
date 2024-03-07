import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'; 
import { FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms';   
import { Router } from '@angular/router';      	
import { ToastrService } from "ngx-toastr";     

@Component({
  selector: 'kin-dashboard',
  templateUrl: './kin.component.html',
  styleUrls: ['./kin.component.css']
})

export class KinInfo implements OnInit{
  
  userId: number | null = null;
  userEmail: string | null = null;
  userMembership: string | null = null;
  authToken: string | null = null;
  userAccess: string | null = null;   
  userRenew: string | null = null;     
  
  annualKinForm: any;
  temporaryKinForm:any;
  successMsg:any;
  data: any; 
  kin_title:any;  
  kin_fname:any;  
  kin_sname:any; 
  kin_dob:any;  	
	kin_passport:any;   
	kin_address1:any;   
	kin_address2:any; 
	kin_city:any;    	
	kin_province:any;    
	kin_post:any;    	
	kin_country:any;    
	kin_tel:any; 
	kin_num:any;   	
	kin_phone:any;     
	kin_email:any;     
	kin_relation:any;  
  kin_id:any;

  temp_kin_title:any;  
  temp_kin_fname:any;  
	temp_kin_sname:any; 
	temp_kin_dob:any;  	
	temp_kin_passport:any; 
	temp_kin_address1:any;   
	temp_kin_address2:any; 
	temp_kin_city:any;    	
	temp_kin_province:any;    
	temp_kin_post:any;    	
	temp_kin_country:any;    
	temp_kin_tel:any; 
	temp_kin_num:any;   	
	temp_kin_phone:any;     
	temp_kin_email:any;     
	temp_kin_relation:any;  
  temp_kin_id:any;   

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

  private apiUrl = 'https://danshopapi.devworktdmc.com/common_membership/'; 	

  constructor(private authService: AuthenticationService, private formbulider: FormBuilder, private http: HttpClient,private router: Router, private toastr: ToastrService) {
    this.kin_id = this.authService.getUserId();  
    this.temp_kin_id = this.authService.getUserId();  		
  }

  ngOnInit(): void {
    // Retrieve values from AuthenticationService
    this.userId = this.authService.getUserId();
    this.userEmail = this.authService.getUserEmail();
    this.userMembership = this.authService.getUserMembership();
    this.authToken = this.authService.getAuthToken();
	  this.userAccess = this.authService.getUserAccess();   
	  this.userRenew = this.authService.getUserRenew();     	    		

    // edit/update Kin-info annual form
	if ((this.router.url == '/kin-info') && (this.userAccess !='paid') || (this.userRenew ==='renew'))      
	{
		this.router.navigate(['dashboard']);       	         	                     			  		                    	  		  
	}  
    this.getAnnualData(this.kin_id); 

    this.annualKinForm = this.formbulider.group({
		  kin_title: ['', [Validators.required]], 	   
		  kin_fname: ['', [Validators.required]], 	
		  kin_sname: ['', [Validators.required]], 	   
		  kin_dob: ['', [Validators.required]], 
		  kin_passport: [],  
		  kin_address1: ['', [Validators.required]], 	   
		  kin_address2: [],  
		  kin_city: ['', [Validators.required]], 	 
		  kin_province: ['', [Validators.required]], 	  
		  kin_post: ['', [Validators.required]], 	  
		  kin_country: ['', [Validators.required]],   
		  kin_tel: [],  
		  kin_num: [],  
		  kin_phone: ['', [Validators.required]], 	  
		  kin_email: ['', [Validators.required]], 	      
		  kin_relation: ['', [Validators.required]], 	   
		});   

    // edit/update Kin-info temporary form
    this.getTemporaryData(this.temp_kin_id); 

    this.temporaryKinForm = this.formbulider.group({
		  kin_title: ['', [Validators.required]], 	   
		  kin_fname: ['', [Validators.required]], 	
		  kin_sname: ['', [Validators.required]], 	   
		  kin_dob: ['', [Validators.required]], 
		  kin_passport: [],  
		  kin_address1: ['', [Validators.required]], 	   
		  kin_address2: [],  
		  kin_city: ['', [Validators.required]], 	 
		  kin_province: ['', [Validators.required]], 	  
		  kin_post: ['', [Validators.required]], 	  
		  kin_country: ['', [Validators.required]],   
		  kin_tel: [],  
		  kin_num: [],  
		  kin_phone: ['', [Validators.required]], 	  
		  kin_email: ['', [Validators.required]], 	      
		  kin_relation: ['', [Validators.required]], 	   
		});   
  }

  updateKin(kin_id:any,data:any): Observable<any> {
    	    		    							
    const chosenMembership = this.authService.getUserMembership();
    // console.log(chosenMembership);
    
    // Modify apiUrl based on the selected choose_membership value
    switch (chosenMembership) {
      case 'student':
        this.apiUrl = 'https://danshopapi.devworktdmc.com/common_membership/update_student_kin';
      break;
      case 'annual':
        this.apiUrl = 'https://danshopapi.devworktdmc.com/common_membership/update_annual_kin';
      break;
      case 'commercial':
        this.apiUrl = 'https://danshopapi.devworktdmc.com/common_membership/update_commercial_kin';
      break;
      case 'temporary':
        this.apiUrl = 'https://danshopapi.devworktdmc.com/common_membership/update_temporary_kin';
      break;
      default:
        console.log('Oops! Something went wrong. Please try again later...');
    }

    return this.http.post<any>(this.apiUrl+'/'+kin_id,data);
  }    

  onSubmit() {    
    this.formDataError.msg='';
    this.formDataError.error_field='';		
    this.successMsg='';
	
	  // const form_data = this.annualKinForm.value; 
    let kinForm: FormGroup | null = null; // Initialize to null

    if (this.userMembership === 'annual') {
      kinForm = this.annualKinForm;
    } else if (this.userMembership === 'temporary') {
      kinForm = this.temporaryKinForm;
    }

    if (kinForm) {
      const form_data = kinForm.value;
      console.log(form_data);   
    
      this.updateKin(this.kin_id,form_data).subscribe(		  
        (response) => {
          console.log('Login success:', response);
          const successMessage = response['message'];
          this.toastr.success(successMessage, 'Success');		 		  
        },	
        (error) => {
            
            this.formDataError.msg=error.error.error;
            this.formDataError.error_field=error.error.error_field;			

            console.log(error.error.error);
            console.log(error.error.error_field);
            // Handle error, show an error message, etc.		  
        }
      );
    }else{
      console.log('kinForm is null. Unable to submit.');
    }
  }

  getAnnualData(kin_id:any) { 
    this.http.get('https://danshopapi.devworktdmc.com/common_membership/edit/'+kin_id).subscribe((response) => {
      this.data = response;

      this.kin_title=(this.data.length >0)?this.data[0].title2:'';       
      this.kin_fname=(this.data.length >0)?this.data[0].fname2:'';       
      this.kin_sname=(this.data.length >0)?this.data[0].sname2:'';     
      this.kin_dob=(this.data.length >0)?this.formatDate(this.data[0].dob2):'';	       
      this.kin_passport=(this.data.length >0)?this.data[0].passport2:'';       
      this.kin_address1=(this.data.length >0)?this.data[0].address3:'';  
      this.kin_address2=(this.data.length >0)?this.data[0].address4:'';    
      this.kin_city=(this.data.length >0)?this.data[0].city2:'';   
      this.kin_province=(this.data.length >0)?this.data[0].province2:'';   
      this.kin_post=(this.data.length >0)?this.data[0].postcode2:'';    	
      this.kin_country=(this.data.length >0)?this.data[0].country2:'';       
      this.kin_tel=(this.data.length >0)?this.data[0].telephone3:'';    
      this.kin_num=(this.data.length >0)?this.data[0].telephone4:'';    
      this.kin_phone=(this.data.length >0)?this.data[0].cellphone2:'';    	  
      this.kin_email=(this.data.length >0)?this.data[0].email2:'';          
      this.kin_relation=(this.data.length >0)?this.data[0].relation:'';   	  	
    });
  }

  getTemporaryData(kin_id:any) { 
    this.http.get('https://danshopapi.devworktdmc.com/common_membership/edit/'+kin_id).subscribe((response) => {
      this.data = response;

      this.temp_kin_title=(this.data.length >0)?this.data[0].title2:'';       
      this.temp_kin_fname=(this.data.length >0)?this.data[0].fname2:'';       
      this.temp_kin_sname=(this.data.length >0)?this.data[0].sname2:'';     
      this.temp_kin_dob=(this.data.length >0)?this.formatDate(this.data[0].dob2):'';	       
      this.temp_kin_passport=(this.data.length >0)?this.data[0].passport2:'';       
      this.temp_kin_address1=(this.data.length >0)?this.data[0].address3:'';  
      this.temp_kin_address2=(this.data.length >0)?this.data[0].address4:'';    
      this.temp_kin_city=(this.data.length >0)?this.data[0].city2:'';   
      this.temp_kin_province=(this.data.length >0)?this.data[0].province2:'';   
      this.temp_kin_post=(this.data.length >0)?this.data[0].postcode2:'';    	
      this.temp_kin_country=(this.data.length >0)?this.data[0].country2:'';       
      this.temp_kin_tel=(this.data.length >0)?this.data[0].telephone3:'';    
      this.temp_kin_num=(this.data.length >0)?this.data[0].telephone4:'';    
      this.temp_kin_phone=(this.data.length >0)?this.data[0].cellphone2:'';    	  
      this.temp_kin_email=(this.data.length >0)?this.data[0].email2:'';          
      this.temp_kin_relation=(this.data.length >0)?this.data[0].relation:'';   	  	
    });
  }

  formatDate(date_now :any) 
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
