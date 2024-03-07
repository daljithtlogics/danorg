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
	res.send('Hello from App21!');    					    		
});  

app.get('/edit/:id', async (req, res) => { 
  const id = req.params.id;		 
  try {
    const stream = await createSshTunnel(sshTunnelConfig, dbServer);		
    const sqlQuery = "SELECT * FROM membership WHERE UPPER(choose_membership)='COMMERCIAL' AND UPPER(membertype)='COMMERCIAL INDIVIDUAL'"+` AND id=${id}`;	 			  		 		     	    
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
    const sqlQuery = `SELECT c.description,c.created_at,r.title,s.title AS reason_title FROM individual_comments as c left join sub_reasons as s on s.id=c.subreason_id left join main_reasons as r on r.id=s.main_id WHERE c.row_id=${id}`;	     	    
    const results = await queryDatabase(sqlQuery,stream);													  							  		
    res.status(200).json(results);   						
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from database: ' + error.message });		  		    						   	
  }
}) 		

app.post('/add', async (req, res) => {			
  const data = req.body;	

  const stream = await createSshTunnel(sshTunnelConfig,dbServer);	   
  
  const memberNo=(typeof data.member_no=="undefined")?'':data.member_no;     
  
  const sqlQuery = "SELECT * FROM membership WHERE UPPER(choose_membership)='COMMERCIAL' AND UPPER(membertype)='COMMERCIAL INDIVIDUAL'"+` AND member_no='${memberNo}'`;	    
  const record = await queryDatabase(sqlQuery,stream);  		  

  if (!data.firstName || data.firstName === "") {
    return res.status(500).json({ error: 'First name is Missing','error_field':'firstName' });		
  } else if (!data.infoDob || data.infoDob === "") {
    return res.status(500).json({ error: 'Date of birth is Missing','error_field':'infoDob' });		
  } else if (!data.infoPassport || data.infoPassport === "") {
    return res.status(500).json({ error: 'ID/Passport number is Missing','error_field':'infoPassport' });	
  } 
  else if (!data.member_no || data.member_no === "") {
    return res.status(500).json({ error: 'DAN Membership Number is Missing','error_field':'member_no' });	     	  		
  }       
  else if(record.length >0)	 		 
  {
	 return res.status(500).json({ error: 'DAN Membership Number is not unique','error_field':'member_no' });    
  } 
  else if (!data.infoAddress1 || data.infoAddress1 === "") {
    return res.status(500).json({ error: 'Postal address 1 is Missing','error_field':'infoAddress1' });		
  }
  else if (!data.infoCity || data.infoCity === "") {
    return res.status(500).json({ error: 'City is Missing','error_field':'infoCity' });  		
  }   
  else if (!data.postCode || data.postCode === "") {
    return res.status(500).json({ error: 'Postal code is Missing','error_field':'postCode' });		
  }   
  else if (!data.infoCountry || data.infoCountry === "") {
    return res.status(500).json({ error: 'Country is Missing','error_field':'infoCountry' });		
  }
  else if (!data.cellPhone || data.cellPhone === "") {
    return res.status(500).json({ error: 'Cell phone is Missing','error_field':'cellPhone' });		
  }
   else if (!data.infoEmail || data.infoEmail === "") {
    return res.status(500).json({ error: 'Email is Missing','error_field':'infoEmail' });  		
  }   
   else if (!data.member_type || data.member_type === "") {
    return res.status(500).json({ error: 'Member Type is Missing','error_field':'member_type' });  		
  }  
  else if (!data.broker_id || data.broker_id === "") {
    return res.status(500).json({ error: 'Broker is Missing','error_field':'broker_id' });		
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
  else if (!data.registration_no || data.registration_no === "") {
    return res.status(500).json({ error: 'Registration number is Missing','error_field':'registration_no' });	  	  
  }   
  else if (!data.kinFirstName || data.kinFirstName === "") {
    return res.status(500).json({ error: 'First name is Missing','error_field':'kinFirstName' });		
  }
   else if (!data.kinDob || data.kinDob === "") {
    return res.status(500).json({ error: 'Date of birth is Missing','error_field':'kinDob' });  		
  }    
  else if (!data.kinPassport || data.kinPassport === "") {
    return res.status(500).json({ error: 'ID/Passport number is Missing','error_field':'kinPassport' });		
  }
  else if (!data.kinAddress1 || data.kinAddress1 === "") {
    return res.status(500).json({ error: 'Postal address 1 is Missing','error_field':'kinAddress1' });		
  }
   else if (!data.kinCity || data.kinCity === "") {
    return res.status(500).json({ error: 'City is Missing','error_field':'kinCity' });  		
  }        
  else if (!data.kinPostCode || data.kinPostCode === "") {
    return res.status(500).json({ error: 'Postal code is Missing','error_field':'kinPostCode' });  		
  }    
  else if (!data.kinCountry || data.kinCountry === "") {
    return res.status(500).json({ error: 'Country is Missing','error_field':'kinCountry' });  		
  }   
  else if (!data.kinCellPhone || data.kinCellPhone === "") {
    return res.status(500).json({ error: 'Cell phone is Missing','error_field':'kinCellPhone' });  		
  }    
  else if (!data.kinEmail || data.kinEmail === "") {
    return res.status(500).json({ error: 'Email is Missing','error_field':'kinEmail' });  		
  }
   else if (!data.relation || data.relation === "") {
    return res.status(500).json({ error: 'Relationship is Missing','error_field':'relation' });  		
  }       
  else if (!data.pay_method || data.pay_method === "") {
    return res.status(500).json({ error: 'Payment Method is Missing','error_field':'pay_method' });		
  }
  else if (!data.institute || data.institute === "") {
    return res.status(500).json({ error: 'Institution is Missing','error_field':'institute' });		
  }
  else if (!data.branch || data.branch === "") {
    return res.status(500).json({ error: 'Branch is Missing','error_field':'branch' });				
  } 
  else if (!data.account_type || data.account_type === "") {
    return res.status(500).json({ error: 'Account Type is Missing','error_field':'account_type' });		
  }
  else if (!data.account_no || data.account_no === "") {
    return res.status(500).json({ error: 'Account No is Missing','error_field':'account_no' });		  		
  } 
  else if (!data.expire_date || data.expire_date === "") {
    return res.status(500).json({ error: 'Card Expiry is Missing','error_field':'expire_date' });		
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
	
	const infoTitle=(typeof data.infoTitle=="undefined")?'':data.infoTitle;  	
	const firstName=(typeof data.firstName=="undefined")?'':data.firstName;     
	const surName=(typeof data.surName=="undefined")?'':data.surName;  		
	const infoDob=(typeof data.infoDob=="undefined")?'':data.infoDob;    	
    const infoPassport=(typeof data.infoPassport=="undefined")?'':data.infoPassport;  	
	
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
	const type=(typeof data.member_type=="undefined")?'':data.member_type;         
	const rejoin=(typeof data.rejoin=="undefined")?'':data.rejoin; 
	
	const brokerId=(typeof data.broker_id=="undefined")?'':data.broker_id;    
	const professional=(typeof data.professional=="undefined")?'':data.professional;     
	
	const status=(typeof data.status=="undefined")?'':data.status;         
	const medicalAid=(typeof data.medical_aid=="undefined")?'':data.medical_aid;  	
	const medicalAidNo=(typeof data.medical_no=="undefined")?'':data.medical_no;    	 
	const doctorName=(typeof data.doctor_name=="undefined")?'':data.doctor_name;  
    const doctorPhone=(typeof data.doctor_phone=="undefined")?'':data.doctor_phone;     
    	
	const className=(typeof data.class_name=="undefined")?'':data.class_name;     
	const registration=(typeof data.registration_no=="undefined")?'':data.registration_no;    	
	const emergencyContact=(typeof data.emergency_contact=="undefined")?'':data.emergency_contact;     
	const emergencyPhone=(typeof data.emergency_phone=="undefined")?'':data.emergency_phone;   
	const kinTitle=(typeof data.kinTitle=="undefined")?'':data.kinTitle;     
	const kinFirstName=(typeof data.kinFirstName=="undefined")?'':data.kinFirstName;     
    const kinSurName=(typeof data.kinSurName=="undefined")?'':data.kinSurName;     
	const kinDob=(typeof data.kinDob=="undefined")?'':data.kinDob;     	
	const kinPassport=(typeof data.kinPassport=="undefined")?'':data.kinPassport;     
	const kinAddress1=(typeof data.kinAddress1=="undefined")?'':data.kinAddress1;     
	const kinAddress2=(typeof data.kinAddress2=="undefined")?'':data.kinAddress2;   
	const kinCity=(typeof data.kinCity=="undefined")?'':data.kinCity;     
	const kinProvince=(typeof data.kinProvince=="undefined")?'':data.kinProvince;     	
	const kinPostCode=(typeof data.kinPostCode=="undefined")?'':data.kinPostCode;   
    const kinCountry=(typeof data.kinCountry=="undefined")?'':data.kinCountry;     	
	const kinTelHome=(typeof data.kinTelHome=="undefined")?'':data.kinTelHome;     
	const kinTelWork=(typeof data.kinTelWork=="undefined")?'':data.kinTelWork;     
	const kinCellPhone=(typeof data.kinCellPhone=="undefined")?'':data.kinCellPhone;     
	const kinEmail=(typeof data.kinEmail=="undefined")?'':data.kinEmail;   	
	const relation=(typeof data.relation=="undefined")?'':data.relation;    
	 	 
	const payMethod=(typeof data.pay_method=="undefined")?'':data.pay_method;    	
    const payPeriod=(typeof data.pay_period=="undefined")?0:data.pay_period;  			   		
	const accountHold=(typeof data.account_holder=="undefined")?'':data.account_holder;    	
	const institution=(typeof data.institute=="undefined")?'':data.institute;  	
	const branchName=(typeof data.branch=="undefined")?'':data.branch;   		
	const branchCode=(typeof data.branch_code=="undefined")?'':data.branch_code;  	 	
	const accountType=(typeof data.account_type=="undefined")?'':data.account_type;    	
	const accountNo=(typeof data.account_no=="undefined")?'':data.account_no; 
	const relate=(typeof data.relation=="undefined")?'':data.relation;   	
	
	const mainReason=(typeof data.main_reason=="undefined")?'':data.main_reason;  	
	const subReason=(typeof data.sub_reason=="undefined")?'':data.sub_reason;   	
	const comment=(typeof data.comment=="undefined")?'':data.comment;  	 

	const sign=(typeof data.auth_sign=="undefined" || data.auth_sign==false)?0:1;   		
	const debt=(typeof data.debt=="undefined" || data.debt==false)?0:1; 
	const paid=(typeof data.paid=="undefined" || data.paid==false)?0:1;    	
	const action=(typeof data.alert_action=="undefined" || data.alert_action==false)?0:1; 
    const researcher=(typeof data.researcher=="undefined" || data.researcher==false)?0:1;    

	const certification=(typeof data.certification=="undefined" || data.certification==false)?0:1;  
	const restriction=(typeof data.restriction=="undefined" || data.restriction==false)?0:1;  
	const history=(typeof data.history=="undefined" || data.history==false)?0:1;  
	
	const startDate=(typeof data.start_date=="undefined" || data.start_date== null || data.start_date=='')?'0000:00:00':data.start_date; 
	const captureDate=(typeof data.capture_date=="undefined" || data.capture_date== null || data.capture_date=='')?'0000:00:00 00:00:00':data.capture_date;  		     
	const joinDate=(typeof data.join_date=="undefined" || data.join_date== null || data.join_date=='')?'0000:00:00':data.join_date;  
	const upDate=(typeof data.update_date=="undefined" || data.update_date== null || data.update_date=='')?'0000:00:00 00:00:00':data.update_date;   
	const expireDate=(typeof data.expire_date=="undefined" || data.expire_date== null || data.expire_date=='')?'0000:00:00':data.expire_date;  		  
		
    const sqlQuery = `INSERT INTO membership (title1,fname1,sname1,dob1,passport1,address1,address2,city1,member_no,province1,
	postcode1,country1,telephone1,telephone2,cellphone1,fax,email1,membertype,rejoin,broker_id,professional,researcher,status1,
	medical_aid,medical_aid_no,doctor_name,doctor_phone,certification,restriction,history,class_name,registration_no,contact_person,contact_phone,
	title2,fname2,sname2,dob2,passport2,address3,address4,city2,province2,postcode2,country2,telephone3,telephone4,cellphone2,email2,
	relation,pay_method,pay_period,account_holder,institute,branch,branch_code,account_type,account_no,authorise_sign,debt,paid,startdate,
	joindate,card_expiry,choose_membership) VALUES ('${infoTitle}','${firstName}','${surName}','${infoDob}',
	'${infoPassport}','${infoAddress1}','${infoAddress2}','${infoCity}','${memberNo}','${infoProvince}','${postCode}','${infoCountry}',
	'${telHome}','${telWork}','${cellPhone}','${fax}','${infoEmail}','${type}','${rejoin}','${brokerId}','${professional}','${researcher}',
	'${status}','${medicalAid}','${medicalAidNo}','${doctorName}','${doctorPhone}',	'${certification}','${restriction}','${history}','${className}',
	'${registration}','${emergencyContact}','${emergencyPhone}','${kinTitle}','${kinFirstName}','${kinSurName}','${kinDob}','${kinPassport}',
	'${kinAddress1}','${kinAddress2}','${kinCity}','${kinProvince}','${kinPostCode}','${kinCountry}','${kinTelHome}','${kinTelWork}',
	'${kinCellPhone}','${kinEmail}','${relate}','${payMethod}','${payPeriod}','${accountHold}','${institution}','${branchName}','${branchCode}',
	'${accountType}','${accountNo}','${sign}','${debt}','${paid}','${startDate}','${joinDate}','${expireDate}','COMMERCIAL')`;  				
    	
	const result = await queryDatabase(sqlQuery,stream);  									  		  
	const insert_id = result.insertId;      		
	
	if(insert_id >0)	
	{
		// Send a success response	 
		// await queryDatabase(sqlQuery,stream);   
		const stream = await createSshTunnel(sshTunnelConfig, dbServer);   
		const sqlQuery = `INSERT INTO individual_comments (row_id,subreason_id,description) VALUES ('${insert_id}','${subReason}','${comment}')`;               
	
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
  const chktype=(typeof data.member_type=="undefined")?'COMMERCIAL INDIVIDUAL':data.member_type; 
  const text = `'${chktype}'`;  
  const stream = await createSshTunnel(sshTunnelConfig, dbServer);	     
  const sqlQuery = `SELECT * FROM membership WHERE id=${id}`;	     			    
  const result = await queryDatabase(sqlQuery, stream);	
  const memberId = (result.length>0)?result[0].member_no:'';    
  
  if (!data.firstName || data.firstName === "") {
    return res.status(500).json({ error: 'First name is Missing','error_field':'firstName' });		
  } else if (!data.infoDob || data.infoDob === "") {
    return res.status(500).json({ error: 'Date of birth is Missing','error_field':'infoDob' });		
  } else if (!data.infoPassport || data.infoPassport === "") {
    return res.status(500).json({ error: 'ID/Passport number is Missing','error_field':'infoPassport' });	
  } 
  else if (!data.member_no || data.member_no === "") {
    return res.status(500).json({ error: 'DAN Membership Number is Missing','error_field':'member_no' });	     	  		
  }     
  else if (!data.infoAddress1 || data.infoAddress1 === "") {
    return res.status(500).json({ error: 'Postal address 1 is Missing','error_field':'infoAddress1' });		
  }
  else if (!data.infoCity || data.infoCity === "") {
    return res.status(500).json({ error: 'City is Missing','error_field':'infoCity' });  		
  }   
  else if (!data.postCode || data.postCode === "") {
    return res.status(500).json({ error: 'Postal code is Missing','error_field':'postCode' });		
  }   
  else if (!data.infoCountry || data.infoCountry === "") {
    return res.status(500).json({ error: 'Country is Missing','error_field':'infoCountry' });		
  }
  else if (!data.cellPhone || data.cellPhone === "") {
    return res.status(500).json({ error: 'Cell phone is Missing','error_field':'cellPhone' });		
  }
   else if (!data.infoEmail || data.infoEmail === "") {
    return res.status(500).json({ error: 'Email is Missing','error_field':'infoEmail' });  		
  }   
   else if (!data.member_type || data.member_type === "") {
    return res.status(500).json({ error: 'Member Type is Missing','error_field':'member_type' });  		
  }  
  else if (!data.broker_id || data.broker_id === "") {
    return res.status(500).json({ error: 'Broker is Missing','error_field':'broker_id' });		
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
  else if (!data.registration_no || data.registration_no === "") {
    return res.status(500).json({ error: 'Registration number is Missing','error_field':'registration_no' });	  	  
  }   
  else if (!data.kinFirstName || data.kinFirstName === "") {
    return res.status(500).json({ error: 'First name is Missing','error_field':'kinFirstName' });		
  }
   else if (!data.kinDob || data.kinDob === "") {
    return res.status(500).json({ error: 'Date of birth is Missing','error_field':'kinDob' });  		
  }    
  else if (!data.kinPassport || data.kinPassport === "") {
    return res.status(500).json({ error: 'ID/Passport number is Missing','error_field':'kinPassport' });		
  }
  else if (!data.kinAddress1 || data.kinAddress1 === "") {
    return res.status(500).json({ error: 'Postal address 1 is Missing','error_field':'kinAddress1' });		
  }
   else if (!data.kinCity || data.kinCity === "") {
    return res.status(500).json({ error: 'City is Missing','error_field':'kinCity' });  		
  }        
  else if (!data.kinPostCode || data.kinPostCode === "") {
    return res.status(500).json({ error: 'Postal code is Missing','error_field':'kinPostCode' });  		
  }    
  else if (!data.kinCountry || data.kinCountry === "") {
    return res.status(500).json({ error: 'Country is Missing','error_field':'kinCountry' });  		
  }   
  else if (!data.kinCellPhone || data.kinCellPhone === "") {
    return res.status(500).json({ error: 'Cell phone is Missing','error_field':'kinCellPhone' });  		
  }    
  else if (!data.kinEmail || data.kinEmail === "") {
    return res.status(500).json({ error: 'Email is Missing','error_field':'kinEmail' });  		
  }
   else if (!data.relation || data.relation === "") {
    return res.status(500).json({ error: 'Relationship is Missing','error_field':'relation' });  		
  }       
  else if (!data.pay_method || data.pay_method === "") {
    return res.status(500).json({ error: 'Payment Method is Missing','error_field':'pay_method' });		
  }
  else if (!data.institute || data.institute === "") {
    return res.status(500).json({ error: 'Institution is Missing','error_field':'institute' });		
  }
  else if (!data.branch || data.branch === "") {
    return res.status(500).json({ error: 'Branch is Missing','error_field':'branch' });				
  } 
  else if (!data.account_type || data.account_type === "") {
    return res.status(500).json({ error: 'Account Type is Missing','error_field':'account_type' });		
  }
  else if (!data.account_no || data.account_no === "") {
    return res.status(500).json({ error: 'Account No is Missing','error_field':'account_no' });		  		
  } 
  else if (!data.expire_date || data.expire_date === "") {
    return res.status(500).json({ error: 'Card Expiry is Missing','error_field':'expire_date' });		
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
		
		const infoTitle=(typeof data.infoTitle=="undefined")?'':data.infoTitle;  	
		const firstName=(typeof data.firstName=="undefined")?'':data.firstName;     
		const surName=(typeof data.surName=="undefined")?'':data.surName;  		
		const infoDob=(typeof data.infoDob=="undefined")?'':data.infoDob;    	
		const infoPassport=(typeof data.infoPassport=="undefined")?'':data.infoPassport;   		
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
		const memberNo=(typeof data.member_no=="undefined")?'':data.member_no;   
		const memberChk=(typeof data.member_no=="undefined")?'':`'${data.member_no}'`;   
		
		if(memberNo !=memberId)   
		{
			const steam = await createSshTunnel(sshTunnelConfig,dbServer);	     
			const sqlQuer="SELECT * FROM membership WHERE UPPER(choose_membership)='COMMERCIAL' AND UPPER(membertype)="+`${text} AND member_no=${memberChk}`;		
			const record = await queryDatabase(sqlQuer,steam);	
			
			if(record.length >0)	 		 
			{
				return res.status(500).json({ error: 'DAN Membership Number is not unique','error_field':'member_no' });  
			}   
		}
			
		const infoEmail=(typeof data.infoEmail=="undefined")?'':data.infoEmail;    
		const type=(typeof data.member_type=="undefined")?'':data.member_type;         
		const rejoin=(typeof data.rejoin=="undefined")?'':data.rejoin; 
		
		const brokerId=(typeof data.broker_id=="undefined")?'':data.broker_id;    
		const professional=(typeof data.professional=="undefined")?'':data.professional;     
		
		const status=(typeof data.status=="undefined")?'':data.status;         
		const medicalAid=(typeof data.medical_aid=="undefined")?'':data.medical_aid;  	
		const medicalAidNo=(typeof data.medical_no=="undefined")?'':data.medical_no;    	 
		const doctorName=(typeof data.doctor_name=="undefined")?'':data.doctor_name;  
		const doctorPhone=(typeof data.doctor_phone=="undefined")?'':data.doctor_phone;    
			
		const className=(typeof data.class_name=="undefined")?'':data.class_name;     
		const registration=(typeof data.registration_no=="undefined")?'':data.registration_no;    	
		const emergencyContact=(typeof data.emergency_contact=="undefined")?'':data.emergency_contact;     
		const emergencyPhone=(typeof data.emergency_phone=="undefined")?'':data.emergency_phone;   
		const kinTitle=(typeof data.kinTitle=="undefined")?'':data.kinTitle;     
		const kinFirstName=(typeof data.kinFirstName=="undefined")?'':data.kinFirstName;     
		const kinSurName=(typeof data.kinSurName=="undefined")?'':data.kinSurName;     
		const kinDob=(typeof data.kinDob=="undefined")?'':data.kinDob;     	
		const kinPassport=(typeof data.kinPassport=="undefined")?'':data.kinPassport;     
		const kinAddress1=(typeof data.kinAddress1=="undefined")?'':data.kinAddress1;     
		const kinAddress2=(typeof data.kinAddress2=="undefined")?'':data.kinAddress2;   
		const kinCity=(typeof data.kinCity=="undefined")?'':data.kinCity;     
		const kinProvince=(typeof data.kinProvince=="undefined")?'':data.kinProvince;     	
		const kinPostCode=(typeof data.kinPostCode=="undefined")?'':data.kinPostCode;   
		const kinCountry=(typeof data.kinCountry=="undefined")?'':data.kinCountry;     	
		const kinTelHome=(typeof data.kinTelHome=="undefined")?'':data.kinTelHome;     
		const kinTelWork=(typeof data.kinTelWork=="undefined")?'':data.kinTelWork;     
		const kinCellPhone=(typeof data.kinCellPhone=="undefined")?'':data.kinCellPhone;     
		const kinEmail=(typeof data.kinEmail=="undefined")?'':data.kinEmail;   	
		const relation=(typeof data.relation=="undefined")?'':data.relation;    
			 
		const payMethod=(typeof data.pay_method=="undefined")?'':data.pay_method;    	
		const payPeriod=(typeof data.pay_period=="undefined")?0:data.pay_period;  			   		
		const accountHold=(typeof data.account_holder=="undefined")?'':data.account_holder;    	
		const institution=(typeof data.institute=="undefined")?'':data.institute;  	
		const branchName=(typeof data.branch=="undefined")?'':data.branch;   		
		const branchCode=(typeof data.branch_code=="undefined")?'':data.branch_code;  	 	
		const accountType=(typeof data.account_type=="undefined")?'':data.account_type;    	
		const accountNo=(typeof data.account_no=="undefined")?'':data.account_no; 
		const relate=(typeof data.relation=="undefined")?'':data.relation;   	
		
		const mainReason=(typeof data.main_reason=="undefined")?'':data.main_reason;  	
		const subReason=(typeof data.sub_reason=="undefined")?'':data.sub_reason;   	
		const comment=(typeof data.comment=="undefined")?'':data.comment;  	 

		const sign=(typeof data.auth_sign=="undefined" || data.auth_sign==false)?0:1;   		
		const debt=(typeof data.debt=="undefined" || data.debt==false)?0:1; 
		const paid=(typeof data.paid=="undefined" || data.paid==false)?0:1;    	
		const action=(typeof data.alert_action=="undefined" || data.alert_action==false)?0:1; 
		const researcher=(typeof data.researcher=="undefined" || data.researcher==false)?0:1;    

		const certification=(typeof data.certification=="undefined" || data.certification==false)?0:1;  
		const restriction=(typeof data.restriction=="undefined" || data.restriction==false)?0:1;  
		const history=(typeof data.history=="undefined" || data.history==false)?0:1;  
		
		const startDate=(typeof data.start_date=="undefined" || data.start_date== null || data.start_date=='')?'0000:00:00':data.start_date; 
		const captureDate=(typeof data.capture_date=="undefined" || data.capture_date== null || data.capture_date=='')?'0000:00:00 00:00:00':data.capture_date;  		     
		const joinDate=(typeof data.join_date=="undefined" || data.join_date== null || data.join_date=='')?'0000:00:00':data.join_date;  
		const upDate=(typeof data.update_date=="undefined" || data.update_date== null || data.update_date=='')?'0000:00:00 00:00:00':data.update_date;   
		const expireDate=(typeof data.expire_date=="undefined" || data.expire_date== null || data.expire_date=='')?'0000:00:00':data.expire_date;  		  
		
		const sqlQuery = `UPDATE membership SET title1='${infoTitle}',fname1='${firstName}',sname1='${surName}',dob1='${infoDob}',
		passport1='${infoPassport}',address1='${infoAddress1}',address2='${infoAddress2}',city1='${infoCity}',member_no='${memberNo}',
		province1='${infoProvince}',postcode1='${postCode}',country1='${infoCountry}',telephone1='${telHome}',telephone2='${telWork}',
		cellphone1='${cellPhone}',fax='${fax}',email1='${infoEmail}',membertype='${type}',rejoin='${rejoin}',broker_id='${brokerId}',
		professional='${professional}',researcher='${researcher}',status1='${status}',medical_aid='${medicalAid}',medical_aid_no='${medicalAidNo}',
		doctor_name='${doctorName}',doctor_phone='${doctorPhone}',certification='${certification}',restriction='${restriction}',
		history='${history}',class_name='${className}',registration_no='${registration}',contact_person='${emergencyContact}',
		contact_phone='${emergencyPhone}',title2='${kinTitle}',fname2='${kinFirstName}',sname2='${kinSurName}',dob2='${kinDob}',
		passport2='${kinPassport}',address3='${kinAddress1}',address4='${kinAddress2}',city2='${kinCity}',province2='${kinProvince}',
		postcode2='${kinPostCode}',country2='${kinCountry}',telephone3='${kinTelHome}',telephone4='${kinTelWork}',
		cellphone2='${kinCellPhone}',email2='${kinEmail}',relation='${relate}',pay_method='${payMethod}',pay_period='${payPeriod}',
		account_holder='${accountHold}',institute='${institution}',branch='${branchName}',branch_code='${branchCode}',
		account_type='${accountType}',account_no='${accountNo}',authorise_sign='${sign}',debt='${debt}',paid='${paid}',
		startdate='${startDate}',joindate='${joinDate}',card_expiry='${expireDate}' WHERE id=${id}`;   							
		
		await queryDatabase(sqlQuery,stream);  		   												
		
		if(id >0)	 
		{
			// Send a success response	  		
			const stream = await createSshTunnel(sshTunnelConfig, dbServer);   
			const sqlQuery = `INSERT INTO individual_comments (row_id,subreason_id,description) VALUES ('${id}','${subReason}','${comment}')`;               
		
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