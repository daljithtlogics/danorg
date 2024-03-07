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

app.get('/get', async (req, res) => {
  try {
    const stream = await createSshTunnel(sshTunnelConfig, dbServer);		
    const sqlQuery = "SELECT * FROM membership WHERE UPPER(choose_membership)='STUDENT'";		
    const results = await queryDatabase(sqlQuery, stream);				
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from database: ' + error.message });		    	
  }
});  


app.get('/get_members', async (req, res) => {
  try {
	  
    const stream = await createSshTunnel(sshTunnelConfig, dbServer);	
	const steam = await createSshTunnel(sshTunnelConfig, dbServer);	
	
	const start = (parseInt(req.query.recordsPerPage) * (parseInt(req.query.pageNumber) - 1)>0)?parseInt(req.query.recordsPerPage) * (parseInt(req.query.pageNumber) - 1):0;
	
	const end = parseInt(req.query.recordsPerPage);		
	let sqlQuery = "";
	let query = "";  
	let text = "";	
	
	const search=req.query.search;  	   	
	
	if(search !='')   
	{
		text += `'%${search}%'`;						  			
		query += "SELECT count(*) AS record_count FROM membership WHERE UPPER(choose_membership)='STUDENT'"+` AND (CONCAT(fname1,' ',sname1) LIKE ${text} OR member_no LIKE ${text} OR email1 LIKE ${text} OR cellphone1 LIKE ${text} OR DATE_FORMAT(startdate,"%d/%m/%Y") LIKE ${text})`;        		      
		sqlQuery += "SELECT * FROM membership WHERE UPPER(choose_membership)='STUDENT'"+` AND (CONCAT(fname1,' ',sname1) LIKE ${text} OR member_no LIKE ${text} OR email1 LIKE ${text} OR cellphone1 LIKE ${text} OR DATE_FORMAT(startdate,"%d/%m/%Y") LIKE ${text}) LIMIT ${start},${end}`;     
	}
	else   
	{
		query += `SELECT count(*) AS record_count from membership WHERE UPPER(choose_membership)='STUDENT'`;	  	  
		sqlQuery += `SELECT * from membership WHERE UPPER(choose_membership)='STUDENT' LIMIT ${start},${end}`;	  												 				       			
		
	} 
	
	// console.log(sqlQuery);     

	const record = await queryDatabase(query,steam);	
	
    const result = await queryDatabase(sqlQuery,stream);	

	const arr = {
		items : result,
		pages : record[0].record_count                  
	}
	
    res.status(200).json({ msg: "Records fetched successfully", data:arr });	         
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from database: ' + error.message });		      	
  }
}); 		

