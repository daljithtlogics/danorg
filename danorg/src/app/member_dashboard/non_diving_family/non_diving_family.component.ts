import { Component, OnInit  } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'; 
import { FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms';   
import { Router } from '@angular/router';     		
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'non-diving-family-dashboard',
  templateUrl: './non_diving_family.component.html',
  styleUrls: ['./non_diving_family.component.css']
})

export class NonDivingFamily implements OnInit {
  
  userId: number | null = null;
  userEmail: string | null = null;
  userMembership: string | null = null;
  authToken: string | null = null;
  userAccess: string | null = null;  
  userRenew: string | null = null;     

  id: any;  
  annual_id:any;
  data: any;  	
  nonDiveForm: any;
  title:any; 
  fname:any;
  sname:any;
  dob:any; 
  passport:any;  
  phonehome:any;    	
  phonework:any;  
  cellphone:any; 
  email:any;   	   
  relation:any;  	  
  qualification:any; 
  agency:any;   
  workdiver:any;  	
  freediver:any;   	         
  successMsg:any;
  dives:any; 
  edit_dives:any; 
  delete_dives:any;  

  isEditMode: boolean = false;

  formDataError: any = {
		msg: '',
		error_field: ''
	};
	  
  private apiUrl = 'https://danshopapi.devworktdmc.com/common_membership/add_nondiving_family';  		  

  constructor(private authService: AuthenticationService, private formbulider: FormBuilder,private http: HttpClient,private router: Router, private toastr: ToastrService) {
    this.id = this.authService.getUserId();  
  }

  ngOnInit(): void {
    // Retrieve values from AuthenticationService
    this.userId = this.authService.getUserId();
    this.userEmail = this.authService.getUserEmail();
    this.userMembership = this.authService.getUserMembership();
    this.authToken = this.authService.getAuthToken();
	  this.userAccess = this.authService.getUserAccess();    
    this.userRenew = this.authService.getUserRenew();     	    		

	if ((this.router.url == '/non-diving-family') && (this.userAccess !='paid') || (this.userRenew ==='renew'))      
	{
		this.router.navigate(['dashboard']);                 	    	                     			  		                    	  		  
	}      
	
    this.getDive(this.userId);  

    this.nonDiveForm = this.formbulider.group({
		  title: ['', [Validators.required]], 		  		   
		  fname: ['', [Validators.required]], 		  		   
		  sname: ['', [Validators.required]], 
		  dob: ['', [Validators.required]],   	 		    
		  passport: [],   	 	    
		  phonehome: [], 
		  phonework: [], 
		  cellphone: ['', [Validators.required]], 	
		  email: ['', [Validators.required, Validators.email]],  	
		  relation: ['', [Validators.required]], 		  	 	
      annual_id: [this.userId]  
		});   
  }

  addDive(data:any): Observable<any> {
		return this.http.post<any>(this.apiUrl,data);	      		    							
	}   

  updateDive(id:any,data:any): Observable<any> {
    return this.http.post<any>('https://danshopapi.devworktdmc.com/common_membership/update_nondiving_family/'+id,data);	           		    							
  }  
  
  onSubmit() {      	  
    
    if (this.isEditMode) {
      this.formDataError.msg='';
      this.formDataError.error_field='';		
      this.successMsg='';
    
      const form_data = this.nonDiveForm.value;    
      console.log(form_data);  
      console.log('nondive id is',this.id);  
      
      this.updateDive(this.id,form_data).subscribe(		  
        (response) => {
          // console.log('Success:', response);	
          this.getDive(this.userId);
          const successMessage = response['message'];
          this.toastr.success(successMessage, 'Success');	  		

          this.resetForm();         
          this.nonDiveForm.patchValue({
            title: '',
            fname: '',
            sname: '',
            dob: '',
            passport: '',
            relation: '',
            phonehome: '',
            phonework: '',
            cellphone: '',
            email: '',
            qualification: '',
            agency: '',
            workdiver: '',
            freediver: '',
            annual_id: this.userId,
          });   
        },	
        (error) => {
          if (error.status === 500) {
            this.toastr.error('Email already exists. Please try with different email address.', 'Error');
          }else{
            console.error('Error:', error);
            this.formDataError.msg=error.error.error;
            this.formDataError.error_field=error.error.error_field;            
          }	  
        }
    );
    }else{

      this.formDataError.msg='';
      this.formDataError.error_field='';		
      this.successMsg='';
    
      const form_data = this.nonDiveForm.value;    
      console.log(form_data);    
    
      this.addDive(form_data).subscribe(		  
          (response) => {
            // console.log('Success:', response);	
            this.getDive(this.userId);
            const successMessage = response['message'];
            this.toastr.success(successMessage, 'Success');	  		
  
            this.resetForm();
            this.nonDiveForm.patchValue({
              title: '',
              fname: '',
              sname: '',
              dob: '',
              passport: '',
              relation: '',
              phonehome: '',
              phonework: '',
              cellphone: '',
              email: '',
              qualification: '',
              agency: '',
              workdiver: '',
              freediver: '',
              annual_id: this.userId,
            });   
          },	
          (error) => {
            if (error.status === 500) {
              this.toastr.error('Email already exists. Please try with different email address.', 'Error');
            }else{
              console.error('Error:', error);
              this.formDataError.msg=error.error.error;
              this.formDataError.error_field=error.error.error_field;            
            }	  
          }
      );
    }
  }	

  resetForm() {
    this.nonDiveForm.reset();
    this.isEditMode = false;
  }

  getDive(id:any)
  {
	  this.http.get('https://danshopapi.devworktdmc.com/common_membership/fetch_non_dives/'+id).subscribe((response) => {
		    this.dives = response;  
        this.getDive(this.userId);
	  });   
  }

  editDive(id:any)
  {
	  this.http.get('https://danshopapi.devworktdmc.com/common_membership/edit/'+id).subscribe((response) => {
		    this.edit_dives = response;  
        this.getDive(this.userId);
        this.isEditMode = true;
        this.id = id;

        this.title=(this.edit_dives.length >0)?this.edit_dives[0].title1:'';       
        this.fname=(this.edit_dives.length >0)?this.edit_dives[0].fname1:'';    
        this.sname=(this.edit_dives.length >0)?this.edit_dives[0].sname1:'';    		
        this.dob=(this.edit_dives.length >0)?this.formatDate(this.edit_dives[0].dob1):'';     
        console.log("dob is",this.dob);
        this.passport=(this.edit_dives.length >0)?this.edit_dives[0].passport1:'';       
        this.phonehome=(this.edit_dives.length >0)?this.edit_dives[0].telephone1:'';        	
        this.phonework=(this.edit_dives.length >0)?this.edit_dives[0].telephone2:'';     
        this.cellphone=(this.edit_dives.length >0)?this.edit_dives[0].cellphone1:'';     	
        this.email=(this.edit_dives.length >0)?this.edit_dives[0].email1:'';      
        this.relation=(this.edit_dives.length >0)?this.edit_dives[0].relation:'';    
	  });   
  }

  deleteDive(id: any): void {
    const confirmed = window.confirm('Are you sure to delete this record?');
  
    if (confirmed) {
      this.http.get('https://danshopapi.devworktdmc.com/common_membership/delete/' + id).subscribe(
        () => {
          this.toastr.success('Record deleted successfully', 'Success');
          // Update the list of dives after deletion
          this.getDive(this.userId);
        },
        (error) => {
          console.error('Error:', error);
          // Handle error, show an error message, etc.
        }
      );
    }
  }
  
  
  formatDate(date_now : any) 
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
