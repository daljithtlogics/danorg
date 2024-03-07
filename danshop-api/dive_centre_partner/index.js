const express = require('express');
const bodyParser = require('body-parser');  
const { sshTunnelConfig, dbServer } = require('./../config');
const createSshTunnel = require('./../sshTunnel');
const queryDatabase = require('./../databasequery');
const cors = require('cors');   

const app = express();
const PORT = 4500;

// Middleware to handle CORS and preflight requests
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', '*');
    res.append('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
    res.append('Access-Control-Allow-Headers', 'Content-Type, authorization');
    next();
});

app.use(bodyParser.json());  
app.use(cors()); 

// Define routes for App1 
app.get('/', (req, res) => { 
	res.send('Hello from app29!');    					  				    
});  

app.get('/get_members/:id', async (req, res) => {    
  const id = req.params.id;		 				
  try {
    const stream = await createSshTunnel(sshTunnelConfig, dbServer);	  	
    const sqlQuery = `SELECT id,fname1,sname1,member_no,email1 from membership WHERE parent_id=${id} AND membertype='dive_centre_partner'`;	     	    
    const results = await queryDatabase(sqlQuery,stream);	    					       												  							  		
    res.status(200).json(results);   								
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from database: ' + error.message });		  					    						   	
  }
}) 

app.get('/edit/:id', async (req, res) => { 
  const id = req.params.id;		 
  try {
    const stream = await createSshTunnel(sshTunnelConfig, dbServer);		
    const sqlQuery = `SELECT * FROM membership WHERE id=${id}`;	 			   				  		 		     	    
    const results = await queryDatabase(sqlQuery, stream);	  	     		
    res.status(200).json(results);          
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from database: ' + error.message });		      	
  }
})   	

