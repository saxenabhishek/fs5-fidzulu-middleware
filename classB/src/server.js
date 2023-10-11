const express = require("express");
const app = express();
const port = 3022;


// Import your controller classes
const laptopController = require("./controllers/laptops");
const bookController = require("./controllers/books");

// Use Express Router for each controller
app.use('/classB/laptop', laptopController);
app.use('/classB/book', bookController);


// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
