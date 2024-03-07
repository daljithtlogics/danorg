const express = require('express');
const bodyParser = require('body-parser');  
const nodemailer = require('nodemailer');
const { sshTunnelConfig, dbServer, emailConfig  } = require('./../config');
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
	res.send('Travel Notification');    		
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

  try {
    // Establish SSH tunnel
    const stream = await createSshTunnel(sshTunnelConfig, dbServer);
    
    // Insert data into the database  
    const fname1=(typeof data.fname1=="undefined")?'':data.fname1;    
    const sname1=(typeof data.sname1=="undefined")?'':data.sname1; 
    const email1=(typeof data.email1=="undefined")?'':data.email1;  	
    const cellphone1=(typeof data.cellphone1=="undefined")?'':data.cellphone1;  	
    const dan_member=(typeof data.dan_member=="undefined")?'':data.dan_member;  	
    const dan_no=(typeof data.dan_no=="undefined")?'':data.dan_no;  	
    const passport1=(typeof data.passport1=="undefined")?'':data.passport1;  	
    const dob1=(typeof data.dob1=="undefined" || data.dob1== null)?'0000:00:00':data.dob1;   		 	
    const fname2=(typeof data.fname2=="undefined")?'':data.fname2;  	
    const sname2=(typeof data.sname2=="undefined")?'':data.sname2;  	
    const cellphone2=(typeof data.cellphone2=="undefined")?'':data.cellphone2;  	
    const email2=(typeof data.email2=="undefined")?'':data.email2;  	
    const dive_trip=(typeof data.dive_trip=="undefined")?'':data.dive_trip;  	
    const professional=(typeof data.professional=="undefined")?'':data.professional;  	
    const destination=(typeof data.destination=="undefined")?'':data.destination;  	
    const dive_site=(typeof data.dive_site=="undefined")?'':data.dive_site;  	
    const dep_date=(typeof data.dep_date=="undefined" || data.dep_date== null)?'0000:00:00':data.dep_date;   		 	
    const return_date=(typeof data.return_date=="undefined" || data.return_date== null)?'0000:00:00':data.return_date;   		 	
    const dive_done=(typeof data.dive_done=="undefined")?'':data.dive_done;  	
    const depth=(typeof data.depth=="undefined")?'':data.depth;  	
    const medical=(typeof data.medical=="undefined")?'':data.medical;  	
    const medical_name=(typeof data.medical_name=="undefined")?'':data.medical_name;  	
    const medical_no=(typeof data.medical_no=="undefined")?'':data.medical_no;  	
    const travel=(typeof data.travel=="undefined")?'':data.travel;  	
    const travel_name=(typeof data.travel_name=="undefined")?'':data.travel_name;  	
    const travel_no=(typeof data.travel_no=="undefined")?'':data.travel_no;  	
    const diving_family=(typeof data.diving_family=="undefined")?'':data.diving_family;  	
    const family_fname1=(typeof data.family_fname1=="undefined")?'':data.family_fname1;  	
    const family_sname1=(typeof data.family_sname1=="undefined")?'':data.family_sname1;  	
    const family_age1=(typeof data.family_age1=="undefined")?'':data.family_age1;  
    const family_fname2=(typeof data.family_fname2=="undefined")?'':data.family_fname2;  	
    const family_sname2=(typeof data.family_sname2=="undefined")?'':data.family_sname2;  	
    const family_age2=(typeof data.family_age2=="undefined")?'':data.family_age2;  
    const family_fname3=(typeof data.family_fname3=="undefined")?'':data.family_fname3;  	
    const family_sname3=(typeof data.family_sname3=="undefined")?'':data.family_sname3;  	
    const family_age3=(typeof data.family_age3=="undefined")?'':data.family_age3;  
    const family_fname4=(typeof data.family_fname4=="undefined")?'':data.family_fname4;  	
    const family_sname4=(typeof data.family_sname4=="undefined")?'':data.family_sname4;  	
    const family_age4=(typeof data.family_age4=="undefined")?'':data.family_age4;  	
    const nondiving_family=(typeof data.nondiving_family=="undefined")?'':data.nondiving_family;  	
    const nonfamily_fname1=(typeof data.nonfamily_fname1=="undefined")?'':data.nonfamily_fname1;  	
    const nonfamily_sname1=(typeof data.nonfamily_sname1=="undefined")?'':data.nonfamily_sname1;  	
    const nonfamily_age1=(typeof data.nonfamily_age1=="undefined")?'':data.nonfamily_age1;  
    const nonfamily_fname2=(typeof data.nonfamily_fname2=="undefined")?'':data.nonfamily_fname2;  	
    const nonfamily_sname2=(typeof data.nonfamily_sname2=="undefined")?'':data.nonfamily_sname2;  	
    const nonfamily_age2=(typeof data.nonfamily_age2=="undefined")?'':data.nonfamily_age2;  
    const nonfamily_fname3=(typeof data.nonfamily_fname3=="undefined")?'':data.nonfamily_fname3;  	
    const nonfamily_sname3=(typeof data.nonfamily_sname3=="undefined")?'':data.nonfamily_sname3;  	
    const nonfamily_age3=(typeof data.nonfamily_age3=="undefined")?'':data.nonfamily_age3;  
    const nonfamily_fname4=(typeof data.nonfamily_fname4=="undefined")?'':data.nonfamily_fname4;  	
    const nonfamily_sname4=(typeof data.nonfamily_sname4=="undefined")?'':data.nonfamily_sname4;  	
    const nonfamily_age4=(typeof data.nonfamily_age4=="undefined")?'':data.nonfamily_age4;  
    const additional_info=(typeof data.additional_info=="undefined")?'':mysql_real_escape_string(data.additional_info);   	
    const prophylactic=(typeof data.prophylactic=="undefined")?'':data.prophylactic;  	
    const examination=(typeof data.examination=="undefined")?'':data.examination;  
    const willing_info=(typeof data.willing_info=="undefined")?'':data.willing_info;  	
    const pregnant=(typeof data.pregnant=="undefined")?'':data.pregnant;  
    const pregnant_month=(typeof data.pregnant_month=="undefined" || data.pregnant_month== null)?'':data.pregnant_month;  		
    const ear=(typeof data.ear=="undefined")?'':data.ear; 
    const ear_issue=(typeof data.ear_issue=="undefined")?'':data.ear_issue; 
    const cardiac=(typeof data.cardiac=="undefined")?'':data.cardiac; 
    const cardiac_issue=(typeof data.cardiac_issue=="undefined")?'':data.cardiac_issue; 
    const diabetic=(typeof data.diabetic=="undefined")?'':data.diabetic; 
    const high_bp=(typeof data.high_bp=="undefined")?'':data.high_bp; 
    const lung=(typeof data.lung=="undefined")?'':data.lung; 
    const lung_issue=(typeof data.lung_issue=="undefined")?'':data.lung_issue; 
    const gastro=(typeof data.gastro=="undefined")?'':data.gastro; 
    const epilepsy=(typeof data.epilepsy=="undefined")?'':data.epilepsy; 
    const epilepsy_issue=(typeof data.epilepsy_issue=="undefined")?'':data.epilepsy_issue; 
    const psychological=(typeof data.psychological=="undefined")?'':data.psychological; 
    const psychological_issue=(typeof data.psychological_issue=="undefined")?'':data.psychological_issue; 
    const anaemic=(typeof data.anaemic=="undefined")?'':data.anaemic; 
    const medication=(typeof data.medication=="undefined")?'':data.medication; 
    const medication_reason=(typeof data.medication_reason=="undefined")?'':mysql_real_escape_string(data.medication_reason);   	
    const operation=(typeof data.operation=="undefined")?'':data.operation; 
    const operation_reason=(typeof data.operation_reason=="undefined")?'':mysql_real_escape_string(data.operation_reason);   	


    // Check if the email already exists in the database
    const emailStream = await createSshTunnel(sshTunnelConfig, dbServer);
    const emailCheckQuery = `SELECT email1 FROM travel_notification WHERE email1 = '${email1}'`;
    const existingUser = await queryDatabase(emailCheckQuery, emailStream);

    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    else{
      const sqlQuery = `INSERT INTO travel_notification (fname1, sname1, email1, cellphone1, dan_member, dan_no, passport1, dob1, fname2, sname2, cellphone2, email2, dive_trip, professional, destination, dive_site, dep_date, return_date, dive_done, depth, medical, medical_name, medical_no, travel, travel_name, travel_no, diving_family, family_fname1, family_sname1, family_age1, family_fname2, family_sname2, family_age2, family_fname3, family_sname3, family_age3, family_fname4, family_sname4, family_age4, nondiving_family, nonfamily_fname1, nonfamily_sname1, nonfamily_age1, nonfamily_fname2, nonfamily_sname2, nonfamily_age2, nonfamily_fname3, nonfamily_sname3, nonfamily_age3, nonfamily_fname4, nonfamily_sname4, nonfamily_age4, additional_info, prophylactic, examination, willing_info, pregnant, pregnant_month, ear, ear_issue, cardiac, cardiac_issue, diabetic, high_bp, lung, lung_issue, gastro, epilepsy, epilepsy_issue, psychological, psychological_issue, anaemic, medication, medication_reason, operation, operation_reason) VALUES ('${fname1}', '${sname1}', '${email1}', '${cellphone1}', '${dan_member}', '${dan_no}', '${passport1}', '${dob1}', '${fname2}', '${sname2}', '${cellphone2}', '${email2}', '${dive_trip}', '${professional}', '${destination}', '${dive_site}', '${dep_date}', '${return_date}', '${dive_done}', '${depth}', '${medical}', '${medical_name}', '${medical_no}', '${travel}', '${travel_name}', '${travel_no}', '${diving_family}', '${family_fname1}', '${family_sname1}', '${family_age1}', '${family_fname2}', '${family_sname2}', '${family_age2}', '${family_fname3}', '${family_sname3}', '${family_age3}', '${family_fname4}', '${family_sname4}', '${family_age4}', '${nondiving_family}', '${nonfamily_fname1}', '${nonfamily_sname1}', '${nonfamily_age1}', '${nonfamily_fname2}', '${nonfamily_sname2}', '${nonfamily_age2}', '${nonfamily_fname3}', '${nonfamily_sname3}', '${nonfamily_age3}', '${nonfamily_fname4}', '${nonfamily_sname4}', '${nonfamily_age4}', '${additional_info}', '${prophylactic}', '${examination}', '${willing_info}', '${pregnant}', '${pregnant_month}', '${ear}', '${ear_issue}', '${cardiac}', '${cardiac_issue}', '${diabetic}', '${high_bp}', '${lung}', '${lung_issue}', '${gastro}', '${epilepsy}', '${epilepsy_issue}', '${psychological}', '${psychological_issue}', '${anaemic}', '${medication}', '${medication_reason}', '${operation}', '${operation_reason}')`;   

      await queryDatabase(sqlQuery, stream);

      // Send a success response
      res.status(200).json({ message: 'Dive Travel Notification form submitted successfully.' });
    }
	 
  } catch (error) {
    // Handle database or other errors 	  		
    console.error('Error adding data to the database:', error);
    res.status(500).json({ error: error, error:error.message });
  } 
});


// Handle other routes
app.use((req, res) => {
  res.status(404).send('Not Found');   		
}); 

// Export the app 
module.exports = app;	   