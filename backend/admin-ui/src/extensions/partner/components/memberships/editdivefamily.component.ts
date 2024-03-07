import { SharedModule } from '@vendure/admin-ui/core';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'; 
import { FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms';     
import {NgForm} from '@angular/forms';  
import { ActivatedRoute } from '@angular/router';   

@Component({
    selector: 'editdive',    		
    templateUrl: './editdivefamily.component.html',		  		  						
	styleUrls: ['./addannualmemberships.component.css'],       						  
    standalone: true,
    imports: [SharedModule],
})
export class EditDiveFamilyComponent implements OnInit {	          
      greeting = 'dive family';       
	  id: any;  
	  tab_id:any;    
	  tab_label:any; 	
	  diveForm: any;         
	  form!: FormGroup;  	
	  title:any; 
	  dob:any;  	
	  fname:any; 
	  sname:any;   
	  passport:any;  
	  memberno:any;  	
	  workdiver:any;  	
	  relation:any;  	  
	  phonehome:any;    	
	  phonework:any;  
	  cellphone:any; 
	  email:any;   	   
	  agency:any;   	  
	  qualification:any;   	  
	  freediver:any;   	   
	  status:any;   	
	  capturedate:any;   
	  updatedate:any;   	
	  paid:any;    
	  data: any;  	  
	  private apiUrl = 'https://danshopapi.devworktdmc.com/diver/update';  		  
	
	constructor(private formbulider: FormBuilder,private http: HttpClient,private route: ActivatedRoute) {
        this.id = this.route.snapshot.paramMap.get('id');  
		this.tab_id = this.route.snapshot.paramMap.get('id');  	
    }		
	
	ngOnInit(): void { 
		this.id = this.route.snapshot.paramMap.get('id');      
		this.getData(this.id);   
	
	this.diveForm = this.formbulider.group({
		  fname: ['', [Validators.required]], 		  		   
		  relation: ['', [Validators.required]], 		  	
		  cellphone: ['', [Validators.required]], 	
		  email: ['', [Validators.required, Validators.email]],  	
		  qualification: ['', [Validators.required]], 	    		  
		  status: ['', [Validators.required]], 
		  dob: ['', [Validators.required]],   	 		 
		  title: [],    
		  sname: [],   
		  passport: [],   	 	    
		  phonehome: [], 
		  phonework: [], 
		  agency: [], 
		  workdiver: [], 		
		  freediver: [],  		  
		  capturedate: [],    
		  updatedate: [],   
		  paid:[], 
		  tab_id:[],   
		});   
		
      }  	  
	
	handleClick(tabName) {
       // console.log('New title'+tabName);  		
		 var i, tabcontent, tablinks;
         tabcontent = document.getElementsByClassName("tabcontent");
		 tablinks = document.getElementsByClassName("tablinks");  
		 
		  for (i = 0; i < tabcontent.length; i++) 
		  { 
				if(tabName=='details')  
				{
					this.tab_label=(this.sname=='null')?this.fname:this.fname+' '+this.sname;    
				}
				else
				{
					this.tab_label=(this.sname=='null')?this.fname:this.fname+' '+this.sname;    
					this.tab_label=(this.memberno=='')?this.tab_label:this.tab_label+' ( '+this.memberno+' ) ';	
				}
				
				if(tabcontent[i].id==tabName)
				{
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
	  
	  successMsg:any;

	  updateDive(id:any,data:any): Observable<any> {
		 return this.http.post<any>(this.apiUrl+'/'+id,data);	           		    							
	  }   

	onSubmit() {      	  
    	  
    this.formDataError.msg='';
    this.formDataError.error_field='';		
    this.successMsg='';
	
	const form_data = this.diveForm.value;    	
	
    this.updateDive(this.id,form_data).subscribe(		  
        response => {
          console.log('Success:', response);		
          // Handle success, show a success message, refresh student data, etc.
          //this.getStudentData(); // Refresh student data after adding a new student
         this.successMsg='Data Updated';   		
        },	
        error => {
          console.error('Error:', error);
          this.formDataError.msg=error.error.error;
          this.formDataError.error_field=error.error.error_field;            
          // Handle error, show an error message, etc.		  
        }
      );
  }	
  
  
  getData(id) { 
    this.http.get('https://danshopapi.devworktdmc.com/diver/edit/'+id).subscribe((response) => {
      this.data = response;   
	  	  		
	  this.title=(this.data.length >0)?this.data[0].title1:'';       
	  this.fname=(this.data.length >0)?this.data[0].fname1:'';    
	  this.sname=(this.data.length >0)?this.data[0].sname1:'';    		
	  this.dob=(this.data.length >0)?this.formatDate(this.data[0].dob1):'';   			  		
	  this.passport=(this.data.length >0)?this.data[0].passport1:'';       
	  this.relation=(this.data.length >0)?this.data[0].relation:'';    
	  this.phonehome=(this.data.length >0)?this.data[0].telephone1:'';        	
	  this.phonework=(this.data.length >0)?this.data[0].telephone2:'';     
	  this.cellphone=(this.data.length >0)?this.data[0].cellphone1:'';     	
	  this.email=(this.data.length >0)?this.data[0].email1:''; 
	  this.memberno=(this.data.length >0)?this.data[0].member_no:'';      
	  this.qualification=(this.data.length >0)?this.data[0].qualification:'';     	
	  this.agency=(this.data.length >0)?this.data[0].agency:'';      
	  this.workdiver=(this.data.length >0)?parseInt(this.data[0].work_diver):'';           
	  this.status=(this.data.length >0)?this.data[0].status1:'';   
	  this.freediver=(this.data.length >0)?this.data[0].free_diver:'';   		  
	  this.capturedate=(this.data.length >0)?this.formatDate(this.data[0].capturedate):'';    
	  this.updatedate=(this.data.length >0)?this.formatDate(this.data[0].updatedate):'';       
	  this.paid=(this.data.length >0)?parseInt(this.data[0].paid):'';    
	  this.tab_label=(this.sname=='null')?this.fname:this.fname+' '+this.sname;  
	  this.tab_label=(this.memberno=='')?this.tab_label:this.tab_label+' ( '+this.memberno+' ) ';			
	  
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