
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
//const path = require("path");
const https = require("https");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();
const PORT = 4000;

// Middleware functions
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to db
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "moviedb"
});


// Serve static files from the public dir
//app.use(express.static(path.join(__dirname,"public")));

//test post request
app.post("/api/mssg", (req, res) => {
  console.log("Got a mssg")
  // Logging the form body
  //console.log(req.headers);
  console.log(req.body);

  // Redirecting to the root
  res.redirect("http://localhost:3000/");
});

app.get("/api/home", (req, res) => {
  const q = "SELECT * FROM movies ORDER BY `released` DESC LIMIT 4";
  db.query(q, [], (err, result) => {
    if (err) { res.json({ error: "DB home error" }); }
    return res.json(result);
  });
});

app.get("/api/recentlyreleased", (req, res) => {

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
  db.query(q, [], (err, result) => {
    if (err) { res.json({ error: "DB recently released error" }); }
    return res.json(result);
  });
});

app.get("/api/toprated", (req, res) => {
  console.log(`${Date()}: got get request for toprated`)
  const q = "SELECT * FROM movies ORDER BY `rating` DESC LIMIT 12";
  db.query(q, [], (err, result) => {
    if (err) { res.json({ error: "DB top rated error" }); }
    return res.json(result);
  });
});

app.post("/api/movie/create", (req, res) => {
  console.log(`${Date()}: got post request for movie create`)
  const q = "INSERT INTO movies (title, released, runtime, director, rating, genre, plot, actors, poster) \
                         VALUES (`New`, `12345678`, `0`, `director`, `0`, `no genre`, `no plot`, `no actors`, `no poster`)";
  db.query(q, [], (err, result) => {
    if (err) { res.json({ error: "DB create movie error" }); }
    return res.json(result);
  });
});

app.get("/api/movie/:id", (req, res) => {
  const id = req.params.id;
  console.log(`${Date()}: got a get request for movie id: ${id}`)
  const q = "SELECT * FROM movies WHERE `id` = ?";
  db.query(q, id, (err, result) => {
    if (err) { res.json({ error: "DB get movie error" }); }
    return res.json(result);
  });
});

app.post("/api/movie/:id/update", (req, res) => {
  const id = req.params.id;
  console.log(`${Date()}: got a post request for update movie id: ${id}`)
  console.log(req.body)
  // const value = [
  //   req.body.title, req.body.released, req.body.runtime, req.body.director,
  //   req.body.rating, req.body.genre, req.body.plot, req.body.actors, req.body.poster]
  // const q = `UPDATE movies SET title= ${value[0]}, released= ${value[1]}, runtime= ${value[2]}, director= ${value[3]},\
  //          rating= ${value[4]} genre= ${value[5]}, plot= ${value[6]}, actors= ${value[7]}, poster= ${value[8]} WHERE id =${id}`
  // db.query(q, [], (err, result) => {
  //   if (err) return res.json({ error: "Movie edit error: " + err })
  //   return res.json(result);
  // })
  return res.json({ success: "true" })
});

app.post("/api/movie/:id/delete", (req, res) => {
  const id = req.params.id;
  console.log(`${Date()}: got a post request for delete movie id: ${id}`)
  const q = "DELETE FROM movies WHERE `id`= ?"
  db.query(q, id, (err, result) => {
    if (err) { res.json({ error: "Movie delete error: " + err }); }
    return res.json(result);
  });
});

// deprecated
// app.get("/people/:id", (req, res) =>{
//   const id = req.params.id;
//   const q = "SELECT * FROM people WHERE `id` = ?";
//   db.query( q, [id], (err, result) => {
//     if (err) {res.json({error: "DB people error"});}
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

// Creating object of key and certificate for SSL
const options = {
  key: fs.readFileSync("server.key"),
  cert: fs.readFileSync("server.cert"),
};


// Creating https server by passing options and app object
// https.createServer(options, app)
//   .listen(PORT, function (req, res) {
//     console.log(`Server started at PORT ${PORT}`);
//   });

app.listen(PORT, function () {
  // Instead of hard coding port, could change port number to be .env variable
  console.log(`Listening on port ${PORT}...`);
});