
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");

const app = express();
const port = 4000;

// Connect to db
const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "moviedb"
  });


// Serve static files from the public dir
//app.use(express.static(path.join(__dirname,"public")));


// Middleware functions
app.use(cors());
app.use(express.json());

app.get("/api/home", (req, res) =>{
  const q = "SELECT * FROM movies ORDER BY `released` DESC LIMIT 4";
  db.query( q, [], (err, result) => {
    if (err) {res.json({message: "DB home error"});}
    return res.json(result);
  });
});

app.get("/api/recentlyreleased", (req, res) =>{

  //revert today's date back 3 years
  // const todaysDate = new Date();
  // let d = todaysDate.getDate();
  // todaysDate.setMonth(todaysDate.getMonth() + -3*12);
  // if (todaysDate.getDate() != d) {
  //   todaysDate.setDate(0);
  // }
  // //format date in YYYYMMDD
  // let year = todaysDate.getFullYear();
  // let month = todaysDate.getMonth()+1;  //0 indexed
  // if (month < 10){ month = `0${month}`;}
  // let formattedDate = `${year}${month}00`;
  //query db
  console.log(`${Date()}: got get request for recentlyreleased`)
  const q = "SELECT * FROM movies ORDER BY `released` DESC LIMIT 6";
  db.query( q, [], (err, result) => {
    if (err) {res.json({message: "DB recently released error"});}
    return res.json(result);
  });
});

app.get("/api/toprated", (req, res) =>{
  console.log(`${Date()}: got get request for toprated`)
  const q = "SELECT * FROM movies ORDER BY `rating` DESC LIMIT 12";
  db.query( q, [], (err, result) => {
    if (err) {res.json({message: "DB top rated error"});}
    return res.json(result);
  });
});

app.post("/api/movie/create", (req, res) =>{
  console.log(`${Date()}: got post request for movie create`)
  const q = "INSERT INTO movies (title, released, runtime, director, rating, genre, plot, actors, poster) \
                         VALUES (`New`, `12345678`, `0`, `director`, `0`, `no genre`, `no plot`, `no actors`, `no poster`)";
  db.query( q, [], (err, result) => {
    if (err) {res.json({message: "DB create movie error"});}
    return res.json(result);
  });
});

app.get("/api/movie/:id", (req, res) =>{
  console.log(`${Date()}: got a get request for movie id: ${id}`)
  const id = req.params.id;
  const q = "SELECT * FROM movies WHERE `id` = ?";
  db.query( q, id, (err, result) => {
    if (err) {res.json({message: "DB get movie error"});}
    return res.json(result);
  });
});

app.post("/api/movie/:id/edit", (req, res) =>{
  console.log(`${Date()}: got a post request for edit movie id: ${id}`)
  const id = req.params.id;
  const values = [
    req.body.title, req.body.released, req.body.runtime, req.body.director, 
    req.body.rating, req.body.genre, req.body.plot, req.body.actors, req.body.poster ]
  const q = `UPDATE movies SET title= ${value[0]}, released= ${value[1]}, runtime= ${value[2]}, director= ${value[3]},\
           rating= ${value[4]} genre= ${value[5]}, plot= ${value[6]}, actors= ${value[7]}, poster= ${value[8]} WHERE id =${id}`
  db.query(q, values, (err, result) =>{
    if (err) return res.json({message: "Movie edit error: " +err})
    return res.json(result);
  })
});

app.post("/api/movie/:id/delete", (req, res) =>{
  console.log(`${Date()}: got a post request for delete movie id: ${id}`)
  const id = req.params.id;
  const q = "DELETE FROM movies WHERE `id`= ?"
  db.query( q, id, (err, result) => {
    if (err) {res.json({message: "Movie delete error: " +err});}
    return res.json(result);
  });
});

// deprecated
// app.get("/people/:id", (req, res) =>{
//   const id = req.params.id;
//   const q = "SELECT * FROM people WHERE `id` = ?";
//   db.query( q, [id], (err, result) => {
//     if (err) {res.json({message: "DB people error"});}
//     return res.json(result);
//   });
// });

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