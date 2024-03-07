import { SharedModule } from '@vendure/admin-ui/core';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';   
import { ActivatedRoute } from '@angular/router'; 	

@Component({
    selector: 'shopquery',   
    templateUrl: './shopquery.component.html',
    styleUrls: ['./shopquery.component.css'],         
    standalone: true,
    imports: [SharedModule],
})
export class ShopqueryComponent implements OnInit {          
    greeting = 'Shopquery Page';         
	data: any;     	       					     
	
	constructor(private http: HttpClient,private route: ActivatedRoute) 
	{
	     		 
    }
		
	ngOnInit() {
		this.getData(); 		
	}
	
	getData() {
		this.http.get('https://danshopapi.devworktdmc.com/contact/shop').subscribe((response) => {
		   this.data = response;    		              
		});  	
    }
	
}