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
	res.send('Cancellation Membership Request');    		
});  

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: emailConfig.service,
  auth: {
    user: emailConfig.user, 
    pass: emailConfig.pass,
  }
});

// Send cancelation request email
function sendCancelRequestEmail(email_address, fname, sname, phone, passport, member_no, more_info) {
  const mailOptions = {
    from: email_address, // Replace with your Gmail address
    to: emailConfig.user,
    subject: 'Membership Cancellation Request',
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
                              <p><strong>Name:</strong> ${fname} ${sname}</p>
                              <p><strong>Email Address:</strong> ${email_address}</p>
                              <p><strong>Phone:</strong> ${phone}</p>
                              <p><strong>DAN Membership No:</strong> ${member_no}</p>
                              <p><strong>Identification/Passport No:</strong> ${passport}</p>
                              <p><strong>Additional Information:</strong> ${more_info}</p>
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

//send feedback of privacy-policy
function sendFeedback(email_address, fname, sname, message) {
  const mailOptions = {
    from: email_address, // Replace with your Gmail address
    to: emailConfig.user,
    subject: 'Feedback',
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
                              <p><strong>Name:</strong> ${fname} ${sname}</p>
                              <p><strong>Email Address:</strong> ${email_address}</p>
                              <p><strong>Message:</strong> ${message}</p>
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

//send feedback of TechnicalDiving
function sendTechnicalDiving(email_address, fname, sname, message, phone) {
  const mailOptions = {
    from: email_address, // Replace with your Gmail address
    to: emailConfig.user,
    subject: 'I Need Help With My Application',
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
                              <p><strong>Name:</strong> ${fname} ${sname}</p>
                              <p><strong>Email Address:</strong> ${email_address}</p>
                              <p><strong>Phone:</strong> ${phone}</p>
                              <p><strong>Message:</strong> ${message}</p>
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


app.post('/add', async (req, res) => {            
  const data = req.body;                                           

  try {
    // Establish SSH tunnel
    const stream = await createSshTunnel(sshTunnelConfig, dbServer);
    
    // Insert data into the database  
    const fname=(typeof data.fname=="undefined")?'':data.fname;    
    const sname=(typeof data.sname=="undefined")?'':data.sname;  	
    const phone=(typeof data.phone=="undefined")?'':data.phone;  
    const email_address=(typeof data.email_address=="undefined")?'':data.email_address;  	
    const member_no=(typeof data.member_no=="undefined")?'':data.member_no;  
    const passport=(typeof data.passport=="undefined" || data.passport== null)?'':data.passport;  		
    const more_info=(typeof data.more_info=="undefined" || data.more_info== null)?'':data.more_info;  	 	
    

    // Check if the email already exists in the database
    const emailStream = await createSshTunnel(sshTunnelConfig, dbServer);
    const emailCheckQuery = `SELECT member_no FROM cancel_request WHERE member_no = '${member_no}'`;
    const existingUser = await queryDatabase(emailCheckQuery, emailStream);

    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'DAN membership no already exists' });
    }
    else{
      const sqlQuery = `INSERT INTO cancel_request (fname,sname,phone,passport,email_address,member_no,more_info) VALUES ('${fname}','${sname}','${phone}','${passport}','${email_address}','${member_no}','${more_info}')`;   

      await queryDatabase(sqlQuery, stream);

      // Send a cancellation request email
      sendCancelRequestEmail(email_address, fname, sname, phone, passport, member_no, more_info);

      // Send a success response
      res.status(200).json({ message: 'Membership Cancellation requested successfully. Please wait until admin approves the request.' });
    }
	 
  } catch (error) {
    // Handle database or other errors 	  		
    console.error('Error adding data to the database:', error);
    res.status(500).json({ error: error });
  } 
});

// privacy-policy
app.post('/addFeedback', async (req, res) => {            
  const data = req.body;                                           

  try {
    // Establish SSH tunnel
    const stream = await createSshTunnel(sshTunnelConfig, dbServer);
    
    // Insert data into the database  
    const fname=(typeof data.fname=="undefined")?'':data.fname;    
    const sname=(typeof data.sname=="undefined")?'':data.sname;  	
    const email_address=(typeof data.email_address=="undefined")?'':data.email_address;  	
    const slug=(typeof data.slug=="undefined")?'':data.slug;  		
    const message=(typeof data.message=="undefined")?'':data.message;  	 	
    

    // Check if the email already exists in the database
    const emailStream = await createSshTunnel(sshTunnelConfig, dbServer);
    const emailCheckQuery = `SELECT email_address FROM feedback WHERE email_address = '${email_address}'`;
    const existingUser = await queryDatabase(emailCheckQuery, emailStream);

    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    else{
      const sqlQuery = `INSERT INTO feedback (fname,sname,email_address,slug,message) VALUES ('${fname}','${sname}', '${email_address}','${slug}','${message}')`;   

      await queryDatabase(sqlQuery, stream);

      // Send a feedback
      sendFeedback(email_address, fname, sname, message);

      // Send a success response
      res.status(200).json({ message: 'Thank you for your valuable feedback! Your insights are important to us and help us improve.' });
    }
	 
  } catch (error) {
    // Handle database or other errors 	  		
    console.error('Error adding data to the database:', error);
    res.status(500).json({ error: error });
  } 
});

// technical-diving
app.post('/addTechnicalDiving', async (req, res) => {            
  const data = req.body;                                           

  try {
    // Establish SSH tunnel
    const stream = await createSshTunnel(sshTunnelConfig, dbServer);
    
    // Insert data into the database  
    const fname=(typeof data.fname=="undefined")?'':data.fname;    
    const sname=(typeof data.sname=="undefined")?'':data.sname;  	
    const email_address=(typeof data.email_address=="undefined")?'':data.email_address; 
    const phone=(typeof data.phone=="undefined")?'':data.phone;  	
    const slug=(typeof data.slug=="undefined")?'':data.slug;  		
    const message=(typeof data.message=="undefined")?'':data.message;  	 	
    

    // Check if the email already exists in the database
    const emailStream = await createSshTunnel(sshTunnelConfig, dbServer);
    const emailCheckQuery = `SELECT email_address FROM feedback WHERE email_address = '${email_address}'`;
    const existingUser = await queryDatabase(emailCheckQuery, emailStream);

    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    else{
      const sqlQuery = `INSERT INTO feedback (fname,sname,email_address,phone,slug,message) VALUES ('${fname}','${sname}', '${email_address}','${phone}','${slug}','${message}')`;   

      await queryDatabase(sqlQuery, stream);

      // Send a feedback
      sendTechnicalDiving(email_address, fname, sname, message,phone);

      // Send a success response
      res.status(200).json({ message: 'Thank you for trusting us. Our team will connect you within 24 hours.' });
    }
	 
  } catch (error) {
    // Handle database or other errors 	  		
    console.error('Error adding data to the database:', error);
    res.status(500).json({ error: error });
  } 
});

// Handle other routes
app.use((req, res) => {
  res.status(404).send('Not Found');   		
}); 

// Export the app 
module.exports = app;	   