app.post('/add', async (req, res) => {			
  const data = req.body;		

  const stream = await createSshTunnel(sshTunnelConfig, dbServer);	    
  const sqlQuery = "SELECT (IFNULL(MAX(id),0)+1) AS max_id FROM membership WHERE UPPER(choose_membership)='STUDENT'"; 	   	
  const result = await queryDatabase(sqlQuery, stream);	  

  const next_id = (result.length>0)?result[0].max_id:0;    

  if (!data.infoTitle || data.infoTitle === "") {
    return res.status(500).json({ error: 'Title is missing','error_field':'infoTitle' });
  }else if (!data.firstName || data.firstName === "") {
    return res.status(500).json({ error: 'First Name is Missing','error_field':'firstName' });
  }else if (!data.surName || data.surName === "") {
    return res.status(500).json({ error: 'Surname is Missing','error_field':'surName' });
  }else if (!data.infoAddress1 || data.infoAddress1 === "") {
    return res.status(500).json({ error: 'Postal Address1 is Missing','error_field':'infoAddress1' });  
  } else if (!data.infoDob || data.infoDob === "") {
    return res.status(500).json({ error: 'Date of birth is Missing','error_field':'infoDob' });
  } else if (!data.infoCity || data.infoCity === "") {
    return res.status(500).json({ error: 'City is Missing','error_field':'infoCity' });
  }else if (!data.postCode || data.postCode === "") {
    return res.status(500).json({ error: 'Postal Code is Missing','error_field':'postCode' });
  } else if (!data.infoCountry || data.infoCountry === "") {
    return res.status(500).json({ error: 'Country is Missing','error_field':'infoCountry' });
  } else if (!data.cellPhone || data.cellPhone === "") {
    return res.status(500).json({ error: 'Cell phone is Missing','error_field':'cellPhone' });		
  }
  else if (!data.infoEmail || data.infoEmail === "") {
    return res.status(500).json({ error: 'Email is Missing','error_field':'infoEmail' });		
  }
  else if (!data.startDate || data.startDate === "") {
    return res.status(500).json({ error: 'Start date is Missing','error_field':'startDate' });		
  }
  else if (!data.mainReason || data.mainReason === "") {
    return res.status(500).json({ error: 'Main Reason is Missing','error_field':'mainReason' });		
  }
  else if (!data.subReason || data.subReason === "") {
    return res.status(500).json({ error: 'Sub Reason is Missing','error_field':'subReason' });		  		
  }    

  try {
    // Establish SSH tunnel
    const stream = await createSshTunnel(sshTunnelConfig, dbServer);
    // const currentDate = new Date().toISOString().slice(0, 10); // Get current date in 'YYYY-MM-DD' format
    const randomNo = Math.floor(Math.random() * 1000); // Generate a random number
    const memberNO = `DANT ${next_id}`; // Generate member_id with a random number      

    // Insert data into the database
    const infoTitle=(typeof data.infoTitle=="undefined")?'':data.infoTitle;  	
    const firstName=(typeof data.firstName=="undefined")?'':data.firstName;    
    const surName=(typeof data.surName=="undefined")?'':data.surName;  	
    const infoDob=(typeof data.infoDob=="undefined")?'':data.infoDob;    	
    const infoPassport=(typeof data.infoPassport=="undefined")?'':data.infoPassport;  	
    const medicalAid=(typeof data.medicalAid=="undefined")?'':data.medicalAid;    
    const instructorId=(typeof data.instructor=="undefined" || data.instructor=="")?0:data.instructor;  	     
    const medicalAidNo=(typeof data.medicalAidNo=="undefined")?'':data.medicalAidNo;   	
    const startDate=(typeof data.startDate=="undefined" || data.startDate== null)?'0000:00:00':data.startDate;      
    const infoAddress1=(typeof data.infoAddress1=="undefined")?'':data.infoAddress1;  	
    const infoAddress2=(typeof data.infoAddress2=="undefined")?'':data.infoAddress2;    
    const infoCity=(typeof data.infoCity=="undefined")?'':data.infoCity;  	
    const infoProvince=(typeof data.infoProvince=="undefined")?'':data.infoProvince;  	
    const postCode=(typeof data.postCode=="undefined")?'':data.postCode;    	
    const infoCountry=(typeof data.infoCountry=="undefined")?'':data.infoCountry;  	
    const telHome=(typeof data.telHome=="undefined")?'':data.telHome;    
    const telWork=(typeof data.telWork=="undefined")?'':data.telWork;    	
    const cellPhone=(typeof data.cellPhone=="undefined")?'':data.cellPhone;  	
    const fax=(typeof data.fax=="undefined")?'':data.fax;    
    const infoEmail=(typeof data.infoEmail=="undefined")?'':data.infoEmail;  	     
    const mainReason=(typeof data.mainReason=="undefined")?'':data.mainReason;  			
    const subReason=(typeof data.subReason=="undefined")?'':data.subReason;  	 
    const comment=(typeof data.comment=="undefined")?'':data.comment;    	
	
    const sqlQuery = `INSERT INTO membership (title1,fname1,sname1,dob1,passport1,medical_aid,instructor_id,medical_aid_no,
	startdate,address1,address2,city1,province1,postcode1,country1,telephone1,telephone2,cellphone1,fax,email1,member_no,choose_membership)
	VALUES ('${infoTitle}','${firstName}','${surName}','${infoDob}','${infoPassport}','${medicalAid}','${instructorId}',
	'${medicalAidNo}','${startDate}','${infoAddress1}','${infoAddress2}','${infoCity}','${infoProvince}','${postCode}',
	'${infoCountry}','${telHome}','${telWork}','${cellPhone}','${fax}','${infoEmail}','${memberNO}','student')`;  	

	const result = await queryDatabase(sqlQuery,stream);         		  				  
	const insert_id = result.insertId;   						   
	
	if(insert_id >0)	
	{
		// Send a success response	  		
		const stream = await createSshTunnel(sshTunnelConfig,dbServer);   
		const sqlQuery = `INSERT INTO student_comments (row_id,subreason_id,description) VALUES ('${insert_id}','${subReason}','${comment}')`;               
	
		await queryDatabase(sqlQuery,stream);   
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

app.get('/comments/:id', async (req, res) => { 
  const id = req.params.id;		 				
  try {
    const stream = await createSshTunnel(sshTunnelConfig, dbServer);	  	
    const sqlQuery = `SELECT c.description,c.created_at,r.title,s.title AS reason_title FROM student_comments as c left join sub_reasons as s on s.id=c.subreason_id left join main_reasons as r on r.id=s.main_id WHERE c.row_id=${id}`;	     	    
    const results = await queryDatabase(sqlQuery,stream);											  							  		
    res.status(200).json(results);      	 					
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from database: ' + error.message });						 				   	
  }
}) 	

app.post('/update/:id', async (req, res) => { 
  const id = req.params.id; 
  const data = req.body;  

  const stream = await createSshTunnel(sshTunnelConfig, dbServer);	   
  const sqlQuery = `SELECT * FROM membership WHERE id=${id}`;	     	    
  const result = await queryDatabase(sqlQuery, stream);			
  
  if (!data.first_name || data.first_name === "") {
    return res.status(500).json({ error: 'First Name is Missing','error_field':'first_name' });      
  } 
  else if (!data.info_dob || data.info_dob === "") {  
    return res.status(500).json({ error: 'Date of birth is Missing','error_field':'info_dob' });    
  }  
  else if (!data.instructor_id || data.instructor_id === "") {
    return res.status(500).json({ error: 'Instructor is Missing','error_field':'instructor_id' });      
  } 
  else if (!data.start_date || data.start_date === "") {
    return res.status(500).json({ error: 'Start date is Missing','error_field':'start_date' });    
  }
  else if (!data.info_city || data.info_city === "") {
    return res.status(500).json({ error: 'City is Missing','error_field':'info_city' });      
  }     
  else if (!data.info_country || data.info_country === "") {
    return res.status(500).json({ error: 'Country is Missing','error_field':'info_country' });      
  } 
  else if (!data.cell_phone || data.cell_phone === "") {
    return res.status(500).json({ error: 'Cell phone is Missing','error_field':'cell_phone' });      
  } 
  else if (!data.info_email || data.info_email === "") {
    return res.status(500).json({ error: 'Email is Missing','error_field':'info_email' });      
  }   	
  else if (!data.mainReason || data.mainReason === "") {
    return res.status(500).json({ error: 'Main Reason is Missing','error_field':'mainReason' });     		 
  } 
  else if (!data.subReason || data.subReason === "") {
    return res.status(500).json({ error: 'Sub Reason is Missing','error_field':'subReason' });          
  }    
  
  if(result.length==1)  
  {
	  try {  

		// Establish SSH tunnel
        const stream = await createSshTunnel(sshTunnelConfig,dbServer);   
	  
	    const infoTitle=(typeof data.info_title=="undefined" || data.info_title== null)?'':data.info_title;    
		const firstName=(typeof data.first_name=="undefined")?'':data.first_name;   			
		const surName=(typeof data.sir_name=="undefined")?'':data.sir_name;  
		const infoPass=(typeof data.info_pass=="undefined" || data.info_pass== null)?'':data.info_pass;  
		const medicalAid=(typeof data.medical_aid=="undefined" || data.medical_aid== null)?'':data.medical_aid;   
		const instructId=(typeof data.instructor_id=="undefined" || data.instructor_id== null)?'':data.instructor_id;  
		const medicalAidNo=(typeof data.medical_no=="undefined" || data.medical_no== null)?'':data.medical_no;  
		const infoAddr1=(typeof data.info_addr1=="undefined" || data.info_addr1== null)?'':data.info_addr1;  	
		const infoAddr2=(typeof data.info_addr2=="undefined" || data.info_addr2== null)?'':data.info_addr2;    	
		const infoCity=(typeof data.info_city=="undefined" || data.info_city== null)?'':data.info_city;     
		const infoProvnce=(typeof data.info_province=="undefined" || data.info_province== null)?'':data.info_province;   
		const postCode=(typeof data.post_code=="undefined" || data.post_code== null)?'':data.post_code;   
		const infoCountry=(typeof data.info_country=="undefined" || data.info_country== null)?'':data.info_country;   
		const telHome=(typeof data.tel_home=="undefined" || data.tel_home== null)?'':data.tel_home;  	
		const telWork=(typeof data.tel_work=="undefined" || data.tel_work== null)?'':data.tel_work;    	
		const cellPhone=(typeof data.cell_phone=="undefined" || data.cell_phone== null)?'':data.cell_phone;    	
		const infoEmail=(typeof data.info_email=="undefined" || data.info_email== null)?'':data.info_email;   
		const fax=(typeof data.fax=="undefined" || data.fax== null)?'':data.fax; 	  

		const mainReason=(typeof data.mainReason=="undefined")?'':data.mainReason;  	
		const subReason=(typeof data.subReason=="undefined")?'':data.subReason; 
		const comment=(typeof data.comment=="undefined")?'':data.comment; 	  	
		
		const infoDob=(typeof data.info_dob=="undefined" || data.info_dob== null)?'0000:00:00':data.info_dob;   
		const startDate=(typeof data.start_date=="undefined" || data.start_date== null || data.start_date=='')?'0000:00:00':data.start_date;  	
			
		const sqlQuery = `UPDATE membership SET title1='${infoTitle}',fname1='${firstName}',sname1='${surName}',passport1='${infoPass}',medical_aid='${medicalAid}',
		instructor_id='${instructId}',medical_aid_no='${medicalAidNo}',address1='${infoAddr1}',address2='${infoAddr2}',city1='${infoCity}',province1='${infoProvnce}',
		postcode1='${postCode}',country1='${infoCountry}',telephone1='${telHome}',telephone2='${telWork}',cellphone1='${cellPhone}',email1='${infoEmail}',fax='${fax}',
		dob1='${infoDob}',startdate='${startDate}' WHERE id=${id}`;            		
		
		await queryDatabase(sqlQuery,stream);     

		if(id >0)	  
		{
			// Send a success response	  		
			const stream = await createSshTunnel(sshTunnelConfig, dbServer);   
			const sqlQuery = `INSERT INTO student_comments (row_id,subreason_id,description) VALUES ('${id}','${subReason}','${comment}')`;               
		
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