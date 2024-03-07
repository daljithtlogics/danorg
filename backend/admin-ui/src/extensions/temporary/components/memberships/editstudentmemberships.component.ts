import { SharedModule } from '@vendure/admin-ui/core';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'; 
import { FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms';       
import { ActivatedRoute } from '@angular/router';   

@Component({
    selector: 'editstudent',   
    templateUrl: './editstudentmemberships.component.html',		  			
	styleUrls: ['./editstudentmemberships.component.css'],       		
    standalone: true,
    imports: [SharedModule],  
})
export class EditStudentmembershipsComponent implements OnInit {  
	id: any;   
    greeting = 'Edit student';  
	studentForm:any; 	 
    form!: FormGroup; 
    formSubmitted: boolean = false;    	
    formError: boolean = false; 
	first_name:any;  
	sir_name:any;   
	member_no:any;
	instructor_id:any;  
    info_title:any;  
	info_dob:any;   	
	info_pass:any;  
	info_addr1:any;
	info_addr2:any;   
	medical_aid:any;  
	medical_no:any;  
	start_date:any;  
	info_city:any;  
	info_province:any;    
	post_code:any;  
	info_country:any;  
	tel_home:any;  
	tel_work:any; 
	cell_phone:any;  	
	info_email:any;  	
	comment:any;   
	fax:any;   
	mainReason:any;
	subReason:any;    
	successMsg:any;  	
	reasons:any; 
	comments:any; 
	sub_reasons:any;	 
	users: any = [];	   	
    responseData: any;
    data: any;
    private apiUrl = 'https://danshopapi.devworktdmc.com/student/update'; // Replace this with your API endpoint  

	constructor(private formbulider: FormBuilder,private http: HttpClient,private route: ActivatedRoute) {
	    this.id = this.route.snapshot.paramMap.get('id');     
		this.getReasons();   
		this.getProfiles();       	
      }   

	ngOnInit() { 			
		this.getData(this.id);  
		this.studentForm = this.formbulider.group({    
		  first_name: ['', [Validators.required,Validators.minLength(2)]],  		  
		  info_dob: ['', [Validators.required,Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]], 		  
		  info_email: ['', [Validators.required,Validators.email]], 	
		  start_date: ['', [Validators.required,Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],  	
		  info_city: ['', [Validators.required]],   
		  info_country: ['', [Validators.required]], 
		  cell_phone: ['', [Validators.required]],			
		  instructor_id: ['', [Validators.required]],   
		  mainReason: ['', [Validators.required]], 	   
		  subReason: ['', [Validators.required]],   		  
		  info_title:[], 	
		  sir_name:[], 	 
		  info_pass:[],
		  medical_aid:[],   
		  medical_no:[],
		  info_addr1:[],    	
		  info_addr2:[],
		  info_province:[],   
		  post_code:[],	
		  tel_home:[],	  
		  tel_work:[],	
		  comment:[],
		  fax:[],  	 		  
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
    
  updateStudent(id:any,data:any): Observable<any> {
    return this.http.post<any>(this.apiUrl+'/'+id,data);					    		    							
  }

  onSubmit() {  

    if (this.studentForm.invalid)
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
		
		const form_data = this.studentForm.value;    
		
		this.updateStudent(this.id,form_data).subscribe(		  
			response => {           		 						
			  this.successMsg='Data Updated';   				 		  			  
			  this.studentForm.controls['mainReason'].reset();   								  			 		 	
			  this.studentForm.controls['subReason'].reset();      					
			  this.studentForm.controls['comment'].reset();        						  
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
  
  getProfiles() {
    this.http.get('https://danshopapi.devworktdmc.com/annual/get').subscribe((response) => {
      this.users = response;         		       					
    });
  }
  
  getComment(id)
  {
	  this.http.get('https://danshopapi.devworktdmc.com/student/comments/'+id).subscribe((response) => {
		    this.comments = response;      		           
	  });   
  }
  
  getData(id) { 
    this.http.get('https://danshopapi.devworktdmc.com/student/edit/'+id).subscribe((response) => {
      this.data = response;
	  this.first_name=(this.data.length >0)?this.data[0].fname1:'';  
	  this.sir_name=(this.data.length >0)?this.data[0].sname1:'';      
	  this.info_title=(this.data.length >0)?this.data[0].title1:'';       
	  this.member_no=(this.data.length >0)?this.data[0].member_no:'';        
	  this.info_dob=(this.data.length >0)?this.formatDate(this.data[0].dob1):'';        
	  this.info_pass=(this.data.length >0)?this.data[0].passport1:''; 
	  this.medical_aid=(this.data.length >0)?this.data[0].medical_aid:'';   
	  this.instructor_id=(this.data.length >0)?this.data[0].instructor_id:'';           
	  this.medical_no=(this.data.length >0)?this.data[0].medical_aid_no:'';    
	  this.start_date=(this.data.length >0)?this.formatDate(this.data[0].startdate):'';       			
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
   
	loadData(tab) { 	    

		if(tab=="note")
		{
			this.getComment(this.id);  	  	      
		}	
		
	  }	

}