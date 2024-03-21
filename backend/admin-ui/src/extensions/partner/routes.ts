import { registerRouteComponent } from '@vendure/admin-ui/core';
import { MembershipsComponent } from './components/memberships/memberships.component';
import { AnnualmembershipsComponent } from './components/memberships/annualmemberships.component';
import { TemporarymembershipsComponent } from './components/memberships/temporarymemberships.component';
import { StudentmembershipsComponent } from './components/memberships/studentmemberships.component';
import { PartnermembershipsComponent } from './components/memberships/partnermemberships.component';
import { CommercialmembershipsComponent } from './components/memberships/commercialmemberships.component';
import { AddStudentmembershipsComponent } from './components/memberships/addstudentmemberships.component';
import { AddTemporarymembershipsComponent } from './components/memberships/addtemporarymemberships.component';   
import { AddCommercialmembershipsComponent } from './components/memberships/addcommercialmemberships.component';    
import { AddAnnualmembershipsComponent } from './components/memberships/addannualmemberships.component';      
import { AddPartnermembershipsComponent } from './components/memberships/addpartnermemberships.component';       		
import { EditAnnualmembershipsComponent } from './components/memberships/editannualmemberships.component'; 
import { EditStudentmembershipsComponent } from './components/memberships/editstudentmemberships.component';        
import { CreateDiveFamilyComponent } from './components/memberships/createdivefamily.component';     
import { EditDiveFamilyComponent } from './components/memberships/editdivefamily.component';    
import { CreateNonDiveFamilyComponent } from './components/memberships/createnondivefamily.component';   
import { EditNonDiveFamilyComponent } from './components/memberships/editnondivefamily.component';    
import { EditTemporarymembershipsComponent } from './components/memberships/edittemporarymemberships.component';   
import { EditPartnermembershipsComponent } from './components/memberships/editpartnermemberships.component';		
import { AddInstructorPartnerComponent } from './components/memberships/addinstructorpartner.component';   	
import { EditInstructorPartnerComponent } from './components/memberships/editinstructorpartner.component';   
import { AddCompanyMembershipComponent } from './components/memberships/addcompanymembership.component';   
import { EditCompanyMembershipComponent } from './components/memberships/editcompanymembership.component';    
import { AddStaffComponent } from './components/memberships/addstaff.component';   
import { EditStaffComponent } from './components/memberships/editstaff.component';  		
import { AddIndividualMembershipComponent } from './components/memberships/addindividualmembership.component';  	 
import { EditIndividualMembershipComponent } from './components/memberships/editindividualmembership.component';  			       				
import { AddProfessionalMembershipComponent } from './components/memberships/addprofessionalmembership.component'; 	
import { EditProfessionalMembershipComponent } from './components/memberships/editprofessionalmembership.component';   
import { AddSchoolMembershipComponent } from './components/memberships/addschoolmembership.component';    
import { EditSchoolMembershipComponent } from './components/memberships/editschoolmembership.component';  
import { AddSchoolStudentComponent } from './components/memberships/addschoolstudent.component';  
import { EditSchoolStudentComponent } from './components/memberships/editschoolstudent.component';   

