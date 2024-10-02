
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");

const app = express();
const port = 3000;

// Connect to db
const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "movie"
  });


// Serve static files from the public dir
app.use(express.static(path.join(__dirname,"public")));


// Middleware functions
app.use(cors());
app.use(express.json());

app.get("/recentlyreleased", (req, res) =>{

  //revert today's date back 3 months
  const todaysDate = new Date();
  let d = todaysDate.getDate();
  todaysDate.setMonth(todaysDate.getMonth() + -3);
  if (todaysDate.getDate() != d) {
    todaysDate.setDate(0);
  }
  //format date in YYYYMMDD
  let year = todaysDate.getFullYear();
  let month = todaysDate.getMonth()+1;  //0 indexed
  if (month < 10){ month = `0${month}`;}
  let formattedDate = `${year}${month}00`;
  //query db
  const q = "SELECT * FROM movie WHERE `date` >= ?";
  db.query( q, [formattedDate], (err, result) => {
    if (err) {res.json({message: "DB recently released error"});}
    return res.json(result);
  });
});

app.get("/toprated", (req, res) =>{
  const q = "SELECT * FROM movie WHERE `rating` > 8";
  db.query( q, [], (err, result) => {
    if (err) {res.json({message: "DB top rated error"});}
    return res.json(result);
  });
});

app.get("/movie/:id", (req, res) =>{
  const id = req.params.id;
  const q = "SELECT * FROM movie WHERE `id` = ?";
  db.query( q, [id], (err, result) => {
    if (err) {res.json({message: "DB movie error"});}
    return res.json(result);
  });
});

app.get("/people/:id", (req, res) =>{
  const id = req.params.id;
  const q = "SELECT * FROM people WHERE `id` = ?";
  db.query( q, [id], (err, result) => {
    if (err) {res.json({message: "DB people error"});}
    return res.json(result);
  });
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


// Start the web server
app.listen(port, function() { 
  // Instead of hard coding port, could change port number to be .env variable
 console.log(`Listening on port ${port}...`);
});