import { SharedModule } from '@vendure/admin-ui/core';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';  

@Component({
  selector: 'temporary',
  templateUrl: './temporarymemberships.component.html',					
  styleUrls: ['./membershipcommon.component.css'],      
  standalone: true,
  imports: [SharedModule],
})

export class TemporarymembershipsComponent implements OnInit 
{
  greeting = 'temporary';		   
  pageSize : number;  
  maxPages: number;		 
  id : number;     
  name : string;    
  description : string;	
  data: any;
  list:any;   
  showMsg: boolean = false ;       
  currentPage: number;  
  totalPages: number;  
  pages : number;  
  pageNumber : number;  
  currentIndex : number;  
  pagesIndex : Array<number>;   
  inputName : string = '';      
  pager: any = {};    		   

  constructor(private http: HttpClient) {
		this.pageSize = 2;   						
		this.currentIndex = 1;	
		this.maxPages=2; 	     
  }

  ngOnInit() {
    this.getData(this.currentIndex);	  
  }    

  getData(pageNo: any) { 	
	this.currentIndex = Number(pageNo);     		  
    this.http.get(`https://danshopapi.devworktdmc.com/temporary/get_members?pageNumber=${this.currentIndex}&recordsPerPage=${this.pageSize}&search=${this.inputName}`).subscribe((response) => {
        
      this.data = response['data'].items;   
	  this.list = response['data'].pages; 	

	  this.totalPages = Math.ceil(this.list/this.pageSize);  		    
	  this.pageNumber = this.totalPages; 		
	  this.showMsg = (this.list >0)?true:false;    	
	  this.pager=this.setPagination(this.list,pageNo,this.pageSize,this.maxPages);     						 
      
    });
	
  } 

onSearch(event:any) { 
	this.currentIndex = 1;        
	this.inputName=event.target.value;   	
	this.getData(this.currentIndex);     	
  }
  
  setPage(index : number){  			                 
		 this.currentIndex = index;	  
		 this.getData(this.currentIndex);		  
   }  
  
   setPagination(totalItems: number, currentPage: number, pageSize: number,maxPages: number) {
   	
	let totalPages = Math.ceil(totalItems / pageSize);  
	
    if (currentPage < 1) {
        currentPage = 1;
    } else if (currentPage > totalPages) {
        currentPage = totalPages;
    }

    let startPage: number, endPage: number;
    if (totalPages <= maxPages) {
        startPage = 1;
        endPage = totalPages;
    } else {
        let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
        let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
        if (currentPage <= maxPagesBeforeCurrentPage) {
            startPage = 1;
            endPage = maxPages;
        } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
            startPage = totalPages - maxPages + 1;
            endPage = totalPages;
        } else {
            startPage = currentPage - maxPagesBeforeCurrentPage;
            endPage = currentPage + maxPagesAfterCurrentPage;
        }
    }

    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);					

    let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);					

    return {
        totalItems: totalItems,
        currentPage: currentPage,
        pageSize: pageSize,
        totalPages: totalPages,
        startPage: startPage,
        endPage: endPage,
        startIndex: startIndex,								
        endIndex: endIndex,
        pages: pages
    };
	
  }	 
    
} 