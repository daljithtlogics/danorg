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

// Define routes for App1 
app.get('/', (req, res) => { 
	res.send('Annual member frontend');    		
}); 


app.get('/get', async (req, res) => {
  try {
    const stream = await createSshTunnel(sshTunnelConfig, dbServer);		
    const sqlQuery = 'SELECT * FROM annual_members';	   	
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
    const sqlQuery = `SELECT * FROM annual_members WHERE id=${id}`;	     	    
    const results = await queryDatabase(sqlQuery, stream);		  		
    res.status(200).json(results);   
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from database: ' + error.message });		    	
  }
})       

app.use(bodyParser.json());  
app.use(cors()); 


app.post('/add', async (req, res) => {			
  const data = req.body;		   

  try {
    // Establish SSH tunnel
    const stream = await createSshTunnel(sshTunnelConfig, dbServer);
    const randomNo = Math.floor(Math.random() * 1000); // Generate a random number
    const memberNO = `DAN ${randomNo}`; // Generate member_id with a random number   
    
    // Insert data into the database  
    const title=(typeof data.title=="undefined")?'':data.title;  	
    const first_name=(typeof data.first_name=="undefined")?'':data.first_name;    
    const last_name=(typeof data.last_name=="undefined")?'':data.last_name;  	
    const dob=(typeof data.dob=="undefined")?'':data.dob;  		
    const address1=(typeof data.address1=="undefined")?'':data.address1;  	
    const city=(typeof data.city=="undefined")?'':data.city;  	
    const state=(typeof data.state=="undefined")?'':data.state;   	
    const postal_code=(typeof data.postal_code=="undefined")?'':data.postal_code;  	
    const country=(typeof data.country=="undefined")?'':data.country;    
    const cell_phone=(typeof data.cell_phone=="undefined")?'':data.cell_phone;  	
    const email_address=(typeof data.email_address=="undefined")?'':data.email_address;  	
    const agency=(typeof data.agency=="undefined")?'':data.agency;  
    const qualification=(typeof data.qualification=="undefined")?'':data.qualification;  
    const aid=(typeof data.aid=="undefined")?'':data.aid;  	 	
    const aid_no=(typeof data.aid_no=="undefined")?'':data.aid_no;  	 	
    const aid_dep=(typeof data.aid_dep=="undefined")?'':data.aid_dep;  
    const kin_title=(typeof data.kin_title=="undefined")?'':data.kin_title;  	
    const kin_first_name=(typeof data.kin_first_name=="undefined")?'':data.kin_first_name;    
    const kin_last_name=(typeof data.kin_last_name=="undefined")?'':data.kin_last_name;  	
    const kin_dob=(typeof data.kin_dob=="undefined")?'':data.kin_dob;  		
    const kin_address1=(typeof data.kin_address1=="undefined")?'':data.kin_address1;  	
    const kin_city=(typeof data.kin_city=="undefined")?'':data.kin_city;  	
    const kin_state=(typeof data.kin_state=="undefined")?'':data.kin_state;   	
    const kin_postal_code=(typeof data.kin_postal_code=="undefined")?'':data.kin_postal_code;  	
    const kin_country=(typeof data.kin_country=="undefined")?'':data.kin_country;    
    const kin_cell_phone=(typeof data.kin_cell_phone=="undefined")?'':data.kin_cell_phone;  	
    const kin_email_address=(typeof data.kin_email_address=="undefined")?'':data.kin_email_address;  
    const kin_relation=(typeof data.kin_relation=="undefined")?'':data.kin_relation;  	 	
    const start_date=(typeof data.start_date=="undefined" || data.start_date== null)?'0000:00:00':data.start_date;      
    const join_date=(typeof data.join_date=="undefined" || data.join_date== null)?'0000:00:00':data.join_date;  
    const package=(typeof data.package=="undefined")?'':data.package;  	 	

	
    const sqlQuery = `INSERT INTO annual_members (title1,fname1,sname1,dob1,member_no,address1,city1,province1,postcode1,country1,cellphone1,email1,agency,qualification,medicalaid,aidno,aid_dependent,title2,fname2,sname2,dob2,address3,city2,province2,postcode2,country2,cellphone2,email2,relation,startdate,joindate,level,passport1,address2,fax,telephone1,telephone2,membertype,rejoin,broker,professional,working_diver,passport2,address4,telephone3,telephone4,status1,status2,fulltime,researcher, paid) VALUES ('${title}','${first_name}','${last_name}','${dob}','${memberNO}','${address1}','${city}','${state}','${postal_code}','${country}','${cell_phone}','${email_address}','${agency}','${qualification}','${aid}','${aid_no}','${aid_dep}','${kin_title}','${kin_first_name}','${kin_last_name}','${kin_dob}','${kin_address1}','${kin_city}','${kin_state}','${kin_postal_code}','${kin_country}','${kin_cell_phone}','${kin_email_address}','${kin_relation}','${start_date}','${join_date}','${package}','','','','','','','','','','','','','','','','',0,0,0)`;  
    
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
  
  const tab_id = data.tab_id; 

  const stream = await createSshTunnel(sshTunnelConfig, dbServer);	   
  const sqlQuery = `SELECT * FROM annual_members WHERE id=${id}`;	     	    
  const result = await queryDatabase(sqlQuery, stream);			
  
  if(tab_id=='personal_info')
  {
	  if (!data.info_title || data.info_title === "") {   
		return res.status(500).json({ error: 'Title is Missing','error_field':'info_title' });	
	  } 
	  else if (!data.first_name || data.first_name === "") {   
		return res.status(500).json({ error: 'First Name is Missing','error_field':'first_name' });		
	  } 
	  else if (!data.sur_name || data.sur_name === "") {  
		return res.status(500).json({ error: 'Surname is Missing','error_field':'sur_name' });        
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
	  else if (!data.info_email || data.info_email === "") {  
		return res.status(500).json({ error: 'Email is Missing','error_field':'info_email' });        
	  }     
	  
  }
  
  
  if(result.length==1)  
  {
	  try {  

		// Establish SSH tunnel
        const stream = await createSshTunnel(sshTunnelConfig, dbServer); 		

		if(tab_id=='personal_info')
		{	
			const infoTitle=(typeof data.info_title=="undefined" || data.info_title== null)?'':data.info_title;  	
			const firstName=(typeof data.first_name=="undefined" || data.first_name== null)?'':data.first_name;      
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
			const infoEmail=(typeof data.info_email=="undefined" || data.info_email== null)?'':data.info_email;  	
			
			const medicalAid=(typeof data.medical_aid=="undefined" || data.medical_aid== null)?'':data.medical_aid;    
			const medicalAidNo=(typeof data.medical_no=="undefined" || data.medical_no== null)?'':data.medical_no; 			
			const fax=(typeof data.fax=="undefined" || data.fax== null)?'':data.fax;     
			
			const infoDob=(typeof data.info_dob=="undefined" || data.info_dob== null)?'0000:00:00':data.info_dob;  
			const medicalAidDep=(typeof data.medical_aid_dep=="undefined" || data.medical_aid_dep== null)?0:data.medical_aid_dep;   	
			
			const sqlQuery = `UPDATE annual_members SET title1='${infoTitle}',fname1='${firstName}',sname1='${surName}',passport1='${infoPassport}',address1='${infoAddress1}',address2='${infoAddress2}',city1='${infoCity}',province1='${infoProvince}',postcode1='${postCode}',
			country1='${infoCountry}',telephone1='${telHome}',telephone2='${telWork}',cellphone1='${cellPhone}',email1='${infoEmail}',fax='${fax}',medical_aid='${medicalAid}',medical_aid_no='${medicalAidNo}',aid_dependent='${medicalAidDep}',dob1='${infoDob}' WHERE id=${id}`;   		
			
			await queryDatabase(sqlQuery,stream);    
			
		}

		if(tab_id=='membership_info')		
		{						     
			const memberType=(typeof data.member_type=="undefined" || data.member_type== null)?'':data.member_type;  
			const level=(typeof data.member_level=="undefined" || data.member_level== null)?'':data.member_level;  	
			const broker=(typeof data.broker=="undefined" || data.broker== null)?'':data.broker;      
			const agency=(typeof data.agency=="undefined" || data.agency== null)?'':data.agency;  	  
			const workDiver=(typeof data.work_diver=="undefined" || data.work_diver== null)?'':data.work_diver;    			
			const qualification=(typeof data.qualification=="undefined" || data.qualification== null)?'':data.qualification;   
			
			const startDate=(typeof data.start_date=="undefined" || data.start_date== null)?'0000:00:00':data.start_date;      
			const joinDate=(typeof data.join_date=="undefined" || data.join_date== null)?'0000:00:00':data.join_date;  
			
			const sqlQuery = `UPDATE annual_members SET membertype='${memberType}',broker='${broker}',agency='${agency}',working_diver='${workDiver}',qualification='${qualification}',level='${level}',
			startdate='${startDate}',joindate='${joinDate}' WHERE id=${id}`;   		
		
			await queryDatabase(sqlQuery,stream);    		
			
		}  			
		  
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