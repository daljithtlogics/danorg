var nodemailer = require('nodemailer');   
const express = require('express');
const bodyParser = require('body-parser');  
const axios = require('axios');     
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
	res.send('Hello from App16!');    				
});  

app.get('/shop', async (req, res) => {
  try {
    const stream = await createSshTunnel(sshTunnelConfig,dbServer);					
    const sqlQuery = 'SELECT * FROM contacts_shopquery';	
    const results = await queryDatabase(sqlQuery,stream);								
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from database: ' + error.message });		    	
  }
});

app.get('/org', async (req, res) => {  
  try {
    const stream = await createSshTunnel(sshTunnelConfig,dbServer);					
    const sqlQuery = 'SELECT * FROM contacts_orgquery';	           
    const results = await queryDatabase(sqlQuery,stream);								
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from database: ' + error.message });		    	
  }
});  

function mysql_real_escape_string (str) {
    return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
        switch (char) {
            case "\0":
                return "\\0";
            case "\x08":
                return "\\b";
            case "\x09":
                return "\\t";
            case "\x1a":
                return "\\z";
            case "\n":
                return "\\n";
            case "\r":
                return "\\r";
            case "\"":
            case "'":
            case "\\":
            case "%":
                return "\\"+char; // prepends a backslash to backslash, percent, 
				// and double/single quotes
        }
    });
}  

app.post('/save', async (req, res) => {			  
  const data = req.body;		   

  if(!data.captcha || data.captcha === '' || data.captcha === null)     
  {     
	return res.status(500).json({ error: 'Token is missing','error_field':'captcha' });  	    
  }
  else if (!data.secret || data.secret === "") {
    return res.status(500).json({ error: 'Key is Missing','error_field':'secret' });      
  }
  else if (!data.first_name || data.first_name === "") {   
    return res.status(500).json({ error: 'First Name is missing','error_field':'first_name' });
  }else if (!data.contact_email || data.contact_email === "") {
    return res.status(500).json({ error: 'E-Mail is Missing','error_field':'contact_email' });
  }else if (!data.contact_enquiry || data.contact_enquiry === "") {
    return res.status(500).json({ error: 'Message is Missing','error_field':'contact_enquiry' });    
  }

  try {
    // Establish SSH tunnel
    const stream = await createSshTunnel(sshTunnelConfig, dbServer);	  

    // Insert data into the database
    const firstName=(typeof data.first_name=="undefined")?'':data.first_name;  	
	const lastName=(typeof data.last_name=="undefined")?'':data.last_name;  	
    const contactEmail=(typeof data.contact_email=="undefined")?'':data.contact_email;      
    const contactMsg=(typeof data.contact_enquiry=="undefined")?'':mysql_real_escape_string(data.contact_enquiry);   	
	const originalMsg=(typeof data.contact_enquiry=="undefined")?'':data.contact_enquiry;   

	const response_key = (typeof data.captcha=="undefined")?'':data.captcha;    
	const secret_key = (typeof data.secret=="undefined")?'':data.secret; 
	const ip = "127.0.0.1";    	

	var transporter = nodemailer.createTransport({
	  service: 'gmail',
	  auth: {
		user: 'myselfmadhavsaraswat@gmail.com',       
		pass: 'qfot tqex kaov fuel'   
	  }
	});

	var mailOptions = {
	  from: 'myselfmadhavsaraswat@gmail.com',
	  to: 'madhavsaraswat25@gmail.com',     
	  subject: 'Danorg Contact Mail',           
	  html: `<h3>Danorg Contact Query</h3><p>Name:${firstName} ${lastName}</p><p>E-Mail:${contactEmail}</p><p>Message:${originalMsg}</p>`,    		      
	}

	try {   	
	
		const url =`https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${response_key}&remoteip=${ip}`;  
		
		const { data } = await axios.get(url);   
		var response = (data.success !== undefined)?data.success:'';	  
		var score = (data.score !== undefined)?data.score:0;	

		if(response !=true || score < 0.5)   
		{  
			return res.status(403).json({ msg: 'Google Recaptcha error' });    			
		}
		else
		{  
			const sqlQuery = `INSERT INTO contacts_orgquery (first_name,last_name,email,message) VALUES ('${firstName}','${lastName}','${contactEmail}','${contactMsg}')`;  	

			const result = await queryDatabase(sqlQuery,stream);      		  	  	  
			const insert_id = result.insertId;           
			
			if(insert_id >0)	
			{   
				transporter.sendMail(mailOptions, function(error, info){
				  if (error) {  		
					res.status(500).json({ error:error });   	  	
				  } else { 		
					res.status(200).json({ message: 'Query added successfully, Email sent: ' + info.response });       						
				  }
				});	  		 	      		 						 		  	
			} 
			else
			{
				res.status(500).json({ error: 'Record could not inserted!' });  			  	  	            
			} 

		}  

	} 
	catch(e) {
		return res.status(403).json({ msg: 'Error trying to verify the request' });		  		
	}  	 	
	 
  } catch (error) {
    // Handle database or other errors 	  		
    console.error('Error adding data to the database:', error);							
    res.status(500).json({ error: error });
  }
}); 


