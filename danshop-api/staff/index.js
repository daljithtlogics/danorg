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
	res.send('Hello from App19!');    							    
});  

app.get('/get', async (req, res) => {
  try {
    const stream = await createSshTunnel(sshTunnelConfig, dbServer);		
    const sqlQuery = `SELECT * FROM membership WHERE UPPER(membertype)='COMPANY' AND parent_id IS NOT NULL`;  						
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
    const sqlQuery = `SELECT * FROM membership WHERE id=${id} AND UPPER(membertype)='COMPANY'`;    	  		  		 		     	    
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
    const sqlQuery = `SELECT c.description,c.created_at,r.title,s.title AS reason_title FROM staff_comments as c left join sub_reasons as s on s.id=c.subreason_id left join main_reasons as r on r.id=s.main_id WHERE c.row_id=${id}`;	     	    
    const results = await queryDatabase(sqlQuery,stream);		   											  							  		
    res.status(200).json(results);   						
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from database: ' + error.message });		  		    						   	
  }
}) 		

app.post('/add', async (req, res) => {			
  const data = req.body;	

  const stream = await createSshTunnel(sshTunnelConfig, dbServer);	      
  const sqlQuery = "SELECT (IFNULL(MAX(id),0)+1) AS max_id FROM membership WHERE UPPER(choose_membership)='COMMERCIAL' AND UPPER(membertype)='COMPANY'";  
  const result = await queryDatabase(sqlQuery, stream);	  		  

  const next_id = (result.length>0)?result[0].max_id:0;  	

  if (!data.person_name || data.person_name === "") {
    return res.status(500).json({ error: 'Contact person is Missing','error_field':'person_name' });		
  } else if (!data.company_name || data.company_name === "") {
    return res.status(500).json({ error: 'Company name is Missing','error_field':'company_name' });		
  } else if (!data.passport_no || data.passport_no === "") {
    return res.status(500).json({ error: 'ID/Passport number is Missing','error_field':'passport_no' });	
  } else if (!data.dob || data.dob === "") {
    return res.status(500).json({ error: 'Date of birth is Missing','error_field':'dob' });		
  } else if (!data.address_1 || data.address_1 === "") {
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
  else if (!data.email || data.email === "") {
    return res.status(500).json({ error: 'Email is Missing','error_field':'email' });		
  }
  else if (!data.grade || data.grade === "") {
    return res.status(500).json({ error: 'Membership grade is Missing','error_field':'grade' });		
  }
  else if (!data.registration_no || data.registration_no === "") {
    return res.status(500).json({ error: 'Registration number is Missing','error_field':'registration_no' });		
  } 
  else if (!data.member_type || data.member_type === "") {
    return res.status(500).json({ error: 'Member Type is Missing','error_field':'member_type' });		
  }			
  else if (!data.start_date || data.start_date === "") {
    return res.status(500).json({ error: 'Start date is Missing','error_field':'start_date' });		
  }
  else if (!data.join_date || data.join_date === "") {
    return res.status(500).json({ error: 'Join date is Missing','error_field':'join_date' });		
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
  else if (!data.id || data.id === "") {
    return res.status(500).json({ error: 'Id is Missing','error_field':'id' });	  	  
  }  	
 
  try {
    // Establish SSH tunnel
    const stream = await createSshTunnel(sshTunnelConfig,dbServer);      
    const memberNO = `DANM ${next_id}`; // Generate member_id   
    // Insert data into the database     	

	const Name=(typeof data.person_name=="undefined")?'':data.person_name;  	
	const companyName=(typeof data.company_name=="undefined")?'':data.company_name;     
	const passportNo=(typeof data.passport_no=="undefined")?'':data.passport_no;   
	const regisNo=(typeof data.registration_no=="undefined")?'':data.registration_no;  		
	const address1=(typeof data.address_1=="undefined")?'':data.address_1;    	
    const address2=(typeof data.address_2=="undefined")?'':data.address_2;  	
	const city=(typeof data.city=="undefined")?'':data.city;   		
	const province=(typeof data.province=="undefined")?'':data.province;  	
	const pincode=(typeof data.pincode=="undefined")?'':data.pincode;   	
	const country=(typeof data.country=="undefined")?'':data.country;   	
	const telHome=(typeof data.phonehome=="undefined")?'':data.phonehome;  	
	const telWork=(typeof data.phonework=="undefined")?'':data.phonework;    	
	const cellPhone=(typeof data.cellphone=="undefined")?'':data.cellphone;     				 	
	const fax=(typeof data.fax=="undefined")?'':data.fax;    	
		
	const email=(typeof data.email=="undefined")?'':data.email;        
	const certification=(typeof data.certification=="undefined")?'':data.certification;   
	const doctorName=(typeof data.doctor=="undefined")?'':data.doctor;    	
    const doctorNo=(typeof data.doctor_no=="undefined")?'':data.doctor_no;  	
	const restriction=(typeof data.restriction=="undefined")?'':data.restriction;   
	
	const grade=(typeof data.grade=="undefined")?0:data.grade;  		 	
	const medicalAid=(typeof data.medical_aid=="undefined")?'':data.medical_aid;  	
	const medicalAidNo=(typeof data.medical_no=="undefined")?'':data.medical_no;      
	const status=(typeof data.status=="undefined")?'':data.status;     
	 	 
	const history=(typeof data.history=="undefined")?'':data.history;    	
    const personName=(typeof data.person=="undefined")?'':data.person;  			   		
	const personNo=(typeof data.person_no=="undefined")?'':data.person_no;    	
	const className=(typeof data.class_name=="undefined")?'':data.class_name;  	
	const type=(typeof data.member_type=="undefined")?'':data.member_type;   		
	const rejoin=(typeof data.rejoin=="undefined")?'':data.rejoin;  		
	const professional=(typeof data.professional=="undefined")?'':data.professional;    						
	
	const mainReason=(typeof data.main_reason=="undefined")?'':data.main_reason;  	
	const subReason=(typeof data.sub_reason=="undefined")?'':data.sub_reason;   	
	const comment=(typeof data.comment=="undefined")?'':data.comment;  	 
		
	const duty=(typeof data.duty=="undefined" || data.duty==false)?0:1; 
	const paid=(typeof data.paid=="undefined" || data.paid==false)?0:1;   
	const id=(typeof data.id=="undefined")?0:data.id;      				
	
	const startDate=(typeof data.start_date=="undefined" || data.start_date== null || data.start_date=='')?'0000:00:00':data.start_date; 
	const captureDate=(typeof data.capture_date=="undefined" || data.capture_date== null || data.capture_date=='')?'0000:00:00 00:00:00':data.capture_date;  		     
	const joinDate=(typeof data.join_date=="undefined" || data.join_date== null || data.join_date=='')?'0000:00:00':data.join_date;  
	const upDate=(typeof data.update_date=="undefined" || data.update_date== null || data.update_date=='')?'0000:00:00 00:00:00':data.update_date;   
	const dob=(typeof data.dob=="undefined" || data.dob== null || data.dob=='')?'0000:00:00':data.dob;  		  
	
    const sqlQuery = `INSERT INTO membership (parent_id,contact_person,company_name,address1,address2,member_no,city1,province1,postcode1,country1,
	passport1,registration_no,telephone1,telephone2,cellphone1,fax,email1,status1,medical_aid,medical_aid_no,membertype,diver_type,rejoin,professional,history,
	doctor_phone,paid,debt,class_name,doctor_name,account_holder,account_no,certification,restriction,dob1,startdate,capturedate,joindate,updatedate,choose_membership) VALUES   
	('${id}','${Name}','${companyName}','${address1}','${address2}','${memberNO}','${city}','${province}','${pincode}','${country}','${passportNo}','${regisNo}',  
	'${telHome}','${telWork}','${cellPhone}','${fax}','${email}','${status}','${medicalAid}','${medicalAidNo}','${type}','${grade}','${rejoin}','${professional}','${history}',  
	'${doctorNo}','${paid}','${duty}','${className}','${doctorName}','${personName}','${personNo}','${certification}','${restriction}','${dob}','${startDate}','${captureDate}','${joinDate}','${upDate}','commercial')`;  
    	
	const result = await queryDatabase(sqlQuery,stream);    	  			  
	const insert_id = result.insertId;      
	
	if(insert_id >0)	
	{
		// Send a success response	 
		// await queryDatabase(sqlQuery,stream);   
		const stream = await createSshTunnel(sshTunnelConfig, dbServer);   
		const sqlQuery = `INSERT INTO staff_comments(row_id,subreason_id,description) VALUES ('${insert_id}','${subReason}','${comment}')`;               
	
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
  const sqlQuery = `SELECT * FROM membership WHERE id=${id} AND UPPER(membertype)='COMPANY'`;      	    
  const result = await queryDatabase(sqlQuery, stream);	
  const memberId = (result.length>0)?result[0].member_no:'';   		
  
  if (!data.person_name || data.person_name === "") {
    return res.status(500).json({ error: 'Contact person is Missing','error_field':'person_name' });		
  } else if (!data.company_name || data.company_name === "") {
    return res.status(500).json({ error: 'Company name is Missing','error_field':'company_name' });		
  } else if (!data.passport_no || data.passport_no === "") {
    return res.status(500).json({ error: 'ID/Passport number is Missing','error_field':'passport_no' });	
  } 
  else if (!data.member_no || data.member_no === "") {   
    return res.status(500).json({ error: 'DAN Membership Number is Missing','error_field':'member_no' });	     	  		
  }   
  else if (!data.dob || data.dob === "") {
    return res.status(500).json({ error: 'Date of birth is Missing','error_field':'dob' });		
  } else if (!data.address_1 || data.address_1 === "") {
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
  else if (!data.email || data.email === "") {
    return res.status(500).json({ error: 'Email is Missing','error_field':'email' });		
  }
  else if (!data.grade || data.grade === "") {
    return res.status(500).json({ error: 'Membership grade is Missing','error_field':'grade' });		
  }
  else if (!data.registration_no || data.registration_no === "") {
    return res.status(500).json({ error: 'Registration number is Missing','error_field':'registration_no' });		
  } 
  else if (!data.member_type || data.member_type === "") {
    return res.status(500).json({ error: 'Member Type is Missing','error_field':'member_type' });		
  }			
  else if (!data.start_date || data.start_date === "") {
    return res.status(500).json({ error: 'Start date is Missing','error_field':'start_date' });		
  }
  else if (!data.join_date || data.join_date === "") {
    return res.status(500).json({ error: 'Join date is Missing','error_field':'join_date' });		
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
  else if (!data.id || data.id === "") {
    return res.status(500).json({ error: 'Id is Missing','error_field':'id' });	  	  
  }  	
  
  if(result.length==1)  
  {
	  try {  

		// Establish SSH tunnel
        const stream = await createSshTunnel(sshTunnelConfig,dbServer);    
		
		const Name=(typeof data.person_name=="undefined")?'':data.person_name;  	
		const companyName=(typeof data.company_name=="undefined")?'':data.company_name;     
		const passportNo=(typeof data.passport_no=="undefined")?'':data.passport_no;   
		const regisNo=(typeof data.registration_no=="undefined")?'':data.registration_no;  		
		const address1=(typeof data.address_1=="undefined")?'':data.address_1;    	
		const address2=(typeof data.address_2=="undefined")?'':data.address_2;  	
		const city=(typeof data.city=="undefined")?'':data.city;   		
		const province=(typeof data.province=="undefined")?'':data.province;  	
		const pincode=(typeof data.pincode=="undefined")?'':data.pincode;   	
		const country=(typeof data.country=="undefined")?'':data.country;   	
		const telHome=(typeof data.phonehome=="undefined")?'':data.phonehome;  	
		const telWork=(typeof data.phonework=="undefined")?'':data.phonework;    	
		const cellPhone=(typeof data.cellphone=="undefined")?'':data.cellphone;     				 	
		const fax=(typeof data.fax=="undefined")?'':data.fax;   

		const memberNo=(typeof data.member_no=="undefined")?'':data.member_no;       
		
		if(memberNo !=memberId)   
		{
			const steam = await createSshTunnel(sshTunnelConfig,dbServer);	     
			const sqlQuer = `SELECT * FROM membership WHERE member_no='${memberNo}' AND UPPER(membertype)='COMPANY'`;	   
			const record = await queryDatabase(sqlQuer,steam);	   					
			
			if(record.length >0)	 		 
			{
				return res.status(500).json({ error: 'DAN Membership Number is not unique','error_field':'member_no' });  
			}   
		}			
			
		const email=(typeof data.email=="undefined")?'':data.email;        
		const certification=(typeof data.certification=="undefined")?'':data.certification;   
		const doctorName=(typeof data.doctor=="undefined")?'':data.doctor;    	
		const doctorNo=(typeof data.doctor_no=="undefined")?'':data.doctor_no;  	
		const restriction=(typeof data.restriction=="undefined")?'':data.restriction;   
		
		const grade=(typeof data.grade=="undefined")?0:data.grade;  		 	
		const medicalAid=(typeof data.medical_aid=="undefined")?'':data.medical_aid;  	
		const medicalAidNo=(typeof data.medical_no=="undefined")?'':data.medical_no;      
		const status=(typeof data.status=="undefined")?'':data.status;     
			 
		const history=(typeof data.history=="undefined")?'':data.history;    	
		const personName=(typeof data.person=="undefined")?'':data.person;  			   		
		const personNo=(typeof data.person_no=="undefined")?'':data.person_no;    	
		const className=(typeof data.class_name=="undefined")?'':data.class_name;  	
		const type=(typeof data.member_type=="undefined")?'':data.member_type;   		
		const rejoin=(typeof data.rejoin=="undefined")?'':data.rejoin;  		
		const professional=(typeof data.professional=="undefined")?'':data.professional;    						
		
		const mainReason=(typeof data.main_reason=="undefined")?'':data.main_reason;  	
		const subReason=(typeof data.sub_reason=="undefined")?'':data.sub_reason;   	
		const comment=(typeof data.comment=="undefined")?'':data.comment;  	 
			
		const duty=(typeof data.duty=="undefined" || data.duty==false)?0:1; 
		const paid=(typeof data.paid=="undefined" || data.paid==false)?0:1;   
		const id=(typeof data.id=="undefined")?0:data.id;      				
		
		const startDate=(typeof data.start_date=="undefined" || data.start_date== null || data.start_date=='')?'0000:00:00':data.start_date; 
		const captureDate=(typeof data.capture_date=="undefined" || data.capture_date== null || data.capture_date=='')?'0000:00:00 00:00:00':data.capture_date;  		     
		const joinDate=(typeof data.join_date=="undefined" || data.join_date== null || data.join_date=='')?'0000:00:00':data.join_date;  
		const upDate=(typeof data.update_date=="undefined" || data.update_date== null || data.update_date=='')?'0000:00:00 00:00:00':data.update_date;   
		const dob=(typeof data.dob=="undefined" || data.dob== null || data.dob=='')?'0000:00:00':data.dob; 

		const captre_date = new Date(captureDate);    		
		const captreDate =(data.capture_date== null)?'0000:00:00 00:00:00':captre_date.toJSON().slice(0, 19).replace('T',' ');   	
		
		const up_date = new Date(upDate);
		const upDae = (data.update_date== null)?'0000:00:00 00:00:00':up_date.toJSON().slice(0, 19).replace('T',' ');   	  
					
		const sqlQuery = `UPDATE membership SET contact_person='${Name}',company_name='${companyName}',address1='${address1}',
		address2='${address2}',member_no='${memberNo}',city1='${city}',province1='${province}',postcode1='${pincode}',country1='${country}',
		passport1='${passportNo}',registration_no='${regisNo}',telephone1='${telHome}',telephone2='${telWork}',cellphone1='${cellPhone}',fax='${fax}',
		email1='${email}',status1='${status}',medical_aid='${medicalAid}',medical_aid_no='${medicalAidNo}',membertype='${type}',diver_type='${grade}',
		rejoin='${rejoin}',professional='${professional}',history='${history}',doctor_phone='${doctorNo}',paid='${paid}',debt='${duty}',class_name='${className}',
		doctor_name='${doctorName}',account_holder='${personName}',account_no='${personNo}',certification='${certification}',restriction='${restriction}',
		dob1='${dob}',startdate='${startDate}',capturedate='${captreDate}',joindate='${joinDate}',updatedate='${upDae}' WHERE id=${id}`;   		
				
		const result = await queryDatabase(sqlQuery,stream);  					
				
		if(id >0)	 
		{
			// Send a success response	  		
			const stream = await createSshTunnel(sshTunnelConfig, dbServer);   		
			const sqlQuery = `INSERT INTO staff_comments (row_id,subreason_id,description) VALUES ('${id}','${subReason}','${comment}')`;               
		
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