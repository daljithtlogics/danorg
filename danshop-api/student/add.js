const express = require('express');

const bodyParser = require('body-parser');
const { sshTunnelConfig, dbServer } = require('../config');
const createSshTunnel = require('../sshTunnel');
const queryDatabase = require('../databasequery');
const cors = require('cors'); // Import the cors package  


const app = express();
const PORT = 4500;

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
app.post('/api/student/add', async (req, res) => {
  const data = req.body;

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
    const memberNO = `DANT ${randomNo}`; // Generate member_id with a random number

    // Insert data into the database
    const infoTitle=(typeof data.infoTitle=="undefined")?'':data.infoTitle;  	
    const firstName=(typeof data.firstName=="undefined")?'':data.firstName;    
    const surName=(typeof data.surName=="undefined")?'':data.surName;  	
    const infoDob=(typeof data.infoDob=="undefined")?'':data.infoDob;    	
    const infoPassport=(typeof data.infoPassport=="undefined")?'':data.infoPassport;  	
    const medicalAid=(typeof data.medicalAid=="undefined")?'':data.medicalAid;    
    const instructor=(typeof data.instructor=="undefined")?'':data.instructor;  	
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
    const captureDate=(typeof data.captureDate=="undefined" || data.captureDate== null)?'0000:00:00':data.captureDate; 
	
    const sqlQuery = `INSERT INTO student_members (title, first_name, surname, dob, passport, medical_aid,instructor, medical_aid_no, start_date, postal_add1, postal_add2, city, province, postal_code, country, tel_home, tel_work, cell_phone, fax, email, main_reason, sub_reason, comment, member_no) VALUES ('${infoTitle}','${firstName}','${surName}','${infoDob}','${infoPassport}','${medicalAid}','${instructor}','${medicalAidNo}','${startDate}','${infoAddress1}','${infoAddress2}','${infoCity}','${infoProvince}','${postCode}','${infoCountry}','${telHome}','${telWork}','${cellPhone}','${fax}','${infoEmail}','${mainReason}','${subReason}','${comment}','${memberNO}')`;  

    await queryDatabase(sqlQuery, stream);
    // Send a success response
    res.status(200).json({ message: 'Data added successfully' });
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
