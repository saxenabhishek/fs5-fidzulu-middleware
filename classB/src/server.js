const express = require('express');
const app = express();
const port = 3000;

// Import your controller classes
const laptopController = require('./controllers/laptops');


// Use Express Router for each controller
app.use('/classB/laptop', laptopController);


// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});