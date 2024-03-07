import { SharedModule } from '@vendure/admin-ui/core';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'; 
import { FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms';   
import {NgForm} from '@angular/forms';  
import { ActivatedRoute } from '@angular/router';         

@Component({
    selector: 'edittemporary',		
    templateUrl: './edittemporarymemberships.component.html',		  								
	styleUrls: ['./edittemporarymemberships.component.css'],             
    standalone: true,
    imports: [SharedModule],	
})
export class EditTemporarymembershipsComponent {   
	  id: any; 	  
      greeting = 'temporary';
	  tempForm:any; 	 
	  form!: FormGroup; 
	  formSubmitted: boolean = false;    	
	  formError: boolean = false; 	 	
	  info_title:any; 
	  info_dob:any;  	
	  f_name:any;
	  s_name:any;  
	  first_name:any;  
	  sur_name:any; 
	  info_pass:any;
	  passport_no:any;  
	  pack_no:any;  	
	  provider_country:any; 
	  provider_course:any;  		  	
	  info_addr1:any;  
	  info_addr2:any;  
	  postaddr1:any;
	  postaddr2:any;    	  
	  info_city:any;  
	  city:any;  
	  postcode:any;  	
	  info_province:any; 
	  province:any;  
	  post_code:any; 
	  info_country:any;   
	  tel_home:any;	
	  tel_work:any;  
	  cell_phone:any;
	  fax:any; 	
	  info_email:any; 
	  dive_loc:any;  	
	  member_type:any;    
	  rejoin:any;  
	  broker:any;    
	  agency:any;    
	  spear_dive:any;   
	  recr_dive:any;  
	  professional:any;  	
	  full_time:any;  	
	  medical_aid:any;  	   
	  medical_no:any; 
	  member_no:any;  	
	  start_date:any;  
	  end_date:any;      		
	  capture_date:any;  
	  update_date:any;  
	  join_date:any;   	
	  work_diver:any;   	  	
	  qualification:any; 
	  researcher:any;  
	  status:any;  
	  instructor_state:any;  
	  paid:any;  
	  kin_title:any;  
	  kin_name:any;  
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
	  pay_method:any;  
	  pay_period:any;  
	  institute:any;  
	  account_type:any;  
	  account_no:any;   
	  account_holder:any;  
	  branch:any;   
	  branch_code:any;  
	  card_expiry:any; 	
	  authorise_sign:any; 
	  course_id:any;  	
	  student_id:any;  
	  instruct_course:any;   
	  debt:any;  
	  comment:any;   
	  mainReason:any;
	  subReason:any;     
	  data: any;
	  dives:any;  
	  courses:any;   
	  nondives:any;   
	  qualifications:any;
	  instructors:any;  
	  providers:any;  		
	  students:any;	
	  comments:any; 
	  successMsg:any;			
	  reasons:any; 
	  sub_reasons:any;
	  responseData: any;    	
	  private apiUrl = 'https://danshopapi.devworktdmc.com/temporary/update'; 	

	  constructor(private formbulider: FormBuilder,private http: HttpClient,private route: ActivatedRoute) {
	    this.id = this.route.snapshot.paramMap.get('id');   
		this.getReasons();      
      }
	  
	  ngOnInit(): void {  		    
		this.getData(this.id); 
		
		this.tempForm = this.formbulider.group({
		  f_name: ['', [Validators.required,Validators.minLength(2)]],  		  
		  info_dob: ['', [Validators.required,Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],  
		  kin_dob: ['', [Validators.required,Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],  
		  start_date: ['', [Validators.required,Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],  
		  info_city: ['', [Validators.required]],   		
		  info_country: ['', [Validators.required]], 
		  cell_phone: ['', [Validators.required]],  		  
		  info_email: ['', [Validators.required,Validators.email]],  	
		  kin_email: ['', [Validators.required,Validators.email]],    
		  dive_loc: ['', [Validators.required]], 
		  qualification: ['', [Validators.required]],   
		  kin_name: ['', [Validators.required]],   
		  kin_city: ['', [Validators.required]],    	  
		  kin_relation: ['', [Validators.required]],  
		  kin_country: ['', [Validators.required]],    
		  kin_phone: ['', [Validators.required]], 
		  mainReason: ['', [Validators.required]], 	 
		  subReason: ['', [Validators.required]], 	   	
		  s_name:[], 	
		  info_title:[],	  
		  kin_title:[],			
		  info_pass:[],						
		  info_addr1:[],    	
		  info_addr2:[],	
		  info_province:[], 	
		  post_code:[],						 		   		
		  tel_home:[],	
		  tel_work:[],	 	
		  medical_aid:[],    	
		  medical_no:[],		
		  fax:[],
		  status:[],  	
		  agency:[],	  	
		  spear_dive:[],
		  recr_dive:[],  	
		  end_date:[],
		  capture_date:[],   
		  update_date:[],  
		  paid:[], 	  
		  kin_sname:[],
		  kin_passport:[],	
		  kin_address1:[],  	
		  kin_address2:[],   
		  kin_province:[],  	
		  kin_post:[],
		  kin_tel:[],			
		  kin_num:[],	
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
	  
	  handleClick(tabName) {         
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

  updateTemporary(id:any,data:any): Observable<any> {
    return this.http.post<any>(this.apiUrl+'/'+id,data);					    		    							
  }  
  
  onSubmit() {  

    if (this.tempForm.invalid)
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
		
		const form_data = this.tempForm.value;    
		
		this.updateTemporary(this.id,form_data).subscribe(		  
			response => {           		
						
			  this.successMsg='Data Updated';   				 		  
			  
			  this.tempForm.controls['mainReason'].reset();   								  			 		 	
			  this.tempForm.controls['subReason'].reset();      					
			  this.tempForm.controls['comment'].reset();      			
			  
			},	
			error => {
			  
			  this.formDataError.msg=error.error.error;
			  this.formDataError.error_field=error.error.error_field;			

			  console.log(error.error.error);
			  console.log(error.error.error_field);		
					  
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
	  this.http.get('https://danshopapi.devworktdmc.com/temporary/comments/'+id).subscribe((response) => {
		    this.comments = response;          
	  });   
  }
  
  getData(id) { 
	  this.http.get('https://danshopapi.devworktdmc.com/temporary/edit/'+id).subscribe((response) => {
      this.data = response;   
	  this.info_title=(this.data.length >0)?this.data[0].title1:'';           
	  this.f_name=(this.data.length >0)?this.data[0].fname1:'';    
	  this.s_name=(this.data.length >0)?this.data[0].sname1:'';    		
	  this.info_dob=(this.data.length >0)?this.formatDate(this.data[0].dob1):'';     
	  this.info_pass=(this.data.length >0)?this.data[0].passport1:'';  
	  this.member_no=(this.data.length >0)?this.data[0].member_no:'';       
	  this.info_addr1=(this.data.length >0)?this.data[0].address1:'';  
	  this.info_addr2=(this.data.length >0)?this.data[0].address2:'';  
	  this.info_city=(this.data.length >0)?this.data[0].city1:'';       
	  this.info_province=(this.data.length >0)?this.data[0].province1:'';    
	  this.post_code=(this.data.length >0)?this.data[0].postcode1:'';    
	  this.info_country=(this.data.length >0)?this.data[0].country1:'';     
	  this.tel_home=(this.data.length >0)?this.data[0].telephone1:'';   
	  this.tel_work=(this.data.length >0)?this.data[0].telephone2:'';   
	  this.cell_phone=(this.data.length >0)?this.data[0].cellphone1:'';   
	  this.fax=(this.data.length >0)?this.data[0].fax:'';    
	  this.info_email=(this.data.length >0)?this.data[0].email1:''; 
	  this.medical_aid=(this.data.length >0)?this.data[0].medical_aid:''; 
	  this.medical_no=(this.data.length >0)?this.data[0].medical_aid_no:'';    
	  this.dive_loc=(this.data.length >0)?this.data[0].dive_location:'';    			
	  this.agency=(this.data.length >0)?this.data[0].agency:'';    
	  this.spear_dive=(this.data.length >0)?this.data[0].spear_diver:'';    
	  this.recr_dive=(this.data.length >0)?this.data[0].creational:'';      
	  this.qualification=(this.data.length >0)?this.data[0].qualification:'';   		
	  this.start_date=(this.data.length >0)?this.formatDate(this.data[0].startdate):'';    
	  this.end_date=(this.data.length >0)?this.formatDate(this.data[0].lastdate):'';         
	  
	  const captre_date = new Date(this.data[0].capturedate); 	
	  const up_date = new Date(this.data[0].updatedate);    
	  const captreDate = captre_date.toJSON().slice(0, 19).replace('T',' ');                  			
	  const upDae = up_date.toJSON().slice(0, 19).replace('T',' ');    

	  this.capture_date=(this.data[0].capturedate==null)?this.data[0].capturedate:this.formatStamp(captreDate); 
	  this.update_date=(this.data[0].updatedate==null)?this.data[0].updatedate:this.formatStamp(upDae);  		
	  
	  this.status=(this.data.length >0)?this.data[0].status1:'';    
	  this.paid=(this.data.length >0)?parseInt(this.data[0].paid):'';     				
	  this.kin_title=(this.data.length >0)?this.data[0].title2:'';   		
	  this.kin_name=(this.data.length >0)?this.data[0].fname2:'';     	
	  this.kin_sname=(this.data.length >0)?this.data[0].sname2:'';        
	  this.kin_dob=(this.data.length >0)?this.formatDate(this.data[0].dob2):'';     							    
	  this.kin_passport=(this.data.length >0)?this.data[0].passport2:'';       
	  this.kin_relation=(this.data.length >0)?this.data[0].relation:'';       
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