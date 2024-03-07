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
	res.send('Hello from app27!');    			  				    
});  

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

app.get('/edit/:id', async (req, res) => { 
  const id = req.params.id;		 
  try {
    const stream = await createSshTunnel(sshTunnelConfig, dbServer);		
    const sqlQuery = "SELECT * FROM membership WHERE UPPER(choose_membership)='COMMERCIAL' AND UPPER(membertype)='COMMERCIAL SCHOOL'"+` AND id=${id} `;	 			  		 		     	    
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
    const sqlQuery = `SELECT c.description,c.created_at,r.title,s.title AS reason_title FROM school_comments as c left join sub_reasons as s on s.id=c.subreason_id left join main_reasons as r on r.id=s.main_id WHERE c.row_id=${id}`;	     	    
    const results = await queryDatabase(sqlQuery,stream);													  							  		
    res.status(200).json(results);   						
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from database: ' + error.message });		  		    						   	
  }
}) 		

app.get('/students/:id', async (req, res) => { 
  const id = req.params.id;		 				
  try {
    const stream = await createSshTunnel(sshTunnelConfig, dbServer);	  	
    const sqlQuery = `SELECT id,fname1,sname1,dob1,registration_no FROM membership WHERE UPPER(membertype)='SCHOOL_STUDENT' AND parent_id=${id}`;	     	    
    const results = await queryDatabase(sqlQuery,stream);	   		        												  							  		
    res.status(200).json(results);   						
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from database: ' + error.message });		  		    						   	
  }
}) 	

