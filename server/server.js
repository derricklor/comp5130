
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
  //res.redirect("http://localhost:3000/recentlyreleased");
  res.redirect("/");
});

app.get("/api/home", (req, res) => {
  const q = "SELECT * FROM movies ORDER BY `released` DESC LIMIT 4";
  db.query(q, [], (err, result) => {
    if (err) { console.log(err); res.status(401).json({ error: "DB home error" }); return}
    res.json(result);
    return
  });
});

app.get("/api/recentlyreleased", (req, res) => {
  //query db
  console.log(`${Date()}: got get request for recentlyreleased`)
  const q = "SELECT * FROM movies ORDER BY `released` DESC LIMIT 6";
  db.query(q, [], (err, result) => {
    if (err) { console.log(err); res.status(401).json({ error: "DB recently released error" }); return}
    res.json(result);
    return
  });
});

app.get("/api/toprated", (req, res) => {
  console.log(`${Date()}: got get request for toprated`)
  const q = "SELECT * FROM movies ORDER BY `rating` DESC LIMIT 12";
  db.query(q, [], (err, result) => {
    if (err) { console.log(err); res.status(401).json({ error: "DB top rated error" }); return}
    res.json(result);
    return
  });
});

app.get("/api/search/:searchQuery", (req, res) => {
  const searchQuery = req.params.searchQuery;
  console.log(`${Date()}: got get request for search ${searchQuery}`)
  const qSearch = "SELECT id, title FROM movies WHERE title LIKE ? ORDER BY `title` ASC LIMIT 12";
  db.query(qSearch, ['%'+searchQuery+'%'], (err, result) => {
    if (err) { console.log(err); res.status(401).json({ error: "DB search query error" }); return}
    else if (result.length > 0){
      console.log("sending results: ", result)
      res.json(result);
      return
    }
  });
});

app.get("/api/movie/:id", (req, res) => {
  const id = req.params.id;
  console.log(`${Date()}: got a get request for movie id: ${id}`)
  const q = "SELECT * FROM movies WHERE `id` = ?";
  db.query(q, id, (err, result) => {
    if (err) { console.log(err); res.status(401).json({ error: "DB get movie error" }); return}
    res.json(result);
    return
  });
}); // end of get movie id



/**********************************/
/***********Registration***********/
/**********************************/
app.post("/api/registration", (req, res) => {
  console.log(`${Date()}: got a post request for user registration`)
  // check if email and password is POSTED
  if (!req.body.email || !req.body.password ) {
    res.status(400).json({ error: "Missing email/password" });
    return
  } 
  // Check if existing email exists in db
  const q = "SELECT COUNT(*) AS `count` FROM users WHERE email=?"
  db.query(q, [req.body.email], (err, result) => {
    console.log("Count of users with posted email: ", result)
    if (err) { console.log(err); res.status(400).json({ error: "DB query error" }); return}
    else {
      if (result[0].count > 0){
        console.log("collision detected ", result[0].count)
        res.status(401).json({ error: "Bad email and or password." });
        return
      } else {
        console.log("No collision. Attempting to add user to db.")
        // if not in db, then insert into db
        // Create a hash for the submitted password
        const hash = bcrypt.hashSync(req.body.password, 10);
        const qInsert = "INSERT INTO `users` (`authorization`, `email`, `password`) VALUES (?,?,?)"   // Must use nested queries due to async
        db.query(qInsert, ["user", req.body.email, hash], (err2, result2) => {
          if (err2) { console.log(err2); res.status(400).json({ error: "DB insert error" }); return}
          else {
            console.log(`User registration for ${req.body.email} success.`)
            res.status(201).json({ message: "Registration success." });// send response successful registration
            return
          }
        }); //end second db query
      }
    }
  }); // end first db query
}); // end of registration

/**********************************/
/***********Authorization**********/
/**********************************/
app.post("/api/auth", (req, res) => {
  console.log(`${Date()}: got a post request for user authentication`)
  // Verify email/pass was POSTed 
  if (!req.body.email || !req.body.password ) {
    // Unauthorized access
    res.status(401).json({ error: "Missing username and/or password"}); 
    return
  }

  // Check if email/pass matches a record in db
  const q = "SELECT * FROM `users` WHERE email=?"
  db.query(q, [req.body.email], (err, result) => {
    //console.log("Result from db query: ", result)
    try {
      if (err) { console.log(err); res.status(400).json({ error: "Bad email and or password." }); return}
      else if (bcrypt.compareSync(req.body.password, result[0].password)) { //compareSync hashes posted password and checks against db password hash
        console.log("User has authenticated. Sending token.")
        // Password hashes match. Send back a token that contains the user's username
        const token = jwt.encode({ uid: result[0].uid, email: result[0].email, auth: result[0].authorization}, secret);
        res.json({ token: token, uid: result[0].uid, auth: result[0].authorization});
        return
      } else {
        console.log("Bad email and or password.")
        res.status(401).json({ error: "Bad email and or password." });
        return
      }
  } catch (e) {
    console.log(e)
    res.status(401).json({ error: "Internal server error" });
    return
  }
  });
});// end of authorization





