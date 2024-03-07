const express = require('express');
const bodyParser = require('body-parser');  
const nodemailer = require('nodemailer');
const { sshTunnelConfig, dbServer, emailConfig } = require('./../config');
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
	res.send('Hello from App10!');    		  			
});  

// Nodemailer setup
const transporter = nodemailer.createTransport({
	service: emailConfig.service,
	auth: {
	  user: emailConfig.user, 
	  pass: emailConfig.pass,
	}
});

// Send email & password 
function sendPasswordEmail(email_address, new_pwd) {
	const mailOptions = {
	  from: emailConfig.user,
	  to: email_address,
	  subject: 'Credentials for membership Login',
	  html: `<!DOCTYPE html>
	  <html>
	  <head>
		<meta name='viewport' content='width=device-width' />
		<title>Danshop</title>
		<link href='https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&display=swap'  rel='stylesheet'>
		<style>  body { padding-top: 0 !important; padding-bottom: 0 !important; padding-top: 0 !important; padding-bottom: 0 !important; margin: 0 !important; width: 100% !important; -webkit-text-size-adjust: 100% !important; -ms-text-size-adjust: 100% !important; -webkit-font-smoothing: antialiased !important; font-size: 14px; line-height: 22px; font-family: 'Lato', sans-serif; font-weight: 400; }
		</style>
	  </head>
	  
	  <body paddingwidth='0' paddingheight='0' style='' offset='0' toppadding='0' leftpadding='0'>
		<div style='display:table; width:600px !important; margin: 0 auto; background: #fff; padding:20px;'>
		  <table width='600' border='0' cellspacing='0' cellpadding='0' class='tableContent bgBody' align='center' style='width: 600px; display: block; background: #f3f3f3'>
			<tbody>
			  <tr>
				<table class='MainContainer' width='600' cellspacing='0' cellpadding='0' border='0' bgcolor='#fbfbfb'
				  align='center'
				  style='width: 600px; display: block; padding: 20px;background-image: url(http://157.245.36.128:5200/assets/images/border.jpg);background-repeat: no-repeat;background-position: right top;background-attachment: scroll;background-size: 20px auto;'>
				  <tbody style='width: 560px; display: block; background: #f3f3f3;'>
					<tr>
					  <td>
						<div style='margin:20px 0 15px 30px' class='contentLogo'><a href='http://157.245.36.128:5200' target="_blank"><img src='http://157.245.36.128:5200/assets/images/red-logo.png' width='200px' alt='' border='0'></a>
						</div>
					  </td>
					</tr>
					<tr>
					  <td>
						<div style='padding: 0; margin: 30px; background: #eaeaea;-webkit-border-radius: 10px;-moz-border-radius: 10px;border-radius: 10px;' class='contentEditTable'>
						  <div style='padding: 15px 0 5px;' class='box-step'>
							<div style='float: left; width: 100%;' class='box-left'>
							  <div style='padding: 15px 20px 0 30px; color:#606060; position:relative;'  class='box-padd'>
								<p><strong>Email Address:</strong> ${email_address}</p>
								<p><strong>Password:</strong> ${new_pwd}</p>
							  </div>
							</div>
							<div style='clear: both;'></div>
						  </div>
						</div>
					  </td>
					</tr>
	  
					<tr>
					  <td>
						<div style='padding: 0 30px 35px; color:#606060; text-align:center;' class='contentTitle h3-mrg'>
						  <p style='margin:0 0 15px !important; font-size: 16px;'>Missed out on something? Fret not and click the button to know more about the products and business</p>
						  <p style='margin:0 0 30px !important; font-size: 16px;'>
							<a href='#' style='display: inline-block;background: #dfb15d;color: #fff;padding: 11px 25px;-webkit-border-radius: 10px;-moz-border-radius: 10px;border-radius: 10px;text-decoration: none;font-size: 18px;'>Let’s Connect</a>
						  </p>
	  
						  <p style='margin:0 0 15px !important; font-size: 16px;'>
							<a target="_blank" style='display: inline-block;padding: 0 10px;' href="https://www.facebook.com/DANSA.org/"> <img src="http://157.245.36.128:5200/assets/images/facebook.png" width="40" height="40"></a>
							<a target="_blank" href="https://twitter.com/divesafety"></a>
							<a target="_blank" href="https://www.pinterest.com/dansa_org/"></a>
							<a target="_blank" style='display: inline-block;padding: 0 10px;' href="https://www.instagram.com/dansouthernafrica/"><img src="http://157.245.36.128:5200/assets/images/instagram.png" width="40" height="40"></a>
							<a target="_blank" style='display: inline-block;padding: 0 10px;' href="https://www.youtube.com/c/DANSouthernAfrica"><img src="http://157.245.36.128:5200/assets/images/youtube.png" width="40" height="40"></a>
							<a target="_blank" href="https://www.linkedin.com/company/divers-alert-network-southern-africa"></a>
						  </p>
						  <p style='margin:0 !important; font-size: 16px;'><a href='http://157.245.36.128:5200/'
							  style='color: #606060;text-decoration: none;letter-spacing:0.5px;'>www.DANSHOP.com</a></p>
						</div>
					  </td>
					</tr>
				  </tbody>
				</table>
			  </tr>
			</tbody>
		  </table>
		</div>
	  </body>
	  </html>`
	};
  
	transporter.sendMail(mailOptions, (error, info) => {
	  if (error) {
		console.error(error);
	  } else {
		console.log('Email sent: ' + info.response);
	  }
	});
}

