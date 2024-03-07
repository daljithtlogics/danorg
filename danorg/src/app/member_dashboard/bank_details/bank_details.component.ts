import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'; 
import { FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms';    
import { Router } from '@angular/router';      		
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'BankDetailsMember-dashboard',
  templateUrl: './bank_details.component.html',
  styleUrls: ['./bank_details.component.css']
})
  
export class BankDetailsMember implements OnInit {
  
  userId: number | null = null;
  userEmail: string | null = null;
  userMembership: string | null = null;
  authToken: string | null = null;
  userAccess: string | null = null;  
  userRenew: string | null = null;     


  anualBankForm: any;   
  session_id:any;
  bank_id:any;
  data:any;
  pay_method:any;  
  pay_period:any; 
  account_holder:any;  
	institute:any;  
	account_type:any;  
	account_no:any;   
	card_expiry:any; 	
	branch:any;   
	branch_code:any;  
	authorise_sign:any; 
  debt:any;  

  formDataError: any = {
    msg: '',
    error_field: ''
  };
  successMsg:any;

  constructor(private authService: AuthenticationService, private formbulider: FormBuilder,private http: HttpClient,private router: Router, private toastr: ToastrService) {
    this.session_id = this.authService.getUserId();  
  }

  ngOnInit(): void {
    // Retrieve values from AuthenticationService
    this.userId = this.authService.getUserId();
    this.userEmail = this.authService.getUserEmail();
    this.userMembership = this.authService.getUserMembership();
    this.authToken = this.authService.getAuthToken();
	  this.userAccess = this.authService.getUserAccess(); 
	  this.userRenew = this.authService.getUserRenew();     	    		
	
    if ((this.router.url == '/bank-details') && (this.userAccess !='paid') || (this.userRenew ==='renew'))      
    {
      this.router.navigate(['dashboard']);                  	    	                     			  		                    	  		  
    } 
  
  
    this.getBank(this.session_id);

    this.anualBankForm = this.formbulider.group({
		     
		  pay_method: ['', [Validators.required]], 	  
		  pay_period: [],  
		  account_holder: ['', [Validators.required]], 	   
		  institute:[], 
		  account_type: ['', [Validators.required]], 	  
		  account_no: ['', [Validators.required]], 	    
		  card_expiry: ['', [Validators.required]], 	      
		  branch:[],  
		  branch_code:[],  
		  authorise_sign:[],  
		  debt:[],  			 	
		});  
  }

  onSubmit() {    
    this.formDataError.msg='';
    this.formDataError.error_field='';		
    this.successMsg='';
	
	  const form_data = this.anualBankForm.value; 
    // console.log(form_data);   
    
      this.updateBank(this.session_id,form_data).subscribe(		  
        (response) => {
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
  }

  updateBank(session_id:any,data:any): Observable<any> {
    return this.http.post<any>('https://danshopapi.devworktdmc.com/common_membership/update_annual_bank/'+session_id,data);
  }   

  getBank(session_id:any) { 
    this.http.get('https://danshopapi.devworktdmc.com/common_membership/edit/'+session_id).subscribe((response) => {
      this.data = response;

      this.pay_method=(this.data.length >0)?this.data[0].pay_method:'';      
      this.pay_period=(this.data.length >0)?this.data[0].pay_period:'';      
      this.account_holder=(this.data.length >0)?this.data[0].account_holder:'';      
      this.institute=(this.data.length >0)?this.data[0].institute:'';      
      this.account_type=(this.data.length >0)?this.data[0].account_type:'';      
      this.account_no=(this.data.length >0)?this.data[0].account_no:'';      
      this.card_expiry=(this.data.length >0)?this.formatDate(this.data[0].card_expiry):'';  	  	
      this.branch=(this.data.length >0)?this.data[0].branch:'';      
      this.branch_code=(this.data.length >0)?this.data[0].branch_code:'';      
      this.authorise_sign=(this.data.length >0)?this.data[0].authorise_sign:'';      
      this.debt=(this.data.length >0)?this.data[0].debt:'';     
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
