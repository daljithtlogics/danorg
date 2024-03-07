import { bootstrap, runMigrations } from '@vendure/core';
import { config } from './vendure-config';

import axios from 'axios';

runMigrations(config)
    .then(() => bootstrap(config))
    .catch(err => {
        console.log(err);
    });

// Testing connection with bobgo API
const bobgoApiKey = process.env.BOBGO_API_KEY;
const bobgoUrl = 'https://api.sandbox.bobgo.co.za/v2/orders';

// Bobgo Header
const axiosInstance = axios.create({
  baseURL: bobgoUrl,
  headers: {
    'Authorization': `Bearer ${bobgoApiKey}`,
    'Content-Type': 'application/json',
  },
});

// if the connection is successful
axiosInstance.get(bobgoUrl)
.then(() => {
  console.log(
    "---------------------------------------------\n", 
    "Connected to Bobgo Order API successfully",
    "\n---------------------------------------------"
  );
})
.catch(error => {
  console.error(
    "---------------------------------------------\n", 
    "Failed to connect to Bobgo API: ", error,
    "\n---------------------------------------------");
});