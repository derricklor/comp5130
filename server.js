
const express = require("express");
const app = express();

// Serve static files from the public dir
app.use(express.static("public"));

// Start the web server
app.listen(3000, function() { 
  // Instead of hard coding port, could change port number to be .env variable
 console.log("Listening on port 3000...");
});



/* // enable CORS in express https://enable-cors.org/server_expressjs.html
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res, next) {
  // Handle the get for this route
});

app.post('/', function(req, res, next) {
 // Handle the post for this route
});
*/