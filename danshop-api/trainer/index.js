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
	res.send('Hello from App8!');    		  
});  

app.get('/get', async (req, res) => {
  try {
    const stream = await createSshTunnel(sshTunnelConfig, dbServer);		
    const sqlQuery = 'SELECT * FROM trainers';	   	
    const results = await queryDatabase(sqlQuery, stream);				
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from database: ' + error.message });		    	
  }
});  

app.post('/add', async (req, res) => {			
  const data = req.body;			
  
  const stream = await createSshTunnel(sshTunnelConfig, dbServer);	   

  if (!data.row_id || data.row_id === "") {   
    return res.status(500).json({ error: 'Record Id is Missing','error_field':'row_id' });  
  } else if (!data.course_id || data.course_id === "") {
    return res.status(500).json({ error: 'Course is Missing','error_field':'course_id' });  			
  } 
  else
  {
	  try {
    // Establish SSH tunnel
		const stream = await createSshTunnel(sshTunnelConfig, dbServer);         
			
		const id=(typeof data.row_id=="undefined")?'':data.row_id;  	
		const course_id=(typeof data.course_id=="undefined")?'':data.course_id;    
		const trainer="DAN";  		 
		
		const sqlQuery = `INSERT INTO trainers (row_id,course_id,trained_by) 
		VALUES ('${id}','${course_id}','${trainer}')`;    
		
		await queryDatabase(sqlQuery,stream);   	      

		// Send a success response
		 res.status(200).json({ message: 'Data added successfully' });   			    		 
		 
	  } catch (error) {
		// Handle database or other errors 	  		
		console.error('Error adding data to the database:', error);			
		res.status(500).json({ error: error });
	  }
		//
  }  
  
});   

// Handle other routes
app.use((req, res) => {
  res.status(404).send('Not Found');   		
}); 

// Export the app 
module.exports = app;	   