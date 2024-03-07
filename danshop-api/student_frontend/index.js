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
	res.send('Hello from App4!');    		
});  

app.post('/update/:id', async (req, res) => { 
  const id = req.params.id; 
  const data = req.body;  

  const stream = await createSshTunnel(sshTunnelConfig, dbServer);	   
  const sqlQuery = `SELECT * FROM membership WHERE id=${id}`;	     	    
  const result = await queryDatabase(sqlQuery, stream);			
  
  if (!data.info_title || data.info_title === "") {
    return res.status(500).json({ error: 'Title is Missing','error_field':'info_title' });      
  }   
  else if (!data.first_name || data.first_name === "") {
    return res.status(500).json({ error: 'First Name is Missing','error_field':'first_name' });    
  } 
  else if (!data.last_name || data.last_name === "") {
    return res.status(500).json({ error: 'Last Name is Missing','error_field':'last_name' });      
  }   
  else if (!data.info_dob || data.info_dob === "") {  
    return res.status(500).json({ error: 'Date of birth is Missing','error_field':'info_dob' });    
  } 
  else if (!data.info_address1 || data.info_address1 === "") {
    return res.status(500).json({ error: 'Postal Address 1 is Missing','error_field':'info_address1' });    
  } 
  else if (!data.info_city || data.info_city === "") {
    return res.status(500).json({ error: 'City is Missing','error_field':'info_city' });      
  }     	
  else if (!data.info_province || data.info_province === "") {
    return res.status(500).json({ error: 'State/Region/Province is Missing','error_field':'info_province' });      
  }
  else if (!data.post_code || data.post_code === "") {
    return res.status(500).json({ error: 'Postal/Zip code is Missing','error_field':'post_code' });    
  } 
  else if (!data.info_country || data.info_country === "") {
    return res.status(500).json({ error: 'Country is Missing','error_field':'info_country' });      
  } 
  else if (!data.cell_phone || data.cell_phone === "") {
    return res.status(500).json({ error: 'Cell Phone is Missing','error_field':'cell_phone' });    
  }
  else if (!data.info_email || data.info_email === "") {
    return res.status(500).json({ error: 'Email is Missing','error_field':'info_email' });    
  }      
  
  if(result.length==1)  
  {
	  try {  	
	  
		const firstName=(typeof data.first_name=="undefined")?'':data.first_name;     		 	
		const lastName=(typeof data.last_name=="undefined")?'':data.last_name;   	  
		const infoTitle=(typeof data.info_title=="undefined")?'':data.info_title;   	
		const passportNo=(typeof data.passport_no=="undefined")?'':data.passport_no;    
		const infoAddr1=(typeof data.info_address1=="undefined")?'':data.info_address1;     	
		const infoAddr2=(typeof data.info_address2=="undefined")?'':data.info_address2;    
		const infoCity=(typeof data.info_city=="undefined")?'':data.info_city;   	  	
		const infoProvince=(typeof data.info_province=="undefined")?'':data.info_province;   
		const postCode=(typeof data.post_code=="undefined")?'':data.post_code;  
		const infoCountry=(typeof data.info_country=="undefined")?'':data.info_country;  
		const homePhone=(typeof data.tel_home=="undefined")?'':data.tel_home;    	
		const workPhone=(typeof data.tel_work=="undefined")?'':data.tel_work;   
		const cellPhone=(typeof data.cell_phone=="undefined")?'':data.cell_phone;  
		const infoEmail=(typeof data.info_email=="undefined")?'':data.info_email;      
		const fax=(typeof data.fax=="undefined")?'':data.fax;     	
		const infoDob=(typeof data.info_dob=="undefined" || data.info_dob== null)?'0000:00:00':data.info_dob;    
			
		const sqlQuery = `UPDATE membership SET title1='${infoTitle}',fname1='${firstName}',sname1='${lastName}',passport1='${passportNo}',address1='${infoAddr1}',address2='${infoAddr2}',dob1='${infoDob}', city1='${infoCity}',province1='${infoProvince}',postcode1='${postCode}',country1='${infoCountry}',telephone1='${homePhone}',telephone2='${workPhone}',cellphone1='${cellPhone}',email1='${infoEmail}',fax='${fax}' WHERE id=${id}`;   		
		
		if(id >0)	  
		{
			// Send a success response	  		
			const stream = await createSshTunnel(sshTunnelConfig,dbServer);       
			await queryDatabase(sqlQuery,stream);   
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


// Handle other routes
app.use((req, res) => {
  res.status(404).send('Not Found');   
}); 

// Export the app 
module.exports = app;	   