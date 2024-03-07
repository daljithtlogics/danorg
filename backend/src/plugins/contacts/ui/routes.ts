import { registerRouteComponent } from '@vendure/admin-ui/core';  
import { OrgqueryComponent } from './components/contacts/orgquery.component';    
import { ShopqueryComponent } from './components/contacts/shopquery.component';        

export default [     
    registerRouteComponent({ 
		path: 'orgquery',  
		component: OrgqueryComponent,		  				   	   			        
        title: 'Danorg Enquery',            				
        breadcrumb: 'Orgquery',     
    }),
	registerRouteComponent({
		path: 'shopquery',   
        component: ShopqueryComponent,	     
        title: 'Danshop Enquery',              				
        breadcrumb: 'Shopquery',        
    }),
];        