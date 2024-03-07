import { SharedModule } from '@vendure/admin-ui/core';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms';     		    			
import { ActivatedRoute } from '@angular/router';        

@Component({
    selector: 'editcompanymembership',			
    templateUrl: './editcompanymembership.component.html',			  								
	styleUrls: ['./editcompanymembership.component.css'],    		         
    standalone: true,
    imports: [SharedModule],		
})
export class EditCompanyMembershipComponent implements OnInit {   
	  greeting = 'edit company';	 			  			
	  id:any; 
	  compForm:any; 	 
	  form!: FormGroup;    
	  formSubmitted: boolean = false;    	  
	  formError: boolean = false; 	
	  person_name:any; 	  
	  company_name:any; 
	  registration_no:any; 
	  address_1:any; 		
	  address_2:any; 
	  city:any;   
	  province:any; 
	  pincode:any; 
	  country:any; 
	  phonehome:any; 
	  phonework:any;  
	  cellphone:any;	  
	  fax:any;  
      company_email:any;  
      member_type:any;
	  professional:any;    
	  rejoin:any;
	  slot_no:any;  
	  medical_aid:any;  
	  medical_no:any;  	
	  start_date:any;    
	  capture_date:any;
	  join_date:any;  
	  update_date:any;  
	  status:any;
	  paid:any; 
	  debt:any;  
	  auth_sign:any;  
	  pay_method:any;  	
	  pay_period:any;  
	  account_holder:any;  			
	  institute:any; 
	  branch:any;  	
	  branch_code:any;
	  account_type:any;  
	  account_no:any;
	  member_no:any;  
	  expire_date:any;  			 	  
	  main_reason:any;
	  sub_reason:any;	
	  comment:any;     
	  successMsg:any;
	  reasons:any;   
	  sub_reasons:any;	
	  comments:any;     				
      responseData: any;     					   
	  staffs:any; 
	  data: any; 	  
	  private apiUrl = 'https://danshopapi.devworktdmc.com/company/update'; // Replace this with your API endpoint

	  constructor(private formbulider: FormBuilder,private http: HttpClient,private route: ActivatedRoute) {  	    
		this.id = this.route.snapshot.paramMap.get('id');     										
		this.getReasons();        
	  }
	  