app.post('/add', async (req, res) => {			
  const data = req.body;	  

  if (!data.school_name || data.school_name === "") {
    return res.status(500).json({ error: 'School name is Missing','error_field':'school_name' });		
  } 
  else if (!data.school_email || data.school_email === "") {
    return res.status(500).json({ error: 'Email is Missing','error_field':'school_email' });				
  } 
  else if (!data.instructor_name || data.instructor_name === "") {
    return res.status(500).json({ error: 'Course instructor name is Missing','error_field':'instructor_name' });	
  } 
  else if (!data.registration_no || data.registration_no === "") {
    return res.status(500).json({ error: 'Registration number is Missing','error_field':'registration_no' });		
  }
  else if (!data.address_1 || data.address_1 === "") {
    return res.status(500).json({ error: 'Postal address 1 is Missing','error_field':'address_1' });		
  } 
  else if (!data.city || data.city === "") {
    return res.status(500).json({ error: 'City is Missing','error_field':'city' });		
  }
  else if (!data.pincode || data.pincode === "") {
    return res.status(500).json({ error: 'Postal code is Missing','error_field':'pincode' });		
  }
  else if (!data.country || data.country === "") {
    return res.status(500).json({ error: 'Country is Missing','error_field':'country' });  		
  } 
  else if (!data.cellphone || data.cellphone === "") {
    return res.status(500).json({ error: 'Cell phone is Missing','error_field':'cellphone' });		
  }     
  else if (!data.status || data.status === "") {
    return res.status(500).json({ error: 'Status is Missing','error_field':'status' });	  	  
  }    
  else if (!data.main_reason || data.main_reason === "") {
    return res.status(500).json({ error: 'Main Reason is Missing','error_field':'main_reason' });	  	  
  }
  else if (!data.sub_reason || data.sub_reason === "") {
    return res.status(500).json({ error: 'Sub Reason is Missing','error_field':'sub_reason' });		
  } 	
 
  try {
    // Establish SSH tunnel
    const stream = await createSshTunnel(sshTunnelConfig,dbServer);          
    // Insert data into the database     	

	const schoolName=(typeof data.school_name=="undefined")?'':data.school_name;  	
	const schoolEmail=(typeof data.school_email=="undefined")?'':data.school_email;    

	const instructorName=(typeof data.instructor_name=="undefined")?'':data.instructor_name;    	
    const webAddress=(typeof data.web_address=="undefined")?'':data.web_address;  			   		
	const companyRegis=(typeof data.company_registration=="undefined")?'':data.company_registration;    	
	
	const diverClass=(typeof data.diver_class=="undefined")?'':data.diver_class;  	
	const medicalAid=(typeof data.medical_aid=="undefined")?'':data.medical_aid;  	
	const medicalAidNo=(typeof data.medical_no=="undefined")?'':data.medical_no;        
	
	const regisNo=(typeof data.registration_no=="undefined")?'':data.registration_no;  		
	const address1=(typeof data.address_1=="undefined")?'':data.address_1;    	
	const address2=(typeof data.address_2=="undefined")?'':data.address_2;  
    
	const city=(typeof data.city=="undefined")?'':data.city;    
	const province=(typeof data.province=="undefined")?'':data.province;  	
	const pincode=(typeof data.pincode=="undefined")?'':data.pincode;   	
	const country=(typeof data.country=="undefined")?'':data.country;   		
	const telWork=(typeof data.phonework=="undefined")?'':data.phonework;    	
	const cellphone=(typeof data.cellphone=="undefined")?'':data.cellphone;     				 	
	const fax=(typeof data.fax=="undefined")?'':data.fax;    
	const status=(typeof data.status=="undefined")?'':data.status;      					
	
	const mainReason=(typeof data.main_reason=="undefined")?'':data.main_reason;  			
	const subReason=(typeof data.sub_reason=="undefined")?'':data.sub_reason;   	
	const comment=(typeof data.comment=="undefined")?'':data.comment;  	 
	
	var today = new Date(); 
	var now = formatDate(today);  		

    const sqlQuery = `INSERT INTO membership (company_name,email1,contact_person,address1,address2,address3,city1,province1,postcode1,country1,startdate,
	registration_no,account_no,class_name,telephone2,cellphone1,fax,status1,medical_aid,medical_aid_no,membertype,choose_membership) VALUES 
	('${schoolName}','${schoolEmail}','${instructorName}','${address1}','${address2}','${webAddress}','${city}','${province}','${pincode}',
	'${country}','${now}','${regisNo}','${companyRegis}','${diverClass}','${telWork}','${cellphone}','${fax}','${status}','${medicalAid}','${medicalAidNo}',
	'COMMERCIAL SCHOOL','commercial')`;    			
    	
	const result = await queryDatabase(sqlQuery,stream);    						   		  
	const insert_id = result.insertId;      
	
	if(insert_id >0)	
	{
		// Send a success response	 
		// await queryDatabase(sqlQuery,stream);   
		const stream = await createSshTunnel(sshTunnelConfig,dbServer);   
		const sqlQuery = `INSERT INTO school_comments (row_id,subreason_id,description) VALUES ('${insert_id}','${subReason}','${comment}')`;               
	
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


app.post('/update/:id', async (req, res) => { 
  const id = req.params.id; 
  const data = req.body;  

  const stream = await createSshTunnel(sshTunnelConfig, dbServer);	     
  const sqlQuery = "SELECT * FROM membership WHERE UPPER(choose_membership)='COMMERCIAL' AND UPPER(membertype)='COMMERCIAL SCHOOL'"+` AND id=${id} `;	    	    
  const result = await queryDatabase(sqlQuery, stream);	    
  
    if (!data.school_name || data.school_name === "") {
    return res.status(500).json({ error: 'School name is Missing','error_field':'school_name' });		
  } 
  else if (!data.school_email || data.school_email === "") {
    return res.status(500).json({ error: 'Email is Missing','error_field':'school_email' });				
  } 
  else if (!data.instructor_name || data.instructor_name === "") {
    return res.status(500).json({ error: 'Course instructor name is Missing','error_field':'instructor_name' });	
  } 
  else if (!data.registration_no || data.registration_no === "") {
    return res.status(500).json({ error: 'Registration number is Missing','error_field':'registration_no' });		
  }
  else if (!data.address_1 || data.address_1 === "") {
    return res.status(500).json({ error: 'Postal address 1 is Missing','error_field':'address_1' });		
  } 
  else if (!data.city || data.city === "") {
    return res.status(500).json({ error: 'City is Missing','error_field':'city' });		
  }
  else if (!data.pincode || data.pincode === "") {
    return res.status(500).json({ error: 'Postal code is Missing','error_field':'pincode' });		
  }
  else if (!data.country || data.country === "") {
    return res.status(500).json({ error: 'Country is Missing','error_field':'country' });  		
  } 
  else if (!data.cellphone || data.cellphone === "") {
    return res.status(500).json({ error: 'Cell phone is Missing','error_field':'cellphone' });		
  }     
  else if (!data.status || data.status === "") {
    return res.status(500).json({ error: 'Status is Missing','error_field':'status' });	  	  
  }    
  else if (!data.main_reason || data.main_reason === "") {
    return res.status(500).json({ error: 'Main Reason is Missing','error_field':'main_reason' });	  	  
  }
  else if (!data.sub_reason || data.sub_reason === "") {
    return res.status(500).json({ error: 'Sub Reason is Missing','error_field':'sub_reason' });		
  } 
  
  if(result.length==1)  
  {
	  try {  

		// Establish SSH tunnel
        const stream = await createSshTunnel(sshTunnelConfig,dbServer);   		
		
		const schoolName=(typeof data.school_name=="undefined")?'':data.school_name;  	
		const schoolEmail=(typeof data.school_email=="undefined")?'':data.school_email;    

		const instructorName=(typeof data.instructor_name=="undefined")?'':data.instructor_name;    	
		const webAddress=(typeof data.web_address=="undefined")?'':data.web_address;  			   		
		const companyRegis=(typeof data.company_registration=="undefined")?'':data.company_registration;    	
		
		const diverClass=(typeof data.diver_class=="undefined")?'':data.diver_class;  	
		const medicalAid=(typeof data.medical_aid=="undefined")?'':data.medical_aid;  	
		const medicalAidNo=(typeof data.medical_no=="undefined")?'':data.medical_no;        
		
		const regisNo=(typeof data.registration_no=="undefined")?'':data.registration_no;  		
		const address1=(typeof data.address_1=="undefined")?'':data.address_1;    	
		const address2=(typeof data.address_2=="undefined")?'':data.address_2;    
		
		const city=(typeof data.city=="undefined")?'':data.city;    
		const province=(typeof data.province=="undefined")?'':data.province;  	
		const pincode=(typeof data.pincode=="undefined")?'':data.pincode;   	
		const country=(typeof data.country=="undefined")?'':data.country;   		
		const telWork=(typeof data.phonework=="undefined")?'':data.phonework;    	
		const cellphone=(typeof data.cellphone=="undefined")?'':data.cellphone;     				 	
		const fax=(typeof data.fax=="undefined")?'':data.fax;    
		const status=(typeof data.status=="undefined")?'':data.status;      					
		
		const mainReason=(typeof data.main_reason=="undefined")?'':data.main_reason;  			
		const subReason=(typeof data.sub_reason=="undefined")?'':data.sub_reason;   	
		const comment=(typeof data.comment=="undefined")?'':data.comment;  	 
							
		const sqlQuery = `UPDATE membership SET company_name='${schoolName}',email1='${schoolEmail}',contact_person='${instructorName}',address1='${address1}',address3='${webAddress}',
		address2='${address2}',city1='${city}',province1='${province}',postcode1='${pincode}',country1='${country}',registration_no='${regisNo}',account_no='${companyRegis}',
		class_name='${diverClass}',telephone2='${telWork}',cellphone1='${cellphone}',fax='${fax}',status1='${status}',medical_aid='${medicalAid}',medical_aid_no='${medicalAidNo}' 		
		WHERE id=${id}`;   		
		
		const result = await queryDatabase(sqlQuery,stream);  								
		
		if(id >0)	 
		{
			// Send a success response	  		
			const stream = await createSshTunnel(sshTunnelConfig, dbServer);   
			const sqlQuery = `INSERT INTO school_comments (row_id,subreason_id,description) VALUES ('${id}','${subReason}','${comment}')`;               
		
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


app.post('/student_register', async (req, res) => {			
  const data = req.body;	  

  if (!data.student_name || data.student_name === "") {
    return res.status(500).json({ error: 'Student name is Missing','error_field':'student_name' });		
  } 
  else if (!data.student_email || data.student_email === "") {
    return res.status(500).json({ error: 'Student email is Missing','error_field':'student_email' });				
  } 
  else if (!data.dob || data.dob === "") {
    return res.status(500).json({ error: 'Date of birth is Missing','error_field':'dob' });		
  } 
  else if (!data.start_date || data.start_date === "") {
    return res.status(500).json({ error: 'Start date is Missing','error_field':'start_date' });		
  }
  else if (!data.address_1 || data.address_1 === "") {
    return res.status(500).json({ error: 'Postal address 1 is Missing','error_field':'address_1' });		
  } 
  else if (!data.city || data.city === "") {
    return res.status(500).json({ error: 'City is Missing','error_field':'city' });		
  }
  else if (!data.pincode || data.pincode === "") {
    return res.status(500).json({ error: 'Postal code is Missing','error_field':'pincode' });		
  }
  else if (!data.country || data.country === "") {
    return res.status(500).json({ error: 'Country is Missing','error_field':'country' });  		
  }   
  else if (!data.main_reason || data.main_reason === "") {
    return res.status(500).json({ error: 'Main Reason is Missing','error_field':'main_reason' });	  	  
  }
  else if (!data.sub_reason || data.sub_reason === "") {
    return res.status(500).json({ error: 'Sub Reason is Missing','error_field':'sub_reason' });		
  } 
  else if (!data.row_id || data.row_id === "") {
    return res.status(500).json({ error: 'Id is Missing','error_field':'row_id' });	  	  
  }    	
 
  try {
    // Establish SSH tunnel
    const stream = await createSshTunnel(sshTunnelConfig,dbServer);          
    // Insert data into the database     	

	const studentTitle=(typeof data.student_title=="undefined")?'':data.student_title;  	
	const studentName=(typeof data.student_name=="undefined")?'':data.student_name;   
	const surName=(typeof data.surname=="undefined")?'':data.surname;    			   		
	const idNumber=(typeof data.id_number=="undefined")?'':data.id_number;    
	const studentEmail=(typeof data.student_email=="undefined")?'':data.student_email;  	
	const address1=(typeof data.address_1=="undefined")?'':data.address_1;    	
	const address2=(typeof data.address_2=="undefined")?'':data.address_2;  	
	const medicalAid=(typeof data.medical_aid=="undefined")?'':data.medical_aid;  	
	const medicalAidNo=(typeof data.medical_no=="undefined")?'':data.medical_no;              
	const city=(typeof data.city=="undefined")?'':data.city;    
	const province=(typeof data.province=="undefined")?'':data.province;  	
	const pincode=(typeof data.pincode=="undefined")?'':data.pincode;   	
	const country=(typeof data.country=="undefined")?'':data.country;   						
	const mainReason=(typeof data.main_reason=="undefined")?'':data.main_reason;  			
	const subReason=(typeof data.sub_reason=="undefined")?'':data.sub_reason;   	
	const comment=(typeof data.comment=="undefined")?'':data.comment; 
	
	const id=(typeof data.row_id=="undefined")?0:data.row_id;          
	const paid=(typeof data.paid=="undefined" || data.paid==false)?0:1;    	
	
	const startDate=(typeof data.start_date=="undefined" || data.start_date== null || data.start_date=='')?'0000:00:00':data.start_date; 
	const endDate=(typeof data.end_date=="undefined" || data.end_date== null || data.end_date=='')?'0000:00:00':data.end_date;  	
	const dob=(typeof data.dob=="undefined" || data.dob== null || data.dob=='')?'0000:00:00':data.dob;  	  

    const sqlQuery = `INSERT INTO membership (parent_id,title1,fname1,sname1,registration_no,email1,address1,address2,medical_aid,
	medical_aid_no,city1,province1,postcode1,country1,paid,dob1,startdate,lastdate,membertype,choose_membership) VALUES 
	('${id}','${studentTitle}','${studentName}','${surName}','${idNumber}','${studentEmail}','${address1}','${address2}','${medicalAid}',
	'${medicalAidNo}','${city}','${province}','${pincode}','${country}','${paid}','${dob}','${startDate}','${endDate}','school_student','commercial')`;    			
    	
	const result = await queryDatabase(sqlQuery,stream);    						   		  
	const insert_id = result.insertId;      
	
	if(insert_id >0)	
	{
		// Send a success response	 
		// await queryDatabase(sqlQuery,stream);   
		const stream = await createSshTunnel(sshTunnelConfig,dbServer);   
		const sqlQuery = `INSERT INTO school_student_comments (row_id,subreason_id,description) VALUES ('${insert_id}','${subReason}','${comment}')`;               
	
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
 

// Handle other routes
app.use((req, res) => {
  res.status(404).send('Not Found');   		
}); 

// Export the app 
module.exports = app;	   