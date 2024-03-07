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
	res.send('Common member frontend');    		
});  

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: emailConfig.service,
  auth: {
    user: emailConfig.user, 
    pass: emailConfig.pass,
  }
});

// Send verification email
function sendVerificationEmail(email_address) {
  const mailOptions = {
    from: emailConfig.user, // Replace with your Gmail address
    to: email_address,
    subject: 'Verify Your Email',
    html: `<p>Click the link to verify your email:</p>
    <p><a href="http://157.245.36.128:5200/verify/${email_address}" class="btn" style="background: #e33439; color: #fff; padding: 10px 20px; font-size: 16px; border-radius: 7px;">Verify Email</a></p>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

// forgot email
function sendForgotEmail(email, new_pwd) {
	const mailOptions = {
	  from: emailConfig.user,
	  to: email,
	  subject: 'New Password for membership Login',
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
								<p><strong>Your new password has been created. Keep it safe and secure</strong></p>
                <p> ${new_pwd}</p>
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

// register save data to membership table
app.post('/save', async (req, res) => {            
  const data = req.body;                                           

  try {
    // Establish SSH tunnel
    const stream = await createSshTunnel(sshTunnelConfig, dbServer);
    const randomNo = Math.floor(Math.random() * 1000); // Generate a random number
    
    // Insert data into the database  
    const title=(typeof data.title=="undefined")?'':data.title;  	
    const first_name=(typeof data.first_name=="undefined")?'':data.first_name;    
    const last_name=(typeof data.last_name=="undefined")?'':data.last_name;  	
    const dob=(typeof data.dob=="undefined")?'':data.dob;  
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
    const new_pwd=(typeof data.new_pwd=="undefined")?'':data.new_pwd;  
    const start_date=(typeof data.start_date=="undefined" || data.start_date== null)?'0000:00:00':data.start_date;   
    const package_name=(typeof data.package_name=="undefined")?'':data.package_name;  	 	
    const package_price=(typeof data.package_price=="undefined")?'':data.package_price; 
    const package_for=(typeof data.package_for=="undefined")?'':data.package_for;  	 	
    const choose_membership=(typeof data.choose_membership=="undefined")?'':data.choose_membership;  	 	  

    let memberPrefix = ''; // Initialize member prefix
    // Check package_name to determine the member prefix
    if(choose_membership === 'annual'){
      if (package_name === 'Standard') {
          memberPrefix = 'DANS';
      } else if (package_name === 'Plus') {
          memberPrefix = 'DANP';
      } else if (package_name === 'Master Dive Pro') {
          memberPrefix = 'DANM';
      }else if (package_name === 'Master Tech') {
        memberPrefix = 'DANX';
      }
    }else if(choose_membership === 'student'){
      memberPrefix = `DANT`;
    }
    else if(choose_membership === 'temporary'){
      memberPrefix = `DANE`;
    }
    else if(choose_membership === 'commercial'){
      if (package_name === 'individual') {
        memberPrefix = 'DANCI';
      } else if (package_name === 'professional') {
          memberPrefix = 'DANCP';
      } else if (package_name === 'company') {
          memberPrefix = 'DANCC';
      }else if (package_name === 'student') {
        memberPrefix = 'DANCS';
      }
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
      const sqlQuery = `INSERT INTO membership (title1, fname1, sname1, dob1, passport1, address1,address2,city1,province1,postcode1,country1,telephone1,telephone2,cellphone1,fax,email1,password, medical_aid,medical_aid_no,member_no, package_name,package_price,package_for,verifyEmail,verifyAmount,choose_membership,status1,startdate,joindate)  VALUES ('${title}','${first_name}','${last_name}','${dob}','${passport_no}', '${address1}','${address2}','${city}','${state}','${postal_code}','${country}','${tel_home}','${tel_work}','${cell_phone}','${fax}','${email_address}','${new_pwd}', '${aid}','${aid_no}', '${memberNO}', '${package_name}','${package_price}', '${package_for}', 'not_verified','not_paid', '${choose_membership}', 'INACTIVE', '${start_date}', '${start_date}')`;
      
      await queryDatabase(sqlQuery, stream);

      // Send a verification email
      sendVerificationEmail(email_address);

      // Send a success response
      res.status(200).json({ message: 'Members registered successfully. Check your email for verification.' });
    }
	 
  } catch (error) {
    // Handle database or other errors 	  		
    console.error('Error adding data to the database:', error);
    res.status(500).json({ error: error });
  } 
});

// API endpoint to verify email
app.get('/verify/:email_address', async (req, res) => {
  const email_address = req.params.email_address;

  // Check current status before updating
  try {
    const stream = await createSshTunnel(sshTunnelConfig, dbServer);
    
    const checkStatusQuery = `SELECT verifyEmail FROM membership WHERE email1 = '${email_address}'`;
    const statusResult = await queryDatabase(checkStatusQuery, stream);

    if (statusResult.length === 0) {
      res.status(404).json({ error: 'Email not found in database.' });
      return;
    }

    const currentStatus = statusResult[0].verifyEmail;
    // console.log(currentStatus);

    if (currentStatus === 'verified') {
      res.status(400).json({ error: 'Email is already verified.' });
      return;
    }

    // Update status to 'verified'
    const streamTwo = await createSshTunnel(sshTunnelConfig, dbServer);
    const updateQuery = `UPDATE membership SET verifyEmail = 'verified' WHERE email1 = '${email_address}'`;
    const updateResult = await queryDatabase(updateQuery, streamTwo);

    res.status(200).json({ message: 'Email verified successfully. You can now log in.' });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from database: ' + error.message });
  }
});


// resend-email
app.post('/resend', async (req, res) => {
  const data = req.body;  
  
  try {
    const stream = await createSshTunnel(sshTunnelConfig, dbServer);
    const email_address=(typeof data.email=="undefined")?'':data.email;  	

    // Check if the email exists in the database
    const emailCheckQuery = `SELECT email1 FROM membership WHERE email1 = '${email_address}'`;
    const user = await queryDatabase(emailCheckQuery, stream);

    if (user.length === 0) {
      return res.status(404).json({ message: 'Email not found' });
    }

    // Resend the verification email
    sendVerificationEmail(email_address);

    // Send a success response
    res.status(200).json({ message: 'Verification email resent successfully' });

  } catch (error) {
    console.error('Error resending verification email:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// if email already exist in membership table on registeration
app.get('/checkEmail/:email_address', async (req, res) => {
  const email_address = req.params.email_address;

  try {
      // Check if the email exists in the database
      const stream = await createSshTunnel(sshTunnelConfig, dbServer);
      const checkEmailQuery = `SELECT * FROM membership WHERE email1 = '${email_address}'`;
      const emailResult = await queryDatabase(checkEmailQuery, stream);

      // If email exists in the database
      if (emailResult.length > 0) {
          res.status(200).json({ exists: true });
      } else {
          res.status(200).json({ exists: false });
      }
  } catch (error) {
      res.status(500).json({ error: 'Error fetching data from database: ' + error.message });
  }
});


// app.get('/checkEmail/:email_address', async (req, res) => {
//   const email_address = req.params.email_address;

//   try {
//       // Check if the email exists in the database
//       const stream = await createSshTunnel(sshTunnelConfig, dbServer);
//       const checkEmailQuery = `SELECT * FROM membership WHERE email1 = '${email_address}'`;
//       const emailResult = await queryDatabase(checkEmailQuery, stream);

//       // If email exists in the database
//       if (emailResult.length > 0) {
//           res.status(200).json({ exists: true });
//       } else {
//           res.status(404).json({ exists: false });
//       }
//   } catch (error) {
//       res.status(500).json({ error: 'Error fetching data from database: ' + error.message });
//   }
// });




// login to dashboard
app.post('/login_to_dashboard', async (req, res) => {            
  const data = req.body; 
  const email = data.email || '';
  const password = data.password || '';    

  try {
    const stream = await createSshTunnel(sshTunnelConfig, dbServer);

    const sqlQuery = `SELECT * FROM membership WHERE email1 = '${email}' AND password = '${password}'`;
    
    // Pass stream as an additional parameter to queryDatabase
    const userData = await queryDatabase(sqlQuery, stream);

    if (userData.length > 0) {    
      const { id, verifyEmail } = userData[0];

      if (verifyEmail === 'verified') {
        // Authentication successful (matching record found and email verified)
        res.status(200).json({ message: 'Member login success. Please wait...', data: userData });
      } else {
        // Email not verified
        res.status(401).json({ error: 'Email is not verified. Please verify your email address.' });
      }   
    } else {
      // Authentication failed (no matching record found)
      res.status(400).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error querying database:', error);
    res.status(500).json({ message: 'Internal server error', error:error.message });
  }                             
});

// forgot password
function generateRandomPassword(length) {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; 
  let password = "";
  for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
  }
  return password;
}

app.post('/forgot', async (req, res) => {            
  const data = req.body; 
  const email = data.email2 || ''; 
  const new_pwd = generateRandomPassword(Math.floor(Math.random() * 2) + 6);

  try {
    const stream = await createSshTunnel(sshTunnelConfig, dbServer);
    const sqlQuery = `SELECT * FROM membership WHERE email1 = '${email}'`;
    const userData = await queryDatabase(sqlQuery, stream);

    if (userData.length > 0) {    
      const { id, verifyEmail } = userData[0];

      if (verifyEmail === 'verified') {
        const stream2 = await createSshTunnel(sshTunnelConfig, dbServer);
        const sqlQuery2 = `UPDATE membership SET password='${new_pwd}' WHERE id=${id}`;   				
		    await queryDatabase(sqlQuery2,stream2);  
        res.status(200).json({ message: 'New Password will be sent to your email address.'});
        sendForgotEmail(email, new_pwd);
      } else {
        // Email not verified
        res.status(401).json({ error: 'Email is not verified. Please verify your email address.' });
      }   
    } else {
      // Authentication failed (no matching record found)
      res.status(400).json({ error: 'Email is not found in our records.' });
    }
  } catch (error) {
    console.error('Error querying database:', error);
    res.status(500).json({ message: 'Internal server error', error:error.message });
  }                             
});


// payment if verifyAmount is not_paid
app.post('/payment_save', async (req, res) => {		  	
  const data = req.body;			

  if (!data.user_id || data.user_id === "") {
    return res.status(500).json({ error: 'Id is Missing','error_field':'user_id' });		
  } 
  else if (!data.user_type || data.user_type === "") {
    return res.status(500).json({ error: 'Type is Missing','error_field':'user_type' });		
  }  
  else if (!data.pay_type || data.pay_type === "") {  
    return res.status(500).json({ error: 'Payment Type is Missing','error_field':'pay_type' });       
  } 
  else    
  {  	  
  
  try {	 		  

		const id=(typeof data.user_id=="undefined")?0:data.user_id;  
		const type=(typeof data.user_type=="undefined")?'':data.user_type.toUpperCase();   	
		const payType=(typeof data.pay_type=="undefined")?'':data.pay_type;      
		
		if(id >0)	
		{
			const stream = await createSshTunnel(sshTunnelConfig,dbServer);  
			const sqlQuery = `UPDATE membership SET verifyAmount='paid' WHERE id=${id}`;   	  
			await queryDatabase(sqlQuery,stream);        
			res.status(200).json({ message: 'Data added successfully' });     					 		  	
		} 
		else
		{
			res.status(500).json({ error: 'Record could not inserted!' });  	            
		} 

    }
	catch (error) {
		// Handle database or other errors 	  		
		console.error('Error adding data to the database:', error);
		res.status(500).json({ error: error });  
	}	  
	 
  } 
}); 

// payment paynow for student 
app.post('/paynow_stud', async (req, res) => {		    	
  const data = req.body;	 
  const stream = await createSshTunnel(sshTunnelConfig, dbServer);	    
  const sqlQuery = 'SELECT (IFNULL(MAX(id),0)+1) AS max_id FROM membership';	  	 	  
  const result = await queryDatabase(sqlQuery, stream);	   
  const next_id = (result.length>0)?result[0].max_id:0;      
    
  if (!data.title || data.title === "") {
    return res.status(500).json({ error: 'Title is required','error_field':'title' });
  }
  else if (!data.fname || data.fname === "") {
    return res.status(500).json({ error: 'First Name is required','error_field':'fname' });
  }
  else if (!data.sname || data.sname === "") {
    return res.status(500).json({ error: 'Surname is required','error_field':'sname' });    
  } else if (!data.dob || data.dob === "") {
    return res.status(500).json({ error: 'Date of birth is required','error_field':'dob' });		
  } 
  else if (!data.address1 || data.address1 === "") {
    return res.status(500).json({ error: 'Postal address is required','error_field':'address1' });		
  } 
  else if (!data.city || data.city === "") {
    return res.status(500).json({ error: 'City is required','error_field':'city' });		
  }
  else if (!data.province || data.province === "") {
    return res.status(500).json({ error: 'State/Province is required','error_field':'province' });	  	
  }
  else if (!data.post || data.post === "") {
    return res.status(500).json({ error: 'Postal Code is required','error_field':'post' });		
  }
  else if (!data.country || data.country === "") {
    return res.status(500).json({ error: 'Country is required','error_field':'country' });		
  }   
  else if (!data.cellphone || data.cellphone === "") {
    return res.status(500).json({ error: 'Cell phone is required','error_field':'cellphone' });		
  } else if (!data.email || data.email === "") {
    return res.status(500).json({ error: 'Email is required','error_field':'email' });		
  }else if (!data.aid || data.aid === "") {
    return res.status(500).json({ error: 'Medical aid is required','error_field':'aid' });
  }
  else if (!data.aid_no || data.aid_no === "") {
    return res.status(500).json({ error: 'Medical aid no. is required','error_field':'aid_no' });		
  }
  else if (!data.start_date || data.start_date === "") {
    return res.status(500).json({ error: 'Course start date is required','error_field':'start_date' });		
  }  
  else if (!data.user_id || data.user_id === "") {
    return res.status(500).json({ error: 'Id is Missing','error_field':'user_id' });		
  } 
  else if (!data.user_type || data.user_type === "") {
    return res.status(500).json({ error: 'Type is Missing','error_field':'user_type' });		
  }  
  else if (!data.pay_type || data.pay_type === "") {  
    return res.status(500).json({ error: 'Payment Type is Missing','error_field':'pay_type' });       
  } 
  else    
  {  	  
  
  try {	 		  

		const id=(typeof data.user_id=="undefined")?0:data.user_id;  
		const type=(typeof data.user_type=="undefined")?'':data.user_type.toUpperCase();   	
		const payType=(typeof data.pay_type=="undefined")?'':data.pay_type;   
		const memberNO = `DANT ${next_id}`;       	

		const instructor_id=(typeof data.user_id=="undefined")?'':data.user_id;         
		const studAnnual_title=(typeof data.title=="undefined")?'':data.title;  	
		const studAnnual_fname=(typeof data.fname=="undefined")?'':data.fname;    
		const studAnnual_sname=(typeof data.sname=="undefined")?'':data.sname;  
		const studAnnual_dob=(typeof data.dob=="undefined" || data.dob== null)?'0000:00:00':data.dob;    	
		const studAnnual_passport=(typeof data.passport=="undefined")?'':data.passport;  
		const studAnnual_address1=(typeof data.address1=="undefined")?'':data.address1;  	
		const studAnnual_address2=(typeof data.address2=="undefined")?'':data.address2;  	
		const studAnnual_city=(typeof data.city=="undefined")?'':data.city;  	
		const studAnnual_province=(typeof data.province=="undefined")?'':data.province;  	
		const studAnnual_post=(typeof data.post=="undefined")?'':data.post;  	
		const studAnnual_country=(typeof data.country=="undefined")?'':data.country; 
		const studAnnual_home=(typeof data.phonehome=="undefined")?'':data.phonehome;  	    	
		const studAnnual_cellphone=(typeof data.cellphone=="undefined")?'':data.cellphone;         
		const studAnnual_email=(typeof data.email=="undefined")?'':data.email;        	
		const studAnnual_aid=(typeof data.aid=="undefined")?'':data.aid;    
		const studAnnual_aid_no=(typeof data.aid_no=="undefined")?'':data.aid_no;     	  
		const studAnnual_course=(typeof data.start_date=="undefined" || data.start_date== null)?'0000:00:00':data.start_date;   

		const stream = await createSshTunnel(sshTunnelConfig, dbServer);	    
	  const sqlQuery = `SELECT * FROM membership where id='${instructor_id}'`;	  	 	  
	  const result = await queryDatabase(sqlQuery, stream);	   
		
	  const pack_name = (result.length>0)?result[0].package_name:'';    
		const pack_price = (result.length>0)?result[0].package_price:0;    
		const pack_for = (result.length>0)?result[0].package_for:'';    
		
		const emailStream = await createSshTunnel(sshTunnelConfig, dbServer);
		const emailCheckQuery = `SELECT * FROM membership WHERE email1 = '${studAnnual_email}'`;
		const existingUser = await queryDatabase(emailCheckQuery, emailStream);	    	  

      if (existingUser.length > 0) {          		
		return res.status(500).json({ error: 'Email already exists','error_field':'email_id' });	  	             	
      }
      else{  		
				
		const stream = await createSshTunnel(sshTunnelConfig, dbServer);    
        const sqlQuery = `INSERT INTO membership (parent_id,title1,fname1,sname1,dob1,passport1,medical_aid,medical_aid_no,startdate,address1,address2,city1,province1,postcode1,country1,telephone1,telephone2,cellphone1,fax,email1,member_no,verifyEmail,verifyAmount,package_name,package_price,package_for) 
		VALUES ('${instructor_id}','${studAnnual_title}','${studAnnual_fname}','${studAnnual_sname}','${studAnnual_dob}','${studAnnual_passport}','${studAnnual_aid}','${studAnnual_aid_no}','${studAnnual_course}','${studAnnual_address1}','${studAnnual_address2}','${studAnnual_city}','${studAnnual_province}','${studAnnual_post}','${studAnnual_country}','${studAnnual_home}','','${studAnnual_cellphone}','','${studAnnual_email}','${memberNO}','verified','paid','${pack_name}','${pack_price}','${pack_for}')`;  
                
		const result = await queryDatabase(sqlQuery,stream);   		 		  
		const insert_id = result.insertId;  		            	    

		if(insert_id >0)	
		{			 
			// Send a success response
			res.status(200).json({ message: 'Student member data added successfully' });       	     				 		  	
		} 
		else
		{
			res.status(500).json({ error: 'Record could not inserted!' });  	            
		}  
        					  		
      }  
	  
    }
	catch (error) {
		// Handle database or other errors 	  		
		console.error('Error adding data to the database:', error);
		res.status(500).json({ error: error });  
	}	  
	 
  } 
}); 

// payment if membership is expired
app.post('/payment_renewal', async (req, res) => {		  	
	const data = req.body;			
  
	if (!data.user_id || data.user_id === "") {
	  return res.status(500).json({ error: 'Id is missing','error_field':'user_id' });		
	} 
	else if (!data.user_type || data.user_type === "") {
	  return res.status(500).json({ error: 'Type is missing','error_field':'user_type' });		
	}  
	else if (!data.pay_type || data.pay_type === "") {  
	  return res.status(500).json({ error: 'Payment Type is missing','error_field':'pay_type' });       
	} 
	else if (!data.renew_start || data.renew_start === "") {  
		return res.status(500).json({ error: 'Renewal start date is missing','error_field':'renew_start' });       
	  } 
	else    
	{  	  
	
	try {	 		  
  
		  const id=(typeof data.user_id=="undefined")?0:data.user_id;  
		  const type=(typeof data.user_type=="undefined")?'':data.user_type.toUpperCase();   	
		  const payType=(typeof data.pay_type=="undefined")?'':data.pay_type;  
		  const renew_start=(typeof data.renew_start=="undefined" || data.renew_start== null)?'0000:00:00':data.renew_start;    

		  
		  if(id >0)	
		  {
			  // Establish SSH tunnel           
			  
			  const stream = await createSshTunnel(sshTunnelConfig,dbServer);  
				const sqlQuery = `UPDATE membership SET startdate='${renew_start}' WHERE id=${id}`;   	  
				await queryDatabase(sqlQuery,stream);        
			  res.status(200).json({ message: 'User Renewal updated successfully.' });     					 		  	
		  } 
		  else
		  {
			  res.status(500).json({ error: 'Record could not updated!' });  	            
		  } 
  
	  }
	  catch (error) {
		  // Handle database or other errors 	  		
		  console.error('Error adding data to the database:', error);
		  res.status(500).json({ error: error });  
	  }	  
	   
	} 
}); 

// fetch all members
app.get('/fetch_all', async (req, res) => {
  try {
    const stream = await createSshTunnel(sshTunnelConfig, dbServer);		
    const sqlQuery = 'SELECT * FROM membership';	   	
    const results = await queryDatabase(sqlQuery, stream);				
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from database: ' + error.message });		    	
  }
}); 

// edit membership
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

// delete members
app.get('/delete/:id', async (req, res) => {   
  const id = req.params.id;		
  try {
    const stream = await createSshTunnel(sshTunnelConfig, dbServer);		
    const sqlQuery = `DELETE FROM membership WHERE id=${id}`;	     	    
    const results = await queryDatabase(sqlQuery, stream);		  		  		
    res.status(200).json(results);   			
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from database: ' + error.message });		    	
  }
})

// student queries start 

app.post('/update_student_membership/:id', async (req, res) => { 
  const id = req.params.id; 
  const data = req.body;  

  const stream = await createSshTunnel(sshTunnelConfig, dbServer);	   
  const sqlQuery = `SELECT * FROM membership WHERE id=${id}`;	     	    
  const result = await queryDatabase(sqlQuery, stream);			
  
  if (!data.stud_instructor || data.stud_instructor === "") {  
    return res.status(500).json({ error: 'Instructor is required','error_field':'stud_instructor' });        
  }   
  else if (!data.stud_start_date || data.stud_start_date === "") {  
    return res.status(500).json({ error: 'Start date is required','error_field':'stud_start_date' });        
  } else if (!data.stud_aid || data.stud_aid === "") {  
    return res.status(500).json({ error: 'Medical aid is required','error_field':'stud_aid' });        
  }   
  else if (!data.stud_aid_no || data.stud_aid_no === "") {  
    return res.status(500).json({ error: 'Medical aid no. is required','error_field':'stud_aid_no' });        
  }   

  if(result.length==1)  
  {
	  try {  

		// Establish SSH tunnel
    const stream = await createSshTunnel(sshTunnelConfig, dbServer);   

		const stud_instructor=(typeof data.stud_instructor=="undefined" || data.stud_instructor== null)?'':data.stud_instructor;    	
		const stud_start_date=(typeof data.stud_start_date=="undefined" || data.stud_start_date== null)?'0000:00:00':data.stud_start_date;  	
    const stud_aid=(typeof data.stud_aid=="undefined" || data.stud_aid== null)?'':data.stud_aid;    	
    const stud_aid_no=(typeof data.stud_aid_no=="undefined" || data.stud_aid_no== null)?'':data.stud_aid_no;    	
		 	   	
		const sqlQuery = `UPDATE membership SET instructor_id='${stud_instructor}',startdate='${stud_start_date}',medical_aid='${stud_aid}',medical_aid_no='${stud_aid_no}' WHERE id=${id}`;   		
					 
		await queryDatabase(sqlQuery,stream);      		       
		
		// Send a success response	  		
		res.status(200).json({ message: 'Student member records updated successfully' }); 
      	    		 		
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
// student queries end

// ANNUAL Queries Start
app.get('/annual_courses', async (req, res) => {
  try {
    const stream = await createSshTunnel(sshTunnelConfig, dbServer);		
    const sqlQuery = "SELECT * FROM courses";	          
    const results = await queryDatabase(sqlQuery, stream);	  			
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from database: ' + error.message });		    	
  }
});   

app.post('/update_annual_kin/:id', async (req, res) => { 
  const id = req.params.id; 
  const data = req.body;  

  const stream = await createSshTunnel(sshTunnelConfig, dbServer);	   
  const sqlQuery = `SELECT * FROM membership WHERE id=${id}`;	     	    
  const result = await queryDatabase(sqlQuery, stream);			
  
  if (!data.kin_title || data.kin_title === "") {  
    return res.status(500).json({ error: 'Title is required','error_field':'kin_title' });        
  }   
  else if (!data.kin_fname || data.kin_fname === "") {  
    return res.status(500).json({ error: 'First name is required','error_field':'kin_fname' });        
  } else if (!data.kin_sname || data.kin_sname === "") {  
    return res.status(500).json({ error: 'Last name is required','error_field':'kin_sname' });        
  }   
  else if (!data.kin_dob || data.kin_dob === "") {  
    return res.status(500).json({ error: 'Date of birth is required','error_field':'kin_dob' });        
  }   
  else if (!data.kin_address1 || data.kin_address1 === "") {  
    return res.status(500).json({ error: 'Postal address is required','error_field':'kin_address1' });        
  } 
  else if (!data.kin_city || data.kin_city === "") {  
    return res.status(500).json({ error: 'City is required','error_field':'kin_city' });        
  } 
  else if (!data.kin_province || data.kin_province === "") {  
    return res.status(500).json({ error: 'State/Province is required','error_field':'kin_province' });        
  } 
  else if (!data.kin_post || data.kin_post === "") {  
    return res.status(500).json({ error: 'Postal Code is required','error_field':'kin_post' });        
  }   
  else if (!data.kin_country || data.kin_country === "") {  
    return res.status(500).json({ error: 'Country is required','error_field':'kin_country' });        
  }   
  else if (!data.kin_phone || data.kin_phone === "") {  
    return res.status(500).json({ error: 'Cell phone is required','error_field':'kin_phone' });        
  }   
  else if (!data.kin_email || data.kin_email === "") {  
    return res.status(500).json({ error: 'Email is required','error_field':'kin_email' });        
  }
  else if (!data.kin_relation || data.kin_relation === "") {  
    return res.status(500).json({ error: 'Relationship is required','error_field':'kin_relation' });    
  }     

  if(result.length==1)  
  {
	  try {  

		// Establish SSH tunnel
    const stream = await createSshTunnel(sshTunnelConfig, dbServer);   

		const kinTitle=(typeof data.kin_title=="undefined" || data.kin_title== null)?'':data.kin_title;    	
		const kinFirstName=(typeof data.kin_fname=="undefined" || data.kin_fname== null)?'':data.kin_fname;  	
		const kinSurName=(typeof data.kin_sname=="undefined" || data.kin_sname== null)?'':data.kin_sname;    
		const kinDob=(typeof data.kin_dob=="undefined" || data.kin_dob== null)?'0000:00:00':data.kin_dob;  	
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
  		
		const sqlQuery = `UPDATE membership SET title2='${kinTitle}',fname2='${kinFirstName}',sname2='${kinSurName}',passport2='${kinPassport}', address3='${kinAddress1}',address4='${kinAddress2}',city2='${kinCity}',province2='${kinProvince}',postcode2='${kinPostCode}',country2='${kinCountry}',telephone3='${kinTelHome}',telephone4='${kinTelWork}',cellphone2='${kinCellPhone}',email2='${kinEmail}',relation='${relation}', dob2='${kinDob}' WHERE id=${id}`;   		
					 
		await queryDatabase(sqlQuery,stream);      		       
		
		// Send a success response	  		
		res.status(200).json({ message: 'Annual member records updated successfully' }); 
      	    		 		
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

// Annual diving family

app.get('/fetch_dives/:id', async (req, res) => { 
  const id = req.params.id;		 
  try {
    const stream = await createSshTunnel(sshTunnelConfig, dbServer);		
    const sqlQuery = `SELECT * FROM membership WHERE parent_id=${id} AND mem_add='diving'`;	     	    
    const results = await queryDatabase(sqlQuery, stream);	  							  		
    res.status(200).json(results);   
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from database: ' + error.message });		    	
  }
});

app.post('/add_diving_family', async (req, res) => {			
  const data = req.body;		
  const stream = await createSshTunnel(sshTunnelConfig, dbServer);	    
  const sqlQuery = 'SELECT (IFNULL(MAX(id),0)+1) AS max_id FROM membership';	   	  
  const result = await queryDatabase(sqlQuery, stream);	  

  const next_id = (result.length>0)?result[0].max_id:0;      

  if (!data.title || data.title === "") {
    return res.status(500).json({ error: 'Title is required','error_field':'title' });
  }else if (!data.fname || data.fname === "") {
    return res.status(500).json({ error: 'First Name is required','error_field':'fname' });
  }
  else if (!data.sname || data.sname === "") {
    return res.status(500).json({ error: 'Last Name is required','error_field':'sname' });
  }
   else if (!data.dob || data.dob === "") {
    return res.status(500).json({ error: 'Date of birth is required','error_field':'dob' });		
  } else if (!data.cellphone || data.cellphone === "") {
    return res.status(500).json({ error: 'Cell phone is required','error_field':'cellphone' });		
  } else if (!data.email || data.email === "") {
    return res.status(500).json({ error: 'Email is required','error_field':'email' });		
  }else if (!data.relation || data.relation === "") {
    return res.status(500).json({ error: 'Relationship is required','error_field':'relation' });
  }
  else if (!data.qualification || data.qualification === "") {
    return res.status(500).json({ error: 'Diving qualification is required','error_field':'qualification' });		
  }
  else if (!data.agency || data.agency === "") {
    return res.status(500).json({ error: 'Agency is required','error_field':'agency' });		
  }  

  try {
    // Establish SSH tunnel
    const stream = await createSshTunnel(sshTunnelConfig, dbServer);  	
    // Insert data into the database  
         
      const row_id=(typeof data.annual_id=="undefined")?'':data.annual_id;    
      const title=(typeof data.title=="undefined")?'':data.title;  	
			const fname=(typeof data.fname=="undefined")?'':data.fname;    
			const sname=(typeof data.sname=="undefined")?'':data.sname;  
			const dob=(typeof data.dob=="undefined" || data.dob== null)?'0000:00:00':data.dob;    	
			const passport=(typeof data.passport=="undefined")?'':data.passport;  	
			const phonework=(typeof data.phonework=="undefined")?'':data.phonework;  	
			const phonehome=(typeof data.phonehome=="undefined")?'':data.phonehome;      	
			const cellphone=(typeof data.cellphone=="undefined")?'':data.cellphone;      
			const email=(typeof data.email=="undefined")?'':data.email;        	
			const relation=(typeof data.relation=="undefined")?'':data.relation;    
			const qualification=(typeof data.qualification=="undefined")?'':data.qualification;     	  
			const agency=(typeof data.agency=="undefined")?'':data.agency;  	
			const freediver=(typeof data.freediver=="undefined")?'':data.freediver; 
      const workdiver=(typeof data.workdiver=="undefined" || data.workdiver==false || data.workdiver== null)?0:1;         
	
      const emailStream = await createSshTunnel(sshTunnelConfig, dbServer);
      const emailCheckQuery = `SELECT email1 FROM membership WHERE email1 = '${email}'`;
      const existingUser = await queryDatabase(emailCheckQuery, emailStream);

      if (existingUser.length > 0) {
        return res.status(500).json({ message: 'Email already exists' });
      }else{
        const sqlQuery = `INSERT INTO membership (parent_id,title1,fname1,sname1,passport1,member_no,relation,telephone1,telephone2,cellphone1,email1,qualification,agency,status1,free_diver,dob1,work_diver,paid,verifyEmail,verifyAmount,mem_add)  VALUES ('${row_id}','${title}','${fname}','${sname}','${passport}','','${relation}','${phonehome}','${phonework}','${cellphone}','${email}','${qualification}','${agency}','INACTIVE','${freediver}','${dob}','${workdiver}','1','not_verified','not_paid','diving')`;  
      
        await queryDatabase(sqlQuery,stream);   	        

        // Send a success response
        res.status(200).json({ message: 'Diving family data added successfully' });   					  		
      }
  } catch (error) {
    // Handle database or other errors 	  		
    console.error('Error adding data to the database:', error);
    res.status(500).json({ error: error });
  }
});  

app.post('/update_diving_family/:id', async (req, res) => { 
  const id = req.params.id;   
  const data = req.body;  

  const stream = await createSshTunnel(sshTunnelConfig, dbServer);	   
  const sqlQuery = `SELECT * FROM membership WHERE id=${id}`;	     	    
  const result = await queryDatabase(sqlQuery, stream);	   
   
  if (!data.title || data.title === "") {
    return res.status(500).json({ error: 'Title is required','error_field':'title' });
  }else if (!data.fname || data.fname === "") {
    return res.status(500).json({ error: 'First Name is required','error_field':'fname' });
  }else if (!data.sname || data.sname === "") {
    return res.status(500).json({ error: 'Last Name is required','error_field':'sname' });
  } else if (!data.dob || data.dob === "") {
    return res.status(500).json({ error: 'Date of birth is required','error_field':'dob' });		
  } else if (!data.cellphone || data.cellphone === "") {
    return res.status(500).json({ error: 'Cell phone is required','error_field':'cellphone' });		
  } else if (!data.email || data.email === "") {
    return res.status(500).json({ error: 'Email is required','error_field':'email' });		
  }else if (!data.relation || data.relation === "") {
    return res.status(500).json({ error: 'Relationship is required','error_field':'relation' });
  } 
  else if (!data.qualification || data.qualification === "") {
    return res.status(500).json({ error: 'Diving qualification is required','error_field':'qualification' });		
  }
  else if (!data.agency || data.agency === "") {
    return res.status(500).json({ error: 'Agency is required','error_field':'agency' });		
  } 
      
  
  if(result.length==1)  
  {
	  try {  
			 const stream = await createSshTunnel(sshTunnelConfig, dbServer);	    			
			 
			const title=(typeof data.title=="undefined")?'':data.title;  	
			const fname=(typeof data.fname=="undefined")?'':data.fname;    
			const sname=(typeof data.sname=="undefined")?'':data.sname;  
			const dob=(typeof data.dob=="undefined" || data.dob== null)?'0000:00:00':data.dob;    	
			const passport=(typeof data.passport=="undefined")?'':data.passport;  	
			const phonework=(typeof data.phonework=="undefined")?'':data.phonework;  	
			const phonehome=(typeof data.phonehome=="undefined")?'':data.phonehome;      	
			const cellphone=(typeof data.cellphone=="undefined")?'':data.cellphone;      
			const email=(typeof data.email=="undefined")?'':data.email;        	
			const relation=(typeof data.relation=="undefined")?'':data.relation;    
			const qualification=(typeof data.qualification=="undefined")?'':data.qualification;     	  
			const agency=(typeof data.agency=="undefined")?'':data.agency;  	
      const workdiver=(typeof data.workdiver=="undefined" || data.workdiver==false || data.workdiver== null)?0:1;         
			const freediver=(typeof data.freediver=="undefined")?'':data.freediver;  
			const annual_id=(typeof data.annual_id=="undefined")?'':data.annual_id;  	 	
			const date = new Date();
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
      const year = date.getFullYear();
      const updatedate = `${year}-${month}-${day}`; 

      const emailStream = await createSshTunnel(sshTunnelConfig, dbServer);
      const emailCheckQuery = `SELECT email1 FROM membership WHERE email1 = '${email}' AND id != ${id}`;
      const existingUser = await queryDatabase(emailCheckQuery, emailStream);

      if (existingUser.length > 0) {
        return res.status(500).json({ message: 'Email already exists' });
      }else{
        const sqlQuery = `UPDATE membership SET title1='${title}',fname1='${fname}',sname1='${sname}',passport1='${passport}',relation='${relation}',telephone1='${phonehome}',telephone2='${phonework}',cellphone1='${cellphone}',email1='${email}',qualification='${qualification}',
        agency='${agency}',free_diver='${freediver}',dob1='${dob}',work_diver='${workdiver}',update_date='${updatedate}' WHERE id=${id}`;   				
        
        await queryDatabase(sqlQuery,stream);   			 			       
        res.status(200).json({ message: 'Diving family records updated successfully' });     
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


// Annual non-diving family

app.get('/fetch_non_dives/:id', async (req, res) => { 
  const id = req.params.id;		 
  try {
    const stream = await createSshTunnel(sshTunnelConfig, dbServer);		
    const sqlQuery = `SELECT * FROM membership WHERE parent_id=${id} AND mem_add='non_diving'`;	     	    
    const results = await queryDatabase(sqlQuery, stream);	  							  		
    res.status(200).json(results);   
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from database: ' + error.message });		    	
  }
});
app.post('/add_nondiving_family', async (req, res) => {			
  const data = req.body;		
  const stream = await createSshTunnel(sshTunnelConfig, dbServer);	    
  const sqlQuery = 'SELECT (IFNULL(MAX(id),0)+1) AS max_id FROM membership';	   	  
  const result = await queryDatabase(sqlQuery, stream);	  

  const next_id = (result.length>0)?result[0].max_id:0;      

  if (!data.title || data.title === "") {
    return res.status(500).json({ error: 'Title is required','error_field':'title' });
  }else if (!data.fname || data.fname === "") {
    return res.status(500).json({ error: 'First Name is required','error_field':'fname' });
  }
  else if (!data.sname || data.sname === "") {
    return res.status(500).json({ error: 'Last Name is required','error_field':'sname' });
  }
   else if (!data.dob || data.dob === "") {
    return res.status(500).json({ error: 'Date of birth is required','error_field':'dob' });		
  } else if (!data.cellphone || data.cellphone === "") {
    return res.status(500).json({ error: 'Cell phone is required','error_field':'cellphone' });		
  } else if (!data.email || data.email === "") {
    return res.status(500).json({ error: 'Email is required','error_field':'email' });		
  }else if (!data.relation || data.relation === "") {
    return res.status(500).json({ error: 'Relationship is required','error_field':'relation' });
  }

  try {
      // Establish SSH tunnel
      const stream = await createSshTunnel(sshTunnelConfig, dbServer);  	

      // Insert data into the database     
      const row_id=(typeof data.annual_id=="undefined")?'':data.annual_id;    
      const title=(typeof data.title=="undefined")?'':data.title;  	
			const fname=(typeof data.fname=="undefined")?'':data.fname;    
			const sname=(typeof data.sname=="undefined")?'':data.sname;  
			const dob=(typeof data.dob=="undefined" || data.dob== null)?'0000:00:00':data.dob;    	
			const passport=(typeof data.passport=="undefined")?'':data.passport;  	
			const phonework=(typeof data.phonework=="undefined")?'':data.phonework;  	
			const phonehome=(typeof data.phonehome=="undefined")?'':data.phonehome;      	
			const cellphone=(typeof data.cellphone=="undefined")?'':data.cellphone;      
			const email=(typeof data.email=="undefined")?'':data.email;        	
			const relation=(typeof data.relation=="undefined")?'':data.relation;    
	
      const emailStream = await createSshTunnel(sshTunnelConfig, dbServer);
      const emailCheckQuery = `SELECT email1 FROM membership WHERE email1 = '${email}'`;
      const existingUser = await queryDatabase(emailCheckQuery, emailStream);

      if (existingUser.length > 0) {
        return res.status(500).json({ message: 'Email already exists' });
      }else{
        const sqlQuery = `INSERT INTO membership (parent_id,title1,fname1,sname1,passport1,member_no,relation,telephone1,telephone2,cellphone1,email1,status1,dob1,verifyEmail,verifyAmount,mem_add)  VALUES ('${row_id}','${title}','${fname}','${sname}','${passport}','','${relation}','${phonehome}','${phonework}','${cellphone}','${email}','INACTIVE','${dob}','not_verified','not_paid','non_diving')`;  
        
        await queryDatabase(sqlQuery,stream);   	        

        // Send a success response
        res.status(200).json({ message: 'Non-Diving family data added successfully' });   					  		
      }
  } catch (error) {
    // Handle database or other errors 	  		
    console.error('Error adding data to the database:', error);
    res.status(500).json({ error: error });
  }
}); 

app.post('/update_nondiving_family/:id', async (req, res) => { 
  const id = req.params.id;   
  const data = req.body;  

  const stream = await createSshTunnel(sshTunnelConfig, dbServer);	   
  const sqlQuery = `SELECT * FROM membership WHERE id=${id}`;	     	    
  const result = await queryDatabase(sqlQuery, stream);	   
   
  if (!data.title || data.title === "") {
    return res.status(500).json({ error: 'Title is required','error_field':'title' });
  }else if (!data.fname || data.fname === "") {
    return res.status(500).json({ error: 'First Name is required','error_field':'fname' });
  }else if (!data.sname || data.sname === "") {
    return res.status(500).json({ error: 'Last Name is required','error_field':'sname' });
  } else if (!data.dob || data.dob === "") {
    return res.status(500).json({ error: 'Date of birth is required','error_field':'dob' });		
  } else if (!data.cellphone || data.cellphone === "") {
    return res.status(500).json({ error: 'Cell phone is required','error_field':'cellphone' });		
  } else if (!data.email || data.email === "") {
    return res.status(500).json({ error: 'Email is required','error_field':'email' });		
  }else if (!data.relation || data.relation === "") {
    return res.status(500).json({ error: 'Relationship is required','error_field':'relation' });
  } 
  
  if(result.length==1)  
  {
	  try {  
			 const stream = await createSshTunnel(sshTunnelConfig, dbServer);	    			
			 
			const title=(typeof data.title=="undefined")?'':data.title;  	
			const fname=(typeof data.fname=="undefined")?'':data.fname;    
			const sname=(typeof data.sname=="undefined")?'':data.sname;  
			const dob=(typeof data.dob=="undefined" || data.dob== null)?'0000:00:00':data.dob;    	
			const passport=(typeof data.passport=="undefined")?'':data.passport;  	
			const phonework=(typeof data.phonework=="undefined")?'':data.phonework;  	
			const phonehome=(typeof data.phonehome=="undefined")?'':data.phonehome;      	
			const cellphone=(typeof data.cellphone=="undefined")?'':data.cellphone;      
			const email=(typeof data.email=="undefined")?'':data.email;        	
			const relation=(typeof data.relation=="undefined")?'':data.relation;    	 	

			const date = new Date();
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
      const year = date.getFullYear();
      const updatedate = `${year}-${month}-${day}`; 

      const emailStream = await createSshTunnel(sshTunnelConfig, dbServer);
      const emailCheckQuery = `SELECT email1 FROM membership WHERE email1 = '${email}' AND id != ${id}`;
      const existingUser = await queryDatabase(emailCheckQuery, emailStream);

      if (existingUser.length > 0) {
        return res.status(500).json({ message: 'Email already exists' });
      }else{
        const sqlQuery = `UPDATE membership SET title1='${title}',fname1='${fname}',sname1='${sname}',passport1='${passport}',relation='${relation}',telephone1='${phonehome}',telephone2='${phonework}',cellphone1='${cellphone}',email1='${email}', dob1='${dob}',updatedate='${updatedate}' WHERE id=${id}`;   				
        
        await queryDatabase(sqlQuery,stream);   			 			       
        res.status(200).json({ message: 'Non-Diving family records updated successfully' });     
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

// update annual bank details
app.post('/update_annual_bank/:id', async (req, res) => { 
  const id = req.params.id; 
  const data = req.body;  

  const stream = await createSshTunnel(sshTunnelConfig, dbServer);	   
  const sqlQuery = `SELECT * FROM membership WHERE id=${id}`;	     	    
  const result = await queryDatabase(sqlQuery, stream);			
  
  
  if (!data.pay_method || data.pay_method === "") {  
    return res.status(500).json({ error: 'Payment Method is required','error_field':'pay_method' });    
  }     
  else if (!data.account_holder || data.account_holder === "") {  
    return res.status(500).json({ error: 'Account holder is required','error_field':'account_holder' });        
  }  
  else if (!data.account_type || data.account_type === "") {  
    return res.status(500).json({ error: 'Account Type is required','error_field':'account_type' });        
  }   
  else if (!data.account_no || data.account_no === "") {  
    return res.status(500).json({ error: 'Account No is required','error_field':'account_no' });        
  }   
  else if (!data.card_expiry || data.card_expiry === "") {  
    return res.status(500).json({ error: 'Card Expiry is required','error_field':'card_expiry' });        
  }  
  
  if(result.length==1)  
  {
	  try {  

		  // Establish SSH tunnel
      const stream = await createSshTunnel(sshTunnelConfig, dbServer);   

      const pay_method=(typeof data.pay_method=="undefined" || data.pay_method== null)?'':data.pay_method;  	 
      const pay_period=(typeof data.pay_period=="undefined" || data.pay_period== null)?0:data.pay_period;    	 
      const account_holder=(typeof data.account_holder=="undefined" || data.account_holder== null)?'':data.account_holder;  	 
      const institute=(typeof data.institute=="undefined" || data.institute== null)?'':data.institute;  	 
      const account_type=(typeof data.account_type=="undefined" || data.account_type== null)?'':data.account_type;  	
      const account_no=(typeof data.account_no=="undefined" || data.account_no== null)?'':data.account_no;  	  
      const cardExpiry=(typeof data.card_expiry=="undefined" || data.card_expiry== null)?'0000:00:00':data.card_expiry;    
      const branch=(typeof data.branch=="undefined" || data.branch== null)?'':data.branch;  	
      const branch_code=(typeof data.branch_code=="undefined" || data.branch_code== null)?'':data.branch_code;  	 
      const authorise_sign=(typeof data.authorise_sign=="undefined" || data.authorise_sign==false)?0:1; 
      const debt=(typeof data.debt=="undefined" || data.debt==false)?0:1;    
  
      const date = new Date();
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
      const year = date.getFullYear();
      const updateDate = `${year}-${month}-${day}`;
  		
		const sqlQuery = `UPDATE membership SET updatedate='${updateDate}',pay_method='${pay_method}',pay_period='${pay_period}',account_holder='${account_holder}',institute='${institute}',branch='${branch}',branch_code='${branch_code}',account_type='${account_type}',account_no='${account_no}',authorise_sign='${authorise_sign}',debt='${debt}',card_expiry='${cardExpiry}' WHERE id=${id}`;   		
					 
		const result = await queryDatabase(sqlQuery,stream);      		    
		res.status(200).json({ message: 'Annual Bank details updated successfully' });     					  			 		  	    		 		
		 
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

// fetch student_members instuctor_id for annual
app.get('/fetch_studAnnual/:instructor_id', async (req, res) => { 
  const instructor_id = req.params.instructor_id;		 
  try {
    const stream = await createSshTunnel(sshTunnelConfig, dbServer);		
    const sqlQuery = `SELECT * FROM membership WHERE parent_id=${instructor_id} AND mem_add='student'`;	         	    
    const results = await queryDatabase(sqlQuery, stream);		  		
    res.status(200).json(results);   
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from database: ' + error.message });		    	
  }
}) 

app.post('/add_stud_annual', async (req, res) => {			
  const data = req.body;		
  const stream = await createSshTunnel(sshTunnelConfig, dbServer);	    
  const sqlQuery = 'SELECT (IFNULL(MAX(id),0)+1) AS max_id FROM membership';	   	  
  const result = await queryDatabase(sqlQuery, stream);	       

  if (!data.studAnnual_title || data.studAnnual_title === "") {
    return res.status(500).json({ error: 'Title is required','error_field':'studAnnual_title' });
  }else if (!data.studAnnual_fname || data.studAnnual_fname === "") {
    return res.status(500).json({ error: 'First Name is required','error_field':'studAnnual_fname' });
  }
  else if (!data.studAnnual_sname || data.studAnnual_sname === "") {
    return res.status(500).json({ error: 'Last Name is required','error_field':'studAnnual_sname' });
  } else if (!data.studAnnual_dob || data.studAnnual_dob === "") {
    return res.status(500).json({ error: 'Date of birth is required','error_field':'studAnnual_dob' });		
  } 
  else if (!data.studAnnual_address1 || data.studAnnual_address1 === "") {
    return res.status(500).json({ error: 'Postal address is required','error_field':'studAnnual_address1' });		
  } 
  else if (!data.studAnnual_city || data.studAnnual_city === "") {
    return res.status(500).json({ error: 'City is required','error_field':'studAnnual_city' });		
  }
  else if (!data.studAnnual_province || data.studAnnual_province === "") {
    return res.status(500).json({ error: 'State/Province is required','error_field':'studAnnual_province' });		
  }
  else if (!data.studAnnual_post || data.studAnnual_post === "") {
    return res.status(500).json({ error: 'Postal Code is required','error_field':'studAnnual_post' });		
  }
  else if (!data.studAnnual_country || data.studAnnual_country === "") {
    return res.status(500).json({ error: 'Country is required','error_field':'studAnnual_country' });		
  }
  
  else if (!data.studAnnual_cellphone || data.studAnnual_cellphone === "") {
    return res.status(500).json({ error: 'Cell phone is required','error_field':'studAnnual_cellphone' });		
  } else if (!data.studAnnual_email || data.studAnnual_email === "") {
    return res.status(500).json({ error: 'Email is required','error_field':'studAnnual_email' });		
  }else if (!data.studAnnual_aid || data.studAnnual_aid === "") {
    return res.status(500).json({ error: 'Medical aid is required','error_field':'studAnnual_aid' });
  }
  else if (!data.studAnnual_aid_no || data.studAnnual_aid_no === "") {
    return res.status(500).json({ error: 'Medical aid no. is required','error_field':'studAnnual_aid_no' });		
  }
  else if (!data.studAnnual_course || data.studAnnual_course === "") {
    return res.status(500).json({ error: 'Course start date is required','error_field':'studAnnual_course' });		
  }  

  try {
    // Establish SSH tunnel
      const stream = await createSshTunnel(sshTunnelConfig, dbServer);  
      const randomNo = Math.floor(Math.random() * 1000); // Generate a random number
      const memberNO = `DANT ${randomNo}`; // Generate member_id with a random number   	 
         
      const instructor_id=(typeof data.instructor_id=="undefined")?'':data.instructor_id;    
      const studAnnual_title=(typeof data.studAnnual_title=="undefined")?'':data.studAnnual_title;  	
			const studAnnual_fname=(typeof data.studAnnual_fname=="undefined")?'':data.studAnnual_fname;    
			const studAnnual_sname=(typeof data.studAnnual_sname=="undefined")?'':data.studAnnual_sname;  
			const studAnnual_dob=(typeof data.studAnnual_dob=="undefined" || data.studAnnual_dob== null)?'0000:00:00':data.studAnnual_dob;    	
			const studAnnual_passport=(typeof data.studAnnual_passport=="undefined")?'':data.studAnnual_passport;  
			const studAnnual_address1=(typeof data.studAnnual_address1=="undefined")?'':data.studAnnual_address1;  	
			const studAnnual_address2=(typeof data.studAnnual_address2=="undefined")?'':data.studAnnual_address2;  	
			const studAnnual_city=(typeof data.studAnnual_city=="undefined")?'':data.studAnnual_city;  	
			const studAnnual_province=(typeof data.studAnnual_province=="undefined")?'':data.studAnnual_province;  	
			const studAnnual_post=(typeof data.studAnnual_post=="undefined")?'':data.studAnnual_post;  	
			const studAnnual_country=(typeof data.studAnnual_country=="undefined")?'':data.studAnnual_country; 
			const studAnnual_home=(typeof data.studAnnual_home=="undefined")?'':data.studAnnual_home;  	    	
			const studAnnual_cellphone=(typeof data.studAnnual_cellphone=="undefined")?'':data.studAnnual_cellphone;      
			const studAnnual_email=(typeof data.studAnnual_email=="undefined")?'':data.studAnnual_email;        	
			const studAnnual_aid=(typeof data.studAnnual_aid=="undefined")?'':data.studAnnual_aid;    
			const studAnnual_aid_no=(typeof data.studAnnual_aid_no=="undefined")?'':data.studAnnual_aid_no;     	  
      const studAnnual_course=(typeof data.studAnnual_course=="undefined" || data.studAnnual_course== null)?'0000:00:00':data.studAnnual_course; 
	
      const emailStream = await createSshTunnel(sshTunnelConfig, dbServer);
      const emailCheckQuery = `SELECT email1 FROM membership WHERE email1 = '${studAnnual_email}'`;
      const existingUser = await queryDatabase(emailCheckQuery, emailStream);

      if (existingUser.length > 0) {
        return res.status(500).json({ message: 'Email already exists' });
      }
      else{
        const sqlQuery = `INSERT INTO membership (parent_id,title1,fname1,sname1,dob1,passport1,medical_aid,medical_aid_no,startdate,address1,address2,city1,province1,postcode1,country1,telephone1,telephone2,cellphone1,fax,email1,member_no,verifyEmail,verifyAmount,choose_membership,mem_add) VALUES ('${instructor_id}','${studAnnual_title}','${studAnnual_fname}','${studAnnual_sname}','${studAnnual_dob}','${studAnnual_passport}','${studAnnual_aid}','${studAnnual_aid_no}','${studAnnual_course}','${studAnnual_address1}','${studAnnual_address2}','${studAnnual_city}','${studAnnual_province}','${studAnnual_post}','${studAnnual_country}','${studAnnual_home}','','${studAnnual_cellphone}','','${studAnnual_email}','${memberNO}','not_verified','not_paid','student','student')`;  
        
        await queryDatabase(sqlQuery,stream);   	        

        // Send a success response
        res.status(200).json({ message: 'Student members data added successfully' });   					  		
      }
  } catch (error) {
    // Handle database or other errors 	  		
    console.error('Error adding data to the database:', error);
    res.status(500).json({ error: error });
  }
}); 


// register save data to membership table
app.post('/annual_register', async (req, res) => {            
  const data = req.body;                                           

  try {
    // Establish SSH tunnel
    const stream = await createSshTunnel(sshTunnelConfig, dbServer);
    const randomNo = Math.floor(Math.random() * 1000); // Generate a random number
    
    // Insert data into the database  
    const title=(typeof data.title=="undefined")?'':data.title;  	
    const first_name=(typeof data.first_name=="undefined")?'':data.first_name;    
    const last_name=(typeof data.last_name=="undefined")?'':data.last_name;  	
    const dob=(typeof data.dob=="undefined" || data.dob=='' || data.dob== null)?'0000-00-00':data.dob;  
    const passport_no=(typeof data.passport=="undefined")?'':data.passport;   
    const street=(typeof data.street=="undefined")?'':data.street;   
    const city=(typeof data.city=="undefined")?'':data.city; 
    const state=(typeof data.state=="undefined")?'':data.state;  	
    const postal_code=(typeof data.postal_code=="undefined")?'':data.postal_code;    
    const tel_home=(typeof data.tel_home=="undefined")?'':data.tel_home;   
    const tel_work=(typeof data.tel_work=="undefined")?'':data.tel_work;   
    const cell_phone=(typeof data.cell_phone=="undefined")?'':data.cell_phone;    
    const email_address=(typeof data.email_address=="undefined")?'':data.email_address;  	  
    const country=(typeof data.country=="undefined")?'':data.country;   
    const qualification=(typeof data.qualification=="undefined")?'':data.qualification;  	   	
    const agency=(typeof data.agency=="undefined")?'':data.agency;  	 
    const working_as=(typeof data.working_as=="undefined")?'':data.working_as;  	 	
    const diver_type=(typeof data.diver_type=="undefined")?'':data.diver_type;   
    const ref_dive_centre=(typeof data.ref_dive_centre=="undefined")?'':data.ref_dive_centre;  
    const ref_dive_instructor=(typeof data.ref_dive_instructor=="undefined")?'':data.ref_dive_instructor;  
    const aid=(typeof data.aid=="undefined")?'':data.aid;  
    const aid_no=(typeof data.aid_no=="undefined")?'':data.aid_no;    	
    const medication=(typeof data.medication=="undefined")?'':data.medication;    
    const chronic_ill=(typeof data.chronic_ill=="undefined")?'':data.chronic_ill; 
    const start_date=(typeof data.start_date=="undefined" || data.start_date=='' || data.start_date== null)?'0000:00:00':data.start_date;   
    const package_name=(typeof data.package_name=="undefined")?'':data.package_name;  	 	
    const members_add=(typeof data.members_add=="undefined")?'':data.members_add;  
    const payment_opt=(typeof data.payment_opt=="undefined")?'':data.payment_opt;      
    const new_pwd = generateRandomPassword(Math.floor(Math.random() * 2) + 6);           	
    //const package_price=(typeof data.package_price=="undefined")?'':data.package_price; 
	//const package_for=(typeof data.package_for=="undefined")?'':data.package_for;  	 
	
    const kin_title=(typeof data.kin_title=="undefined")?'':data.kin_title;  	
    const kin_fname=(typeof data.kin_fname=="undefined")?'':data.kin_fname;  	  
    const kin_sname=(typeof data.kin_sname=="undefined")?'':data.kin_sname;  
    const kin_dob=(typeof data.kin_dob=="undefined" || data.kin_dob=='' || data.kin_dob== null)?'0000-00-00':data.kin_dob;  
    const kin_passport=(typeof data.kin_passport=="undefined")?'':data.kin_passport;  
    const kin_street=(typeof data.kin_street=="undefined")?'':data.kin_street;  
    const kin_city=(typeof data.kin_city=="undefined")?'':data.kin_city;  
    const kin_state=(typeof data.kin_state=="undefined")?'':data.kin_state;  
    const kin_postal_code=(typeof data.kin_postal_code=="undefined")?'':data.kin_postal_code;  	
    const kin_home=(typeof data.kin_home=="undefined")?'':data.kin_home;  
    const kin_work=(typeof data.kin_work=="undefined")?'':data.kin_work;    
    const kin_mobile=(typeof data.kin_mobile=="undefined")?'':data.kin_mobile;  
    const kin_email_address=(typeof data.kin_email_address=="undefined")?'':data.kin_email_address;    
    const kin_relation=(typeof data.kin_relation=="undefined")?'':data.kin_relation;        	
    const choose_membership='annual';   	   

    let memberPrefix = ''; // Initialize member prefix
    let price = '';
    // Check package_name to determine the member prefix
    if(choose_membership === 'annual'){
      if (package_name === 'Standard') {
          memberPrefix = 'DANS';
          price = 1940;
      } else if (package_name === 'Plus') {
          memberPrefix = 'DANP';
          price = 2395;
      } else if (package_name === 'Master Dive Pro') {
          memberPrefix = 'DANM';
          price = 2565;
      }else if (package_name === 'Master Tech') {
        memberPrefix = 'DANX';
        price = 2735;
      }else if (package_name === 'Master Freediver Pro') {
        memberPrefix = 'DANF';
        price = 2565;
      }
    }else if(choose_membership === 'student'){
      memberPrefix = `DANT`;
    }
    else if(choose_membership === 'temporary'){
      memberPrefix = `DANE`;
    }
    else if(choose_membership === 'commercial'){
      if (package_name === 'individual') {
        memberPrefix = 'DANCI';
      } else if (package_name === 'professional') {
          memberPrefix = 'DANCP';
      } else if (package_name === 'company') {
          memberPrefix = 'DANCC';
      }else if (package_name === 'student') {
        memberPrefix = 'DANCS';
      }
    }
    
    const memberNO = `${memberPrefix} ${randomNo}`; // Generate random number and the determined prefix
    const package_price = `${price}`;

    // Check if the email already exists in the database
    const emailStream = await createSshTunnel(sshTunnelConfig, dbServer);
    const emailCheckQuery = `SELECT email1 FROM membership WHERE email1 = '${email_address}'`;
    const existingUser = await queryDatabase(emailCheckQuery, emailStream);

    if (existingUser.length > 0) {        
	  return res.status(500).json({ error: 'Email already exist','error_field':'email_address' });	  
    }
    else{  	    

	  const sqlQuery = `INSERT INTO membership (title1,fname1,sname1,dob1,passport1,address1,city1,province1,postcode1,telephone1,telephone2,cellphone1,email1,country1,qualification,agency,working_as,diver_type,company_name,contact_person,medical_aid,medical_aid_no,medication,chronic_ill,startdate,package_name,
	  membership_slot,pay_method,password,choose_membership,member_no,title2,fname2,sname2,dob2,passport2,address2,city2,province2,postcode2,telephone3,telephone4,cellphone2,email2,relation,package_for,package_price,verifyEmail,verifyAmount,status1) 
	  VALUES ('${title}','${first_name}','${last_name}','${dob}','${passport_no}','${street}','${city}','${state}','${postal_code}','${tel_home}','${tel_work}','${cell_phone}','${email_address}','${country}','${qualification}','${agency}','${working_as}','${diver_type}','${ref_dive_centre}','${ref_dive_instructor}', '${aid}','${aid_no}','${medication}','${chronic_ill}','${start_date}','${package_name}','${members_add}','${payment_opt}','${new_pwd}','${choose_membership}','${memberNO}','${kin_title}','${kin_fname}','${kin_sname}','${kin_dob}','${kin_passport}','${kin_street}','${kin_city}','${kin_state}','${kin_postal_code}','${kin_home}','${kin_work}','${kin_mobile}','${kin_email_address}','${kin_relation}','year','${package_price}','verified','not_paid','INACTIVE')`;      	
	  
	  const result = await queryDatabase(sqlQuery,stream);   				  		 		
	  const insert_id = result.insertId; 
	  
	   if(insert_id >0)			   
		{
			// Send a success response	 			
			for(var i=1;i<=4;i++)
			{ 				
				const family_title=(typeof data[`family_title${i}`]=="undefined")?'':data[`family_title${i}`];  	
				const family_package=(typeof data[`family_packageName${i}`]=="undefined")?'':data[`family_packageName${i}`];  				
				const family_fname=(typeof data[`family_fname${i}`]=="undefined")?'':data[`family_fname${i}`];  
				const family_sname=(typeof data[`family_sname${i}`]=="undefined")?'':data[`family_sname${i}`];  
				const family_dob=(typeof data[`family_dob${i}`]=="undefined" || data[`family_dob${i}`]=='' || data[`family_dob${i}`]== null)?'0000-00-00':data[`family_dob${i}`];  
				const family_passport=(typeof data[`family_passport${i}`]=="undefined")?'':data[`family_passport${i}`];  
				const family_email=(typeof data[`family_email${i}`]=="undefined")?'':data[`family_email${i}`];  
				const family_phone=(typeof data[`family_phone${i}`]=="undefined")?'':data[`family_phone${i}`];  				
				const family_diver=(typeof data[`family_diver${i}`]=="undefined")?'':data[`family_diver${i}`];  
				const family_type = (family_diver=='Yes')?'diver':'non_diver';											

				const diver_type=(typeof data[`diver_type${i}`]=="undefined")?'':data[`diver_type${i}`];  
				const family_workingAs=(typeof data[`family_workingAs${i}`]=="undefined")?'':data[`family_workingAs${i}`];  	
				
				const family_medication=(typeof data[`family_medication${i}`]=="undefined")?'':data[`family_medication${i}`]; 
				const family_chronic=(typeof data[`family_chronic${i}`]=="undefined")?'':data[`family_chronic${i}`];   
        const family_pwd = generateRandomPassword(Math.floor(Math.random() * 2) + 6);           	


        let memberPrefix2 = ''; // Initialize member prefix
        let price2 = '';

        if (family_package === 'Standard') {
          memberPrefix2 = 'DANS';
          price2 = 1940;
        } else if (family_package === 'Plus') {
            memberPrefix2 = 'DANP';
            price2 = 2395;
        } else if (family_package === 'Master Dive Pro') {
            memberPrefix2 = 'DANM';
            price2 = 2565;
        }else if (family_package === 'Master Tech') {
          memberPrefix2 = 'DANX';
          price2 = 2735;
        }else if (family_package === 'Master Freediver Pro') {
          memberPrefix2 = 'DANF';
          price2 = 2565;
        }

        const memberNO2 = `${memberPrefix2} ${randomNo}`; // Generate random number and the determined prefix
        const family_price = `${price2}`;
				
				const stream = await createSshTunnel(sshTunnelConfig,dbServer);  

				if(family_title !='' || family_package !='' || family_fname !='' || family_sname !='' || family_dob !='0000-00-00' || family_passport !='' || family_email !='' || family_phone !='' || family_diver !='' || diver_type !='' || family_workingAs !='' || family_medication !='' || family_chronic !='')
				{
					const sqlQuery = `INSERT INTO membership (parent_id,title1,package_name,membertype,fname1,sname1,dob1,passport1,email1,cellphone1,permission,diver_type,working_as,medication,chronic_ill,choose_membership,package_for,package_price,verifyEmail,verifyAmount,status1,member_no,password) 
					VALUES ('${insert_id}','${family_title}','${family_package}','${family_type}','${family_fname}','${family_sname}','${family_dob}','${family_passport}','${family_email}','${family_phone}','${family_diver}','${diver_type}','${family_workingAs}','${family_medication}','${family_chronic}','annual','year','${family_price}','verified','paid','ACTIVE','${memberNO2}','${family_pwd}')`;               
				
					await queryDatabase(sqlQuery,stream); 			  
				}
				  				
			} 	 	
		  sendForgotEmail(email_address, new_pwd);	 
			res.status(200).json({ message: 'Members registered successfully. Check your email for verification.' });  
		} 
		else
		{
			res.status(500).json({ error: 'Record could not inserted!' });  	            
		} 	 
		
      
    }
	 
  } catch (error) {
    // Handle database or other errors 	  		
    console.error('Error adding data to the database:', error);
    res.status(500).json({ error: error });
  } 
});


app.post('/update_stud_annual/:id', async (req, res) => {			
  const id = req.params.id; 
  const data = req.body;  
  
  const stream = await createSshTunnel(sshTunnelConfig, dbServer);	 
  const sqlQuery = `SELECT * FROM membership WHERE id=${id}`;	     	    
  const result = await queryDatabase(sqlQuery, stream);	       

  if (!data.studAnnual_title || data.studAnnual_title === "") {
    return res.status(500).json({ error: 'Title is required','error_field':'studAnnual_title' });
  }else if (!data.studAnnual_fname || data.studAnnual_fname === "") {
    return res.status(500).json({ error: 'First Name is required','error_field':'studAnnual_fname' });
  }
  else if (!data.studAnnual_sname || data.studAnnual_sname === "") {
    return res.status(500).json({ error: 'Last Name is required','error_field':'studAnnual_sname' });
  } else if (!data.studAnnual_dob || data.studAnnual_dob === "") {
    return res.status(500).json({ error: 'Date of birth is required','error_field':'studAnnual_dob' });		
  } 
  else if (!data.studAnnual_address1 || data.studAnnual_address1 === "") {
    return res.status(500).json({ error: 'Postal address is required','error_field':'studAnnual_address1' });		
  } 
  else if (!data.studAnnual_city || data.studAnnual_city === "") {
    return res.status(500).json({ error: 'City is required','error_field':'studAnnual_city' });		
  }
  else if (!data.studAnnual_province || data.studAnnual_province === "") {
    return res.status(500).json({ error: 'State/Province is required','error_field':'studAnnual_province' });		
  }
  else if (!data.studAnnual_post || data.studAnnual_post === "") {
    return res.status(500).json({ error: 'Postal Code is required','error_field':'studAnnual_post' });		
  }
  else if (!data.studAnnual_country || data.studAnnual_country === "") {
    return res.status(500).json({ error: 'Country is required','error_field':'studAnnual_country' });		
  }
  
  else if (!data.studAnnual_cellphone || data.studAnnual_cellphone === "") {
    return res.status(500).json({ error: 'Cell phone is required','error_field':'studAnnual_cellphone' });		
  } else if (!data.studAnnual_email || data.studAnnual_email === "") {
    return res.status(500).json({ error: 'Email is required','error_field':'studAnnual_email' });		
  }else if (!data.studAnnual_aid || data.studAnnual_aid === "") {
    return res.status(500).json({ error: 'Medical aid is required','error_field':'studAnnual_aid' });
  }
  else if (!data.studAnnual_aid_no || data.studAnnual_aid_no === "") {
    return res.status(500).json({ error: 'Medical aid no. is required','error_field':'studAnnual_aid_no' });		
  }
  else if (!data.studAnnual_course || data.studAnnual_course === "") {
    return res.status(500).json({ error: 'Course start date is required','error_field':'studAnnual_course' });		
  }  

  if(result.length==1){
    try {
      // Establish SSH tunnel
        const stream = await createSshTunnel(sshTunnelConfig, dbServer);  	 
            
        const studAnnual_title=(typeof data.studAnnual_title=="undefined")?'':data.studAnnual_title;  	
        const studAnnual_fname=(typeof data.studAnnual_fname=="undefined")?'':data.studAnnual_fname;    
        const studAnnual_sname=(typeof data.studAnnual_sname=="undefined")?'':data.studAnnual_sname;  
        const studAnnual_dob=(typeof data.studAnnual_dob=="undefined" || data.studAnnual_dob== null)?'0000:00:00':data.studAnnual_dob;    	
        const studAnnual_passport=(typeof data.studAnnual_passport=="undefined")?'':data.studAnnual_passport;  
        const studAnnual_address1=(typeof data.studAnnual_address1=="undefined")?'':data.studAnnual_address1;  	
        const studAnnual_address2=(typeof data.studAnnual_address2=="undefined")?'':data.studAnnual_address2;  	
        const studAnnual_city=(typeof data.studAnnual_city=="undefined")?'':data.studAnnual_city;  	
        const studAnnual_province=(typeof data.studAnnual_province=="undefined")?'':data.studAnnual_province;  	
        const studAnnual_post=(typeof data.studAnnual_post=="undefined")?'':data.studAnnual_post;  	
        const studAnnual_country=(typeof data.studAnnual_country=="undefined")?'':data.studAnnual_country; 
        const studAnnual_home=(typeof data.studAnnual_home=="undefined")?'':data.studAnnual_home;  	    	
        const studAnnual_cellphone=(typeof data.studAnnual_cellphone=="undefined")?'':data.studAnnual_cellphone;      
        const studAnnual_email=(typeof data.studAnnual_email=="undefined")?'':data.studAnnual_email;        	
        const studAnnual_aid=(typeof data.studAnnual_aid=="undefined")?'':data.studAnnual_aid;    
        const studAnnual_aid_no=(typeof data.studAnnual_aid_no=="undefined")?'':data.studAnnual_aid_no;     	  
        const studAnnual_course=(typeof data.studAnnual_course=="undefined" || data.studAnnual_course== null)?'0000:00:00':data.studAnnual_course; 
    
        const emailStream = await createSshTunnel(sshTunnelConfig, dbServer);
        const emailCheckQuery = `SELECT email1 FROM membership WHERE email1 = '${studAnnual_email}' AND id != ${id}`;
        const existingUser = await queryDatabase(emailCheckQuery, emailStream);

        if (existingUser.length > 0) {
          return res.status(500).json({ message: 'Email already exists' });
        }
        else{

          const sqlQuery = `UPDATE membership SET title1='${studAnnual_title}',fname1='${studAnnual_fname}',sname1='${studAnnual_sname}',dob1='${studAnnual_dob}',passport1='${studAnnual_passport}',medical_aid='${studAnnual_aid}',medical_aid_no='${studAnnual_aid_no}',startdate='${studAnnual_course}',address1='${studAnnual_address1}',address2='${studAnnual_address2}',city1='${studAnnual_city}',province1='${studAnnual_province}',postcode1='${studAnnual_post}',country1= '${studAnnual_country}',telephone1='${studAnnual_home}',cellphone1='${studAnnual_cellphone}',email1='${studAnnual_email}' WHERE id = ${id}`; 
          
          await queryDatabase(sqlQuery,stream);   	        

          // Send a success response
          res.status(200).json({ message: 'Student members data updated successfully' });   					  		
        }
    } catch (error) {
      // Handle database or other errors 	  		
      console.error('Error adding data to the database:', error);
      res.status(500).json({ error: error });
    }
  }else{
      return res.status(500).json({ error:'Record not found!' });		  				
  }
}); 


// update membership package to DANM or DANX
app.post('/update_annual_package/:id', async (req, res) => { 
  const id = req.params.id;    
  const data = req.body;  

  const stream = await createSshTunnel(sshTunnelConfig, dbServer);	   
  const sqlQuery = `SELECT * FROM membership WHERE id=${id}`;	     	    
  const result = await queryDatabase(sqlQuery, stream);			
  
  if (!data.member_choose || data.member_choose === "") {
    return res.status(500).json({ error: 'Choose membership is required','error_field':'member_choose' });
  }else if (!data.pack_for || data.pack_for === "") {
    return res.status(500).json({ error: 'Package for is required','error_field':'pack_for' });
  }
  else if (!data.pay_type || data.pay_type === "") {
    return res.status(500).json({ error: 'Payment Type is required','error_field':'pay_type' });
  } 

  
  
  if(result.length==1)  
  {
	  try {  

		// Establish SSH tunnel
        const stream = await createSshTunnel(sshTunnelConfig, dbServer); 		
        const randomNo = Math.floor(Math.random() * 1000); // Generate a random number

		    const member_choose=(typeof data.member_choose=="undefined")?'':data.member_choose;  	
        const pack_for=(typeof data.pack_for=="undefined")?'':data.pack_for;    
        const price=(typeof data.price=="undefined")?'':data.price;  

        let memberPrefix = ''; // Initialize member prefix
        // Check package_name to determine the member prefix
        if (member_choose === 'Master Dive Pro') {
            memberPrefix = 'DANM';
        }else if (member_choose === 'Master Tech') {
          memberPrefix = 'DANX';
        }
        
        const memberNO = `${memberPrefix} ${randomNo}`;

		    const sqlQuery = `UPDATE membership SET package_name='${member_choose}',package_for='${pack_for}',package_price='${price}', member_no='${memberNO}' WHERE id = ${id}`; 
          
        await queryDatabase(sqlQuery,stream);  
		  
		res.status(200).json({ message: 'Annual member upgraded successfully' });     		       	    		 		
		 
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
// end annual queries

// commercial queries start
app.get('/edit_commercial/:id', async (req, res) => { 
  const id = req.params.id;		 
  try {
    const stream = await createSshTunnel(sshTunnelConfig, dbServer);		
    const sqlQuery = `SELECT * FROM commercial_members WHERE id=${id}`;	         	    
    const results = await queryDatabase(sqlQuery, stream);		  		
    res.status(200).json(results);   
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from database: ' + error.message });		    	
  }
}) 

// temporary Queries Start
app.get('/edit_temporary_kinInfo/:id', async (req, res) => { 
  const id = req.params.id;		 
  try {
    const stream = await createSshTunnel(sshTunnelConfig, dbServer);		
    const sqlQuery = `SELECT * FROM temporary_members WHERE id=${id}`;	         	    
    const results = await queryDatabase(sqlQuery, stream);		  		
    res.status(200).json(results);   
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from database: ' + error.message });		    	
  }
})  

app.post('/update_temporary_kin/:id', async (req, res) => { 
  const id = req.params.id; 
  const data = req.body;  

  const stream = await createSshTunnel(sshTunnelConfig, dbServer);	   
  const sqlQuery = `SELECT * FROM membership WHERE id=${id}`;	     	    
  const result = await queryDatabase(sqlQuery, stream);			
  
  if (!data.kin_title || data.kin_title === "") {  
    return res.status(500).json({ error: 'Title is required','error_field':'kin_title' });        
  }   
  else if (!data.kin_fname || data.kin_fname === "") {  
    return res.status(500).json({ error: 'First name is required','error_field':'kin_fname' });        
  } else if (!data.kin_sname || data.kin_sname === "") {  
    return res.status(500).json({ error: 'Last name is required','error_field':'kin_sname' });        
  }   
  else if (!data.kin_dob || data.kin_dob === "") {  
    return res.status(500).json({ error: 'Date of birth is required','error_field':'kin_dob' });        
  }   
  else if (!data.kin_address1 || data.kin_address1 === "") {  
    return res.status(500).json({ error: 'Postal address is required','error_field':'kin_address1' });        
  } 
  else if (!data.kin_city || data.kin_city === "") {  
    return res.status(500).json({ error: 'City is required','error_field':'kin_city' });        
  } 
  else if (!data.kin_province || data.kin_province === "") {  
    return res.status(500).json({ error: 'State/Province is required','error_field':'kin_province' });        
  } 
  else if (!data.kin_post || data.kin_post === "") {  
    return res.status(500).json({ error: 'Postal Code is required','error_field':'kin_post' });        
  }   
  else if (!data.kin_country || data.kin_country === "") {  
    return res.status(500).json({ error: 'Country is required','error_field':'kin_country' });        
  }   
  else if (!data.kin_phone || data.kin_phone === "") {  
    return res.status(500).json({ error: 'Cell phone is required','error_field':'kin_phone' });        
  }   
  else if (!data.kin_email || data.kin_email === "") {  
    return res.status(500).json({ error: 'Email is required','error_field':'kin_email' });        
  }
  else if (!data.kin_relation || data.kin_relation === "") {  
    return res.status(500).json({ error: 'Relationship is required','error_field':'kin_relation' });    
  }     

  if(result.length==1)  
  {
	  try {  

		// Establish SSH tunnel
    const stream = await createSshTunnel(sshTunnelConfig, dbServer);   

		const kinTitle=(typeof data.kin_title=="undefined" || data.kin_title== null)?'':data.kin_title;    	
		const kinFirstName=(typeof data.kin_fname=="undefined" || data.kin_fname== null)?'':data.kin_fname;  	
		const kinSurName=(typeof data.kin_sname=="undefined" || data.kin_sname== null)?'':data.kin_sname;    
		const kinDob=(typeof data.kin_dob=="undefined" || data.kin_dob== null)?'0000:00:00':data.kin_dob;  	
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
  		
		const sqlQuery = `UPDATE membership SET title2='${kinTitle}',fname2='${kinFirstName}',sname2='${kinSurName}',passport2='${kinPassport}', address3='${kinAddress1}',address4='${kinAddress2}',city2='${kinCity}',province2='${kinProvince}',postcode2='${kinPostCode}',country2='${kinCountry}',telephone3='${kinTelHome}',telephone4='${kinTelWork}',cellphone2='${kinCellPhone}',email2='${kinEmail}',relation='${relation}', dob2='${kinDob}' WHERE id=${id}`;   		
					 
		await queryDatabase(sqlQuery,stream);      		       
		
		// Send a success response	  		
		res.status(200).json({ message: 'Temporary member records updated successfully' }); 
      	    		 		
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

app.post('/update_temp_membership/:id', async (req, res) => { 
  const id = req.params.id; 
  const data = req.body;  

  const stream = await createSshTunnel(sshTunnelConfig, dbServer);	   
  const sqlQuery = `SELECT * FROM temporary_members WHERE id=${id}`;	     	    
  const result = await queryDatabase(sqlQuery, stream);			
  
	
	if (!data.temp_dive_loc || data.temp_dive_loc === "") {
		return res.status(500).json({ error: 'Dive location is required','error_field':'temp_dive_loc' });		
	}else if (!data.temp_agency || data.temp_agency === "") {
		return res.status(500).json({ error: 'Agency is required','error_field':'temp_agency' });		
	}
	else if (!data.temp_qualification || data.temp_qualification === "") {
		return res.status(500).json({ error: 'Diving qualification is required','error_field':'temp_qualification' });  		
	}   
	else if (!data.temp_start_date || data.temp_start_date === "") {
		return res.status(500).json({ error: 'Start date is required','error_field':'temp_start_date' });		
	} else if (!data.temp_end_date || data.temp_end_date === "") {
		return res.status(500).json({ error: 'Start date is required','error_field':'temp_end_date' });		
	}   
	
  if(result.length==1)  
  {
	  try {  

		  // Establish SSH tunnel
      const stream = await createSshTunnel(sshTunnelConfig,dbServer);    		
      const diveLocation=(typeof data.temp_dive_loc=="undefined")?'':data.temp_dive_loc;    
      const temp_agency=(typeof data.temp_agency=="undefined")?'':data.temp_agency;  
      const freeDiver=(typeof data.temp_spear_dive=="undefined")?'':data.temp_spear_dive;  
      const creationDiver=(typeof data.temp_recr_dive=="undefined")?'':data.temp_recr_dive;  
      const temp_qualification=(typeof data.temp_qualification=="undefined")?'':data.temp_qualification;   	
      const startDate=(typeof data.temp_start_date=="undefined" || data.temp_start_date== null)?'0000:00:00':data.temp_start_date;  
      const endDate=(typeof data.temp_end_date=="undefined" || data.temp_end_date== null)?'0000:00:00':data.temp_end_date;  

      const date = new Date();
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
      const year = date.getFullYear();
      const updateDate = `${year}-${month}-${day}`;
		
		const sqlQuery = `UPDATE temporary_members SET qualification='${temp_qualification}',creational='${creationDiver}',end_date='${endDate}', update_date='${updateDate}',dive_location='${diveLocation}',agency='${temp_agency}', spear_diver='${freeDiver}',start_date='${startDate}' WHERE id=${id}`;   		
		
		const result = await queryDatabase(sqlQuery,stream);    											      
		res.status(200).json({ message: 'Temporary membership records updated successfully' });  				     					  			 		  	
			    		 		
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
// temporary Queries ends



// Handle other routes
app.use((req, res) => {
  res.status(404).send('Not Found');   		
}); 

// Export the app 
module.exports = app;	   