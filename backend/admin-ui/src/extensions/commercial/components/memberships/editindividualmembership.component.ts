import { SharedModule } from '@vendure/admin-ui/core';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms';    
import { ActivatedRoute } from '@angular/router';   		   	 

@Component({
    selector: 'addindividual',			
    templateUrl: './editindividualmembership.component.html',								  								
	styleUrls: ['./editindividualmembership.component.css'],         		            
    standalone: true,
    imports: [SharedModule],		
})
export class EditIndividualMembershipComponent implements OnInit {   
	  greeting = 'edit individual';	 					  
	  id:any; 
	  broker_id:any; 
	  indvForm:any; 	 
	  form!: FormGroup;    
	  formSubmitted: boolean = false;    	  			
	  formError: boolean = false; 	
	  infoTitle:any; 	  
	  firstName:any; 
	  surName:any; 
	  kinTelHome:any;  
	  kinTelWork:any; 
	  member_no:any;   
	  infoAddress1:any; 	
	  infoAddress2:any;   	  
	  infoCity:any; 
	  infoPassport:any;			
	  address_2:any; 
	  city:any;   
	  infoProvince:any; 
	  postCode:any; 
	  infoCountry:any; 
	  telHome:any; 
	  telWork:any;  
	  cellPhone:any;	  
	  fax:any;
	  doctor_name:any; 	
	  doctor_phone:any;   
      infoEmail:any;  
      member_type:any;
	  professional:any;    
	  rejoin:any;
	  medical_aid:any;  
	  medical_no:any;  	
	  infoDob:any; 
	  start_date:any;  	
	  capture_date:any;
	  join_date:any;  
	  update_date:any;  
	  status:any;
	  paid:any; 
	  debt:any;  
	  alert_action:any;  
	  researcher:any; 
	  certification:any; 
	  restriction:any;  
	  class_name:any; 
	  history:any;   
	  kinTitle:any; 
	  relation:any;  
	  kinFirstName:any; 
	  kinCellPhone:any;  
	  kinEmail:any; 
	  kinPassport:any; 
	  kinSurName:any;  
	  kinCity:any; 
	  kinProvince:any; 
	  kinPostCode:any; 
	  kinCountry:any; 
	  kinAddress1:any;  
	  kinAddress2:any;  
	  kinDob:any;  
	  registration_no:any; 	
	  emergency_contact:any; 
	  emergency_phone:any; 
	  auth_sign:any;  
	  pay_method:any;  	
	  pay_period:any;  
	  account_holder:any;  
	  institute:any; 
	  branch:any;  	
	  branch_code:any;
	  account_type:any;  
	  account_no:any;
	  expire_date:any;  			 	  
	  main_reason:any;
	  sub_reason:any;	
	  comment:any;     
	  successMsg:any;
	  reasons:any; 
	  brokers:any; 	
	  sub_reasons:any;	 
      comments:any;    
	  data: any; 	  
	  private apiUrl = 'https://danshopapi.devworktdmc.com/individual/update'; // Replace this with your API endpoint

	  constructor(private formbulider: FormBuilder,private http: HttpClient,private route: ActivatedRoute) {  		
		this.id = this.route.snapshot.paramMap.get('id');     												
		this.getReasons();  
		this.professional='No';   	
	  }
	  
