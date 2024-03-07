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
	res.send('Hello from App2!');    		
});  

app.get('/get', async (req, res) => {
  try {
    const stream = await createSshTunnel(sshTunnelConfig,dbServer);		
    const sqlQuery = "select p.*,a.fname1,a.sname1 from partner_members p left join annual_members a on p.member_id = a.id";	
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
		query += "SELECT count(*) AS record_count FROM partner_members p left join annual_members a on p.member_id = a.id "+` AND (p.bname LIKE ${text} OR p.bemail LIKE ${text} OR p.status LIKE ${text} OR DATE_FORMAT(p.start_date,"%d/%m/%Y") LIKE ${text})`;      			    
		sqlQuery += "SELECT p.*,a.fname1,a.sname1 from partner_members p left join annual_members a on p.member_id = a.id "+` AND (p.bname LIKE ${text} OR p.bemail LIKE ${text} OR p.status LIKE ${text} OR DATE_FORMAT(p.start_date,"%d/%m/%Y") LIKE ${text}) LIMIT ${start},${end}`;    
	}
	else   
	{
		query += `SELECT count(*) AS record_count FROM partner_members p left join annual_members a on p.member_id = a.id`;	  	  
		sqlQuery += `SELECT p.*,a.fname1,a.sname1 FROM partner_members p left join annual_members a on p.member_id = a.id LIMIT ${start},${end}`;	    			
		
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

app.get('/edit/:id', async (req, res) => { 
  const id = req.params.id;		 
  try {
    const stream = await createSshTunnel(sshTunnelConfig,dbServer);		
    const sqlQuery = `SELECT * FROM partner_members WHERE id=${id}`;	     	    
    const results = await queryDatabase(sqlQuery, stream);			  		
    res.status(200).json(results);   
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from database: ' + error.message });		    	
  }
})  

app.get('/instructors/:id', async (req, res) => {    
  const id = req.params.id;		 
  try {
    const stream = await createSshTunnel(sshTunnelConfig,dbServer);	  	
    const sqlQuery = `SELECT * FROM membership WHERE parent_id=${id} AND UPPER(membertype)='PARTNER_INSTRUCTOR'`;	  					
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
    const sqlQuery = `SELECT c.description,c.created_at,r.title,s.title AS reason_title FROM partner_comments as c left join sub_reasons as s on s.id=c.subreason_id left join main_reasons as r on r.id=s.main_id WHERE c.row_id=${id}`;	     	    
    const results = await queryDatabase(sqlQuery,stream);																  							  		
    res.status(200).json(results);   						
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from database: ' + error.message });		 		   	
  }
}) 		 

app.post('/add', async (req, res) => {			
  const data = req.body;		   

  if (!data.businessName || data.businessName === "") {
    return res.status(500).json({ error: 'Business name is Missing','error_field':'businessName' });
  } else if (!data.businesEmail || data.businesEmail === "") {
    return res.status(500).json({ error: 'Email is Missing','error_field':'businesEmail' });  
  } else if (!data.memberId || data.memberId === "") {
    return res.status(500).json({ error: 'Member profile is Missing','error_field':'memberId' });  
  } else if (!data.infoCity || data.infoCity === "") {
    return res.status(500).json({ error: 'City is Missing','error_field':'infoCity' });
  } else if (!data.infoCountry || data.infoCountry === "") {
    return res.status(500).json({ error: 'Country is Missing','error_field':'infoCountry' });		
  }
  else if (!data.cellPhone || data.cellPhone === "") {
    return res.status(500).json({ error: 'Cell phone is Missing','error_field':'cellPhone' });
  } else if (!data.startDate || data.startDate === "") {
    return res.status(500).json({ error: 'Start date is Missing','error_field':'startDate' });  
  } else if (!data.mainReason || data.mainReason === "") {
    return res.status(500).json({ error: 'Main reason is Missing','error_field':'mainReason' });
  } 
  else if (!data.subReason || data.subReason === "") {
    return res.status(500).json({ error: 'Sub reason is Missing','error_field':'subReason' });  
  } 

  try {
    // Establish SSH tunnel
    const stream = await createSshTunnel(sshTunnelConfig, dbServer);
	
    const dsp=(typeof data.dsp=="undefined" || data.dsp==false || data.dsp== null)?0:1; 
	const hra=(typeof data.hra=="undefined" || data.hra==false || data.hra== null)?0:1; 
	const paid=(typeof data.paid=="undefined" || data.paid==false || data.paid== null)?0:1;      

	const businessName=(typeof data.businessName=="undefined")?'':data.businessName;  	
	const businesEmail=(typeof data.businesEmail=="undefined")?'':data.businesEmail;    
	const contactName=(typeof data.contactName=="undefined")?'':data.contactName;  	
	const webAddress=(typeof data.webAddress=="undefined")?'':data.webAddress;    	
    const memberId=(typeof data.memberId=="undefined")?'':data.memberId;  	
	const infoAddress1=(typeof data.infoAddress1=="undefined")?'':data.infoAddress1;    
	const infoAddress2=(typeof data.infoAddress2=="undefined")?'':data.infoAddress2;  	
	const infoCity=(typeof data.infoCity=="undefined")?'':data.infoCity;   	
	const infoProvince=(typeof data.infoProvince=="undefined")?'':data.infoProvince;  	
	const postCode=(typeof data.postCode=="undefined")?'':data.postCode;   
	
	const infoCountry=(typeof data.infoCountry=="undefined")?'':data.infoCountry;  	
	const telWork=(typeof data.telWork=="undefined")?'':data.telWork;    	
	const cellPhone=(typeof data.cellPhone=="undefined")?'':data.cellPhone;  	
	const fax=(typeof data.fax=="undefined")?'':data.fax;  
	
	const level=(typeof data.level=="undefined")?'':data.level;  	
	const latitude=(typeof data.latitude=="undefined")?'':data.latitude;    	
    const longitude=(typeof data.longitude=="undefined")?'':data.longitude;  	 		
	const status=(typeof data.status=="undefined")?'':data.status;   	
	 	
	const startDate=(typeof data.startDate=="undefined" || data.startDate== null)?'0000:00:00':data.startDate;  

	const mainReason=(typeof data.mainReason=="undefined")?'':data.mainReason;  
	const subReason=(typeof data.subReason=="undefined")?'':data.subReason;  
	const comment=(typeof data.comment=="undefined")?'':data.comment;  	
          
    const sqlQuery = `INSERT INTO partner_members (bname,bemail,cname,waddress,member_id,address1,address2,city,province,postcode,country,telphone,cellphone,fax,dsp,hra,level,start_date,latitude,longitude,status,paid) VALUES 
	('${businessName}','${businesEmail}','${contactName}','${webAddress}','${memberId}','${infoAddress1}','${infoAddress2}','${infoCity}','${infoProvince}','${postCode}','${infoCountry}','${telWork}','${cellPhone}','${fax}','${dsp}','${hra}','${level}','${startDate}','${latitude}','${longitude}','${status}','${paid}')`;		
    
	const result = await queryDatabase(sqlQuery,stream);    		  
	const insert_id = result.insertId;      
	
	if(insert_id >0)	
	{
		// Send a success response	  		
		const stream = await createSshTunnel(sshTunnelConfig, dbServer);   
		const sqlQuery = `INSERT INTO partner_comments (row_id,subreason_id,description) VALUES ('${insert_id}','${subReason}','${comment}')`;               
	
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
  const sqlQuery = `SELECT * FROM partner_members WHERE id=${id}`;	     	    
  const result = await queryDatabase(sqlQuery, stream);			
  
  if (!data.b_name || data.b_name === "") {
    return res.status(500).json({ error: 'Business Name is Missing','error_field':'b_name' });  
  }  
  else if (!data.b_email || data.b_email === "") {  
    return res.status(500).json({ error: 'Email is Missing','error_field':'b_email' });         
  }   
  else if (!data.u_profile || data.u_profile === "") {  
    return res.status(500).json({ error: 'Member profile is Missing','error_field':'u_profile' });        
  }   
  else if (!data.b_city || data.b_city === "") {  
    return res.status(500).json({ error: 'City is Missing','error_field':'b_city' });        
  }   
  else if (!data.b_country || data.b_country === "") {  
    return res.status(500).json({ error: 'Country is Missing','error_field':'b_country' });        
  }   
  else if (!data.cell_phone || data.cell_phone === "") {  
    return res.status(500).json({ error: 'Cell phone is Missing','error_field':'cell_phone' });    		    
  }  
  else if (!data.start_date || data.start_date === "") {  
    return res.status(500).json({ error: 'Start date is Missing','error_field':'start_date' });    		    
  }
  else if (!data.mainReason || data.mainReason === "") {
	return res.status(500).json({ error: 'Main Reason is Missing','error_field':'mainReason' });		
  }
  else if (!data.subReason || data.subReason === "") {
	return res.status(500).json({ error: 'Sub Reason is Missing','error_field':'subReason' });		  		
  }  	  
  
  if(result.length==1)  
  {
	  try {  

		// Establish SSH tunnel
        const stream = await createSshTunnel(sshTunnelConfig, dbServer);      
		 	
		const businessName=(typeof data.b_name=="undefined")?'':data.b_name;  	
		const businesEmail=(typeof data.b_email=="undefined")?'':data.b_email;    
		const contactName=(typeof data.c_person=="undefined")?'':data.c_person;  	
		const webAddress=(typeof data.w_address=="undefined")?'':data.w_address;    	
		const memberId=(typeof data.u_profile=="undefined")?'':data.u_profile;  	
		const infoAddress1=(typeof data.postal_addr1=="undefined")?'':data.postal_addr1;    
		const infoAddress2=(typeof data.postal_addr2=="undefined")?'':data.postal_addr2;    	
		const infoCity=(typeof data.b_city=="undefined")?'':data.b_city;   	
		const infoProvince=(typeof data.province=="undefined")?'':data.province;  	
		const postCode=(typeof data.b_code=="undefined")?'':data.b_code;   		
		const infoCountry=(typeof data.b_country=="undefined")?'':data.b_country;  	
		const telWork=(typeof data.work_tel=="undefined")?'':data.work_tel;    	
		const cellPhone=(typeof data.cell_phone=="undefined")?'':data.cell_phone;  	
		const fax=(typeof data.fax=="undefined")?'':data.fax;  
		
		const level=(typeof data.level=="undefined")?'':data.level;  	
		const latitude=(typeof data.lat=="undefined")?'':data.lat;    	
		const longitude=(typeof data.lng=="undefined")?'':data.lng;  	 		
		const status=(typeof data.status=="undefined")?'':data.status;   

		const dsp=(typeof data.dsp=="undefined" || data.dsp==false || data.dsp== null)?0:1; 	
		const hra=(typeof data.hra=="undefined" || data.hra==false || data.hra== null)?0:1; 
		const paid=(typeof data.paid=="undefined" || data.paid==false || data.paid== null)?0:1;   	
			
		const startDate=(typeof data.start_date=="undefined" || data.start_date== null)?'0000:00:00':data.start_date;  	
		const subReason=(typeof data.subReason=="undefined")?'':data.subReason; 
		const comment=(typeof data.comment=="undefined")?'':data.comment; 	  
  		
		const sqlQuery = `UPDATE partner_members SET bname='${businessName}',bemail='${businesEmail}',cname='${contactName}',waddress='${webAddress}',member_id='${memberId}',address1='${infoAddress1}',address2='${infoAddress2}',city='${infoCity}',province='${infoProvince}',postcode='${postCode}',
		level='${level}',status='${status}',start_date='${startDate}',latitude='${latitude}',longitude='${longitude}',country='${infoCountry}',telphone='${telWork}',cellphone='${cellPhone}',fax='${fax}',dsp='${dsp}',hra='${hra}',paid='${paid}' WHERE id=${id}`;   		
						 
		const result = await queryDatabase(sqlQuery,stream);    		  				  
		const insert_id = result.insertId;      
		
		if(id >0)	 
		{
			// Send a success response	  		
			const stream = await createSshTunnel(sshTunnelConfig, dbServer);   
			const sqlQuery = `INSERT INTO partner_comments (row_id,subreason_id,description) VALUES ('${id}','${subReason}','${comment}')`;               
		
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