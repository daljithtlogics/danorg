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

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');   
}

function pad(number) {
  if ( number < 10 ) {
    return '0' + number;  
  }
  return number;
}

// Define routes for App1 
app.get('/', (req, res) => { 
	res.send('Hello from App13!');    				  			
});  

app.get('/get', (req, res) => { 
	res.send('Hello from provider App!');      				  			
}); 


app.post('/add', async (req, res) => {			
  const data = req.body;			   

  if (!data.row_id || data.row_id === "") {   
    return res.status(500).json({ error: 'Member Id is Missing','error_field':'row_id' });  
  } 
  else if (!data.first_name || data.first_name === "") {
    return res.status(500).json({ error: 'First name is Missing','error_field':'first_name' });  	  		
  }   
  else if (!data.provider_course || data.provider_course === "") {
    return res.status(500).json({ error: 'Course is Missing','error_field':'provider_course' });    	  		
  }     
  else
  {
	  const id=(typeof data.row_id=="undefined")?'':data.row_id;  	
 	  const title=(typeof data.title=="undefined")?'':data.title;      
	  const first_name=(typeof data.first_name=="undefined")?'':data.first_name;         		 
	  const s_name=(typeof data.s_name=="undefined")?'':data.s_name;    
	  
	  const passport_no=(typeof data.passport_no=="undefined")?'':data.passport_no;      
	  const postaddr1=(typeof data.postaddr1=="undefined")?'':data.postaddr1;         		 
	  const postaddr2=(typeof data.postaddr2=="undefined")?'':data.postaddr2;     
	  
	  const city=(typeof data.city=="undefined")?'':data.city;      
	  const province=(typeof data.province=="undefined")?'':data.province;         		 
	  const postcode=(typeof data.postcode=="undefined")?'':data.postcode;   
	  
	  const provider_country=(typeof data.provider_country=="undefined")?'':data.provider_country;      
	  const provider_course=(typeof data.provider_course=="undefined")?'':data.provider_course;         		 
	  const pack_no=(typeof data.pack_no=="undefined")?'':data.pack_no;    

	  var since = new Date();   
	  var date_now = formatDate(since);      		
	  var full_date= pad(since.getFullYear())+'-'+pad(since.getMonth()+1)+'-'+pad(since.getDate())+' '+pad(since.getHours())+':'+pad(since.getMinutes())+':'+pad(since.getSeconds())  	
	  
	  try {
		// Establish SSH tunnel
		const stream = await createSshTunnel(sshTunnelConfig, dbServer);    	
		const sqlQuery = `INSERT INTO student_members (title,first_name,surname,passport,postal_add1,postal_add2,city,province,postal_code,country,course_id,pack_number,dob,email,active_date,active_until,capture_date) VALUES ('${title}','${first_name}','${s_name}','${passport_no}','${postaddr1}','${postaddr2}','${city}','${province}','${postcode}','${provider_country}','${provider_course}','${pack_no}','0000-00-00','','${date_now}','${date_now}','${full_date}')`;               
		const result = await queryDatabase(sqlQuery,stream);      
		const insert_id = result.insertId;      

		if(insert_id >0)	
		{
			// Send a success response	

		    // await queryDatabase(sqlQuery,stream);   
			const stream = await createSshTunnel(sshTunnelConfig, dbServer);   
			const sqlQuery = `INSERT INTO providers (row_id,member_id) VALUES ('${id}','${insert_id}')`;               
		
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
	  
  }  
  
});   

// Handle other routes
app.use((req, res) => {
  res.status(404).send('Not Found');   				
}); 

// Export the app 
module.exports = app;	   