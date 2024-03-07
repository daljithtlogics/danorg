import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'; 
import { FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms';   		
import { ActivatedRoute } from '@angular/router';    		
import { ToastrService } from "ngx-toastr";
import { Router } from '@angular/router';  
import { NgForm } from '@angular/forms';   

@Component({
  selector: 'upgrade_member_annual-dashboard',
  templateUrl: './upgrade_member_annual.component.html',
  styleUrls: ['./upgrade_member_annual.component.css'],
})

export class UpgradeMemberAnnual implements OnInit {
  
  userId: number | null = null;
  userEmail: string | null = null;
  userMembership: string | null = null;
  userAccess: string | null = null;    
  authToken: string | null = null;
  userPack: string | null = null;
  userRenew: string | null = null;     


  payable: number = 0; 
  inst_payable: number = 0; 
  id: any;  
  annual_id:any;     
  annualRecords:any;	
  upgradeForm: any; 
  upgradeInstForm: any;      
  form!: FormGroup;
  formSubmitted: boolean = false;    	
  formError: boolean = false; 	
  successMsg:any; 
  data: any;   

  formDataError: any = {
		msg: '',
		error_field: ''
	};
	  
  constructor(private authService: AuthenticationService, private formbulider: FormBuilder,private http: HttpClient,private router: Router,private toastr: ToastrService) {
    this.annual_id = this.authService.getUserId();  

	  // Initialize your form controls
    this.upgradeForm = this.formbulider.group({
		member_choose: [''], // default value for member_choose
		pack_for: [''], // default value for pack_for
	  });
  
	  // Subscribe to form changes to update the price
	  this.upgradeForm.valueChanges.subscribe(() => {
		  this.updatePrice();
	  });

    // Initialize your form controls for instructor student
    this.upgradeInstForm = this.formbulider.group({
      inst_member_choose: [''], // default value for member_choose
      inst_pack_for: [''], // default value for pack_for
      });
    
    // Subscribe to form changes to update the price
    this.upgradeInstForm.valueChanges.subscribe(() => {
        this.updateInstPrice();
    });
  }

  // Update the payable based on selected options
  updatePrice() {
    // Check if form controls are not null before accessing their values
    const memberChooseControl = this.upgradeForm.get('member_choose');
    const packForControl = this.upgradeForm.get('pack_for');

    if (memberChooseControl && packForControl) {
      const memberChoose = memberChooseControl.value;
      const packFor = packForControl.value;

      if (memberChoose === 'Master Dive Pro' && packFor === 'year') {
        this.payable = 2565;
      } else if (memberChoose === 'Master Dive Pro' && packFor === 'month') {
        this.payable = 225;
      } else if (memberChoose === 'Master Tech' && packFor === 'year') {
		this.payable = 2735;
      } else if (memberChoose === 'Master Tech' && packFor === 'month') {
		this.payable = 240;
      } else {
        this.payable = 0;
      }
    }
  }

  // update form instructor student price
  updateInstPrice() {
    // Check if form controls are not null before accessing their values
    const memberChooseControl = this.upgradeInstForm.get('inst_member_choose');
    const packForControl = this.upgradeInstForm.get('inst_pack_for');

    if (memberChooseControl && packForControl) {
      const memberChoose = memberChooseControl.value;
      const packFor = packForControl.value;

      if (memberChoose === 'Master Dive Pro' && packFor === 'year') {
        this.inst_payable = 2565;
      } else if (memberChoose === 'Master Dive Pro' && packFor === 'month') {
        this.inst_payable = 225;
      } else if (memberChoose === 'Master Tech' && packFor === 'year') {
		    this.inst_payable = 2735;
      } else if (memberChoose === 'Master Tech' && packFor === 'month') {
		    this.inst_payable = 240;
      }else if (memberChoose === 'Standard' && packFor === 'year') {
        this.inst_payable = 1940;
      } else if (memberChoose === 'Standard' && packFor === 'month') {
        this.inst_payable = 170;
      }else if (memberChoose === 'Plus' && packFor === 'year') {
        this.inst_payable = 2395;
      } else if (memberChoose === 'Plus' && packFor === 'month') {
        this.inst_payable = 210;
      } else {
        this.inst_payable = 0;
      }
    }
  }

  ngOnInit(): void {
    // Retrieve values from AuthenticationService
    this.userId = this.authService.getUserId();
    this.userEmail = this.authService.getUserEmail();
    this.userMembership = this.authService.getUserMembership();
    this.authToken = this.authService.getAuthToken();
	  this.userAccess = this.authService.getUserAccess();   
	  this.userPack = this.authService.getUserPack();   
	  this.userRenew = this.authService.getUserRenew();     	    		
	
    if ((this.router.url == '/upgrade-membership') && (this.userAccess !='paid') && (this.userPack =='Master Dive Pro') || (this.userPack =='Master Tech') || (this.userRenew ==='renew'))      
    {
      this.router.navigate(['dashboard']);                                                         			  		                    	  		  
    }	 
	 
    this.getAnnual(this.userId);     
	
    this.upgradeForm = this.formbulider.group({
      member_choose: ['', [Validators.required]], 		  		   
      pack_for: ['', [Validators.required]], 		  		   
      pay_type: ['', [Validators.required]],  		  	 		     		  
      annual_id: [this.userId],
      price: [this.payable]
	  }); 
    
    this.upgradeInstForm = this.formbulider.group({
      inst_member_choose: ['', [Validators.required]], 		  		   
      inst_pack_for: ['', [Validators.required]], 		  		   
      inst_pay_type: ['', [Validators.required]],  		  	 		     		  
      annual_id: [this.userId],
      inst_price: [this.inst_payable],
      inst_membership : ['annual']
	  }); 
  }


  updateAnnual(annual_id:any,data:any): Observable<any> {
    return this.http.post<any>('https://danshopapi.devworktdmc.com/common_membership/update_annual_package/'+annual_id, data);	           		    							
  }  
  
  onSubmit() {    
    this.formDataError.msg='';
    this.formDataError.error_field='';		
    this.successMsg='';

	  // this.updatePrice();
	
    const form_data = this.upgradeForm.value; 
    form_data.price = this.payable;
    console.log(form_data); 

    
      this.updateAnnual(this.userId,form_data).subscribe(		  
        (response) => {
          const successMessage = response['message'];
          this.toastr.success(successMessage, 'Success');	
          sessionStorage.setItem('userPack',form_data.member_choose);    			  
          setTimeout(() => {
            this.router.navigate(['dashboard']);  
          }, 2000);  	 		  
        },	
        (error) => {
            
            this.formDataError.msg=error.error.error;
            this.formDataError.error_field=error.error.error_field;			

            console.log(error.error.error);
            console.log(error.error.error_field);	  
        }
      );
  }

  updateInstStudent(annual_id:any,data:any): Observable<any> {
    return this.http.post<any>('https://danshopapi.devworktdmc.com/instructor/update_membership_package/'+annual_id, data);	           		    							
  }  
  
  onInstSave() {    
    this.formDataError.msg='';
    this.formDataError.error_field='';		
    this.successMsg='';

	  // this.updatePrice();
	
    const form_data = this.upgradeInstForm.value; 
    form_data.inst_price = this.inst_payable;
    console.log(form_data); 

    
      this.updateInstStudent(this.userId,form_data).subscribe(		  
        (response) => {
          const successMessage = response['message'];
          this.toastr.success(successMessage, 'Success');	
          sessionStorage.setItem('userPack',form_data.inst_member_choose); 
          sessionStorage.setItem('userMembership',form_data.inst_membership);    			  

          setTimeout(() => {
            this.router.navigate(['dashboard']);  
          }, 2000);  	 		  
        },	
        (error) => {
            
            this.formDataError.msg=error.error.error;
            this.formDataError.error_field=error.error.error_field;			

            console.log(error.error.error);
            console.log(error.error.error_field);	  
        }
      );
  }

  resetForm() {
    this.upgradeForm.reset();
    this.upgradeInstForm.reset();
  }


  getAnnual(annual_id:any)
  {
	  this.http.get('https://danshopapi.devworktdmc.com/common_membership/edit/'+annual_id).subscribe((response) => {
         this.annualRecords = response;  
	  });   
  }

  formatDate(date_now : any) { 
	
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