app.post('/send', async (req, res) => {			  
  const data = req.body;		   

  if(!data.captcha || data.captcha === '' || data.captcha === null)     
  {     
	return res.status(500).json({ error: 'Token is missing','error_field':'captcha' });  	    
  }
  else if (!data.secret || data.secret === "") {
    return res.status(500).json({ error: 'Key is Missing','error_field':'secret' });      
  }
  else if (!data.contact_name || data.contact_name === "") {
    return res.status(500).json({ error: 'Your Name is missing','error_field':'contact_name' });
  }else if (!data.contact_email || data.contact_email === "") {
    return res.status(500).json({ error: 'E-Mail Address is Missing','error_field':'contact_email' });
  }else if (!data.contact_enquiry || data.contact_enquiry === "") {
    return res.status(500).json({ error: 'Enquiry Message is Missing','error_field':'contact_enquiry' });  
  }

  try {
    // Establish SSH tunnel
    const stream = await createSshTunnel(sshTunnelConfig, dbServer);	  

    // Insert data into the database
    const contactName=(typeof data.contact_name=="undefined")?'':data.contact_name;  	
    const contactEmail=(typeof data.contact_email=="undefined")?'':data.contact_email;      
    const contactMsg=(typeof data.contact_enquiry=="undefined")?'':mysql_real_escape_string(data.contact_enquiry);   	
	const originalMsg=(typeof data.contact_enquiry=="undefined")?'':data.contact_enquiry;   

	const response_key = (typeof data.captcha=="undefined")?'':data.captcha;    
	const secret_key = (typeof data.secret=="undefined")?'':data.secret; 
	const ip = "127.0.0.1";  

	var transporter = nodemailer.createTransport({
	  service: 'gmail',
	  auth: {
		user: 'myselfmadhavsaraswat@gmail.com',       
		pass: 'qfot tqex kaov fuel'   
	  }
	});

	var mailOptions = {
	  from: 'myselfmadhavsaraswat@gmail.com',
	  to: 'madhavsaraswat25@gmail.com',     
	  subject: 'Danshop Contact Mail',           
	  html: `<h3>Danshop Contact Query</h3><p>Name:${contactName}</p><p>E-Mail:${contactEmail}</p><p>Enquiry:${originalMsg}</p>`,    		      
	}	
	
	const url =`https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${response_key}&remoteip=${ip}`;  
	
	// Making POST request to verify captcha  
	
	try {
		
		const { data } = await axios.get(url);   
		var response = (data.success !== undefined)?data.success:'';	  
		var score = (data.score !== undefined)?data.score:0;	

		if(response !=true || score < 0.5)   
		{  
			return res.status(403).json({ msg: 'Google Recaptcha error' });    			
		}
		else
		{
			const sqlQuery = `INSERT INTO contacts_shopquery (name,email,message) VALUES ('${contactName}','${contactEmail}','${contactMsg}')`;  	

			const result = await queryDatabase(sqlQuery,stream);    	  	  
			const insert_id = result.insertId;             
			
			if(insert_id >0)	
			{   
				transporter.sendMail(mailOptions, function(error, info){
				  if (error) {  		
					res.status(500).json({ error:error });   	  	
				  } else { 		
					res.status(200).json({ message: 'Query added successfully, Email sent: ' + info.response });       						
				  }
				});	  		 	      		 						 		  	
			} 
			else    
			{
				res.status(500).json({ error: 'Record could not inserted!' });  				    	            
			}   	
		}
		
	} 
	catch(e) {
		return res.status(403).json({ msg: 'Error trying to verify the request' });		
	}  	 	
	 
  } catch (error) {
    // Handle database or other errors 	  		
    console.error('Error adding data to the database:', error);				
    res.status(500).json({ error: error });
  }
});   


// Handle other routes
app.use((req, res) => {
  res.status(404).send('Not Found');   					
}); 

// Export the app 
module.exports = app;	   