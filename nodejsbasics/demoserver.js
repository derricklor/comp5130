var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  var filename = "." + q.pathname;
  if( filename == "/" || filename == ".")
  {
    var rs = fs.createReadStream("index.html")
    return rs.pipe(res);
  }
  fs.readFile(filename, function(err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      var rs = fs.createReadStream("404page.html")
      return rs.pipe(res);
      //return res.end("404 Error page not found.");  //change to read file 404 and return res.write(data)
    } 
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
}).listen(8080);

console.log("Server is running on localhost:8080");