var express = require('express');
var fs = require('fs');
var url = require('url');
var mime = require('mime');
var path = require('path');
var upload = express.Router();
var formidable = require('formidable')

upload.post('/', function(req, res, next) {
  var form = new formidable.IncomingForm();
  
  // max size set 100mb
  form.maxFieldsSize = 100 * 1024 * 1024;
  
  form.parse(req, function(err, fields, files) {
    if (err) {
      
      // Check for and handle any errors here.
      
      console.error(err.message);
      res.writeHead(500, {'content-type': 'text/plain'});
      res.write(err.message+ '\n\n');
  
      res.end();
      return;
    }
    
    var targetDir = path.resolve(process.cwd(), 'resources', fields.company);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir)
    }
    fs.writeFileSync(path.resolve(targetDir, fields.project), fields.file, { encoding: 'base64' });
    res.writeHead(200, {'content-type': 'text/plain'});
    res.write('received upload:\n\n');
    
    res.end();
  });
  
  // next();
});

module.exports = upload;