export default [
    registerRouteComponent({
        component: MembershipsComponent,
        path: '',
        title: 'Memberships Page',
        breadcrumb: 'Memberships',
    }),
	registerRouteComponent({
        component: AnnualmembershipsComponent,
        path: 'annual',
        title: 'Annual Members',
        breadcrumb: 'Annual Members',
    }),

	registerRouteComponent({
        component: TemporarymembershipsComponent,
        path: 'temporary',
        title: 'Temporary Members',
        breadcrumb: 'Temporary Members',
     }),
	registerRouteComponent({
        component: StudentmembershipsComponent,
        path: 'student',
        title: 'Student Members',
        breadcrumb: 'Student Members',
     }),
	registerRouteComponent({
        component: PartnermembershipsComponent,
        path: 'partner',
        title: 'Partner Members',
        breadcrumb: 'Partner Members',
     }),
	registerRouteComponent({
        component: CommercialmembershipsComponent,
        path: 'commercial',
        title: 'Commercial Members',
        breadcrumb: 'Commercial Members',
     }),
     registerRouteComponent({
        component: AddStudentmembershipsComponent,
        path: 'addstudent',
        title: 'Add Student',
        breadcrumb: 'Add Student',
     }),
	 registerRouteComponent({
        component: AddTemporarymembershipsComponent,			
        path: 'addtemporary',		
        title: 'Add Temporary',
        breadcrumb: 'Add Temporary',		
     }),
	 registerRouteComponent({
        component: AddCommercialmembershipsComponent,					
        path: 'addcommercial',		
        title: 'Add Commercial',
        breadcrumb: 'Add Commercial',	 		     	
     }),
	 registerRouteComponent({
        component: AddAnnualmembershipsComponent,		 			  	
        path: 'addannual',		
        title: 'Add Annual',
        breadcrumb: 'Add Annual',					   
     }),  
     registerRouteComponent({    
        component: AddPartnermembershipsComponent,												
        path: 'addpartner',		
        title: 'Add Partner',
        breadcrumb: 'Add Partner',	 				     	
     }),
	 registerRouteComponent({
        component: AddCompanyMembershipComponent,					
        path: 'addcompany',		
        title: 'Add Company',
        breadcrumb: 'Add Company',	  	
     }),	
	 registerRouteComponent({
        component: EditStudentmembershipsComponent,		
        path: 'editstudent/:id',  		  
        title: 'Edit Student',
        breadcrumb: 'Edit Student',	         	
    }),
	registerRouteComponent({
        component: EditAnnualmembershipsComponent,		
        path: 'editannual/:id',  		  
        title: 'Edit Annual',
        breadcrumb: 'Edit Annual',			  				
    }),   
	registerRouteComponent({
        component: CreateDiveFamilyComponent,   
        path: 'createdivefamily/:id',        			      
        title: 'Diving Family',
        breadcrumb: 'Add Diving Family',  
    }),   
	registerRouteComponent({
        component: EditDiveFamilyComponent,   
        path: 'editdivefamily/:id',        			        
        title: 'Diving Family',
        breadcrumb: 'Edit Diving Family',  
    }), 
	registerRouteComponent({
        component: CreateNonDiveFamilyComponent,   		
        path: 'createnondivefamily/:id',  		      			      
        title: 'Non Diving Family',  
        breadcrumb: 'Add Non Diving Family',  		
    }),   
	registerRouteComponent({
        component: EditNonDiveFamilyComponent,   
        path: 'editnondivefamily/:id',        			        
        title: 'Non Diving Family',
        breadcrumb: 'Edit Non Diving Family',  
    }), 
	registerRouteComponent({
        component: EditTemporarymembershipsComponent,				
        path: 'edittemporary/:id',  		  
        title: 'Edit Temporary',    
        breadcrumb: 'Edit Temporary',		   	  				
    }),		
	registerRouteComponent({
        component: EditPartnermembershipsComponent,		
        path: 'editpartner/:id',  		  
        title: 'Edit Partner',    
        breadcrumb: 'Edit Partner',				
    }), 
	registerRouteComponent({
        component: AddInstructorPartnerComponent,		 			  	
        path: 'createinstructor/:id',		  
        title: 'Add Instructor',
        breadcrumb: 'Add Instructor',										   
     }),  
	 registerRouteComponent({
        component: EditInstructorPartnerComponent,		 			  	
        path: 'editinstructor/:id',		  
        title: 'Edit Instructor',
        breadcrumb: 'Edit Instructor',													   
     }),  
	 registerRouteComponent({
        component: EditCompanyMembershipComponent,			 			  	
        path: 'editcompany/:id',					  
        title: 'Edit Company',
        breadcrumb: 'Edit Company',																   
     }),   
	 registerRouteComponent({
        component: EditStaffComponent,						 			  	
        path: 'editstaff/:id',							  
        title: 'Edit Staff',
        breadcrumb: 'Edit Staff',	   																		   
     }),    	
	 registerRouteComponent({
        component: AddStaffComponent,			 					  	
        path: 'addstaff/:id',					  
        title: 'Add Staff',   		
        breadcrumb: 'Add Staff',						   															   
     }),
	 registerRouteComponent({
        component: AddIndividualMembershipComponent,					
        path: 'addindividual',		
        title: 'Add Individual',
        breadcrumb: 'Add Individual',	  	
     }), 
	 registerRouteComponent({
        component: EditIndividualMembershipComponent,				  			 			  	
        path: 'editindividual/:id',					  
        title: 'Edit Individual',
        breadcrumb: 'Edit Individual',	   															   
     }),  
	 registerRouteComponent({
        component: AddProfessionalMembershipComponent,					
        path: 'addprofessional',		
        title: 'Add Professional',
        breadcrumb: 'Add Professional',	     	
     }),
	 registerRouteComponent({
        component: EditProfessionalMembershipComponent,									 			  	
        path: 'editprofessional/:id',					  
        title: 'Edit Professional',
        breadcrumb: 'Edit Professional',					   															   
     }),   
	 registerRouteComponent({
        component: AddSchoolMembershipComponent,								
        path: 'addschool',		
        title: 'Add School',
        breadcrumb: 'Add School',	     	
     }),
	 registerRouteComponent({
        component: EditSchoolMembershipComponent,									 			  	
        path: 'editschool/:id',					  
        title: 'Edit School',
        breadcrumb: 'Edit School',							   															   
     }), 
	 registerRouteComponent({
        component: AddSchoolStudentComponent,								
        path: 'addscholar/:id',	  
        title: 'Add School Student',
        breadcrumb: 'Add School Student',	   		  	
     }),	
	 registerRouteComponent({
        component: EditSchoolStudentComponent,								
        path: 'editscholar/:id',	  
        title: 'Edit School Student',
        breadcrumb: 'Edit School Student',	   							  				
     }),	
];