app.post('/add', async (req, res) => {			
  const data = req.body;	
  
  const indusrtyEmail=(typeof data.email_address=="undefined")?'':data.email_address;         
  
  const stream = await createSshTunnel(sshTunnelConfig, dbServer);			     
  const sqlQuery = `SELECT * FROM membership WHERE email1='${indusrtyEmail}'`;	   			
  const chkresult = await queryDatabase(sqlQuery, stream);	  

  const steam = await createSshTunnel(sshTunnelConfig, dbServer);			     
  const sqlQuer = "SELECT (IFNULL(MAX(id),0)+1) AS max_id FROM membership";	   			
  const result = await queryDatabase(sqlQuer, steam);	  				  

  const next_id = (result.length>0)?result[0].max_id:0;  		

  if (!data.title || data.title === "") {
    return res.status(500).json({ error: 'Title is Missing','error_field':'title' });		
  } 
  else if (!data.fname || data.fname === "") {
    return res.status(500).json({ error: 'First name is Missing','error_field':'fname' });		
  } 
  else if (!data.sname || data.sname === "") {
    return res.status(500).json({ error: 'Surname is Missing','error_field':'sname' });					
  } 
  else if (!data.dob || data.dob === "") {
    return res.status(500).json({ error: 'Date of birth is Missing','error_field':'dob' });					
  } 
  else if (!data.start_date || data.start_date === "") {
    return res.status(500).json({ error: 'Start Date is Missing','error_field':'start_date' });					
  }
  else if (!data.address1 || data.address1 === "") {
    return res.status(500).json({ error: 'Postal address 1 is Missing','error_field':'address1' });					
  }    	
  else if (!data.country || data.country === "") {
    return res.status(500).json({ error: 'Country is Missing','error_field':'country' });							
  }  
  else if (!data.cellphone || data.cellphone === "") {
    return res.status(500).json({ error: 'Cell phone is Missing','error_field':'cellphone' });					
  }
  else if (!data.email_address || data.email_address === "") {
    return res.status(500).json({ error: 'Email is Missing','error_field':'email_address' });		
  }     
  else if (chkresult.length >0) {		
    return res.status(500).json({ error: 'Email already exist','error_field':'email_address' });						
  } 
  
 
  try {
    // Establish SSH tunnel
    const stream = await createSshTunnel(sshTunnelConfig,dbServer);          
    // Insert data into the database     

	const memberNO = `DAN ${next_id}`;   	

	const parent_id=(typeof data.parent_id=="undefined")?'':data.parent_id;  	
	const title=(typeof data.title=="undefined")?'':data.title;  	
	const fname=(typeof data.fname=="undefined")?'':data.fname;    
	const sname=(typeof data.sname=="undefined")?'':data.sname;  	
	const dob=(typeof data.dob=="undefined" || data.dob== null)?'0000:00:00':data.dob;   
	const passport=(typeof data.passport=="undefined")?'':data.passport;  		
	const address1=(typeof data.address1=="undefined")?'':data.address1;  	
	const address2=(typeof data.address2=="undefined")?'':data.address2;  	
	const city=(typeof data.city=="undefined")?'':data.city;  	
	const state=(typeof data.state=="undefined")?'':data.state;   	
	const postal_code=(typeof data.postal_code=="undefined")?'':data.postal_code;  	
	const country=(typeof data.country=="undefined")?'':data.country;    
	const phonehome=(typeof data.phonehome=="undefined")?'':data.phonehome;  		
	const cellphone=(typeof data.cellphone=="undefined")?'':data.cellphone;  	
	const email_address=(typeof data.email_address=="undefined")?'':data.email_address;  	
	const medical_aid=(typeof data.medical_aid=="undefined")?'':data.medical_aid;  	 	
	const medical_no=(typeof data.medical_no=="undefined")?'':data.medical_no;  	 	
	const start_date=(typeof data.start_date=="undefined" || data.start_date== null)?'0000:00:00':data.start_date;    	 	 	
	const new_pwd = generateRandomPassword(Math.floor(Math.random() * 2) + 6); // Generate a random password with length between 6 and 7 characters
	  	
    const sqlQuery = `INSERT INTO membership (title1,fname1,sname1,dob1,passport1,address1,address2,city1,province1,postcode1,country1,telephone2,cellphone1,email1,password,medical_aid,medical_aid_no,member_no, 
	verifyEmail,verifyAmount,membertype,status1,startdate,joindate,parent_id,choose_membership) VALUES ('${title}','${fname}','${sname}','${dob}','${passport}','${address1}','${address2}','${city}','${state}','${postal_code}',
	'${country}','${phonehome}','${cellphone}','${email_address}','${new_pwd}','${medical_aid}','${medical_no}','${memberNO}','verified','not_paid','dive_centre_partner','ACTIVE','${start_date}','${start_date}','${parent_id}','annual')`;  
	    	
	const result = await queryDatabase(sqlQuery,stream);    								   		  
	const insert_id = result.insertId;      
	
	if(insert_id >0)	
	{
		// Send a success response	 		
		res.status(200).json({ message: 'Data added successfully' });      																				  			 		  	
	} 
	else
	{
		res.status(500).json({ error: 'Record could not inserted!' });  								            
	} 	   	  	 
	 
  } catch (error) {
    // Handle database or other errors 	  		
    console.error('Error adding data to the database:', error);
    res.status(500).json({ error: error });
  }
});  


