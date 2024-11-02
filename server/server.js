
const express = require("express");
const mysql = require("mysql2");            // db connection
const cors = require("cors");
//const path = require("path");
const https = require("https");
const fs = require("fs");
const bodyParser = require("body-parser");  // for parsing requests
const jwt = require("jwt-simple");          // for json web tokens
const secret = "supersecret";               // Secret used to encode/decode JWTs
const bcrypt = require("bcryptjs");         // for salting and hashing passwords

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
    if (err) { res.status(401).json({ error: "DB home error" }); }
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
    if (err) { res.status(401).json({ error: "DB recently released error" }); }
    return res.json(result);
  });
});

app.get("/api/toprated", (req, res) => {
  console.log(`${Date()}: got get request for toprated`)
  const q = "SELECT * FROM movies ORDER BY `rating` DESC LIMIT 12";
  db.query(q, [], (err, result) => {
    if (err) { res.status(401).json({ error: "DB top rated error" }); }
    return res.json(result);
  });
});

app.post("/api/movie/create", (req, res) => {
  console.log(`${Date()}: got post request for movie create`)
  const q = "INSERT INTO movies (title, released, runtime, director, rating, genre, plot, actors, poster) \
                         VALUES (`New`, `yyyy-mm-dd`, `0`, `director`, `0`, `no genre`, `no plot`, `no actors`, `no poster`)";
  db.query(q, [], (err, result) => {
    if (err) { res.status(401).json({ error: "DB create movie error" }); }
    return res.json(result);
  });
});

app.get("/api/movie/:id", (req, res) => {
  const id = req.params.id;
  console.log(`${Date()}: got a get request for movie id: ${id}`)
  const q = "SELECT * FROM movies WHERE `id` = ?";
  db.query(q, id, (err, result) => {
    if (err) { res.status(401).json({ error: "DB get movie error" }); }
    return res.json(result);
  });
});

app.post("/api/movie/:id/update", (req, res) => {
  const id = req.params.id;
  console.log(`${Date()}: got a post request for update movie id: ${id}`)
  //console.log(req.body)
  try{
    const value = [req.body.title, req.body.released, req.body.runtime, req.body.director,
    req.body.rating, req.body.genre, req.body.plot, req.body.actors, req.body.poster, id]
  } catch (err){
    return res.status(401).json({ error: "Form error."})
  }
  const value = [req.body.title, req.body.released, req.body.runtime, req.body.director,
    req.body.rating, req.body.genre, req.body.plot, req.body.actors, req.body.poster, id]
  const q = "UPDATE movies SET `title`=?, `released`=?, `runtime`=?, `director`=?, `rating`=?, `genre`=?, `plot`=?, `actors`=?, `poster`=? WHERE id=?"
  db.query(q, value, (err, result) => {
    if (err) { console.log(err); return res.status(401).json({ error: "Movie edit error."}); }
    //console.log(result) //debug
    //return res.json(result);
    else {
      return res.json({ message: "Movie update success."})
    }
  })
});

app.post("/api/movie/:id/delete", (req, res) => {
  const id = req.params.id;
  console.log(`${Date()}: got a post request for delete movie id: ${id}`)
  let hashKey;
  try{
    hashKey = req.body.hashKey //check authentication key from body
  } catch (err){
    return res.status(401).json({ error: "Permission denied."})
  }
  const qk = "SELECT `admin` FROM `users` WHERE `hash`=?"
  db.query(q, hashKey, (err, result) => {
    if (err) { console.log(err); return res.status(401).json({ error: "Permission denied."}); }
    //continue if va
  });
  //
  const qd = "DELETE FROM movies WHERE `id`= ?"
  db.query(qd, id, (err, result) => {
    if (err) { console.log(err); return res.status(401).json({ error: "Movie delete error: " + err }); }
    else {
      return res.json({ message: "Movie delete success."});
    }
  });
});


/***********Registration***********/
app.post("api/registration", (req, res) => {
  // check if email and password is POSTED
  if (!req.body.email || !req.body.password ) {
    return res.status(400).json({ error: "Missing email/password" }); 
  } 
  // Check if existing email exists in db
  const q = "SELECT COUNT(*) FROM users WHERE email=?"
  db.query(q, [req.body.email], (err, result) => {
    if (err) { console.log(err); return res.status(400).json({ error: "DB query error" }); }
    else if (result == 1){
      return res.status(401).json({ error: "Bad email/password" });
    }
  });
  // if not in db, then insert into db
  // Create a hash for the submitted password
  const hash = bcrypt.hashSync(req.body.password, 10);
  const qInsert = "INSERT INTO `users` (`authorization`, `email`, `password`) VALUES (?,?,?)"
  db.query(qInsert, ["user", req.body.email, hash], (err, result) => {
    if (err) { console.log(err); return res.status(400).json({ error: "DB insert error" }); }
    else {
      // return response successful registration
      return res.status(201).json({ message: "Registration success." });
    }
  });
  
});

/***********Authorization***********/
app.post("api/auth", (req, res) => {
  // Verify email/pass was POSTed 
  if (!req.body.email || !req.body.password ) {
    // Unauthorized access
    return res.status(401).json({ error: "Missing username and/or password"});  
  }

  // Check if email/pass matches a record in db
  const q = "SELECT * FROM `users` WHERE email=?"
  db.query(q, [req.body.email], (err, result) => {
    if (err) { console.log(err); return res.status(400).json({ error: "Bad email/password" }); }
    else if (bcrypt.compareSync(req.body.password, result.password)) { //compareSync hashes posted password and checks against db password hash
      // Password hashes match. Send back a token that contains the user's username
      const token = jwt.encode({ uid: result.id, email: result.email, authorization: result.authorization}, secret);
      return res.json({ token: token });
    } else {
      return res.status(401).json({ error: "Bad email/password" });
    }
  });
});

/***********Authentication***********/ //setup middleware function to auto check token
app.get("api/status", (req, res) => {

  // Check if the X-Auth header is set
  if (!req.headers["x-auth"]) {
      return res.status(401).json({error: "Missing X-Auth header"});
  }

  // X-Auth should contain the token value
  const token = req.headers["x-auth"];
  try {
      const decoded = jwt.decode(token, secret);
      // Check if email is in db
      if (decoded.uid && decoded.email) {
        const q = "SELECT * FROM `users` WHERE uid=? AND email=?"
        db.query(q, [decoded.uid, decoded.email], (err, result) => {
          if (err) { console.log(err); return res.status(401).json({ error: "Bad email/password" }); }
          else if (result.length > 0){
            // Send back a status
            return res.json({ message: "Authenticated." });
          }
        });
      } else {
        return res.status(401).json({ error: "Invalid JWT" });
      }
  }
  catch (ex) {
    return res.status(401).json({ error: "Invalid JWT" });
  }
});


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