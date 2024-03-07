import { SharedModule } from '@vendure/admin-ui/core';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';     
import { ActivatedRoute } from '@angular/router'; 	

@Component({
    selector: 'orgquery',   
    templateUrl: './orgquery.component.html',
    styleUrls: ['./orgquery.component.css'],         
    standalone: true,
    imports: [SharedModule],
})
export class OrgqueryComponent implements OnInit {               
    greeting = 'Orgquery Page';          		
	data: any;     	       					     
	
	constructor(private http: HttpClient,private route: ActivatedRoute)   
	{
	     		 
    }
		
	ngOnInit() {
		this.getData(); 		      
	}
	
	getData() {
		this.http.get('https://danshopapi.devworktdmc.com/contact/org').subscribe((response) => {
		  this.data = response;                  
		});  	
    }
	
}