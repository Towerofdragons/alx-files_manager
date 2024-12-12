// Import required modules
const express = require('express');


const routes = require('./routes/index');
// Initialize express app
const app = express();


// Basic routes
app.use('/', routes);
app.use(express.json());

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Export app for testing or further usage
module.exports = app;
