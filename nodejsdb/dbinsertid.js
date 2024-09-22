var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: "user",
  password: "password",
  database: "mydb"
});

//For tables with an auto increment id field, you can get the id of the row you just inserted 
//by asking the result object.

//Note: To be able to get the inserted id, only one row can be inserted.

con.connect(function(err) {
    if (err) throw err;
    var sql = "INSERT INTO customers (name, address) VALUES ('Michelle', 'Blue Village 1')";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted, ID: " + result.insertId);
    });
  });