app.get('/get', async (req, res) => {
  try {
    const stream = await createSshTunnel(sshTunnelConfig, dbServer);		
    const sqlQuery = 'SELECT s.*,c.title,c.status,a.fname1,a.sname1,a.member_no FROM annual_instructors as s left join courses as c ON c.id=s.course_id left join annual_members as a ON a.id=s.student_id group by s.id';	   	
    const results = await queryDatabase(sqlQuery, stream);				
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from database: ' + error.message });				    	
  }
});  

app.get('/edit/:id', async (req, res) => {    
  const id = req.params.id;		 
  try {
    const stream = await createSshTunnel(sshTunnelConfig,dbServer);	  	    		
	const sqlQuery = `SELECT * FROM membership WHERE id=${id} AND UPPER(membertype)='PARTNER_INSTRUCTOR'`;   
    const results = await queryDatabase(sqlQuery, stream);							  							  		
    res.status(200).json(results);       			
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from database: ' + error.message });			    	
  }
})   	

app.post('/add', async (req, res) => {			
  const data = req.body;			   

  if (!data.row_id || data.row_id === "") {   
    return res.status(500).json({ error: 'Record Id is Missing','error_field':'row_id' });  
  } else if (!data.instruct_course || data.instruct_course === "") {
    return res.status(500).json({ error: 'Course is Missing','error_field':'instruct_course' });  	  		
  } 
  else if (!data.student_id || data.student_id === "") {
    return res.status(500).json({ error: 'Student is Missing','error_field':'student_id' });  			
  } 
  else
  {
	  const id=(typeof data.row_id=="undefined")?'':data.row_id;  	
 	  const course_id=(typeof data.instruct_course=="undefined")?'':data.instruct_course;      
	  const student_id=(typeof data.student_id=="undefined")?'':data.student_id;       		 
	  const pack_number=(typeof data.pack_number=="undefined")?'':data.pack_number;      
	
	  const stream = await createSshTunnel(sshTunnelConfig, dbServer);	   
	  const sqlQuery = `SELECT * FROM annual_instructors WHERE course_id=${course_id} AND student_id=${student_id} AND pack_number=${pack_number} AND row_id=${id}`;	     	    
	  const result = await queryDatabase(sqlQuery, stream);	  
	  
	  if(result.length==1)  
	  {
		  return res.status(500).json({ error:'Record already added!','error_field':'record_id' });														     				
	  }
	  else 
	  {   	  
		  try {
		// Establish SSH tunnel
			const stream = await createSshTunnel(sshTunnelConfig, dbServer);    		
			
			const sqlQuery = `INSERT INTO annual_instructors (row_id,course_id,student_id,pack_number) 
			VALUES ('${id}','${course_id}','${student_id}','${pack_number}')`;             
			
			await queryDatabase(sqlQuery,stream);   	      

			// Send a success response
			 res.status(200).json({ message: 'Data added successfully' });   	 		    		    		 
			 
		  } catch (error) {
			// Handle database or other errors 	  		
			console.error('Error adding data to the database:', error);			
			res.status(500).json({ error: error });
		  }
	  }
  }  
  
});   


