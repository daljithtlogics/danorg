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
	res.send('Hello from App23!');    	   				    
});  

app.get('/get', async (req, res) => {
  try {
    const stream = await createSshTunnel(sshTunnelConfig, dbServer);		
    const sqlQuery = "SELECT * FROM membership WHERE UPPER(choose_membership)='COMMERCIAL' AND parent_id IS NULL";					
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
		query += "SELECT count(*) AS record_count FROM membership WHERE UPPER(choose_membership)='COMMERCIAL' AND parent_id IS NULL"+` AND (company_name LIKE ${text} OR member_no LIKE ${text} OR email1 LIKE ${text} OR status1 LIKE ${text} OR cellphone1 LIKE ${text} OR membertype LIKE ${text} OR DATE_FORMAT(startdate,"%d/%m/%Y") LIKE ${text})`;       		
		sqlQuery += "SELECT * FROM membership WHERE UPPER(choose_membership)='COMMERCIAL' AND parent_id IS NULL"+` AND (company_name LIKE ${text} OR member_no LIKE ${text} OR email1 LIKE ${text} OR status1 LIKE ${text} OR cellphone1 LIKE ${text} OR membertype LIKE ${text} OR DATE_FORMAT(startdate,"%d/%m/%Y") LIKE ${text}) LIMIT ${start},${end}`;    
	}
	else
	{
		query += `SELECT count(*) AS record_count FROM membership WHERE UPPER(choose_membership)='COMMERCIAL' AND parent_id IS NULL`;	  	 			 
		sqlQuery += `SELECT * FROM membership WHERE UPPER(choose_membership)='COMMERCIAL' AND parent_id IS NULL LIMIT ${start},${end}`;	 			        		           
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


// Handle other routes
app.use((req, res) => {
  res.status(404).send('Not Found');   
}); 

// Export the app 
module.exports = app;	   