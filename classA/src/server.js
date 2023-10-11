const express = require('express');
const axios = require('axios');
const bikeController = require("./controllers/bike");
const foodController = require("./controllers/food");


/**
 * Application Constants (move to constants file/ environemnt variables later)
 */
const PORT = 3021;

/**
 * MIDDLEWARE definitions
 */
const unknownEndpointHandler = (req, resp) =>{
  resp.status(404).json({
    error: "Page not found",
    detail: "Requested URL does not exist"
  });
}

const app = express();
app.use("/classA/bikes", bikeController);
app.use("/classA/food", foodController);

app.use(unknownEndpointHandler);

 

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});