app.post('/create', async (req, res) => {			
  const data = req.body;			   

  if (!data.row_id || data.row_id === "") {   
    return res.status(500).json({ error: 'Record Id is Missing','error_field':'row_id' });  
  }
  else if (!data.fname || data.fname === "") {
    return res.status(500).json({ error: 'First Name is Missing','error_field':'fname' });  	  		
  } 
  else if (!data.passport || data.passport === "") {
    return res.status(500).json({ error: 'ID/Passport number is Missing','error_field':'passport' });  			
  } 
  else if (!data.dob || data.dob === "") {   
    return res.status(500).json({ error: 'Date of birth is Missing','error_field':'dob' });  
  }
  else if (!data.city || data.city === "") {
    return res.status(500).json({ error: 'City is Missing','error_field':'city' });  	  		
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
  else
  {
	  const id=(typeof data.row_id=="undefined")?'':data.row_id;  
	  const title=(typeof data.title=="undefined")?'':data.title;    	
      const firstName=(typeof data.fname=="undefined")?'':data.fname;  	
	  const surName=(typeof data.sname=="undefined")?'':data.sname;    
	  const passportNo=(typeof data.passport=="undefined")?'':data.passport;  	
	  const address1=(typeof data.address1=="undefined")?'':data.address1;  
	  const address2=(typeof data.address2=="undefined")?'':data.address2;   	
	  const agency=(typeof data.agency=="undefined")?'':data.agency;  
	  const city=(typeof data.city=="undefined")?'':data.city;  
	  const province=(typeof data.province=="undefined")?'':data.province;   	
	  const postalCode=(typeof data.postal=="undefined")?'':data.postal;  	  	
	  
	  const country=(typeof data.country=="undefined")?'':data.country;  
	  const workphone=(typeof data.phonework=="undefined")?'':data.phonework;   	
	  const cellphone=(typeof data.cellphone=="undefined")?'':data.cellphone;  

	  const homephone=(typeof data.phonehome=="undefined")?'':data.phonehome;  
	  const fax=(typeof data.fax=="undefined")?'':data.fax;  
	  const email=(typeof data.email=="undefined")?'':data.email;   	 	    	
	
	  const birthDate=(typeof data.dob=="undefined" || data.dob== null)?'0000:00:00':data.dob;  			
	  
	  try {
		// Establish SSH tunnel
			const stream = await createSshTunnel(sshTunnelConfig,dbServer);    		
			
			const sqlQuery = `INSERT INTO membership (parent_id,title1,fname1,sname1,email1,passport1,address1,address2,city1,province1,postcode1,telephone2,cellphone1,telephone1,fax,agency,country1,status1,dob1,membertype,choose_membership) 
			VALUES ('${id}','${title}','${firstName}','${surName}','${email}','${passportNo}','${address1}','${address2}','${city}','${province}','${postalCode}','${workphone}','${cellphone}','${homephone}','${fax}','${agency}','${country}','Non-Member','${birthDate}','partner_instructor','partner')`;   		          			
			
			const result = await queryDatabase(sqlQuery,stream);   		   		  
			const insert_id = result.insertId;   			

			if(insert_id >0)	 
			{ 				
				// Send a success response
				res.status(200).json({ message: 'Data added successfully' });    		  					  			 		  	
			} 
			else
			{
				res.status(500).json({ error: 'Record could not inserted!' });  	              
			}    		    		    		 
			 
		  } catch (error) {
			// Handle database or other errors 	  		
			console.error('Error adding data to the database:',error);						
			res.status(500).json({ error: error });
		  }		
	 				
  }  
  
});   

app.post('/update/:id', async (req, res) => { 
  const id = req.params.id; 		
  const data = req.body;  

  const stream = await createSshTunnel(sshTunnelConfig, dbServer);	   
  const sqlQuery = `SELECT * FROM membership WHERE id=${id} AND UPPER(membertype)='PARTNER_INSTRUCTOR'`;        			    
  const result = await queryDatabase(sqlQuery, stream);			
  
  if (!data.fname || data.fname === "") {  
    return res.status(500).json({ error: 'First Name is Missing','error_field':'fname' });    
  } 
  else if (!data.passport || data.passport === "") {  
    return res.status(500).json({ error: 'ID/Passport number is Missing','error_field':'passport' });        
  }   
  else if (!data.dob || data.dob === "") {  
    return res.status(500).json({ error: 'Date of birth is Missing','error_field':'dob' });        
  }   
  else if (!data.city || data.city === "") {  
    return res.status(500).json({ error: 'City is Missing','error_field':'city' });        
  } 
  else if (!data.postal || data.postal === "") {  
    return res.status(500).json({ error: 'Postal code is Missing','error_field':'postal' });        
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
  
  if(result.length==1)  
  {
	  try {  

		// Establish SSH tunnel
        const stream = await createSshTunnel(sshTunnelConfig,dbServer);   

		const title=(typeof data.title=="undefined" || data.title== null)?'':data.title;  	
		const firstName=(typeof data.fname=="undefined" || data.fname== null)?'':data.fname;     
		const surName=(typeof data.sname=="undefined" || data.sname== null)?'':data.sname;  	
		const passport=(typeof data.passport=="undefined" || data.passport== null)?'':data.passport;   			   
		const addressOne=(typeof data.address1=="undefined" || data.address1== null)?'':data.address1;  	 
		const addressTwo=(typeof data.address2=="undefined" || data.address2== null)?'':data.address2;  

		const city=(typeof data.city=="undefined" || data.city== null)?'':data.city;  	
		const province=(typeof data.province=="undefined" || data.province== null)?'':data.province;     
		const postal=(typeof data.postal=="undefined" || data.postal== null)?'':data.postal;  	
		const country=(typeof data.country=="undefined" || data.country== null)?'':data.country;   	  

		const phonework=(typeof data.phonework=="undefined" || data.phonework== null)?'':data.phonework;  	
		const cellphone=(typeof data.cellphone=="undefined" || data.cellphone== null)?'':data.cellphone;     
		const phonehome=(typeof data.phonehome=="undefined" || data.phonehome== null)?'':data.phonehome;  	
		const fax=(typeof data.fax=="undefined" || data.fax== null)?'':data.fax;  

		const email=(typeof data.email=="undefined" || data.email== null)?'':data.email;  	
		const agency=(typeof data.agency=="undefined" || data.agency== null)?'':data.agency;    				
		
		const dob=(typeof data.dob=="undefined" || data.dob== null)?'0000:00:00':data.dob;  					 
		
		/* const mainReason=(typeof data.mainReason=="undefined")?'':data.mainReason;  
		const subReason=(typeof data.subReason=="undefined")?'':data.subReason;  
		const comment=(typeof data.comment=="undefined")?'':data.comment; */  	  					  
	  		
		const sqlQuery = `UPDATE membership SET title1='${title}',fname1='${firstName}',sname1='${surName}',email1='${email}',passport1='${passport}',agency='${agency}',country1='${country}',dob1='${dob}',	
		address1='${addressOne}',address2='${addressTwo}',city1='${city}',province1='${province}',postcode1='${postal}',telephone2='${phonework}',cellphone1='${cellphone}',telephone1='${phonehome}',fax='${fax}' WHERE id=${id}`;   		
		  	
		await queryDatabase(sqlQuery,stream);     		
		
		if(id >0)	 
		{
			// Send a success response	  		 			 
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
  }
  else
  {
	  return res.status(500).json({ error:'Record not found!' });					
  }  
  
})  


// annual instructor fetch all
app.get('/fetch_instructor/:id', async (req, res) => { 
	const id = req.params.id;		 
	try {
	  const stream = await createSshTunnel(sshTunnelConfig, dbServer);		
	  const sqlQuery = `SELECT * FROM membership WHERE parent_id=${id} AND choose_membership ='annual_instructor'`;	     	    
	  const results = await queryDatabase(sqlQuery, stream);	  							  		
	  res.status(200).json(results);   
	} catch (error) {
	  res.status(500).json({ error: 'Error fetching data from database: ' + error.message });		    	
	}
});



function generateRandomPassword(length) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; 
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
}

// save instructor in table
app.post('/annual_inst_add', async (req, res) => {            
	const data = req.body;                                           
  
	try {
	  // Establish SSH tunnel
	  const stream = await createSshTunnel(sshTunnelConfig, dbServer);
	  const randomNo = Math.floor(Math.random() * 1000); // Generate a random number
	  
	  // Insert data into the database  
	  const parent_id=(typeof data.parent_id=="undefined")?'':data.parent_id;  	
	  const title=(typeof data.title=="undefined")?'':data.title;  	
	  const first_name=(typeof data.first_name=="undefined")?'':data.first_name;    
	  const last_name=(typeof data.last_name=="undefined")?'':data.last_name;  	
	  const dob=(typeof data.dob=="undefined" || data.dob== null)?'0000:00:00':data.dob;   
	  const passport_no=(typeof data.passport_no=="undefined")?'':data.passport_no;  		
	  const address1=(typeof data.address1=="undefined")?'':data.address1;  	
	  const address2=(typeof data.address2=="undefined")?'':data.address2;  	
	  const city=(typeof data.city=="undefined")?'':data.city;  	
	  const state=(typeof data.state=="undefined")?'':data.state;   	
	  const postal_code=(typeof data.postal_code=="undefined")?'':data.postal_code;  	
	  const country=(typeof data.country=="undefined")?'':data.country;    
	  const tel_home=(typeof data.tel_home=="undefined")?'':data.tel_home;  	
	  const tel_work=(typeof data.tel_work=="undefined")?'':data.tel_work;  	
	  const cell_phone=(typeof data.cell_phone=="undefined")?'':data.cell_phone;  	
	  const email_address=(typeof data.email_address=="undefined")?'':data.email_address;  	
	  const fax=(typeof data.fax=="undefined")?'':data.fax;  
	  const aid=(typeof data.aid=="undefined")?'':data.aid;  	 	
	  const aid_no=(typeof data.aid_no=="undefined")?'':data.aid_no;  	 	
	  const start_date=(typeof data.start_date=="undefined" || data.start_date== null)?'0000:00:00':data.start_date;   
	  const package_name=(typeof data.ins_type=="undefined")?'':data.ins_type;  	 		 	  
	  const new_pwd = generateRandomPassword(Math.floor(Math.random() * 2) + 6);

	  let memberPrefix = ''; // Initialize member prefix

	  if (package_name === 'Dive Instructor') {
		memberPrefix = 'DANDI';
		} else if (package_name === 'DAN Instructor') {
			memberPrefix = 'DANI';
		} else if (package_name === 'DAN Instructor Trainer') {
			memberPrefix = 'DANIT';
		}else if (package_name === 'DAN Examiner') {
		memberPrefix = 'DANEX';
		}
	  
	  const memberNO = `${memberPrefix} ${randomNo}`; // Generate random number and the determined prefix
  
	  // Check if the email already exists in the database
	  const emailStream = await createSshTunnel(sshTunnelConfig, dbServer);
	  const emailCheckQuery = `SELECT email1 FROM membership WHERE email1 = '${email_address}'`;
	  const existingUser = await queryDatabase(emailCheckQuery, emailStream);
  
	  if (existingUser.length > 0) {
		return res.status(500).json({ message: 'Email already exists' });
	  }
	  else{
		const sqlQuery = `INSERT INTO membership (title1, fname1, sname1, dob1, passport1, address1,address2,city1,province1,postcode1,country1,telephone1,telephone2,cellphone1,fax,email1,password, medical_aid,medical_aid_no,member_no, package_name,verifyEmail,verifyAmount,choose_membership,status1,startdate,joindate, parent_id)  VALUES ('${title}','${first_name}','${last_name}','${dob}','${passport_no}', '${address1}','${address2}','${city}','${state}','${postal_code}','${country}','${tel_home}','${tel_work}','${cell_phone}','${fax}','${email_address}','${new_pwd}', '${aid}','${aid_no}', '${memberNO}', '${package_name}','verified','not_paid', 'annual_instructor', 'ACTIVE', '${start_date}', '${start_date}', '${parent_id}')`;
		
		await queryDatabase(sqlQuery, stream);
  
		// Send a verification email
		sendPasswordEmail(email_address, new_pwd);
  
		// Send a success response
		res.status(200).json({ message: 'Instructor registered successfully.' });
	  }
	   
	} catch (error) {
	  // Handle database or other errors 	  		
	  console.error('Error adding data to the database:', error);
	  res.status(500).json({ error: error });
	} 
});

app.post('/annual_inst_update/:id', async (req, res) => { 
	const id = req.params.id;   
	const data = req.body;  
  
	const stream = await createSshTunnel(sshTunnelConfig, dbServer);	   
	const sqlQuery = `SELECT * FROM membership WHERE id=${id}`;	     	    
	const result = await queryDatabase(sqlQuery, stream);	   
		
	if(result.length==1)  
	{
		try {  
			const stream = await createSshTunnel(sshTunnelConfig, dbServer);	    			
			const randomNo = Math.floor(Math.random() * 1000); // Generate a random number

			const title=(typeof data.title=="undefined")?'':data.title;  	
			const first_name=(typeof data.first_name=="undefined")?'':data.first_name;    
			const last_name=(typeof data.last_name=="undefined")?'':data.last_name;  	
			const dob=(typeof data.dob=="undefined" || data.dob== null)?'0000:00:00':data.dob;   
			const passport_no=(typeof data.passport_no=="undefined")?'':data.passport_no;  		
			const address1=(typeof data.address1=="undefined")?'':data.address1;  	
			const address2=(typeof data.address2=="undefined")?'':data.address2;  	
			const city=(typeof data.city=="undefined")?'':data.city;  	
			const state=(typeof data.state=="undefined")?'':data.state;   	
			const postal_code=(typeof data.postal_code=="undefined")?'':data.postal_code;  	
			const country=(typeof data.country=="undefined")?'':data.country;    
			const tel_home=(typeof data.tel_home=="undefined")?'':data.tel_home;  	
			const tel_work=(typeof data.tel_work=="undefined")?'':data.tel_work;  	
			const cell_phone=(typeof data.cell_phone=="undefined")?'':data.cell_phone;  	
			const email_address=(typeof data.email_address=="undefined")?'':data.email_address;  	
			const fax=(typeof data.fax=="undefined")?'':data.fax;  
			const aid=(typeof data.aid=="undefined")?'':data.aid;  	 	
			const aid_no=(typeof data.aid_no=="undefined")?'':data.aid_no;  	 	
			const start_date=(typeof data.start_date=="undefined" || data.start_date== null)?'0000:00:00':data.start_date;   
			const package_name=(typeof data.ins_type=="undefined")?'':data.ins_type;  

			let memberPrefix = ''; // Initialize member prefix
			
			if (package_name === 'Dive Instructor') {
				memberPrefix = 'DANDI';
			} else if (package_name === 'DAN Instructor') {
				memberPrefix = 'DANI';
			} else if (package_name === 'DAN Instructor Trainer') {
				memberPrefix = 'DANIT';
			}else if (package_name === 'DAN Examiner') {
			  memberPrefix = 'DANEX';
			}

			const memberNO = `${memberPrefix} ${randomNo}`; 
  
		const emailStream = await createSshTunnel(sshTunnelConfig, dbServer);
		const emailCheckQuery = `SELECT email1 FROM membership WHERE email1 = '${email_address}' AND id != ${id}`;
		const existingUser = await queryDatabase(emailCheckQuery, emailStream);
  
		if (existingUser.length > 0) {
		  return res.status(500).json({ message: 'Email already exists' });
		}else{
		  const sqlQuery = `UPDATE membership SET title1='${title}', fname1='${first_name}', sname1='${last_name}', dob1='${dob}', passport1='${passport_no}', address1='${address1}',address2='${address2}',city1='${city}',province1='${state}',postcode1='${postal_code}',country1='${country}',telephone1='${tel_home}',telephone2='${tel_work}',cellphone1='${cell_phone}',email1='${email_address}', medical_aid='${aid}',medical_aid_no='${aid_no}',member_no='${memberNO}', package_name='${package_name}',startdate='${start_date}',joindate='${start_date}', fax='${fax}' WHERE id=${id}`;   				
		  
		  await queryDatabase(sqlQuery,stream);   			 			       
		  res.status(200).json({ message: 'Instructor records updated successfully' });     
		}
		} catch (error) {   
		  // Handle database or other errors 	  		
		  console.error('Error adding data to the database:', error);
		  return res.status(500).json({ error: error , error:error.message });				
		} 	  
	}
	else
	{
		return res.status(500).json({ error:'Record not found!' });		  				
	}   	 		  
	
}) 


// save instructor student into table
app.post('/inst_student_save', async (req, res) => {            
	const data = req.body;                                           
  
	try {
	  // Establish SSH tunnel
	  const stream = await createSshTunnel(sshTunnelConfig, dbServer);
	  const randomNo = Math.floor(Math.random() * 1000); // Generate a random number
	  
	  // Insert data into the database  
	  const parent_id=(typeof data.parent_id=="undefined")?'':data.parent_id;  	
	  const title=(typeof data.title=="undefined")?'':data.title;  	
	  const first_name=(typeof data.first_name=="undefined")?'':data.first_name;    
	  const last_name=(typeof data.last_name=="undefined")?'':data.last_name;  	
	  const dob=(typeof data.dob=="undefined" || data.dob== null)?'0000:00:00':data.dob;   
	  const passport_no=(typeof data.passport_no=="undefined")?'':data.passport_no;  		
	  const address1=(typeof data.address1=="undefined")?'':data.address1;  	
	  const address2=(typeof data.address2=="undefined")?'':data.address2;  	
	  const city=(typeof data.city=="undefined")?'':data.city;  	
	  const state=(typeof data.state=="undefined")?'':data.state;   	
	  const postal_code=(typeof data.postal_code=="undefined")?'':data.postal_code;  	
	  const country=(typeof data.country=="undefined")?'':data.country;    
	  const tel_home=(typeof data.tel_home=="undefined")?'':data.tel_home;  	
	  const tel_work=(typeof data.tel_work=="undefined")?'':data.tel_work;  	
	  const cell_phone=(typeof data.cell_phone=="undefined")?'':data.cell_phone;  	
	  const email_address=(typeof data.email_address=="undefined")?'':data.email_address;  	
	  const fax=(typeof data.fax=="undefined")?'':data.fax;  
	  const aid=(typeof data.aid=="undefined")?'':data.aid;  	 	
	  const aid_no=(typeof data.aid_no=="undefined")?'':data.aid_no;  	 	
	  const start_date=(typeof data.start_date=="undefined" || data.start_date== null)?'0000:00:00':data.start_date;   
	  const package_name=(typeof data.stud_type=="undefined")?'':data.stud_type;  	 		 	  
	  const new_pwd = generateRandomPassword(Math.floor(Math.random() * 2) + 6);
	  const medication=(typeof data.medication=="undefined")?'':data.medication;  	 	
	  const chronic_ill=(typeof data.chronic_ill=="undefined")?'':data.chronic_ill;  	 	
	  const permission=(typeof data.permission=="undefined")?'':data.permission;  	 	

	  let memberPrefix = ''; // Initialize member prefix

		if (package_name === 'Dive Students') {
			memberPrefix = 'DVDS';
		} else if (package_name === 'Provider Students') {
			memberPrefix = 'DIPS';
		} else if (package_name === 'Instructor Students') {
			memberPrefix = 'DITIS';
		}else if (package_name === 'Instructor Trainer Students') {
		  memberPrefix = 'DEITS';
		}
	  
	  const memberNO = `${memberPrefix} ${randomNo}`; // Generate random number and the determined prefix
  
	  // Check if the email already exists in the database
	  const emailStream = await createSshTunnel(sshTunnelConfig, dbServer);
	  const emailCheckQuery = `SELECT email1 FROM membership WHERE email1 = '${email_address}'`;
	  const existingUser = await queryDatabase(emailCheckQuery, emailStream);
  
	  if (existingUser.length > 0) {
		return res.status(500).json({ message: 'Email already exists' });
	  }
	  else{
		const sqlQuery = `INSERT INTO membership (title1, fname1, sname1, dob1, passport1, address1,address2,city1,province1,postcode1,country1,telephone1,telephone2,cellphone1,fax,email1,password, medical_aid,medical_aid_no,member_no, package_name,verifyEmail,verifyAmount,choose_membership,status1,startdate,joindate, parent_id, medication, chronic_ill, permission)  VALUES ('${title}','${first_name}','${last_name}','${dob}','${passport_no}', '${address1}','${address2}','${city}','${state}','${postal_code}','${country}','${tel_home}','${tel_work}','${cell_phone}','${fax}','${email_address}','${new_pwd}', '${aid}','${aid_no}', '${memberNO}', '${package_name}','verified','paid', 'instructor_student', 'ACTIVE', '${start_date}', '${start_date}', '${parent_id}', '${medication}', '${chronic_ill}', '${permission}')`;
		
		await queryDatabase(sqlQuery, stream);
  
		// Send a verification email
		sendPasswordEmail(email_address, new_pwd);
  
		// Send a success response
		res.status(200).json({ message: 'Instructor student members registered successfully.' });
	  }
	   
	} catch (error) {
	  // Handle database or other errors 	  		
	  console.error('Error adding data to the database:', error);
	  res.status(500).json({ error: error });
	} 
});

app.post('/inst_student_update/:id', async (req, res) => { 
	const id = req.params.id;   
	const data = req.body;  
  
	const stream = await createSshTunnel(sshTunnelConfig, dbServer);	   
	const sqlQuery = `SELECT * FROM membership WHERE id=${id}`;	     	    
	const result = await queryDatabase(sqlQuery, stream);	   
		
	if(result.length==1)  
	{
		try {  
			const stream = await createSshTunnel(sshTunnelConfig, dbServer);	    			
			const randomNo = Math.floor(Math.random() * 1000); // Generate a random number

			const title=(typeof data.title=="undefined")?'':data.title;  	
			const first_name=(typeof data.first_name=="undefined")?'':data.first_name;    
			const last_name=(typeof data.last_name=="undefined")?'':data.last_name;  	
			const dob=(typeof data.dob=="undefined" || data.dob== null)?'0000:00:00':data.dob;   
			const passport_no=(typeof data.passport_no=="undefined")?'':data.passport_no;  		
			const address1=(typeof data.address1=="undefined")?'':data.address1;  	
			const address2=(typeof data.address2=="undefined")?'':data.address2;  	
			const city=(typeof data.city=="undefined")?'':data.city;  	
			const state=(typeof data.state=="undefined")?'':data.state;   	
			const postal_code=(typeof data.postal_code=="undefined")?'':data.postal_code;  	
			const country=(typeof data.country=="undefined")?'':data.country;    
			const tel_home=(typeof data.tel_home=="undefined")?'':data.tel_home;  	
			const tel_work=(typeof data.tel_work=="undefined")?'':data.tel_work;  	
			const cell_phone=(typeof data.cell_phone=="undefined")?'':data.cell_phone;  	
			const email_address=(typeof data.email_address=="undefined")?'':data.email_address;  	
			const fax=(typeof data.fax=="undefined")?'':data.fax;  
			const aid=(typeof data.aid=="undefined")?'':data.aid;  	 	
			const aid_no=(typeof data.aid_no=="undefined")?'':data.aid_no;  	 	
			const start_date=(typeof data.start_date=="undefined" || data.start_date== null)?'0000:00:00':data.start_date;   
			const package_name=(typeof data.stud_type=="undefined")?'':data.stud_type;  
			const medication=(typeof data.medication=="undefined")?'':data.medication;  	 	
			const chronic_ill=(typeof data.chronic_ill=="undefined")?'':data.chronic_ill;  	 	
			const permission=(typeof data.permission=="undefined")?'':data.permission;  

			let memberPrefix = ''; // Initialize member prefix
			
			if (package_name === 'Dive Students') {
				memberPrefix = 'DVDS';
			} else if (package_name === 'Provider Students') {
				memberPrefix = 'DIPS';
			} else if (package_name === 'Instructor Students') {
				memberPrefix = 'DITIS';
			}else if (package_name === 'Instructor Trainer Students') {
			  memberPrefix = 'DEITS';
			}

			const memberNO = `${memberPrefix} ${randomNo}`; 
  
		const emailStream = await createSshTunnel(sshTunnelConfig, dbServer);
		const emailCheckQuery = `SELECT email1 FROM membership WHERE email1 = '${email_address}' AND id != ${id}`;
		const existingUser = await queryDatabase(emailCheckQuery, emailStream);
  
		if (existingUser.length > 0) {
		  return res.status(500).json({ message: 'Email already exists' });
		}else{
		  const sqlQuery = `UPDATE membership SET title1='${title}', fname1='${first_name}', sname1='${last_name}', dob1='${dob}', passport1='${passport_no}', address1='${address1}',address2='${address2}',city1='${city}',province1='${state}',postcode1='${postal_code}',country1='${country}',telephone1='${tel_home}',telephone2='${tel_work}',cellphone1='${cell_phone}',email1='${email_address}', medical_aid='${aid}',medical_aid_no='${aid_no}',member_no='${memberNO}', package_name='${package_name}',startdate='${start_date}',joindate='${start_date}', fax='${fax}', medication='${medication}', chronic_ill='${chronic_ill}', permission='${permission}' WHERE id=${id}`;   				
		  
		  await queryDatabase(sqlQuery,stream);   			 			       
		  res.status(200).json({ message: 'Instructor student records updated successfully' });     
		}
		} catch (error) {   
		  // Handle database or other errors 	  		
		  console.error('Error adding data to the database:', error);
		  return res.status(500).json({ error: error , error:error.message });				
		} 	  
	}
	else
	{
		return res.status(500).json({ error:'Record not found!' });		  				
	}   	 		  
	
}) 

app.get('/fetch_inst_student/:id', async (req, res) => { 
	const id = req.params.id;		 
	try {
	  const stream = await createSshTunnel(sshTunnelConfig, dbServer);		
	  const sqlQuery = `SELECT * FROM membership WHERE parent_id=${id} AND choose_membership ='instructor_student'`;	     	    
	  const results = await queryDatabase(sqlQuery, stream);	  							  		
	  res.status(200).json(results);   
	} catch (error) {
	  res.status(500).json({ error: 'Error fetching data from database: ' + error.message });		    	
	}
});

// update membership package to DANS, DANP, DANM or DANX
app.post('/update_membership_package/:id', async (req, res) => { 
	const id = req.params.id;    
	const data = req.body;  
  
	const stream = await createSshTunnel(sshTunnelConfig, dbServer);	   
	const sqlQuery = `SELECT * FROM membership WHERE id=${id}`;	     	    
	const result = await queryDatabase(sqlQuery, stream);			
	
	if (!data.inst_member_choose || data.inst_member_choose === "") {
	  return res.status(500).json({ error: 'Choose membership is required','error_field':'inst_member_choose' });
	}else if (!data.inst_pack_for || data.inst_pack_for === "") {
	  return res.status(500).json({ error: 'Package for is required','error_field':'inst_pack_for' });
	}
	else if (!data.inst_pay_type || data.inst_pay_type === "") {
	  return res.status(500).json({ error: 'Payment Type is required','error_field':'inst_pay_type' });
	} 
  
	if(result.length==1)  
	{
		try {  
  
		  // Establish SSH tunnel
		  const stream = await createSshTunnel(sshTunnelConfig, dbServer); 		
		  const randomNo = Math.floor(Math.random() * 1000); // Generate a random number
  
		  const inst_member_choose=(typeof data.inst_member_choose=="undefined")?'':data.inst_member_choose;  	
		  const inst_pack_for=(typeof data.inst_pack_for=="undefined")?'':data.inst_pack_for;    
		  const inst_price=(typeof data.inst_price=="undefined")?'':data.inst_price;  
		  const inst_membership=(typeof data.inst_membership=="undefined")?'':data.inst_membership;  
  
		  let memberPrefix = ''; // Initialize member prefix
		  // Check package_name to determine the member prefix
		  if (inst_member_choose === 'Master Dive Pro') {
			  memberPrefix = 'DANM';
		  }else if (inst_member_choose === 'Master Tech') {
			memberPrefix = 'DANX';
		  }else if (inst_member_choose === 'Standard') {
			memberPrefix = 'DANS';
		  }else if (inst_member_choose === 'Plus') {
			memberPrefix = 'DANP';
		  }
		  
		  const memberNO = `${memberPrefix} ${randomNo}`;
  
		  const sqlQuery = `UPDATE membership SET package_name='${inst_member_choose}',package_for='${inst_pack_for}',package_price='${inst_price}', member_no='${memberNO}', choose_membership='${inst_membership}', parent_id='' WHERE id = ${id}`; 
			
		  await queryDatabase(sqlQuery,stream);  
			
		  res.status(200).json({ message: 'Instructor student upgraded to annual member successfully' });     		       	    		 		
		   
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