const express = require('express');
const axios = require('axios');

 

const app = express();
//Need to put this in environment variables at a later time
const PORT = 3000;

 

// Define a route that makes an Axios GET request to an external API
app.get('/api/data', async (req, res) => {
  try {
    // Make an HTTP GET request using Axios
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');

 

    // Send the data from the external API as a response
    res.json(response.data);
  } catch (error) {
    // Handle errors gracefully
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

 

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

function testMethod(){
  return true;
}

exports = {testMethod}