/***********************************************************/
/* ALL ROUTES ABOVE REQUIRE DONT REQUIRE authenticateToken */
/***********************************************************/

/**********************************************/
/* ALL ROUTES BELOW REQUIRE authenticateToken */
/**********************************************/

/***********Authentication***********/ // middleware function to auto check token
const authenticateToken = (req, res, next) => {
  // Check if the X-Auth header is set
  // request by default flattens all upper case to lower case
  if (!req.headers["x-auth"]) {
      res.status(401).json({error: "Missing X-Auth header"}); // Unauthorized
      return
  }
    // X-Auth should contain the token value
    const token = req.headers["x-auth"];

    try {
      const decoded = jwt.decode(token, secret);
      // Check if uid and email is in db
      if (decoded.uid && decoded.email) {
        // query db in case the user was deleted from db, therefore invalidating the token
        const q = "SELECT COUNT(*) AS `count` FROM `users` WHERE uid=? AND email=? AND authorization='admin'"
        db.query(q, [decoded.uid, decoded.email], (err, result) => {
          if (err) { console.log(err); res.status(401).json({ error: "Invalid JWT" }); return } // Unauthorized
          else if (result[0].count > 0){
            // JWT is valid and db entry shows up then it passes authentication
            next();
            return
          }
        });
      } else {
        res.status(401).json({ error: "Invalid JWT" }); // Unauthorized
        return
      }
    }
    catch (ex) {
      console.log(ex)
      res.status(401).json({ error: "Invalid JWT" }); // Unauthorized
      return
  }
};// end of authenticateToken




app.post("/api/movie/add", authenticateToken, (req, res) => {
  console.log(`${Date()}: got post request for movie add`)
  // check if myMovie is POSTED in request body
  try{
    const myMovie = [req.body.title, req.body.released, req.body.runtime, req.body.director,
    req.body.rating, req.body.genre, req.body.plot, req.body.actors, req.body.poster]
  } catch (err){
    res.status(401).json({ error: "Incorrect add form."});
    return
  }
  const myMovie = [req.body.title, req.body.released, req.body.runtime, req.body.director,
    req.body.rating, req.body.genre, req.body.plot, req.body.actors, req.body.poster]
  const qadd = "INSERT INTO movies (title, released, runtime, director, rating, genre, plot, actors, poster) \
                         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(qadd, myMovie, (err, result) => {
    if (err) { console.log(err); res.status(401).json({ error: "DB create movie error" }); return}
    else {
      res.json({ message: "Movie successfully added."});
      return
    }
  });
}); // end of movie create



app.post("/api/movie/:id/update", authenticateToken, (req, res) => {
  const id = req.params.id;
  console.log(`${Date()}: got a post request for update movie id: ${id}`)
  //console.log(req.body)
  try{
    const value = [req.body.title, req.body.released, req.body.runtime, req.body.director,
    req.body.rating, req.body.genre, req.body.plot, req.body.actors, req.body.poster, id]
  } catch (err){
    res.status(401).json({ error: "Form error."});
    return
  }
  const value = [req.body.title, req.body.released, req.body.runtime, req.body.director,
    req.body.rating, req.body.genre, req.body.plot, req.body.actors, req.body.poster, id]
  const qupdate = "UPDATE movies SET `title`=?, `released`=?, `runtime`=?, `director`=?, `rating`=?, `genre`=?, `plot`=?, `actors`=?, `poster`=? WHERE id=?"
  db.query(qupdate, value, (err, result) => {
    if (err) { console.log(err); res.status(401).json({ error: "Movie edit error."}); return}
    //console.log(result) //debug
    //return res.json(result);
    else {
      res.json({ message: "Movie update success."});
      return
    }
  });
}); // end of movie update


/***********Deleting movie***********/
app.post("/api/movie/:id/delete", authenticateToken, (req, res) => {
  const id = req.params.id;
  console.log(`${Date()}: got a post request for delete movie id: ${id}`)
  
  // Run the delete query
  const qdel = "DELETE FROM `movies` WHERE `id`=?"
  db.query(qdel,[id], (err, result) =>{
    if (err){ console.log(err); res.status(401).json({ error: "DB delete error" }); return }
    else {
      console.log(`Deleted movie with id: ${id}`)// delete success
      res.json({ message: `Deleted movie with id: ${id}` });// Send back a status
      return
    }
  });
}); // end of movie delete




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