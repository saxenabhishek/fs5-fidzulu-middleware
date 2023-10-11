const express = require('express');
const axios=require('axios');
const router = express.Router();
// Define routes for bikes
router.get('/all/location',async  (req, res) => {
    
  const response=await axios.get('http://localhost:8080/food');
  res.json(response)
  res.send('Get all bikes by location');
});

router.get('/team', (req, res) => {
  // Handle the route logic for bike team information
  res.send('Get bike team information');
});

// Make sure to import Axios if you haven't already

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