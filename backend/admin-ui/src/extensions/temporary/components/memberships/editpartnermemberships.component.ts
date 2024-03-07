import { SharedModule } from '@vendure/admin-ui/core';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'; 
import { FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms';     
import {NgForm} from '@angular/forms';  
import { ActivatedRoute } from '@angular/router'; 		

@Component({
    selector: 'partner',
    templateUrl: './editpartnermemberships.component.html',		  								
	styleUrls: ['./editpartnermemberships.component.css'],      				
    standalone: true,
    imports: [SharedModule],	
})
export class EditPartnermembershipsComponent implements OnInit {        
    greeting = 'editpartner'; 
	partForm:any; 	 
	form!: FormGroup; 
	formSubmitted: boolean = false;    	  
	formError: boolean = false; 	  
	id: any;  
	b_name:any;	
	b_email:any;
	c_person:any;	
	w_address:any; 	
	u_profile:any;	
	postal_addr1:any;	
	postal_addr2:any;
	b_city:any;  
	b_code:any; 	
	b_country:any; 
	province:any;  
	work_tel:any;  
	cell_phone:any;	
	fax:any; 
	dsp:any;	
	hra:any;	
	level:any;	
	lat:any;
	lng:any;
	paid:any;					
	status:any; 	
	start_date:any;  
	comment:any;   
	mainReason:any;
	subReason:any;    	
	successMsg:any;  
	instructors:any;    	
	reasons:any; 
	comments:any;   
	sub_reasons:any;	
    responseData: any; 
    users: any = [];	
	data: any;
	private apiUrl = 'https://danshopapi.devworktdmc.com/partner/update'; // Replace this with your API endpoint

	 constructor(private formbulider: FormBuilder,private http: HttpClient,private route: ActivatedRoute) {
	    this.id = this.route.snapshot.paramMap.get('id');     
		this.getReasons();     		 
      }
	  
	  ngOnInit() {	 			
			this.getMember();     
			this.getData(this.id); 	  

			this.partForm = this.formbulider.group({
				 b_name: ['', [Validators.required,Validators.minLength(2)]],
				 b_email: ['', [Validators.required,Validators.email]],  
				 start_date: ['', [Validators.required,Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],   
				 u_profile: ['', [Validators.required]],       	
				 b_city: ['', [Validators.required]],        
				 b_country: ['', [Validators.required]],      
				 cell_phone: ['', [Validators.required]],   
				 mainReason: ['', [Validators.required]], 	 
				 subReason: ['', [Validators.required]], 	   	
				 c_person:[], 	 
				 w_address:[],  	
				 postal_addr1:[], 	 
				 postal_addr2:[], 	
				 province:[], 
				 b_code:[],	
				 work_tel:[],  	
				 fax:[],  
				 dsp:[],	
				 hra:[],	
				 level:[],	
				 lat:[],	
				 lng:[], 	
				 status:[],	
				 paid:[],
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
		  
 // document.getElementById(tabName).style.display = "block";	
 
 // evt.currentTarget.className += " active";
		
      }  	  

  formDataError: any = {
    msg: '',
    error_field: ''
  };   

  updatePartner(id:any,data:any): Observable<any> {
    return this.http.post<any>(this.apiUrl+'/'+id,data);	  				    		    							
  } 

  onSubmit() {  

    if (this.partForm.invalid)
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
		
		const form_data = this.partForm.value;    
		
		this.updatePartner(this.id,form_data).subscribe(		  
			response => {           		
						
			  this.successMsg='Data Updated';   				  
			  	
			  this.partForm.controls['mainReason'].reset();   								  			 		 	
			  this.partForm.controls['subReason'].reset();      					
			  this.partForm.controls['comment'].reset();      		
			  
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

  getMember() {
    this.http.get('https://danshopapi.devworktdmc.com/annual/active_members').subscribe((response) => {
      this.users = response;                					
    });
  }	
  
  getReasons(){
	this.http.get('https://danshopapi.devworktdmc.com/annual/reasons').subscribe((response) => {
      this.reasons = response;                   		               					
    });
  } 
  
    getData(id) { 
	  this.http.get('https://danshopapi.devworktdmc.com/partner/edit/'+id).subscribe((response) => {
      this.data = response;   
	  this.b_name=(this.data.length >0)?this.data[0].bname:'';    
	  this.b_email=(this.data.length >0)?this.data[0].bemail:'';  
	  this.c_person=(this.data.length >0)?this.data[0].cname:'';  	
	  this.w_address=(this.data.length >0)?this.data[0].waddress:'';   
	  this.u_profile=(this.data.length >0)?this.data[0].member_id:'';      
	  this.postal_addr1=(this.data.length >0)?this.data[0].address1:'';  
	  this.postal_addr2=(this.data.length >0)?this.data[0].address2:'';  
	  this.b_city=(this.data.length >0)?this.data[0].city:'';      		
	  this.province=(this.data.length >0)?this.data[0].province:'';   
	  this.b_code=(this.data.length >0)?this.data[0].postcode:'';          
	  this.b_country=(this.data.length >0)?this.data[0].country:'';    		
	  this.work_tel=(this.data.length >0)?this.data[0].telphone:'';       
	  this.cell_phone=(this.data.length >0)?this.data[0].cellphone:'';     
	  this.fax=(this.data.length >0)?this.data[0].fax:'';     
	  this.dsp=(this.data.length >0)?parseInt(this.data[0].dsp):'';     
	  this.hra=(this.data.length >0)?parseInt(this.data[0].hra):'';    
	  this.level=(this.data.length >0)?this.data[0].level:'';     
	  this.start_date=(this.data.length >0)?this.formatDate(this.data[0].start_date):'';    
	  this.lat=(this.data.length >0)?this.data[0].latitude:'';      
	  this.lng=(this.data.length >0)?this.data[0].longitude:'';    
	  this.status=(this.data.length >0)?this.data[0].status:'';     
	  this.paid=(this.data.length >0)?parseInt(this.data[0].paid):'';         
    });
  }  
  
  loadData(tab) { 	  
	
	if(tab=="instructor")
	{
		this.getInstructor(this.id);  			  			
	}

	if(tab=="comment")
	{
		this.getComment(this.id);  	  	
	}		
	
  }
  
  getInstructor(id)
  {
	  this.http.get('https://danshopapi.devworktdmc.com/partner/instructors/'+id).subscribe((response) => {
		    this.instructors = response;     		 
	  });   
  }	
  
  getComment(id)
  {
	  this.http.get('https://danshopapi.devworktdmc.com/partner/comments/'+id).subscribe((response) => {
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
				
}