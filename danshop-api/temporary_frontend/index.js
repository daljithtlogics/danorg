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
	res.send('Hello from App14!');    		
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
	else if (!data.f_name || data.f_name === "") {
		return res.status(500).json({ error: 'First Name is Missing','error_field':'f_name' });
	} 
	else if (!data.s_name || data.s_name === "") {
		return res.status(500).json({ error: 'Surname is Missing','error_field':'s_name' });		
	}    
	else if (!data.info_dob || data.info_dob === "") {  
		return res.status(500).json({ error: 'Date of birth is Missing','error_field':'info_dob' });    
	} 
	else if (!data.info_address1 || data.info_address1 === "") {  
		return res.status(500).json({ error: 'Postal address 1 is Missing','error_field':'info_address1' });        
	}     
	else if (!data.info_city || data.info_city === "") {  
		return res.status(500).json({ error: 'City is Missing','error_field':'info_city' });        
	}   
	else if (!data.info_province || data.info_province === "") {  
		return res.status(500).json({ error: 'State/Province/Region is Missing','error_field':'info_province' });        
	}
	else if (!data.post_code || data.post_code === "") {  
		return res.status(500).json({ error: 'Postal code is Missing','error_field':'post_code' });        
	}     
    else if (!data.info_country || data.info_country === "") {  
		return res.status(500).json({ error: 'Country is Missing','error_field':'info_country' });        
	}    	
	else if (!data.cell_phone || data.cell_phone === "") {  
		return res.status(500).json({ error: 'Cell phone is Missing','error_field':'cell_phone' });        
	}      
  
  if(result.length==1)  
  {
	  try {  

		// Establish SSH tunnel
        const stream = await createSshTunnel(sshTunnelConfig,dbServer);      
		
		const infoTitle=(typeof data.info_title=="undefined" || data.info_title== null)?'':data.info_title;  	
		const firstName=(typeof data.f_name=="undefined" || data.f_name== null)?'':data.f_name;      
		const sirName=(typeof data.s_name=="undefined" || data.s_name== null)?'':data.s_name;  	
		const infoDob=(typeof data.info_dob=="undefined" || data.info_dob== null)?'0000:00:00':data.info_dob;   		
		const infoPassport=(typeof data.info_passport=="undefined" || data.info_passport== null)?'':data.info_passport;   		
		const infoAddress1=(typeof data.info_address1=="undefined" || data.info_address1== null)?'':data.info_address1;  	
		const infoAddress2=(typeof data.info_address2=="undefined" || data.info_address2== null)?'':data.info_address2;    
		const infoCity=(typeof data.info_city=="undefined" || data.info_city== null)?'':data.info_city;  	
		const infoProvince=(typeof data.info_province=="undefined" || data.info_province== null)?'':data.info_province; 
		const postCode=(typeof data.post_code=="undefined" || data.post_code== null)?'':data.post_code; 		
		const infoCountry=(typeof data.info_country=="undefined" || data.info_country== null)?'':data.info_country;  
		const infoEmail=(typeof data.info_email=="undefined" || data.info_email== null)?'':data.info_email;  		 			
		const telHome=(typeof data.tel_home=="undefined" || data.tel_home== null)?'':data.tel_home;  	
		const telWork=(typeof data.tel_work=="undefined" || data.tel_work== null)?'':data.tel_work;    	
		const cellPhone=(typeof data.cell_phone=="undefined" || data.cell_phone== null)?'':data.cell_phone;  		
		const medicalAid=(typeof data.medical_aid=="undefined" || data.medical_aid== null)?'':data.medical_aid;  	
		const medicalAidNo=(typeof data.medical_no=="undefined" || data.medical_no== null)?'':data.medical_no;      	
		const fax=(typeof data.fax=="undefined" || data.fax== null)?'':data.fax; 		
		
		const sqlQuery = `UPDATE membership SET title1='${infoTitle}',fname1='${firstName}',sname1='${sirName}',passport1='${infoPassport}',address1='${infoAddress1}',address2='${infoAddress2}',city1='${infoCity}',province1='${infoProvince}',postcode1='${postCode}', country1='${infoCountry}',telephone1='${telHome}',telephone2='${telWork}',cellphone1='${cellPhone}',fax='${fax}',dob1='${infoDob}',email1='${infoEmail}',medical_aid='${medicalAid}',medical_aid_no='${medicalAidNo}' WHERE id=${id}`;   		
		
		await queryDatabase(sqlQuery,stream);   
		res.status(200).json({ message: 'Record updated successfully' });  	  					    		 		
		 
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