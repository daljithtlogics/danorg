import { addNavMenuSection } from '@vendure/admin-ui/core';			

export default [
    addNavMenuSection({
        id: 'contacts',    
        label: 'Contact Enqueries',       		   			          
        items: [
		{
            id: 'orgquery',   
            label: 'Danorg Queries',     
            routerLink: ['/extensions/contacts/orgquery'],                        
            // Icon can be any of https://core.clarity.design/foundation/icons/shapes/
            icon: 'envelope',
        },
		{
            id: 'shopquery',   
            label: 'Danshop Queries',       
            routerLink: ['/extensions/contacts/shopquery'],                           
            // Icon can be any of https://core.clarity.design/foundation/icons/shapes/
            icon: 'envelope',    
        }
		],
    },  
    ),
];        