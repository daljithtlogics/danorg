const express = require('express');

const bodyParser = require('body-parser');
const { sshTunnelConfig, dbServer } = require('../config');			
const createSshTunnel = require('../sshTunnel');
const queryDatabase = require('../databasequery');
const cors = require('cors'); // Import the cors package  


const app = express();
const PORT = 4500;
// Middleware to handle CORS and preflight requests
// app.use((req, res, next) => {
//   res.append('Access-Control-Allow-Origin', '*');
//   res.append('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
//   res.append('Access-Control-Allow-Headers', 'Content-Type, authorization');
//   next();
// });
// console.log('abc');

function hashPassword(password) {
  // This is a simple hash function example (not recommended for production)
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = (hash << 5) - hash + char;		
  }
  return hash.toString(); // Convert the hash to a string before storing it
}


app.use(bodyParser.json());
app.use(cors()); // Use the cors middleware to handle CORS headers
app.post('/api/commercial/add', async (req, res) => {			
  const data = req.body;		

  if (!data.firstName || data.firstName === "") {
    return res.status(500).json({ error: 'First Name is Missing','error_field':'firstName' });
  } else if (!data.lastName || data.lastName === "") {
    return res.status(500).json({ error: 'Last Name is Missing','error_field':'lastName' });
  } else if (!data.email || data.email === "") {
    return res.status(500).json({ error: 'Email is Missing','error_field':'email' });
  } else if (!data.mobile || data.mobile === "") {
    return res.status(500).json({ error: 'Mobile is Missing','error_field':'mobile' });
  } else if (!data.password || data.password === "") {
    return res.status(500).json({ error: 'Password is Missing','error_field':'password' });		
  }

  try {
    // Establish SSH tunnel
    const stream = await createSshTunnel(sshTunnelConfig, dbServer);
    const currentDate = new Date().toISOString().slice(0, 10); // Get current date in 'YYYY-MM-DD' format
    const randomNo = Math.floor(Math.random() * 1000); // Generate a random number
    const memberNO = `DANT ${randomNo}`; // Generate member_id with a random number
    // Insert data into the database

    const hashedPassword = hashPassword(data.password);
    const sqlQuery = `INSERT INTO commercial_members (firstName, lastName, mobile,password, email, start_date, member_no, status) VALUES ('${data.firstName}', '${data.lastName}', '${data.mobile}', '${hashedPassword}', '${data.email}' , '${currentDate}', '${memberNO}', 1)`;
    await queryDatabase(sqlQuery, stream);  		

    // Send a success response
     res.status(200).json({ message: 'Data added successfully' });   			  			
  } catch (error) {
    // Handle database or other errors
	console.log(currentDate);	  		
    console.error('Error adding data to the database:', error);
    res.status(500).json({ error: error });
  }
});

// Handle invalid routes or methods
app.use((req, res) => {
  res.status(404).send('Not Found');			
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
