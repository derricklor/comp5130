//To delete a file with the File System module,  use the fs.unlink() method.
var fs = require('fs');

fs.unlink('mynewfile2.txt', function (err) {
  if (err) throw err;
  console.log('File deleted!');
});