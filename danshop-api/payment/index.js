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
	res.send('Hello from App17!');    						
});  

app.post('/create', async (req, res) => {		  	
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
			// Establish SSH tunnel           
			
			const stream = await createSshTunnel(sshTunnelConfig,dbServer);  
			
			if(type=='ANNUAL')  
			{
				const sqlQuery = `UPDATE annual_members SET verifyAmount='paid' WHERE id=${id}`;   	  
				await queryDatabase(sqlQuery,stream);        
			}				
			else if(type=='TEMPORARY')  
			{
				const sqlQuery = `UPDATE temporary_members SET verifyAmount='paid' WHERE id=${id}`;   	
				await queryDatabase(sqlQuery,stream);      	
			}	
			else if(type=='STUDENT')  
			{
				const sqlQuery = `UPDATE student_members SET verifyAmount='paid' WHERE id=${id}`;   
				await queryDatabase(sqlQuery,stream);    	
			}
			else
			{
				const sqlQuery = `UPDATE student_members SET verifyAmount='not_paid' WHERE id=${id}`;   
				await queryDatabase(sqlQuery,stream);    	
			}			 		
			 
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


app.post('/save', async (req, res) => {		    	
  const data = req.body;	 
  const stream = await createSshTunnel(sshTunnelConfig, dbServer);	    
  const sqlQuery = 'SELECT (IFNULL(MAX(id),0)+1) AS max_id FROM student_members';	  	 	  
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
	    const sqlQuery = `SELECT * FROM annual_members where id='${instructor_id}'`;	  	 	  
	    const result = await queryDatabase(sqlQuery, stream);	   
		
	    const pack_name = (result.length>0)?result[0].package_name:'';    
		const pack_price = (result.length>0)?result[0].package_price:0;    
		const pack_for = (result.length>0)?result[0].package_for:'';    
		
		const emailStream = await createSshTunnel(sshTunnelConfig, dbServer);
		const emailCheckQuery = `SELECT * FROM student_members WHERE email = '${studAnnual_email}'`;
		const existingUser = await queryDatabase(emailCheckQuery, emailStream);	    	  

      if (existingUser.length > 0) {          		
		return res.status(500).json({ error: 'Email already exists','error_field':'email_id' });	  	             	
      }
      else{  		
				
		const stream = await createSshTunnel(sshTunnelConfig, dbServer);    
        const sqlQuery = `INSERT INTO student_members (instructor_id,title,first_name,surname,dob,passport,medical_aid,medical_aid_no,start_date,active_date,postal_add1,postal_add2,city,province,postal_code,country,tel_home,tel_work,cell_phone,fax,email,member_no,verifyEmail,verifyAmount,package_name,package_price,package_for) 
		VALUES ('${instructor_id}','${studAnnual_title}','${studAnnual_fname}','${studAnnual_sname}','${studAnnual_dob}','${studAnnual_passport}','${studAnnual_aid}','${studAnnual_aid_no}','${studAnnual_course}','${studAnnual_course}','${studAnnual_address1}','${studAnnual_address2}','${studAnnual_city}','${studAnnual_province}','${studAnnual_post}','${studAnnual_country}','${studAnnual_home}','','${studAnnual_cellphone}','','${studAnnual_email}','${memberNO}','verified','paid','${pack_name}','${pack_price}','${pack_for}')`;  
                
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

app.post('/renewal', async (req, res) => {		  	
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
			  
			  if(type=='ANNUAL')  
			  {
				  const sqlQuery = `UPDATE annual_members SET startdate='${renew_start}' WHERE id=${id}`;   	  
				  await queryDatabase(sqlQuery,stream);        
			  }				
			  else if(type=='TEMPORARY')  
			  {
				  const sqlQuery = `UPDATE temporary_members SET start_date='${renew_start}' WHERE id=${id}`;   	
				  await queryDatabase(sqlQuery,stream);      	
			  }	
			  else if(type=='STUDENT')  
			  {
				  const sqlQuery = `UPDATE student_members SET start_date='${renew_start}' WHERE id=${id}`;   
				  await queryDatabase(sqlQuery,stream);    	
			  }
			  else if(type=='COMMERCIAL')  
			  {
				  const sqlQuery = `UPDATE commercial_members SET start_date='${renew_start}' WHERE id=${id}`;   
				  await queryDatabase(sqlQuery,stream);    	
			  }
			  else
			  {
				res.status(400).json({ error: 'No records found!' });    	
			  }			 		
			   
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

// Handle other routes
app.use((req, res) => {
  res.status(404).send('Not Found');   
}); 

// Export the app 
module.exports = app;	   