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
	res.send('Hello from App7!');    		 
});  

app.get('/get', async (req, res) => {
  try {
    const stream = await createSshTunnel(sshTunnelConfig, dbServer);		
    const sqlQuery = `SELECT * FROM membership WHERE UPPER(membertype)='DIVER'`;	   	
    const results = await queryDatabase(sqlQuery, stream);				
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from database: ' + error.message });		    	
  }
});

app.get('/edit/:id', async (req, res) => {   
  const id = req.params.id;		 
  try {
    const stream = await createSshTunnel(sshTunnelConfig, dbServer);				
    const sqlQuery = `SELECT * FROM membership WHERE id=${id} AND UPPER(membertype)='DIVER'`;   		 	     	    
    const results = await queryDatabase(sqlQuery, stream);		  		  		
    res.status(200).json(results);   			
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from database: ' + error.message });		    	
  }
})    

app.post('/add', async (req, res) => {			
  const data = req.body;		

  const stream = await createSshTunnel(sshTunnelConfig, dbServer);	    
  const sqlQuery = "SELECT (IFNULL(MAX(id),0)+1) AS max_id FROM membership WHERE UPPER(choose_membership)='ANNUAL' AND UPPER(membertype)='DIVER'";
  const result = await queryDatabase(sqlQuery, stream);	  

  const next_id = (result.length>0)?result[0].max_id:0;     

  if (!data.tab_id || data.tab_id === "") {
    return res.status(500).json({ error: 'Id is Missing','error_field':'tab_id' });		
  } 
  else if (!data.fname || data.fname === "") {
    return res.status(500).json({ error: 'First Name is Missing','error_field':'fname' });
  } else if (!data.dob || data.dob === "") {
    return res.status(500).json({ error: 'Date of birth is Missing','error_field':'dob' });		
  } else if (!data.relation || data.relation === "") {
    return res.status(500).json({ error: 'Relationship is Missing','error_field':'relation' });
  } else if (!data.cellphone || data.cellphone === "") {
    return res.status(500).json({ error: 'Cell phone is Missing','error_field':'cellphone' });		
  } else if (!data.email || data.email === "") {
    return res.status(500).json({ error: 'Email is Missing','error_field':'email' });		
  }   
  else if (!data.status || data.status === "") {
    return res.status(500).json({ error: 'Status is Missing','error_field':'status' });		
  }   

  try {
    // Establish SSH tunnel
    const stream = await createSshTunnel(sshTunnelConfig, dbServer);   

    const memberNO = `DANM ${next_id}`;   	
 	
	const row_id=(typeof data.tab_id=="undefined")?'':data.tab_id;    
	const title=(typeof data.title=="undefined")?'':data.title;  	
	const fname=(typeof data.fname=="undefined")?'':data.fname;    
	const sname=(typeof data.sname=="undefined")?'':data.sname;  
	const email=(typeof data.email=="undefined")?'':data.email;        	 	
	const cellphone=(typeof data.cellphone=="undefined")?'':data.cellphone;      
	const phonework=(typeof data.phonework=="undefined")?'':data.phonework;  	
	const phonehome=(typeof data.phonehome=="undefined")?'':data.phonehome;      	
    const passport=(typeof data.passport=="undefined")?'':data.passport;  	
	const relation=(typeof data.relation=="undefined")?'':data.relation;  	 	
	const status=(typeof data.status=="undefined")?'':data.status;   

	const qualification=(typeof data.qualification=="undefined")?'':data.qualification;  
	const agency=(typeof data.agency=="undefined")?'':data.agency;   
    const freediver=(typeof data.freediver=="undefined")?'':data.freediver;     	
	
	const dob=(typeof data.dob=="undefined" || data.dob== null)?'0000:00:00':data.dob;  		  	
	const capturedate=(typeof data.capturedate=="undefined" || data.capturedate== null)?'0000:00:00':data.capturedate;      
	const updatedate=(typeof data.updatedate=="undefined" || data.updatedate== null)?'0000:00:00':data.updatedate;  
	
	const paid=(typeof data.paid=="undefined" || data.paid==false)?0:1;    
	const workdiver=(typeof data.workdiver=="undefined" || data.workdiver==false)?0:1;    
	
    const sqlQuery = `INSERT INTO membership (parent_id,title1,fname1,sname1,passport1,member_no,relation,telephone1,telephone2,cellphone1,email1,status1,qualification,agency,free_diver,paid,work_diver,dob1,capturedate,updatedate,membertype,choose_membership) 
	VALUES ('${row_id}','${title}','${fname}','${sname}','${passport}','${memberNO}','${relation}','${phonehome}','${phonework}','${cellphone}','${email}','${status}','${qualification}','${agency}','${freediver}','${paid}','${workdiver}','${dob}','${capturedate}','${updatedate}','diver','annual')`;  
    	
	await queryDatabase(sqlQuery,stream);   		  	  				        

    // Send a success response
     res.status(200).json({ message: 'Data added successfully' });   							  		
	 
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
  const sqlQuery = `SELECT * FROM membership WHERE id=${id} AND UPPER(membertype)='DIVER'`;	     	    
  const result = await queryDatabase(sqlQuery, stream);	

  if (!data.fname || data.fname === "") {
    return res.status(500).json({ error: 'First Name is Missing','error_field':'fname' });
  } else if (!data.dob || data.dob === "") {
    return res.status(500).json({ error: 'Date of birth is Missing','error_field':'dob' });		
  } else if (!data.relation || data.relation === "") {
    return res.status(500).json({ error: 'Relationship is Missing','error_field':'relation' });
  } else if (!data.cellphone || data.cellphone === "") {
    return res.status(500).json({ error: 'Cell phone is Missing','error_field':'cellphone' });		
  } else if (!data.email || data.email === "") {
    return res.status(500).json({ error: 'Email is Missing','error_field':'email' });		
  }   
  else if (!data.status || data.status === "") {
    return res.status(500).json({ error: 'Status is Missing','error_field':'status' });	  	
  }   
  
  if(result.length==1)  
  {
	  try {  
			 const stream = await createSshTunnel(sshTunnelConfig, dbServer);	
			 
			// Update data into the database  
			const title=(typeof data.title=="undefined")?'':data.title;  	  
			const fname=(typeof data.fname=="undefined")?'':data.fname;    
			const sname=(typeof data.sname=="undefined")?'':data.sname;  
			const email=(typeof data.email=="undefined")?'':data.email;        	 	
			const cellphone=(typeof data.cellphone=="undefined")?'':data.cellphone;      
			const phonework=(typeof data.phonework=="undefined")?'':data.phonework;  	
			const phonehome=(typeof data.phonehome=="undefined")?'':data.phonehome;      	
			const passport=(typeof data.passport=="undefined")?'':data.passport;  	
			const relation=(typeof data.relation=="undefined")?'':data.relation;  	 	
			const status=(typeof data.status=="undefined")?'':data.status;    		
			
			const dob=(typeof data.dob=="undefined" || data.dob== null)?'0000:00:00':data.dob;    	
			const capturedate=(typeof data.capturedate=="undefined" || data.capturedate== null)?'0000:00:00':data.capturedate;      
			const updatedate=(typeof data.updatedate=="undefined" || data.updatedate== null)?'0000:00:00':data.updatedate; 

			const qualification=(typeof data.qualification=="undefined")?'':data.qualification;  
			const agency=(typeof data.agency=="undefined")?'':data.agency;   
			const freediver=(typeof data.freediver=="undefined")?'':data.freediver;     				
			
			const paid=(typeof data.paid=="undefined" || data.paid==false)?0:1;    
			const workdiver=(typeof data.workdiver=="undefined" || data.workdiver==false)?0:1;    
			
			const sqlQuery = `UPDATE membership SET title1='${title}',fname1='${fname}',sname1='${sname}',passport1='${passport}',relation='${relation}',telephone1='${phonehome}',telephone2='${phonework}',cellphone1='${cellphone}',email1='${email}',
			paid='${paid}',qualification='${qualification}',agency='${agency}',free_diver='${freediver}',work_diver='${workdiver}',status1='${status}',dob1='${dob}',capturedate='${capturedate}',updatedate='${updatedate}' WHERE id=${id}`;   				
			
			await queryDatabase(sqlQuery,stream);   			 			       

			// Send a success response
			 res.status(200).json({ message: 'Data Updated successfully' });       
			//
		} catch (error) {   
		// Handle database or other errors 	  		
		console.error('Error adding data to the database:', error);
		return res.status(500).json({ error: error });				
	  } 	  
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