// Import the Express module 
const express = require('express'); 

// Create an instance of an Express application 
const app = express(); 

// Mount App1 
const app1 = require('./annual'); 
// Mount App2 
const app2 = require('./partner'); 
// Mount App3  
const app3 = require('./temporary');   
// Mount App4  
const app4 = require('./student');   
// Mount App5		
const app5 = require('./diver');     

const app6 = require('./annual_frontend');  

// Mount App7  
const app7 = require('./nondiver');     

// Mount App8  		
const app8 = require('./trainer');   

// const app9 = require('./common_frontend'); 

// Mount App10  		
const app10 = require('./instructor');   

// Mount App11  		
const app11 = require('./provider');   

// const app12 = require('./login_frontend');  

const app13 = require('./provider_frontend');      

const app14 = require('./temporary_frontend');     

const app15 = require('./student_frontend');    

const app16 = require('./contact');         

const app17 = require('./payment');   		

const app18 = require('./company');  	

const app19 = require('./staff');  

const app20 = require('./cancel_request');  		

const app21 = require('./individual');      		

const app22 = require('./common_membership'); 

const app23 = require('./commercial');   

const app24 = require('./legal_advice');   

const app25 = require('./travel_notification');   

const app26 = require('./professional');   

const app27 = require('./school');  		

const app28 = require('./industry_partner');      

const app29 = require('./dive_centre_partner');    

// Mounts App1 at the '/app1' endpoint 
app.use('/annual',app1);   

// Mounts App2 at the '/app2' endpoint 
app.use('/partner',app2);    

// Mounts App3 at the '/app3' endpoint   
app.use('/temporary',app3);   

// Mounts App4 at the '/app4' endpoint   
app.use('/student',app4);      	

// Mounts App5 at the '/app5' endpoint   
app.use('/diver',app5);    

app.use('/annual_frontend',app6); 

// Mounts App7 at the '/app7' endpoint     
app.use('/nondiver',app7);  	 

// Mounts App8 at the '/app8' endpoint   
app.use('/trainer',app8);    	  		

// app.use('/common_frontend',app9); 		

// Mounts App10 at the '/app10' endpoint   
app.use('/instructor',app10);     

// Mounts App11 at the '/app11' endpoint   
app.use('/provider',app11); 

// app.use('/login_frontend',app12);    

app.use('/provider_frontend',app13);          

app.use('/temporary_frontend',app14);     

app.use('/student_frontend',app15);        

app.use('/contact',app16);     				 	

app.use('/payment',app17);    				 

app.use('/company',app18);      					 					

app.use('/staff',app19); 	

app.use('/cancel_request',app20); 																																								 									   						  									

app.use('/individual',app21); 		

app.use('/common_membership',app22);

app.use('/commercial',app23); 

app.use('/legal_advice',app24);    

app.use('/travel_notification',app25);    		

app.use('/professional',app26);       

app.use('/school',app27);    

app.use('/industry_partner',app28);    		

app.use('/dive_centre_partner',app29);    			

// Start the server 
const port = 4500;   
app.listen(port, () => { 
	console.log(`MembershipsApp is listening on port ${port}`);   				
});
        