	  ngOnInit() {
			this.getData(this.id);    
			this.compForm = this.formbulider.group({
				 person_name: ['', [Validators.required,Validators.minLength(2)]],
				 company_name: ['', [Validators.required,Validators.minLength(2)]],  
				 company_email: ['', [Validators.required,Validators.email]], 
				 registration_no: ['', [Validators.required]],  
				 address_1: ['', [Validators.required]],  
				 city: ['', [Validators.required]], 
				 pincode: ['', [Validators.required]], 	
				 country: ['', [Validators.required]],   
				 cellphone: ['', [Validators.required]],    	   				 
				 member_type: ['', [Validators.required]],    
				 start_date: ['', [Validators.required,Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],   
				 expire_date: ['', [Validators.required,Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],  
				 join_date: ['', [Validators.required,Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],    	
				 pay_method: ['', [Validators.required]],    
				 status: ['', [Validators.required]], 
				 institute: ['', [Validators.required]],   	
				 branch: ['', [Validators.required]],  
				 account_type: ['', [Validators.required]], 
				 account_no: ['', [Validators.required]],   
				 member_no: ['', [Validators.required]],      	
				 main_reason: ['', [Validators.required]], 	 
				 sub_reason: ['', [Validators.required]],  						
				 comment:[],   			
				 address_2:[],
				 province:[], 
				 phonehome:[],   	
				 phonework:[],
				 professional:[],   
				 medical_aid:[], 
				 medical_no:[], 
				 capture_date:[], 
				 update_date:[],   				 	
				 rejoin:[], 
				 slot_no:[],   
				 pay_period:[],
				 account_holder:[],  	
				 paid:[],     
				 fax:[],
				 debt:[],  
				 auth_sign:[],  	
				 branch_code:[],    
			});   	
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
	  
	  handleClick(tabName) {
       // console.log('New title'+tabName);  
		 var i, tabcontent, tablinks;
         tabcontent = document.getElementsByClassName("tabcontent");
		 tablinks = document.getElementsByClassName("tablinks");  
		 
		  for (i = 0; i < tabcontent.length; i++) 
		  {		  
				if(tabcontent[i].id==tabName)
				{
					this.loadData(tabName);  
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
				if(tabcontent[i].id==tabName)
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

  updateCompany(id:any,data:any): Observable<any> {
    return this.http.post<any>(this.apiUrl+'/'+id,data);					    		    							
  } 
  
  counter(i: number) {
    return new Array(i);				
  }

  onSubmit() { 
  
	if (this.compForm.invalid)
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
		
		const form_data = this.compForm.value;   				
		
		this.updateCompany(this.id,form_data).subscribe(	  	
			response => {
			  console.log('Success:', response);     
			  this.successMsg='Data Updated';	
			  this.compForm.controls['main_reason'].reset();   	  	     		 	
			  this.compForm.controls['sub_reason'].reset();      		
			  this.compForm.controls['comment'].reset();    	
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
  }  
  
  getReasons(){
	this.http.get('https://danshopapi.devworktdmc.com/annual/reasons').subscribe((response) => {
      this.reasons = response;                   		               					
    });  
  }

  getComment(id)    
  {
	  this.http.get('https://danshopapi.devworktdmc.com/company/comments/'+id).subscribe((response) => {
		    this.comments = response;   	
	  });   
  }  
  
  getStaff(id)    
  {
	  this.http.get('https://danshopapi.devworktdmc.com/company/staffs/'+id).subscribe((response) => {
		    this.staffs = response;   	       
	  });   
  }  

  getData(id) { 
	  this.http.get('https://danshopapi.devworktdmc.com/company/edit/'+id).subscribe((response) => {
      this.data = response;   	  
	  this.person_name=(this.data.length >0)?this.data[0].contact_person:'';     
	  this.company_name=(this.data.length >0)?this.data[0].company_name:''; 
	  this.registration_no=(this.data.length >0)?this.data[0].registration_no:'';     
	  this.address_1=(this.data.length >0)?this.data[0].address1:'';   
	  this.address_2=(this.data.length >0)?this.data[0].address2:'';    	  
	  this.city=(this.data.length >0)?this.data[0].city1:'';   
	  this.province=(this.data.length >0)?this.data[0].province1:'';   
	  this.pincode=(this.data.length >0)?this.data[0].postcode1:'';   
	  this.country=(this.data.length >0)?this.data[0].country1:'';    	  
	  this.phonehome=(this.data.length >0)?this.data[0].telephone1:'';   
	  this.phonework=(this.data.length >0)?this.data[0].telephone2:'';	
	  this.cellphone=(this.data.length >0)?this.data[0].cellphone1:'';   
	  this.fax=(this.data.length >0)?this.data[0].fax:'';   
	  this.company_email=(this.data.length >0)?this.data[0].email1:'';  	
	  this.member_type=(this.data.length >0)?this.data[0].membertype:'';   			  
	  this.rejoin=(this.data.length >0)?this.data[0].rejoin:'';   
	  this.professional=(this.data.length >0)?this.data[0].professional:'';     
	  this.slot_no=(this.data.length >0)?this.data[0].membership_slot:'';   
	  this.medical_aid=(this.data.length >0)?this.data[0].medical_aid:'';  	  	  
	  this.medical_no=(this.data.length >0)?this.data[0].medical_aid_no:'';     	
	  
	  this.start_date=(this.data.length >0)?this.formatDate(this.data[0].startdate):''; 

	  const captre_date = new Date(this.data[0].capturedate);
	  const up_date = new Date(this.data[0].updatedate);  
	  const captreDate = captre_date.toJSON().slice(0, 19).replace('T',' ');    
	  const upDae = up_date.toJSON().slice(0, 19).replace('T',' ');     
	  
	  this.capture_date=(this.data[0].capturedate==null)?this.data[0].capturedate:this.formatStamp(captreDate); 
	  this.update_date=(this.data[0].updatedate==null)?this.data[0].updatedate:this.formatStamp(upDae);   
	  
	  this.join_date=(this.data.length >0)?this.formatDate(this.data[0].joindate):''; 
	  this.expire_date=(this.data.length >0)?this.formatDate(this.data[0].card_expiry):'';    	  
	  
	  this.status=(this.data.length >0)?this.data[0].status1:'';    
	  this.paid=(this.data.length >0)?parseInt(this.data[0].paid):'';  

	  this.pay_method=(this.data.length >0)?this.data[0].pay_method:'';   
	  this.pay_period=(this.data.length >0)?this.data[0].pay_period:'';    	 

	  this.account_holder=(this.data.length >0)?this.data[0].account_holder:'';    
	  this.institute=(this.data.length >0)?this.data[0].institute:'';    	
	  
	  this.branch=(this.data.length >0)?this.data[0].branch:'';   
	  this.branch_code=(this.data.length >0)?this.data[0].branch_code:'';    	
	  
	  this.account_type=(this.data.length >0)?this.data[0].account_type:'';   
	  this.account_no=(this.data.length >0)?this.data[0].account_no:'';   
	  this.member_no=(this.data.length >0)?this.data[0].member_no:'';	  
	     
	  this.auth_sign=(this.data.length >0)?parseInt(this.data[0].authorise_sign):''; 	
	  this.debt=(this.data.length >0)?parseInt(this.data[0].debt):'';      
	  
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
   
   
  formatStamp(full_date)   
  {  	
	if (full_date != null)
	{
		var d = new Date(full_date);     
		
		var year = d.getFullYear();   
		var month = '' + (d.getMonth() + 1);	
		var day = '' + d.getDate();  
		var hours = '' + d.getHours();
		var minutes = '' + d.getMinutes();
		var seconds = '' + d.getSeconds();      
		
		if (month.length < 2) 
			month = '0' + month;
		if (day.length < 2) 
			day = '0' + day;
			
		if (hours.length < 2) 
			hours = '0' + hours;	
			
		if (minutes.length < 2) 
			minutes = '0' + minutes;

		if (seconds.length < 2) 
			seconds = '0' + seconds;  				

		return (year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds);    
	}
	else
	{
		return '';  
	}  	
	
   }  

   loadData(tab) { 	  
	
	if(tab=="note")
	{
		this.getComment(this.id);  	  	
	}	
	
	if(tab=="staff")
	{
		this.getStaff(this.id);  	  	
	}	
	
  }	

   
   
}	