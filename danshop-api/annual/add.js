const express = require('express');

const bodyParser = require('body-parser');
const { sshTunnelConfig, dbServer } = require('../config');			
const createSshTunnel = require('../sshTunnel');
const queryDatabase = require('../databasequery');
const cors = require('cors'); // Import the cors package  


const app = express();
const PORT = 4500;
// Middleware to handle CORS and preflight requests
// app.use((req, res, next) => {
//   res.append('Access-Control-Allow-Origin', '*');
//   res.append('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
//   res.append('Access-Control-Allow-Headers', 'Content-Type, authorization');
//   next();
// });
// console.log('abc');

function hashPassword(password) {
  // This is a simple hash function example (not recommended for production)
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = (hash << 5) - hash + char;		
  }
  return hash.toString(); // Convert the hash to a string before storing it
}


app.use(bodyParser.json());
app.use(cors()); // Use the cors middleware to handle CORS headers
app.post('/api/annual/add', async (req, res) => {			
  const data = req.body;		

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
    const memberNO = `DAN ${randomNo}`; // Generate member_id with a random number   
    // Insert data into the database  
	
	const fulltime_membership=(typeof data.memberFullTime=="undefined" || data.memberFullTime==false)?0:1; 
	const researcher=(typeof data.researcher=="undefined" || data.researcher==false)?0:1; 
	const paid=(typeof data.paid=="undefined" || data.paid==false)?0:1;  

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
	
    const sqlQuery = `INSERT INTO annual_members (title1,fname1,sname1,passport1,member_no,address1,address2,city1,province1,postcode1,country1,telephone1,telephone2,cellphone1,fax,email1,membertype,rejoin,broker,agency,professional,medicalaid,aidno,level,title2,fname2,sname2,passport2,address3,address4,city2,province2,postcode2,country2,telephone3,telephone4,cellphone2,email2,relation,status1,status2,dob1,dob2,startdate,joindate,fulltime,researcher,paid) 
	VALUES ('${infoTitle}','${firstName}','${surName}','${infoPassport}','${memberNO}','${infoAddress1}','${infoAddress2}','${infoCity}','${infoProvince}','${postCode}','${infoCountry}','${telHome}','${telWork}','${cellPhone}','${fax}','${infoEmail}','${memberType}','${rejoin}','${broker}','${agency}','${professional}','${medicalAid}','${medicalAidNo}','${level}','${kinTitle}','${kinFirstName}','${kinSurName}','${kinPassport}','${kinAddress1}','${kinAddress2}',
	'${kinCity}','${kinProvince}','${kinPostCode}','${kinCountry}','${kinTelHome}','${kinTelWork}','${kinCellPhone}','${kinEmail}','${relation}','${instructorState}','${status}','${infoDob}','${kinDob}','${startDate}','${joinDate}','${fulltime_membership}','${researcher}','${paid}')`;  
    
	await queryDatabase(sqlQuery,stream);   		      

	// req.body.firstName==="";  
    // Send a success response
     res.status(200).json({ message:'Data added successfully.' });       			  			
  } catch (error) {
    // Handle database or other errors  
	 		
    console.error('Error adding data to the database:', error);
    res.status(500).json({ error: error });
  }
});

// Handle invalid routes or methods
app.use((req, res) => {
  res.status(404).send('Not Found');			
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);		
});
