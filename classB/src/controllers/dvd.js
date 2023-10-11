const express = require('express');
const axios = require('axios');
const fs = require('fs/promises'); // Use fs.promises for async file reading
const app = express();
const port = 3022; // Assuming classA is running on port 3021
const router = express.Router();
// Define a route that makes an Axios GET request to an external API
router.get('/all/location', async (req, res) => {
  try {
    // Read the JSON file asynchronously
    const jsonData = await fs.readFile('D:/FidZulu/FidZulu-Middleware/data/DVDsjson.json', 'utf8');
    
    // Send the JSON data as the response
    // res.send("workinggggg");
    res.json(JSON.parse(jsonData));
  } catch (error) {
    console.error('Error reading JSON file:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.get('/team', (req, res) => {
    // Handle the route logic for bike team information
    res.send('Get bike team information');
  });


  

  router.get('/api/data', (req, res) => {
    // Make an HTTP GET request using Axios
    axios.get('http://127.0.0.1:8080/food')
      .then(response => {
        console.log("Success response---");
        // Send the data from the external API as a response
        res.json(response.data);
      })
      .catch(error => {
        // Handle errors gracefully
        res.status(500).json({ error: 'Internal Server Error' });
      });
  });
  
  
function testMethod(){
  return true;
}

module.exports = router