
// const express = require("express");
// const axios = require("axios");
// const {logRequestResponse, createLoggerWithPrefix} = require("../utils/logger");
// const router = express.Router();
// const Constants = require("../Constants/constants");
// const ErrorMessages = require("../Constants/errorMessages");

// router.use(logRequestResponse);

// const logger = createLoggerWithPrefix("Laptop Service");
// // Define a route that makes an Axios GET request to an external API
// router.get('/all/location', async (req, res) => {
//   try {
//     // Read the JSON file asynchronously
//     const jsonData = await fs.readFile('D:/FidZulu/FidZulu-Middleware/data/DVDsjson.json', 'utf8');
    
//     // Send the JSON data as the response
//     // res.send("workinggggg");
//     res.json(JSON.parse(jsonData));
//   } catch (error) {
//     console.error('Error reading JSON file:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });
// router.get('/team', (req, res) => {
//     // Handle the route logic for bike team information
//     res.send('Get bike team information');
//   });
const express = require("express");
const axios = require("axios");
const {logRequestResponse, createLoggerWithPrefix} = require("../utils/logger");
const router = express.Router();
const Constants = require("../Constants/constants");
const ErrorMessages = require("../Constants/errorMessages");

router.use(logRequestResponse);

const logger = createLoggerWithPrefix("Laptop Service");

router.get(Constants.APPLICATION_ROUTES.DVD_ROUTES.ALL_DVDS, async(req, resp) => {
    let location = req.params.location;
    console.log(location)
    if(location != "IN" && location!="IE" && location!="US-NC"){
        resp.status(Constants.HTTP_STATUS_CODE.PAGE_NOT_FOUND).json({
            error: ErrorMessages.ERROR.PAGE_NOT_FOUND,
            detail: ErrorMessages.DETAIL.UNKNOWN_COUNTRY
        })
        return;
    }
    let backendResp;
    try{
        //TODO: Axios URL from env
        backendUrl = `${Constants.ENV.HOST_DVD}/all/${location}`;
        console.log(backendUrl);
        
        backendResp = await axios.get(backendUrl);
        resp.status(200).json(backendResp.data);
    } catch(e){
        logger.error("Could not connect to backend for getting laptop details. ERROR:\n"+e);
        resp.status(500).json({
            error: ErrorMessages.ERROR.INTERNAL_SERVER_ERROR,
            detail: ErrorMessages.DETAIL.BACKEND_CONNECTION_FAILURE
        });
    }
});

router.get(Constants.APPLICATION_ROUTES.DVD_ROUTES.DVDS_TEAM, async(req, resp) =>{

    let backendResp;
    try{
        //TODO: Get axios URL from env
        backendResp = await axios.get(Constants.ENV.HOST_DVD);
        resp.status(200).json(backendResp.data);
    } catch(e){
        logger.error("Could not connect to backend for getting bike team details\n. ERROR:", e);
        resp.status(500).json({
            error: ErrorMessages.ERROR.INTERNAL_SERVER_ERROR,
            detail: ErrorMessages.DETAIL.BACKEND_CONNECTION_FAILURE
        });
    }
});

module.exports = router;

  

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