	  ngOnInit() {
			this.getBroker();    
			this.getData(this.id);    
			this.indvForm = this.formbulider.group({ 				 		
				 firstName: ['', [Validators.required,Validators.minLength(2)]],  
				 infoEmail: ['', [Validators.required,Validators.email]], 	
				 kinEmail: ['', [Validators.required,Validators.email]], 	  	
				 infoAddress1: ['', [Validators.required]],  
				 infoCity: ['', [Validators.required]],  				 
				 postCode: ['', [Validators.required]], 	
				 infoCountry: ['', [Validators.required]],   
				 cellPhone: ['', [Validators.required]],    	   				 
				 member_type: ['', [Validators.required]],    
				 infoDob: ['', [Validators.required,Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],   
				 start_date: ['', [Validators.required,Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],    
				 expire_date: ['', [Validators.required,Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],  
				 join_date: ['', [Validators.required,Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],   
				 kinDob: ['', [Validators.required,Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],  	
				 kinCountry: ['', [Validators.required]],     
				 pay_method: ['', [Validators.required]],    
				 member_no: ['', [Validators.required]],    
				 status: ['', [Validators.required]], 
				 institute: ['', [Validators.required]],   	
				 branch: ['', [Validators.required]],  
				 relation: ['', [Validators.required]],  			  		
				 account_type: ['', [Validators.required]], 
				 account_no: ['', [Validators.required]],   	
				 main_reason: ['', [Validators.required]], 	 
				 sub_reason: ['', [Validators.required]],  	
				 broker_id: ['', [Validators.required]],  	
				 kinFirstName: ['', [Validators.required]],    
				 kinCellPhone: ['', [Validators.required]], 
				 infoPassport:['', [Validators.required]],   
				 registration_no:['', [Validators.required]],  	
				 kinPassport:['', [Validators.required]],  
				 kinAddress1:['', [Validators.required]], 	
				 kinCity:['', [Validators.required]], 	  
				 kinPostCode:['', [Validators.required]], 	   
				 infoTitle:[],  
				 telHome:[],   	
				 telWork:[],   
				 surName:[], 
				 kinTelHome:[],  
				 kinTelWork:[],  				 	 
				 infoAddress2:[],
				 infoProvince:[],  				 
				 professional:[],   
				 medical_aid:[], 
				 medical_no:[], 
				 capture_date:[], 
				 update_date:[],   				 	
				 rejoin:[], 
				 pay_period:[],
				 account_holder:[],  	
				 paid:[],     
				 fax:[],
				 debt:[],
				 alert_action:[],  	
				 doctor_name:[],
				 doctor_phone:[], 	
				 researcher:[],  
				 certification:[],  
				 restriction:[],   
				 history:[],  
				 class_name:[],
				 kinTitle:[],
				 kinSurName:[],  					 
				 kinProvince:[],  				 			  
				 kinAddress2:[], 				   			 				 
				 emergency_contact:[], 	  		
				 emergency_phone:[], 	       
				 auth_sign:[],  	
				 branch_code:[],    
				 comment:[],    
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
	  
	  onSelect(event: any) {
		const opt_id = event.currentTarget.options[event.currentTarget.options.selectedIndex].value;  			

		if(opt_id == 'PROFESSIONAL')  
		{ 			
			this.professional='Yes';   				
		}
		else
		{
			this.professional='No'; 		
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

  updateIndividual(id:any,data:any): Observable<any> {
    return this.http.post<any>(this.apiUrl+'/'+id,data);					    		    							
  }   
  
  counter(i: number) {
    return new Array(i);				
  }

  onSubmit() { 
  
	if (this.indvForm.invalid)
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
		
		const form_data = this.indvForm.value;   				
		
		this.updateIndividual(this.id,form_data).subscribe(	     	
			response => {
			  console.log('Success:', response);     
			  this.successMsg='Data Updated';		
			  this.indvForm.controls['main_reason'].reset();   	  	   		  		 	
			  this.indvForm.controls['sub_reason'].reset();      		
			  this.indvForm.controls['comment'].reset();   
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
  
  getBroker() {   
    this.http.get('https://danshopapi.devworktdmc.com/partner/get').subscribe((response) => {
      this.brokers = response;        
    });
  }
  
  getData(id) { 
	  this.http.get('https://danshopapi.devworktdmc.com/individual/edit/'+id).subscribe((response) => {
      this.data = response;    		  	  
	  this.infoTitle=(this.data.length >0)?this.data[0].title1:'';    
	  this.firstName=(this.data.length >0)?this.data[0].fname1:'';      
	  this.surName=(this.data.length >0)?this.data[0].sname1:'';   
	  this.member_no=(this.data.length >0)?this.data[0].member_no:'';   
	  this.infoDob=(this.data.length >0)?this.formatDate(this.data[0].dob1):'';   	
	  this.infoPassport=(this.data.length >0)?this.data[0].passport1:'';    
	  this.infoAddress1=(this.data.length >0)?this.data[0].address1:'';     
	  this.infoAddress2=(this.data.length >0)?this.data[0].address2:''; 	  
	  this.infoCity=(this.data.length >0)?this.data[0].city1:'';     
	  this.infoProvince=(this.data.length >0)?this.data[0].province1:'';  	 
	  this.postCode=(this.data.length >0)?this.data[0].postcode1:'';     	
	  this.infoCountry=(this.data.length >0)?this.data[0].country1:'';   	  
	  this.telHome=(this.data.length >0)?this.data[0].telephone1:'';     
	  this.telWork=(this.data.length >0)?this.data[0].telephone2:'';  	  
	  this.cellPhone=(this.data.length >0)?this.data[0].cellphone1:'';     
	  this.fax=(this.data.length >0)?this.data[0].fax:'';  	  
	  this.infoEmail=(this.data.length >0)?this.data[0].email1:'';     
	  this.member_type=(this.data.length >0)?this.data[0].membertype:'';  	  
	  this.rejoin=(this.data.length >0)?this.data[0].rejoin:'';     
	  this.broker_id=(this.data.length >0)?this.data[0].broker_id:''; 	
	  
	  this.professional=(this.data.length >0)?this.data[0].professional:'';     
	  this.start_date=(this.data.length >0)?this.formatDate(this.data[0].startdate):'';   		
	  
	  const captre_date = new Date(this.data[0].capturedate);
	  const up_date = new Date(this.data[0].updatedate);  
	  const captreDate = captre_date.toJSON().slice(0, 19).replace('T',' ');    
	  const upDae = up_date.toJSON().slice(0, 19).replace('T',' ');     

	  this.capture_date=(this.data[0].capturedate==null)?this.data[0].capturedate:this.formatStamp(captreDate); 
	  this.update_date=(this.data[0].updatedate==null)?this.data[0].updatedate:this.formatStamp(upDae);   

	  this.join_date=(this.data.length >0)?this.formatDate(this.data[0].joindate):'';   
	  this.researcher=(this.data.length >0)?parseInt(this.data[0].researcher):'';    		
	  this.status=(this.data.length >0)?this.data[0].status1:'';       	
	  this.paid=(this.data.length >0)?parseInt(this.data[0].paid):'';    
	  this.medical_aid=(this.data.length >0)?this.data[0].medical_aid:'';     
	  this.medical_no=(this.data.length >0)?this.data[0].medical_aid_no:''; 		  
	  this.doctor_name=(this.data.length >0)?this.data[0].doctor_name:'';     
	  this.doctor_phone=(this.data.length >0)?this.data[0].doctor_phone:''; 	
	  this.certification=(this.data.length >0)?parseInt(this.data[0].certification):'';     
	  this.restriction=(this.data.length >0)?parseInt(this.data[0].restriction):''; 		
	  this.history=(this.data.length >0)?parseInt(this.data[0].history):'';     
	  this.class_name=(this.data.length >0)?this.data[0].class_name:''; 			  
	  this.registration_no=(this.data.length >0)?this.data[0].registration_no:'';     
	  this.emergency_contact=(this.data.length >0)?this.data[0].contact_person:'';  	 	  
	  this.emergency_phone=(this.data.length >0)?this.data[0].contact_phone:'';   	  
	  this.kinTitle=(this.data.length >0)?this.data[0].title2:'';    
	  this.kinFirstName=(this.data.length >0)?this.data[0].fname2:'';    	  
	  this.kinSurName=(this.data.length >0)?this.data[0].sname2:'';       
	  this.kinDob=(this.data.length >0)?this.formatDate(this.data[0].dob2):'';    	  
	  this.kinPassport=(this.data.length >0)?this.data[0].passport2:'';    
	  this.kinAddress1=(this.data.length >0)?this.data[0].address3:'';   	  
	  this.kinAddress2=(this.data.length >0)?this.data[0].address4:'';    
	  this.kinCity=(this.data.length >0)?this.data[0].city2:'';   
	  this.kinProvince=(this.data.length >0)?this.data[0].province2:'';     
	  this.kinPostCode=(this.data.length >0)?this.data[0].postcode2:'';   	 	  
	  this.kinCountry=(this.data.length >0)?this.data[0].country2:'';     
	  this.kinTelHome=(this.data.length >0)?this.data[0].telephone3:''; 	 
	  this.kinTelWork=(this.data.length >0)?this.data[0].telephone4:'';   	  
	  this.kinCellPhone=(this.data.length >0)?this.data[0].cellphone2:''; 	
	  this.kinEmail=(this.data.length >0)?this.data[0].email2:'';  	  
	  this.relation=(this.data.length >0)?this.data[0].relation:'';     
	  this.pay_method=(this.data.length >0)?this.data[0].pay_method:''; 
	  this.pay_period=(this.data.length >0)?this.data[0].pay_period:'';  
	  this.account_holder=(this.data.length >0)?this.data[0].account_holder:'';     
      this.institute=(this.data.length >0)?this.data[0].institute:'';  	  
	  this.branch=(this.data.length >0)?this.data[0].branch:'';     
	  this.branch_code=(this.data.length >0)?this.data[0].branch_code:'';  
	  this.account_type=(this.data.length >0)?this.data[0].account_type:'';  	  
	  this.account_no=(this.data.length >0)?this.data[0].account_no:'';    

	  this.expire_date=(this.data.length >0)?this.formatDate(this.data[0].card_expiry):'';   	
	  this.auth_sign=(this.data.length >0)?parseInt(this.data[0].authorise_sign):'';  			  
	  this.debt=(this.data.length >0)?parseInt(this.data[0].debt):'';       
	  
    });
  } 

  getComment(id)    
  {
	  this.http.get('https://danshopapi.devworktdmc.com/individual/comments/'+id).subscribe((response) => {
		 this.comments = response;   			
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
	
  }	

				
}	