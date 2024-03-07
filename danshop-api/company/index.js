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
	res.send('Hello from App18!');    					    
});  

app.get('/edit/:id', async (req, res) => { 
  const id = req.params.id;		 
  try {
    const stream = await createSshTunnel(sshTunnelConfig, dbServer);		
    const sqlQuery = "SELECT * FROM membership WHERE UPPER(choose_membership)='COMMERCIAL' AND UPPER(membertype)='COMPANY'"+` AND id=${id} `;	 			  		 		     	    
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
    const sqlQuery = `SELECT c.description,c.created_at,r.title,s.title AS reason_title FROM company_comments as c left join sub_reasons as s on s.id=c.subreason_id left join main_reasons as r on r.id=s.main_id WHERE c.row_id=${id}`;	     	    
    const results = await queryDatabase(sqlQuery,stream);													  							  		
    res.status(200).json(results);   						
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from database: ' + error.message });		  		    						   	
  }
}) 		

app.get('/staffs/:id', async (req, res) => { 
  const id = req.params.id;		 				
  try {
    const stream = await createSshTunnel(sshTunnelConfig, dbServer);	  	
    const sqlQuery = `SELECT id,contact_person,member_no,status1 FROM membership WHERE UPPER(membertype)='COMPANY' AND parent_id=${id}`;	     	    
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
  } else if (!data.registration_no || data.registration_no === "") {
    return res.status(500).json({ error: 'Company registration number is Missing','error_field':'registration_no' });	
  } else if (!data.address_1 || data.address_1 === "") {
    return res.status(500).json({ error: 'Postal address 1 is Missing','error_field':'address_1' });		
  } else if (!data.city || data.city === "") {
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
  else if (!data.company_email || data.company_email === "") {
    return res.status(500).json({ error: 'Email is Missing','error_field':'company_email' });		
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
    const memberNO = `DANM ${next_id}`; // Generate member_id   
    // Insert data into the database     	

	const personName=(typeof data.person_name=="undefined")?'':data.person_name;  	
	const companyName=(typeof data.company_name=="undefined")?'':data.company_name;     
	const regisNo=(typeof data.registration_no=="undefined")?'':data.registration_no;  		
	const address1=(typeof data.address_1=="undefined")?'':data.address_1;    	
    const address2=(typeof data.address_2=="undefined")?'':data.address_2;  	
	const city=(typeof data.city=="undefined")?'':data.city;    
	const province=(typeof data.province=="undefined")?'':data.province;  	
	const pincode=(typeof data.pincode=="undefined")?'':data.pincode;   	
	const country=(typeof data.country=="undefined")?'':data.country;   	
	const telHome=(typeof data.phonehome=="undefined")?'':data.phonehome;  	
	const telWork=(typeof data.phonework=="undefined")?'':data.phonework;    	
	const cellphone=(typeof data.cellphone=="undefined")?'':data.cellphone;     				 	
	const fax=(typeof data.fax=="undefined")?'':data.fax;    
		
	const companyEmail=(typeof data.company_email=="undefined")?'':data.company_email;        
	const type=(typeof data.member_type=="undefined")?'':data.member_type;    	
    const rejoin=(typeof data.rejoin=="undefined")?'':data.rejoin;  	
	const professional=(typeof data.professional=="undefined")?'':data.professional;    
	const slotNo=(typeof data.slot_no=="undefined")?0:data.slot_no;  		 	
	const medicalAid=(typeof data.medical_aid=="undefined")?'':data.medical_aid;  	
	const medicalAidNo=(typeof data.medical_no=="undefined")?'':data.medical_no;      
	const status=(typeof data.status=="undefined")?'':data.status;     
	 	 
	const payMethod=(typeof data.pay_method=="undefined")?'':data.pay_method;    	
    const payPeriod=(typeof data.pay_period=="undefined")?0:data.pay_period;  			   		
	const accountHold=(typeof data.account_holder=="undefined")?'':data.account_holder;    	
	const institution=(typeof data.institute=="undefined")?'':data.institute;  	
	const branchName=(typeof data.branch=="undefined")?'':data.branch;   		
	const branchCode=(typeof data.branch_code=="undefined")?'':data.branch_code;  	
	
	const accountType=(typeof data.account_type=="undefined")?'':data.account_type;    	
	const accountNo=(typeof data.account_no=="undefined")?'':data.account_no;  				
	
	const mainReason=(typeof data.main_reason=="undefined")?'':data.main_reason;  	
	const subReason=(typeof data.sub_reason=="undefined")?'':data.sub_reason;   	
	const comment=(typeof data.comment=="undefined")?'':data.comment;  	 

	const sign=(typeof data.auth_sign=="undefined" || data.auth_sign==false)?0:1;   		
	const debt=(typeof data.debt=="undefined" || data.debt==false)?0:1; 
	const paid=(typeof data.paid=="undefined" || data.paid==false)?0:1;    	
	
	const startDate=(typeof data.start_date=="undefined" || data.start_date== null || data.start_date=='')?'0000:00:00':data.start_date; 
	const captureDate=(typeof data.capture_date=="undefined" || data.capture_date== null || data.capture_date=='')?'0000:00:00 00:00:00':data.capture_date;  		     
	const joinDate=(typeof data.join_date=="undefined" || data.join_date== null || data.join_date=='')?'0000:00:00':data.join_date;  
	const upDate=(typeof data.update_date=="undefined" || data.update_date== null || data.update_date=='')?'0000:00:00 00:00:00':data.update_date;   
	const expireDate=(typeof data.expire_date=="undefined" || data.expire_date== null || data.expire_date=='')?'0000:00:00':data.expire_date;  		  
	
	const captre_date = new Date(captureDate);    		
	const captreDate =(data.capture_date== null)?'0000:00:00 00:00:00':captre_date.toJSON().slice(0, 19).replace('T',' ');   	
	
	const up_date = new Date(upDate);	
	const upDae = (data.update_date== null)?'0000:00:00 00:00:00':up_date.toJSON().slice(0, 19).replace('T',' ');   
	
    const sqlQuery = `INSERT INTO membership (contact_person,company_name,address1,address2,member_no,city1,province1,postcode1,country1,
	registration_no,telephone1,telephone2,cellphone1,fax,email1,status1,medical_aid,medical_aid_no,membertype,institute,account_no,account_holder,branch,
	branch_code,pay_method,account_type,rejoin,professional,startdate,capturedate,joindate,updatedate,card_expiry,membership_slot,paid,debt,
	pay_period,authorise_sign,choose_membership) VALUES ('${personName}','${companyName}','${address1}','${address2}','${memberNO}','${city}','${province}','${pincode}',
	'${country}','${regisNo}','${telHome}','${telWork}','${cellphone}','${fax}','${companyEmail}','${status}','${medicalAid}','${medicalAidNo}',
	'${type}','${institution}','${accountNo}','${accountHold}','${branchName}','${branchCode}','${payMethod}','${accountType}','${rejoin}',
	'${professional}','${startDate}','${captreDate}','${joinDate}','${upDae}','${expireDate}','${slotNo}','${paid}','${debt}','${payPeriod}','${sign}','commercial')`;  
    	
	const result = await queryDatabase(sqlQuery,stream);    		   		  
	const insert_id = result.insertId;      
	
	if(insert_id >0)	
	{
		// Send a success response	 
		// await queryDatabase(sqlQuery,stream);   
		const stream = await createSshTunnel(sshTunnelConfig, dbServer);   
		const sqlQuery = `INSERT INTO company_comments (row_id,subreason_id,description) VALUES ('${insert_id}','${subReason}','${comment}')`;               
	
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
  const sqlQuery = "SELECT * FROM membership WHERE UPPER(choose_membership)='COMMERCIAL' AND UPPER(membertype)='COMPANY'"+` AND id=${id} `;	    	    
  const result = await queryDatabase(sqlQuery, stream);	
  const memberId = (result.length>0)?result[0].member_no:'';   
  
  if (!data.person_name || data.person_name === "") {
    return res.status(500).json({ error: 'Contact person is Missing','error_field':'person_name' });		
  } else if (!data.company_name || data.company_name === "") {
    return res.status(500).json({ error: 'Company name is Missing','error_field':'company_name' });		
  } else if (!data.registration_no || data.registration_no === "") {
    return res.status(500).json({ error: 'Company registration number is Missing','error_field':'registration_no' });	
  } 
  else if (!data.member_no || data.member_no === "") {
    return res.status(500).json({ error: 'DAN Membership Number is Missing','error_field':'member_no' });	     	  		
  }    
  else if (!data.address_1 || data.address_1 === "") {
    return res.status(500).json({ error: 'Postal address 1 is Missing','error_field':'address_1' });		
  } else if (!data.city || data.city === "") {
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
  else if (!data.company_email || data.company_email === "") {
    return res.status(500).json({ error: 'Email is Missing','error_field':'company_email' });		
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
		
		const personName=(typeof data.person_name=="undefined")?'':data.person_name;  	
		const companyName=(typeof data.company_name=="undefined")?'':data.company_name;     
		const regisNo=(typeof data.registration_no=="undefined")?'':data.registration_no;  		
		const address1=(typeof data.address_1=="undefined")?'':data.address_1;    	
		const address2=(typeof data.address_2=="undefined")?'':data.address_2;  	
		const city=(typeof data.city=="undefined")?'':data.city;    
		const province=(typeof data.province=="undefined")?'':data.province;  	
		const pincode=(typeof data.pincode=="undefined")?'':data.pincode;   	
		const country=(typeof data.country=="undefined")?'':data.country;   	
		const telHome=(typeof data.phonehome=="undefined")?'':data.phonehome;  	
		const telWork=(typeof data.phonework=="undefined")?'':data.phonework;    	
		const cellphone=(typeof data.cellphone=="undefined")?'':data.cellphone;     				 	
		const fax=(typeof data.fax=="undefined")?'':data.fax;    
		const memberNo=(typeof data.member_no=="undefined")?'':data.member_no;   
		
		if(memberNo !=memberId)   
		{
			const steam = await createSshTunnel(sshTunnelConfig,dbServer);	     
			const sqlQuer ="SELECT * FROM membership WHERE UPPER(choose_membership)='COMMERCIAL' AND UPPER(membertype)='COMPANY'"+` AND member_no='${memberNo}'`;	 
			const record = await queryDatabase(sqlQuer,steam);					
			
			if(record.length >0)	 		 
			{
				return res.status(500).json({ error: 'DAN Membership Number is not unique','error_field':'member_no' });  
			}   
		}
			
		const companyEmail=(typeof data.company_email=="undefined")?'':data.company_email;        
		const type=(typeof data.member_type=="undefined")?'':data.member_type;    	
		const rejoin=(typeof data.rejoin=="undefined")?'':data.rejoin;  	
		const professional=(typeof data.professional=="undefined")?'':data.professional;    
		const slotNo=(typeof data.slot_no=="undefined")?0:data.slot_no;  		 	
		const medicalAid=(typeof data.medical_aid=="undefined")?'':data.medical_aid;  	
		const medicalAidNo=(typeof data.medical_no=="undefined")?'':data.medical_no;      
		const status=(typeof data.status=="undefined")?'':data.status;     
			 
		const payMethod=(typeof data.pay_method=="undefined")?'':data.pay_method;    	
		const payPeriod=(typeof data.pay_period=="undefined")?0:data.pay_period;  			   		
		const accountHold=(typeof data.account_holder=="undefined")?'':data.account_holder;    	
		const institution=(typeof data.institute=="undefined")?'':data.institute;  	
		const branchName=(typeof data.branch=="undefined")?'':data.branch;   		
		const branchCode=(typeof data.branch_code=="undefined")?'':data.branch_code;  	
		
		const accountType=(typeof data.account_type=="undefined")?'':data.account_type;    	
		const accountNo=(typeof data.account_no=="undefined")?'':data.account_no;  				
		
		const mainReason=(typeof data.main_reason=="undefined")?'':data.main_reason;  	
		const subReason=(typeof data.sub_reason=="undefined")?'':data.sub_reason;   	
		const comment=(typeof data.comment=="undefined")?'':data.comment;  	 

		const sign=(typeof data.auth_sign=="undefined" || data.auth_sign==false)?0:1;   
		const debt=(typeof data.debt=="undefined" || data.debt==false)?0:1; 
		const paid=(typeof data.paid=="undefined" || data.paid==false)?0:1;    	
		
		const startDate=(typeof data.start_date=="undefined" || data.start_date== null || data.start_date=='')?'0000:00:00':data.start_date; 
		const captureDate=(typeof data.capture_date=="undefined" || data.capture_date== null || data.capture_date=='')?'0000:00:00':data.capture_date;  		     
		const joinDate=(typeof data.join_date=="undefined" || data.join_date== null || data.join_date=='')?'0000:00:00':data.join_date;  
		const upDate=(typeof data.update_date=="undefined" || data.update_date== null || data.update_date=='')?'0000:00:00':data.update_date;   
		const expireDate=(typeof data.expire_date=="undefined" || data.expire_date== null || data.expire_date=='')?'0000:00:00':data.expire_date;  		  
		
		const captre_date = new Date(captureDate);    					
		const captreDate =(data.capture_date== null)?'0000:00:00 00:00:00':captre_date.toJSON().slice(0, 19).replace('T',' ');   	
		
		const up_date = new Date(upDate);				
		const upDae = (data.update_date== null)?'0000:00:00 00:00:00':up_date.toJSON().slice(0, 19).replace('T',' ');  	
				
		const sqlQuery = `UPDATE membership SET contact_person='${personName}',company_name='${companyName}',address1='${address1}',
		address2='${address2}',city1='${city}',province1='${province}',postcode1='${pincode}',country1='${country}',registration_no='${regisNo}',
		telephone1='${telHome}',telephone2='${telWork}',cellphone1='${cellphone}',fax='${fax}',email1='${companyEmail}',status1='${status}',
		medical_aid='${medicalAid}',medical_aid_no='${medicalAidNo}',membertype='${type}',institute='${institution}',account_no='${accountNo}',
		account_holder='${accountHold}',branch='${branchName}',branch_code='${branchCode}',	pay_method='${payMethod}',account_type='${accountType}',
		rejoin='${rejoin}',professional='${professional}',startdate='${startDate}',capturedate='${captreDate}',joindate='${joinDate}',updatedate='${upDae}',
		card_expiry='${expireDate}',membership_slot='${slotNo}',paid='${paid}',debt='${debt}',pay_period='${payPeriod}',authorise_sign='${sign}',
		member_no='${memberNo}' WHERE id=${id}`;   		
		
		const result = await queryDatabase(sqlQuery,stream);  						
		
		if(id >0)	 
		{
			// Send a success response	  		
			const stream = await createSshTunnel(sshTunnelConfig, dbServer);   
			const sqlQuery = `INSERT INTO company_comments (row_id,subreason_id,description) VALUES ('${id}','${subReason}','${comment}')`;               
		
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