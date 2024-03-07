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
	res.send('Hello from App1!');    		
});  

app.get('/get', async (req, res) => {
  try {
    const stream = await createSshTunnel(sshTunnelConfig, dbServer);		
    const sqlQuery = "SELECT * FROM membership WHERE UPPER(choose_membership)='ANNUAL'";	  		 	
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
		query += "SELECT count(*) AS record_count FROM membership WHERE UPPER(choose_membership)='ANNUAL'"+` AND (CONCAT(fname1,' ',sname1) LIKE ${text} OR member_no LIKE ${text} OR email1 LIKE ${text} OR status1 LIKE ${text} OR DATE_FORMAT(startdate,"%d/%m/%Y") LIKE ${text})`;        
		sqlQuery += "SELECT * FROM membership WHERE UPPER(choose_membership)='ANNUAL'"+` AND (CONCAT(fname1,' ',sname1) LIKE ${text} OR member_no LIKE ${text} OR email1 LIKE ${text} OR status1 LIKE ${text} OR DATE_FORMAT(startdate,"%d/%m/%Y") LIKE ${text}) LIMIT ${start},${end}`;        
	}
	else
	{
		query += "SELECT count(*) AS record_count FROM membership WHERE UPPER(choose_membership)='ANNUAL'";	  	  
		sqlQuery += "SELECT * FROM membership WHERE UPPER(choose_membership)='ANNUAL'"+` LIMIT ${start},${end}`;	  						           
	} 

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

app.get('/reasons', async (req, res) => {
  try {
    const stream = await createSshTunnel(sshTunnelConfig, dbServer);		
    const sqlQuery = "SELECT * FROM main_reasons";	          
    const results = await queryDatabase(sqlQuery, stream);	  			
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from database: ' + error.message });		    	
  }
});     

app.get('/active_members', async (req, res) => {
  try {
    const stream = await createSshTunnel(sshTunnelConfig, dbServer);		
    const sqlQuery = "SELECT * FROM membership WHERE UPPER(choose_membership)='ANNUAL' AND status1='ACTIVE'";	    
    const results = await queryDatabase(sqlQuery, stream);	  			
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from database: ' + error.message });		    	
  }
}); 

app.get('/courses/:id', async (req, res) => {  
  const id = req.params.id;
  const stream = await createSshTunnel(sshTunnelConfig, dbServer);		
  const sqlQuery = `SELECT * FROM trainers where row_id=${id}`;	   	
  const results = await queryDatabase(sqlQuery, stream);	  
  const arr = [];    

  for (var i=0;i<results.length;i++) {
    arr.push(results[i].course_id);           
  }  
  
  let text =(arr.length >0)?arr.toString():'';   
  
  try {
    const stream = await createSshTunnel(sshTunnelConfig, dbServer);		
    const sqlQuery =(text=='')?'SELECT * FROM courses':`SELECT * FROM courses WHERE ID NOT IN (${text})`;	   	
    const results = await queryDatabase(sqlQuery, stream);	  	      		
    res.status(200).json(results);		
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from database: ' + error.message });		    	
  }
});    

app.post('/add', async (req, res) => {			
  const data = req.body;	
  
  const stream = await createSshTunnel(sshTunnelConfig, dbServer);	    
  const sqlQuery = "SELECT (IFNULL(MAX(id),0)+1) AS max_id FROM membership WHERE UPPER(choose_membership)='ANNUAL'";	   	
  const result = await queryDatabase(sqlQuery, stream);	  

  const next_id = (result.length>0)?result[0].max_id:0;  	   

  if (!data.firstName || data.firstName === "") {   
    return res.status(500).json({ error: 'First Name is Missing','error_field':'firstName' });
  } else if (!data.infoDob || data.infoDob === "") {
    return res.status(500).json({ error: 'Date of birth is Missing','error_field':'infoDob' });
  } else if (!data.infoCity || data.infoCity === "") {
    return res.status(500).json({ error: 'City is Missing','error_field':'infoCity' });
  } else if (!data.infoCountry || data.infoCountry === "") {
    return res.status(500).json({ error: 'Country is Missing','error_field':'infoCountry' });
  } else if (!data.cellPhone || data.cellPhone === "") {
    return res.status(500).json({ error: 'Cell phone is Missing','error_field':'cellPhone' });		
  }
  else if (!data.infoEmail || data.infoEmail === "") {
    return res.status(500).json({ error: 'Email is Missing','error_field':'infoEmail' });		
  }
  else if (!data.memberType || data.memberType === "") {
    return res.status(500).json({ error: 'Member Type is Missing','error_field':'memberType' });		
  }
  else if (!data.startDate || data.startDate === "") {
    return res.status(500).json({ error: 'Start date is Missing','error_field':'startDate' });		
  }
  else if (!data.kinFirstName || data.kinFirstName === "") {
    return res.status(500).json({ error: 'First name is Missing','error_field':'kinFirstName' });		
  }
  else if (!data.kinDob || data.kinDob === "") {
    return res.status(500).json({ error: 'Date of birth is Missing','error_field':'kinDob' });		
  }
  else if (!data.kinCity || data.kinCity === "") {
    return res.status(500).json({ error: 'City is Missing','error_field':'kinCity' });	  	
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

  try {
    // Establish SSH tunnel
    const stream = await createSshTunnel(sshTunnelConfig, dbServer);     
	
    // const currentDate = new Date().toISOString().slice(0, 10); // Get current date in 'YYYY-MM-DD' format
    const randomNo = Math.floor(Math.random() * 1000); // Generate a random number
    const memberNO = `DAN ${next_id}`; // Generate member_id with a random number   
    // Insert data into the database  
	
	const fulltime_membership=(typeof data.memberFullTime=="undefined" || data.memberFullTime==false || data.memberFullTime== null)?0:1; 
	const researcher=(typeof data.researcher=="undefined" || data.researcher==false || data.researcher== null)?0:1; 
	const paid=(typeof data.paid=="undefined" || data.paid==false || data.paid== null)?0:1;    

	const infoTitle=(typeof data.infoTitle=="undefined")?'':data.infoTitle;  	
	const firstName=(typeof data.firstName=="undefined")?'':data.firstName;    
	const surName=(typeof data.surName=="undefined")?'':data.surName;  	
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
	const memberType=(typeof data.memberType=="undefined")?'':data.memberType;    	
    const rejoin=(typeof data.rejoin=="undefined")?'':data.rejoin;  	
	const broker=(typeof data.broker=="undefined")?'':data.broker;    
	const agency=(typeof data.agency=="undefined")?'':data.agency;  	
	const professional=(typeof data.professional=="undefined")?'':data.professional;   	
	const medicalAid=(typeof data.medicalAid=="undefined")?'':data.medicalAid;  	
	const medicalAidNo=(typeof data.medicalAidNo=="undefined")?'':data.medicalAidNo;      
	const level=(typeof data.level=="undefined")?'':data.level;  	
	const kinTitle=(typeof data.kinTitle=="undefined")?'':data.kinTitle;    	
    const kinFirstName=(typeof data.kinFirstName=="undefined")?'':data.kinFirstName;  	
	const kinSurName=(typeof data.kinSurName=="undefined")?'':data.kinSurName;    
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
	const instructorState=(typeof data.instructorState=="undefined")?'':data.instructorState;  	
	const status=(typeof data.status=="undefined")?'':data.status;   	
	const infoDob=(typeof data.infoDob=="undefined")?'':data.infoDob;  		
	
	const kinDob=(typeof data.kinDob=="undefined" || data.kinDob== null)?'0000:00:00':data.kinDob;  	
	const startDate=(typeof data.startDate=="undefined" || data.startDate== null)?'0000:00:00':data.startDate;      		
	const joinDate=(typeof data.joinDate=="undefined" || data.joinDate== null)?'0000:00:00':data.joinDate;  
	
    const sqlQuery = `INSERT INTO membership (title1,fname1,sname1,passport1,member_no,address1,address2,city1,province1,postcode1,country1,telephone1,telephone2,cellphone1,fax,email1,membertype,rejoin,broker_id,agency,professional,medical_aid,medical_aid_no,package_name,title2,fname2,sname2,passport2,address3,address4,city2,province2,postcode2,country2,telephone3,telephone4,cellphone2,email2,relation,status1,status2,dob1,dob2,startdate,joindate,fulltime,researcher,paid,choose_membership) 
	VALUES ('${infoTitle}','${firstName}','${surName}','${infoPassport}','${memberNO}','${infoAddress1}','${infoAddress2}','${infoCity}','${infoProvince}','${postCode}','${infoCountry}','${telHome}','${telWork}','${cellPhone}','${fax}','${infoEmail}','${memberType}','${rejoin}','${broker}','${agency}','${professional}','${medicalAid}','${medicalAidNo}','${level}','${kinTitle}','${kinFirstName}','${kinSurName}','${kinPassport}','${kinAddress1}','${kinAddress2}',
	'${kinCity}','${kinProvince}','${kinPostCode}','${kinCountry}','${kinTelHome}','${kinTelWork}','${kinCellPhone}','${kinEmail}','${relation}','${status}','${instructorState}','${infoDob}','${kinDob}','${startDate}','${joinDate}','${fulltime_membership}','${researcher}','${paid}','annual')`;  
    
	await queryDatabase(sqlQuery,stream);   			      

    // Send a success response
     res.status(200).json({ message: 'Data added successfully' });  	 				  			  		 
	 
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

app.get('/subreasons/:id', async (req, res) => { 
  const id = req.params.id;		 
  try {
    const stream = await createSshTunnel(sshTunnelConfig, dbServer);		
    const sqlQuery = `SELECT * FROM sub_reasons WHERE main_id=${id}`;	   		  	    
    const results = await queryDatabase(sqlQuery, stream);		  		
    res.status(200).json(results);   
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from database: ' + error.message });				    	
  }
})   

app.get('/dives/:id', async (req, res) => { 
  const id = req.params.id;		 
  try {
    const stream = await createSshTunnel(sshTunnelConfig, dbServer);		
    const sqlQuery = `SELECT * FROM membership WHERE UPPER(membertype)='DIVER' AND parent_id=${id}`;	  		   	    
    const results = await queryDatabase(sqlQuery, stream);			  							  		
    res.status(200).json(results);   
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from database: ' + error.message });		    	
  }
})   

app.get('/nondives/:id', async (req, res) => { 
  const id = req.params.id;		 
  try {
    const stream = await createSshTunnel(sshTunnelConfig, dbServer);		
    const sqlQuery = `SELECT * FROM membership WHERE UPPER(membertype)='NON_DIVER' AND parent_id=${id}`;	    	    
    const results = await queryDatabase(sqlQuery, stream);	  									  		
    res.status(200).json(results);   
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from database: ' + error.message });		   		   	
  }
})  

app.get('/qualifications/:id', async (req, res) => { 
  const id = req.params.id;		 
  try {
    const stream = await createSshTunnel(sshTunnelConfig, dbServer);	  	
    const sqlQuery = `SELECT t.*,c.title,c.type,c.status FROM trainers as t left join courses as c on t.course_id=c.id WHERE t.row_id=${id}`;	     	    
    const results = await queryDatabase(sqlQuery, stream);	  							  		
    res.status(200).json(results);   			
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from database: ' + error.message });		    	
  }
})   

app.get('/instructors/:id', async (req, res) => {    
  const id = req.params.id;		 
  try {
    const stream = await createSshTunnel(sshTunnelConfig, dbServer);	  	
    const sqlQuery = `SELECT s.*,c.title,c.status,a.fname1,a.sname1,a.member_no FROM annual_instructors as s left join courses as c ON c.id=s.course_id left join membership as a ON a.id=s.student_id WHERE s.row_id=${id} group by s.id`;	   	
    const results = await queryDatabase(sqlQuery, stream);					  							  		
    res.status(200).json(results);       			
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from database: ' + error.message });		    	
  }
})    

app.get('/providers/:id', async (req, res) => {    
  const id = req.params.id;		 
  try {
    const stream = await createSshTunnel(sshTunnelConfig, dbServer);	  	
    const sqlQuery = `SELECT p.*,c.title,c.status,s.first_name,s.surname,s.active_date,s.active_until,s.refresh_date FROM providers as p left join student_members as s ON s.id=p.member_id left join courses as c ON c.id=s.course_id WHERE p.row_id=${id} group by p.id`;	   	
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
    const sqlQuery = `SELECT c.description,c.created_at,r.title,s.title AS reason_title FROM annual_comments as c left join sub_reasons as s on s.id=c.subreason_id left join main_reasons as r on r.id=s.main_id WHERE c.row_id=${id}`;	     	    
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
  
  if (!data.f_name || data.f_name === "") {
    return res.status(500).json({ error: 'First Name is Missing','error_field':'f_name' });
  } else if (!data.info_dob || data.info_dob === "") {  
    return res.status(500).json({ error: 'Date of birth is Missing','error_field':'info_dob' });    
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
  else if (!data.member_type || data.member_type === "") {  
    return res.status(500).json({ error: 'Member Type is Missing','error_field':'member_type' });        
  }   
  else if (!data.start_date || data.start_date === "") {  
    return res.status(500).json({ error: 'Start date is Missing','error_field':'start_date' });        
  }   
  else if (!data.join_date || data.join_date === "") {  
    return res.status(500).json({ error: 'Join date is Missing','error_field':'join_date' });        
  }   
  else if (!data.kin_fname || data.kin_fname === "") {  
    return res.status(500).json({ error: 'First name is Missing','error_field':'kin_fname' });        
  }   
  else if (!data.kin_dob || data.kin_dob === "") {  
    return res.status(500).json({ error: 'Date of birth is Missing','error_field':'kin_dob' });        
  }   
  else if (!data.kin_city || data.kin_city === "") {  
    return res.status(500).json({ error: 'City is Missing','error_field':'kin_city' });        
  }   
  else if (!data.kin_country || data.kin_country === "") {  
    return res.status(500).json({ error: 'Country is Missing','error_field':'kin_country' });        
  }   
  else if (!data.kin_phone || data.kin_phone === "") {  
    return res.status(500).json({ error: 'Cell phone is Missing','error_field':'kin_phone' });        
  }   
  else if (!data.kin_email || data.kin_email === "") {  
    return res.status(500).json({ error: 'Email is Missing','error_field':'kin_email' });        
  }
  else if (!data.pay_method || data.pay_method === "") {  
    return res.status(500).json({ error: 'Payment Method is Missing','error_field':'pay_method' });    
  }     
  else if (!data.account_type || data.account_type === "") {  
    return res.status(500).json({ error: 'Account Type is Missing','error_field':'account_type' });        
  }   
  else if (!data.account_no || data.account_no === "") {  
    return res.status(500).json({ error: 'Account No is Missing','error_field':'account_no' });        
  }   
  else if (!data.card_expiry || data.card_expiry === "") {  
    return res.status(500).json({ error: 'Card Expiry is Missing','error_field':'card_expiry' });        
  }  
  else if (!data.mainReason || data.mainReason === "") {  
    return res.status(500).json({ error: 'Main Reason is Missing','error_field':'mainReason' });        
  }   
  else if (!data.subReason || data.subReason === "") {  
    return res.status(500).json({ error: 'Sub  Reason is Missing','error_field':'subReason' });        
  }   	
  
  if(result.length==1)  
  {
	  try {  

		// Establish SSH tunnel
       const stream = await createSshTunnel(sshTunnelConfig, dbServer);   

		const fulltime_membership=(typeof data.full_time=="undefined" || data.full_time==false)?0:1; 
		const researcher=(typeof data.researcher=="undefined" || data.researcher==false)?0:1; 
		const paid=(typeof data.paid=="undefined" || data.paid==false)?0:1;  
		
		const authorise_sign=(typeof data.authorise_sign=="undefined" || data.authorise_sign==false)?0:1; 
		const debt=(typeof data.debt=="undefined" || data.debt==false)?0:1;    

		const infoTitle=(typeof data.info_title=="undefined" || data.info_title== null)?'':data.info_title;  	
		const firstName=(typeof data.f_name=="undefined" || data.f_name== null)?'':data.f_name;      
		const surName=(typeof data.sur_name=="undefined" || data.sur_name== null)?'':data.sur_name;  	
		const infoPassport=(typeof data.info_passport=="undefined" || data.info_passport== null)?'':data.info_passport;    	
		const infoAddress1=(typeof data.info_address1=="undefined" || data.info_address1== null)?'':data.info_address1;  	
		const infoAddress2=(typeof data.info_address2=="undefined" || data.info_address2== null)?'':data.info_address2;    
		const infoCity=(typeof data.info_city=="undefined" || data.info_city== null)?'':data.info_city;  	
		const infoProvince=(typeof data.info_province=="undefined" || data.info_province== null)?'':data.info_province;   	
		const postCode=(typeof data.post_code=="undefined" || data.post_code== null)?'':data.post_code;  	
		const infoCountry=(typeof data.info_country=="undefined" || data.info_country== null)?'':data.info_country;    
		const telHome=(typeof data.tel_home=="undefined" || data.tel_home== null)?'':data.tel_home;  	
		const telWork=(typeof data.tel_work=="undefined" || data.tel_work== null)?'':data.tel_work;    	
		const cellPhone=(typeof data.cell_phone=="undefined" || data.cell_phone== null)?'':data.cell_phone;  	
		const fax=(typeof data.fax=="undefined" || data.fax== null)?'':data.fax;    
		const infoEmail=(typeof data.info_email=="undefined" || data.info_email== null)?'':data.info_email;  	
		const memberType=(typeof data.member_type=="undefined" || data.member_type== null)?'':data.member_type;    	
		const rejoin=(typeof data.rejoin=="undefined" || data.rejoin== null)?'':data.rejoin;  	
		const broker=(typeof data.broker=="undefined" || data.broker== null)?'':data.broker;    
		const agency=(typeof data.agency=="undefined" || data.agency== null)?'':data.agency;  	
		const professional=(typeof data.professional=="undefined" || data.professional== null)?'':data.professional;   	
		const medicalAid=(typeof data.medical_aid=="undefined" || data.medical_aid== null)?'':data.medical_aid;  	
		const medicalAidNo=(typeof data.medical_no=="undefined" || data.medical_no== null)?'':data.medical_no;      
		const level=(typeof data.member_level=="undefined" || data.member_level== null)?'':data.member_level;  	 		
		const workDiver=(typeof data.work_diver=="undefined" || data.work_diver== null)?'':data.work_diver;  
		const qualification=(typeof data.qualification=="undefined" || data.qualification== null)?'':data.qualification;     		
		const kinTitle=(typeof data.kin_title=="undefined" || data.kin_title== null)?'':data.kin_title;    	
		const kinFirstName=(typeof data.kin_fname=="undefined" || data.kin_fname== null)?'':data.kin_fname;  	
		const kinSurName=(typeof data.kin_sname=="undefined" || data.kin_sname== null)?'':data.kin_sname;    
		const kinPassport=(typeof data.kin_passport=="undefined" || data.kin_passport== null)?'':data.kin_passport;  	
		const kinAddress1=(typeof data.kin_address1=="undefined" || data.kin_address1== null)?'':data.kin_address1;   	
		const kinAddress2=(typeof data.kin_address2=="undefined" || data.kin_address2== null)?'':data.kin_address2;  	
		const kinCity=(typeof data.kin_city=="undefined" || data.kin_city== null)?'':data.kin_city;    
		const kinProvince=(typeof data.kin_province=="undefined" || data.kin_province== null)?'':data.kin_province;  	
		const kinPostCode=(typeof data.kin_post=="undefined" || data.kin_post== null)?'':data.kin_post;    
		const kinCountry=(typeof data.kin_country=="undefined" || data.kin_country== null)?'':data.kin_country;  	
		const kinTelHome=(typeof data.kin_tel=="undefined" || data.kin_tel== null)?'':data.kin_tel;      
		const kinTelWork=(typeof data.kin_num=="undefined" || data.kin_num== null)?'':data.kin_num;  	
		const kinCellPhone=(typeof data.kin_phone=="undefined" || data.kin_phone== null)?'':data.kin_phone;    	
		const kinEmail=(typeof data.kin_email=="undefined" || data.kin_email== null)?'':data.kin_email;  	
		const relation=(typeof data.kin_relation=="undefined" || data.kin_relation== null)?'':data.kin_relation;    
		const instructorState=(typeof data.instructor_state=="undefined" || data.kin_dob== null)?'':data.instructor_state;  	
		const status=(typeof data.status=="undefined" || data.status== null)?'':data.status;   		
		
		const pay_method=(typeof data.pay_method=="undefined" || data.pay_method== null)?'':data.pay_method;  	 
		const pay_period=(typeof data.pay_period=="undefined" || data.pay_period== null)?0:data.pay_period;    	 
		const account_holder=(typeof data.account_holder=="undefined" || data.account_holder== null)?'':data.account_holder;  	 
		const institute=(typeof data.institute=="undefined" || data.institute== null)?'':data.institute;  	 
		const branch=(typeof data.branch=="undefined" || data.branch== null)?'':data.branch;  	

		const branch_code=(typeof data.branch_code=="undefined" || data.branch_code== null)?'':data.branch_code;  	 
		const account_type=(typeof data.account_type=="undefined" || data.account_type== null)?'':data.account_type;  	
		const account_no=(typeof data.account_no=="undefined" || data.account_no== null)?'':data.account_no;  	  
		
		const infoDob=(typeof data.info_dob=="undefined" || data.info_dob== null)?'0000:00:00':data.info_dob;  	 		
		const kinDob=(typeof data.kin_dob=="undefined" || data.kin_dob== null)?'0000:00:00':data.kin_dob;  	
		const startDate=(typeof data.start_date=="undefined" || data.start_date== null)?'0000:00:00':data.start_date;      
		const joinDate=(typeof data.join_date=="undefined" || data.join_date== null)?'0000:00:00':data.join_date;  
		const cardExpiry=(typeof data.card_expiry=="undefined" || data.card_expiry== null)?'0000:00:00':data.card_expiry;    
		
		const captureDate=(typeof data.capture_date=="undefined" || data.capture_date== null || data.capture_date=='')?'0000:00:00 00:00:00':data.capture_date;  		     	
		const upDate=(typeof data.update_date=="undefined" || data.update_date== null || data.update_date=='')?'0000:00:00 00:00:00':data.update_date;   		
	
		const captre_date = new Date(captureDate);    				
		const captreDate =(data.capture_date== null)?'0000:00:00 00:00:00':captre_date.toJSON().slice(0, 19).replace('T',' ');   	
		
		const up_date = new Date(upDate);						
		const upDae = (data.update_date== null)?'0000:00:00 00:00:00':up_date.toJSON().slice(0, 19).replace('T',' ');  
		
		const mainReason=(typeof data.mainReason=="undefined")?'':data.mainReason;  
		const subReason=(typeof data.subReason=="undefined")?'':data.subReason;  
		const comment=(typeof data.comment=="undefined")?'':data.comment;  	   
  		
		const sqlQuery = `UPDATE membership SET title1='${infoTitle}',fname1='${firstName}',sname1='${surName}',passport1='${infoPassport}',
		address1='${infoAddress1}',address2='${infoAddress2}',city1='${infoCity}',province1='${infoProvince}',postcode1='${postCode}',
		country1='${infoCountry}',telephone1='${telHome}',telephone2='${telWork}',cellphone1='${cellPhone}',fax='${fax}',email1='${infoEmail}',
		membertype='${memberType}',rejoin='${rejoin}',broker_id='${broker}',agency='${agency}',professional='${professional}',
		work_diver='${workDiver}',qualification='${qualification}',medical_aid='${medicalAid}',medical_aid_no='${medicalAidNo}',
		package_name='${level}',title2='${kinTitle}',fname2='${kinFirstName}',sname2='${kinSurName}',passport2='${kinPassport}',address3='${kinAddress1}',
		address4='${kinAddress2}',city2='${kinCity}',province2='${kinProvince}',postcode2='${kinPostCode}',country2='${kinCountry}',
		telephone3='${kinTelHome}',telephone4='${kinTelWork}',cellphone2='${kinCellPhone}',email2='${kinEmail}',relation='${relation}',
		status1='${status}',status2='${instructorState}',dob1='${infoDob}',dob2='${kinDob}',startdate='${startDate}',capturedate='${captreDate}',
		updatedate='${upDae}',joindate='${joinDate}',fulltime='${fulltime_membership}',researcher='${researcher}',paid='${paid}', 
		pay_method='${pay_method}',pay_period='${pay_period}',account_holder='${account_holder}',institute='${institute}',branch='${branch}',
		branch_code='${branch_code}',account_type='${account_type}',account_no='${account_no}',authorise_sign='${authorise_sign}',debt='${debt}',
		card_expiry='${cardExpiry}' WHERE id=${id}`;   		     					
					 
		const result = await queryDatabase(sqlQuery,stream);     					   	 		  
		const insert_id = result.insertId;    						 		 
		
		if(id >0)	 
		{
			// Send a success response	  		
			const stream = await createSshTunnel(sshTunnelConfig, dbServer);   
			const sqlQuery = `INSERT INTO annual_comments (row_id,subreason_id,description) VALUES ('${id}','${subReason}','${comment}')`;               
		
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