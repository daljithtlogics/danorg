import { SharedModule } from '@vendure/admin-ui/core';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'; 
import { FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms';      
import {NgForm} from '@angular/forms';  
import { ActivatedRoute } from '@angular/router';    		

@Component({
    selector: 'editannual',		
    templateUrl: './editannualmemberships.component.html',		  		  						
	styleUrls: ['./editannualmemberships.component.css'],             
    standalone: true,
    imports: [SharedModule],	  	
})
export class EditAnnualmembershipsComponent implements OnInit {	

	  anualForm: any;   
	  qualifyForm:any; 
	  instructForm:any;     
	  provideForm:any;   	
      greeting = 'annual';   
      responseData: any;      
	  id: any; 
	  row_id:any;  	
	  form!: FormGroup;  	
	  info_title:any; 
	  info_dob:any;  	
	  f_name:any;
	  first_name:any;  
	  sur_name:any;    
	  s_name:any;  
	  info_passport:any;
	  passport_no:any;  
	  pack_no:any;  	
	  provider_country:any; 
	  provider_course:any;  	
	  member_level:any;  	
	  info_address1:any;  
	  postaddr1:any;
	  postaddr2:any;   
	  info_address2:any;  
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
	  member_type:any;    
	  rejoin:any;  
	  broker:any;    
	  agency:any;    
	  professional:any;  	
	  full_time:any;  	
	  medical_aid:any;  	   
	  medical_no:any; 
	  member_no:any;  	
	  start_date:any;  
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
	  reasons:any; 
	  sub_reasons:any;	
	  brokers:any;   	
	  
	  private apiUrl = 'https://danshopapi.devworktdmc.com/annual/update'; 	
	  private trainerApi = 'https://danshopapi.devworktdmc.com/trainer/add';        
	  private instructorApi = 'https://danshopapi.devworktdmc.com/instructor/add';      
	  private providerApi = 'https://danshopapi.devworktdmc.com/provider/add';        
	  
	  public IsOpen : boolean = false;
	  public openMode : boolean = false;	
	  public IsDisplay : boolean = false;	
	  
	  openModal(open : boolean) : void {
		this.IsOpen = open;     		
	  }	
	  
	  showModal(open : boolean) : void {
		this.openMode = open;     		
	  }	
	  
	  displayModal(open : boolean) : void {
		this.IsDisplay = open;         		
	  }	
	  
	  insrtructClick(option)
	  {
		option.click();	  
		this.IsOpen = false;    	  
	  }
	  
	  trainerClick(option)
	  {
		option.click();	  
		this.openMode = false;    			  
	  }
	  
	  providerClick(option)  
	  {
		option.click();	  
		this.IsDisplay = false;    		     	  
	  }
	  
	  constructor(private formbulider: FormBuilder,private http: HttpClient,private route: ActivatedRoute) {
	    this.id = this.route.snapshot.paramMap.get('id');   		
		this.row_id = this.route.snapshot.paramMap.get('id');  	   	  		
        this.getCourses(this.id);    
		this.getStudents();   
		this.getReasons();   
      }
	  
	  ngOnInit(): void { 
		this.getBroker();        
		this.getData(this.id);   
		
		this.anualForm = this.formbulider.group({
		  f_name: ['', [Validators.required]], 		 
		  info_dob: ['', [Validators.required]],        
		  info_city: ['', [Validators.required]], 	
		  info_country: ['', [Validators.required]], 	  
		  cell_phone: ['', [Validators.required]], 	    
		  info_email: ['', [Validators.required]], 	   
		  member_type: ['', [Validators.required]], 	    
		  start_date: ['', [Validators.required]], 	    
		  join_date: ['', [Validators.required]], 	    
		  kin_fname: ['', [Validators.required]], 	   
		  kin_dob: ['', [Validators.required]], 	   
		  kin_city: ['', [Validators.required]], 	 
		  kin_country: ['', [Validators.required]], 	  
		  kin_phone: ['', [Validators.required]], 	  
		  kin_email: ['', [Validators.required]],   
		  pay_method: ['', [Validators.required]], 	  
		  card_expiry: ['', [Validators.required]], 	      
		  account_type: ['', [Validators.required]], 	  
		  account_no: ['', [Validators.required]], 	    
		  mainReason: ['', [Validators.required]], 	 
		  subReason: ['', [Validators.required]], 	   
		  sur_name: [],  
		  info_title:[], 
		  info_passport:[],  
		  member_level:[],   
		  info_address1:[],  	
		  info_address2:[],  	
		  info_province:[],  
		  post_code:[],      
		  tel_home:[],    
		  tel_work:[],   
		  fax:[], 
		  rejoin:[],  	
		  broker:[],  	
		  agency:[],  
		  professional:[],
		  full_time:[],  
		  medical_aid:[],  
		  medical_no:[], 
		  capture_date:[],  	
		  update_date:[],  
		  work_diver:[],  
		  qualification:[],  
		  researcher:[],  
		  instructor_state:[],  
		  status:[],    
		  paid:[],  
		  kin_title:[],  
		  kin_sname:[],  
		  kin_passport:[],   
		  kin_address1:[],
		  kin_address2:[],   
		  kin_province:[],  		
		  kin_post:[],		
		  kin_num:[],  
		  kin_tel:[],  
		  kin_relation:[],  
		  institute:[],
		  account_holder:[],  					
		  pay_period:[],  		
		  branch:[],  
		  branch_code:[],  
		  authorise_sign:[],  
		  debt:[], 
		  comment:[],  			 	
		});   
		
		this.qualifyForm = this.formbulider.group({
		  course_id: ['', [Validators.required]],   
		  row_id:['', [Validators.required]],     	 	
		});   
		
		this.instructForm = this.formbulider.group({
		  instruct_course: ['', [Validators.required]],   				
		  student_id: ['', [Validators.required]],     		   
		  row_id:['', [Validators.required]],   
		  pack_number:[],      	
		});    

		this.provideForm = this.formbulider.group({
		  row_id:['', [Validators.required]],   	
		  first_name: ['', [Validators.required]],   
		  passport_no: ['', [Validators.required]],  
		  city: ['', [Validators.required]],    
		  postcode: ['', [Validators.required]],  
		  provider_country: ['', [Validators.required]],    	
		  provider_course: ['', [Validators.required]],      
		  s_name:[],  
		  title:[],   
		  postaddr1:[],  	
		  postaddr2:[], 
		  province:[], 
		  pack_no:[],  						
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
		  
 // document.getElementById(tabName).style.display = "block";	
 
 // evt.currentTarget.className += " active";
		
      }
	  
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
  successMsg:any;

  updateAnnual(id:any,data:any): Observable<any> {
    return this.http.post<any>(this.apiUrl+'/'+id,data);	    		    							
  }    

  onSubmit() {    
    this.formDataError.msg='';
    this.formDataError.error_field='';		
    this.successMsg='';
	
	const form_data = this.anualForm.value;    
	
    this.updateAnnual(this.id,form_data).subscribe(		  
        response => {           		
          // Handle success, show a success message, refresh student data, etc.
          //this.getStudentData(); // Refresh student data after adding a new student
         this.successMsg='Data Updated';   		 		  

		  this.anualForm.controls['mainReason'].reset();   	  	 		 	
		  this.anualForm.controls['subReason'].reset();      		
		  this.anualForm.controls['comment'].reset();   
          
        },	
        error => {
          
          this.formDataError.msg=error.error.error;
          this.formDataError.error_field=error.error.error_field;			

          console.log(error.error.error);
          console.log(error.error.error_field);
          // Handle error, show an error message, etc.		  
        }
      );
  }
  
  getStudents() {
    this.http.get('https://danshopapi.devworktdmc.com/annual/active_members').subscribe((response) => {
      this.students = response;               		               					
    });
  }
  
   getBroker() {   
    this.http.get('https://danshopapi.devworktdmc.com/partner/get').subscribe((response) => {
      this.brokers = response;  		      
    });
  }       
  
  getReasons(){
	this.http.get('https://danshopapi.devworktdmc.com/annual/reasons').subscribe((response) => {
      this.reasons = response;                   		               					
    });
  }

  getCourses(id)  
  {
	  this.http.get('https://danshopapi.devworktdmc.com/annual/courses/'+id).subscribe((response) => {
		    this.courses = response;       
			          				   
	  });   
  }  
  
  getDive(id)
  {
	  this.http.get('https://danshopapi.devworktdmc.com/annual/dives/'+id).subscribe((response) => {
		    this.dives = response;    			   				   
	  });   
  }
  
  getQualify(id)
  {
	  this.http.get('https://danshopapi.devworktdmc.com/annual/qualifications/'+id).subscribe((response) => {
		    this.qualifications = response;       
	  });   
  }
  
  getInstructor(id)
  {
	  this.http.get('https://danshopapi.devworktdmc.com/annual/instructors/'+id).subscribe((response) => {
		    this.instructors = response;    
	  });   
  }	
  
  getComment(id)
  {
	  this.http.get('https://danshopapi.devworktdmc.com/annual/comments/'+id).subscribe((response) => {
		    this.comments = response;          
	  });   
  }
  
  getProvider(id)
  {
	  this.http.get('https://danshopapi.devworktdmc.com/annual/providers/'+id).subscribe((response) => {
		    this.providers = response;      
	  });   
  }
  
  getNonDive(id)  
  {
	  this.http.get('https://danshopapi.devworktdmc.com/annual/nondives/'+id).subscribe((response) => {
		    this.nondives = response;       						   
	  });   
  }
  
  getData(id) { 
    this.http.get('https://danshopapi.devworktdmc.com/annual/edit/'+id).subscribe((response) => {
      this.data = response;
	  
	  this.info_title=(this.data.length >0)?this.data[0].title1:'';       
	  this.f_name=(this.data.length >0)?this.data[0].fname1:'';    
	  this.sur_name=(this.data.length >0)?this.data[0].sname1:'';    		
	  this.info_dob=(this.data.length >0)?this.formatDate(this.data[0].dob1):'';   
	  this.info_passport=(this.data.length >0)?this.data[0].passport1:'';     
	  this.member_level=(this.data.length >0)?this.data[0].level:'';    		 	
	  this.info_address1=(this.data.length >0)?this.data[0].address1:'';        
	  this.info_address2=(this.data.length >0)?this.data[0].address2:'';      
	  this.info_city=(this.data.length >0)?this.data[0].city1:'';        
	  this.info_province=(this.data.length >0)?this.data[0].province1:'';          
	  this.post_code=(this.data.length >0)?this.data[0].postcode1:'';      
	  this.info_country=(this.data.length >0)?this.data[0].country1:'';   
	  this.tel_home=(this.data.length >0)?this.data[0].telephone1:'';        
	  this.tel_work=(this.data.length >0)?this.data[0].telephone2:'';        	
	  this.cell_phone=(this.data.length >0)?this.data[0].cellphone1:'';          
	  this.fax=(this.data.length >0)?this.data[0].fax:'';        
	  this.info_email=(this.data.length >0)?this.data[0].email1:'';      
	  this.member_type=(this.data.length >0)?this.data[0].membertype:'';      
	  this.rejoin=(this.data.length >0)?this.data[0].rejoin:'';      
	  this.broker=(this.data.length >0)?this.data[0].broker_id:'';   
	  this.agency=(this.data.length >0)?this.data[0].agency:'';  
	  this.professional=(this.data.length >0)?this.data[0].professional:'';  		
	  this.full_time=(this.data.length >0)?this.data[0].fulltime:'';     
	  this.medical_aid=(this.data.length >0)?this.data[0].medical_aid:'';  
	  this.medical_no=(this.data.length >0)?this.data[0].medical_aid_no:'';  
	  this.member_no=(this.data.length >0)?this.data[0].member_no:'';    
	  this.start_date=(this.data.length >0)?this.formatDate(this.data[0].startdate):'';	
	  
	  const captre_date = new Date(this.data[0].capturedate); 	
	  const up_date = new Date(this.data[0].updatedate);    
	  const captreDate = captre_date.toJSON().slice(0, 19).replace('T',' ');         			
	  const upDae = up_date.toJSON().slice(0, 19).replace('T',' ');    

	  this.capture_date=(this.data[0].capturedate==null)?this.data[0].capturedate:this.formatStamp(captreDate); 
	  this.update_date=(this.data[0].updatedate==null)?this.data[0].updatedate:this.formatStamp(upDae);         
	  
	  this.join_date=(this.data.length >0)?this.formatDate(this.data[0].joindate):'';	
	  this.work_diver=(this.data.length >0)?this.data[0].working_diver:'';  
	  this.qualification=(this.data.length >0)?this.data[0].qualification:'';     	
	  this.researcher=(this.data.length >0)?this.data[0].researcher:'';   
	  this.instructor_state=(this.data.length >0)?this.data[0].status1:'';       
	  this.status=(this.data.length >0)?this.data[0].status2:'';    
	  this.paid=(this.data.length >0)?this.data[0].paid:'';      
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

	  this.pay_method=(this.data.length >0)?this.data[0].pay_method:'';      
	  this.pay_period=(this.data.length >0)?this.data[0].pay_period:'';      
	  this.account_holder=(this.data.length >0)?this.data[0].account_holder:'';      
	  this.institute=(this.data.length >0)?this.data[0].institute:'';      
	  this.branch=(this.data.length >0)?this.data[0].branch:'';      
	  this.branch_code=(this.data.length >0)?this.data[0].branch_code:'';      
	  this.account_type=(this.data.length >0)?this.data[0].account_type:'';      
	  this.account_no=(this.data.length >0)?this.data[0].account_no:'';      
	  this.authorise_sign=(this.data.length >0)?this.data[0].authorise_sign:'';      
	  this.debt=(this.data.length >0)?this.data[0].debt:'';       	  
	  this.card_expiry=(this.data.length >0)?this.formatDate(this.data[0].card_expiry):'';  	  	
	  
    });
  }
  
  loadData(tab) { 	  
	   
	if(tab=="divein")
	{
		this.getDive(this.id);  		
	}	

	if(tab=="nondivein")
	{
		this.getNonDive(this.id);  		
	} 

	if(tab=="qualify")
	{
		this.getQualify(this.id);  	  	
	}		
	
	if(tab=="instructor")
	{
		this.getInstructor(this.id);  	  	
	}	
	
	if(tab=="provider")
	{
		this.getProvider(this.id);  	  	
	}	
	
	if(tab=="comment")
	{
		this.getComment(this.id);  	  	
	}	
	
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
  
  addTrainer(data:any): Observable<any> {
	return this.http.post<any>(this.trainerApi,data);	      		    							
  }     
   
  addInstructor(data:any): Observable<any> {
	return this.http.post<any>(this.instructorApi,data);	   			   		    							
  }  
  
  addProvider(data:any): Observable<any> {
	return this.http.post<any>(this.providerApi,data);	   			   		    							
  }  
  
  onAdd() {      

	this.formDataError.msg='';
	this.formDataError.error_field='';
	this.successMsg='';
	
	const form_data = this.qualifyForm.value;     		
	console.log(form_data);    
	
	this.addTrainer(form_data).subscribe(		  
		response => {
		  console.log('Success:', response);  			  
		  this.getCourses(this.id);         
		  this.getQualify(this.id);  	     	
		  this.successMsg='Data Added';   	
		  this.qualifyForm.controls['course_id'].reset();     						
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
  
  onSave() {   
				
			this.formDataError.msg='';
			this.formDataError.error_field='';   
			this.successMsg='';
			
			const form_data = this.instructForm.value;       	
			console.log(form_data);    
			
			this.addInstructor(form_data).subscribe(		  
				response => {
				  console.log('Success:', response);  		    	  
				  this.getCourses(this.id);           
				  this.getInstructor(this.id);  	         	
				  this.successMsg='Data Added';   	
				  this.instructForm.controls['instruct_course'].reset();     	
				  this.instructForm.controls['student_id'].reset();      		
				  this.instructForm.controls['pack_number'].reset();      
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
	
	onCreate() {     
				
		this.formDataError.msg='';
		this.formDataError.error_field='';   
		this.successMsg='';
		
		const form_data = this.provideForm.value;       	
		console.log(form_data);    		
		
		this.addProvider(form_data).subscribe(		  
			response => {
			  console.log('Success:', response);  				     				    			   	         	
			  this.successMsg='Data Added';   
			  
			  this.provideForm.controls['title'].reset();   		  	
			  this.provideForm.controls['first_name'].reset();      					
			  this.provideForm.controls['s_name'].reset();    
			  
			  this.provideForm.controls['passport_no'].reset();   		  	
			  this.provideForm.controls['postaddr1'].reset();      		
			  this.provideForm.controls['postaddr2'].reset();   
			  
			  this.provideForm.controls['city'].reset();   		  	
			  this.provideForm.controls['province'].reset();      		
			  this.provideForm.controls['postcode'].reset();   
			  
			  this.provideForm.controls['provider_country'].reset();   		  	
			  this.provideForm.controls['provider_course'].reset();      		
			  this.provideForm.controls['pack_no'].reset();    

			  this.getProvider(this.id);      		
			  
			},
			error => {
			  console.error('Error:', error);
			  this.formDataError.msg=error.error.error;
			  this.formDataError.error_field=error.error.error_field;

			  console.log(error.error.error);
			  console.log(error.error.error_field);  
				
			}
		  );	  
		  		    
	}		
				
}