app.post('/update/:id', async (req, res) => { 
  const id = req.params.id; 
  const data = req.body;  

  const stream = await createSshTunnel(sshTunnelConfig, dbServer);	     
  const sqlQuery = `SELECT * FROM membership WHERE id=${id}`;			 	    
  const result = await queryDatabase(sqlQuery,stream);	
  const emailId = (result.length>0)?result[0].email1:'';     
  
  const indusrtyEmail=(typeof data.email_address=="undefined")?'':data.email_address;         
  
  const steam = await createSshTunnel(sshTunnelConfig, dbServer);			     
  const sqlQuer = `SELECT * FROM membership WHERE email1='${indusrtyEmail}'`;	   			
  const chkresult = await queryDatabase(sqlQuer,steam);	 				
  
  if (!data.title || data.title === "") {
    return res.status(500).json({ error: 'Title is Missing','error_field':'title' });		
  } 
  else if (!data.fname || data.fname === "") {
    return res.status(500).json({ error: 'First name is Missing','error_field':'fname' });		
  } 
  else if (!data.sname || data.sname === "") {
    return res.status(500).json({ error: 'Surname is Missing','error_field':'sname' });					
  } 
  else if (!data.dob || data.dob === "") {
    return res.status(500).json({ error: 'Date of birth is Missing','error_field':'dob' });					
  } 
  else if (!data.start_date || data.start_date === "") {
    return res.status(500).json({ error: 'Start Date is Missing','error_field':'start_date' });					
  }
  else if (!data.address1 || data.address1 === "") {
    return res.status(500).json({ error: 'Postal address 1 is Missing','error_field':'address1' });					
  }    	
  else if (!data.country || data.country === "") {
    return res.status(500).json({ error: 'Country is Missing','error_field':'country' });							
  }  
  else if (!data.cellphone || data.cellphone === "") {
    return res.status(500).json({ error: 'Cell phone is Missing','error_field':'cellphone' });					
  }
  else if (!data.email_address || data.email_address === "") {
    return res.status(500).json({ error: 'Email is Missing','error_field':'email_address' });		
  }     
  else if (chkresult.length >0 && emailId !=indusrtyEmail) {		
    return res.status(500).json({ error: 'Email already exist','error_field':'email_address' });						
  }    
  
  if(result.length==1)  
  {
	  try {  

		// Establish SSH tunnel
        const stream = await createSshTunnel(sshTunnelConfig,dbServer);   				
		
		const title=(typeof data.title=="undefined")?'':data.title;  	
		const fname=(typeof data.fname=="undefined")?'':data.fname;    
		const sname=(typeof data.sname=="undefined")?'':data.sname;  	
		const dob=(typeof data.dob=="undefined" || data.dob== null)?'0000:00:00':data.dob;   
		const passport=(typeof data.passport=="undefined")?'':data.passport;  		
		const address1=(typeof data.address1=="undefined")?'':data.address1;  	
		const address2=(typeof data.address2=="undefined")?'':data.address2;  	
		const city=(typeof data.city=="undefined")?'':data.city;  	
		const state=(typeof data.state=="undefined")?'':data.state;   	
		const postal_code=(typeof data.postal_code=="undefined")?'':data.postal_code;  	
		const country=(typeof data.country=="undefined")?'':data.country;    
		const phonehome=(typeof data.phonehome=="undefined")?'':data.phonehome;  		
		const cellphone=(typeof data.cellphone=="undefined")?'':data.cellphone;  	
		const email_address=(typeof data.email_address=="undefined")?'':data.email_address;  	
		const medical_aid=(typeof data.medical_aid=="undefined")?'':data.medical_aid;  	 	
		const medical_no=(typeof data.medical_no=="undefined")?'':data.medical_no;  	 	
		const start_date=(typeof data.start_date=="undefined" || data.start_date== null)?'0000:00:00':data.start_date;    	 	 			
												
		const sqlQuery = `UPDATE membership SET title1='${title}',fname1='${fname}',sname1='${sname}',dob1='${dob}',passport1='${passport}',address1='${address1}',address2='${address2}',
		city1='${city}',province1='${state}',postcode1='${postal_code}',country1='${country}',telephone2='${phonehome}',cellphone1='${cellphone}',email1='${email_address}',medical_aid='${medical_aid}',
		medical_aid_no='${medical_no}',startdate='${start_date}' WHERE id=${id}`;   		  
		
		const result = await queryDatabase(sqlQuery,stream);  						
		
		if(id >0)	 
		{
			// Send a success response	  				
			res.status(200).json({ message: 'Record updated successfully' });  																		     					  			 		  	
		} 
		else
		{
			res.status(500).json({ error: 'Record could not updated!' });  	  				               
		}       	    		 		
		 
	  } catch (error) {
		// Handle database or other errors 	  		
		console.error('Error adding data to the database:', error);
		return res.status(500).json({ error: error });				
	  }
	  //
  }
  else
  {
	  return res.status(500).json({ error:'Record not found!' });	  				
  }  
  
})      
     

function generateRandomPassword(length) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; 
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
}

// Handle other routes
app.use((req, res) => {
  res.status(404).send('Not Found');   		
}); 

// Export the app 
module.exports = app;	   