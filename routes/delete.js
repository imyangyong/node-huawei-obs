var express = require('express');
var fs = require('fs');
var mime = require('mime');
var path = require('path');
var del = require('delete');
var obs = require('../utils/obs');
var delRouter = express.Router();

function emptyTips(res) {
  res.writeHead(500, {'content-type': 'text/plain'});
  res.write('No have this company\n\n');
  
  res.end();
}

delRouter.get(/.*/, function(req, res, next) {
  var bucketName = 'dxhy';
  var keys = [{ Key:decodeURI(req.url).replace(/\//, '') }];
  obs.deleteObjects({
    Bucket: bucketName,
    Quiet: false,
    Objects: keys
  }).then((result)=> {
    if(result.CommonMsg.Status < 300){
      res.writeHead(200, {'content-type': 'text/plain'});
      res.write('Delete Success!');
  
      res.end();
    } else {
      res.writeHead(500, {'content-type': 'text/plain'});
      res.write(result.CommonMsg.Message + '\n\n');
  
      res.end();
    }
  });
  // next();
});

module.exports = delRouter;
