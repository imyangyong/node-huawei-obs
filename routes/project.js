var express = require('express');
var fs = require('fs');
var mime = require('mime');
var path = require('path');
var project = express.Router();
const { downloadFile, errorTips, readFile } = require('../utils');

/* GET file list. */
project.get(/.*/, function(req, res, next) {
  const baseUrl = decodeURI(req.url);
  
  // list
  if (baseUrl.match(/\//g).length < 2) {
    readFile(baseUrl).then(files => {
      res.render('project', {
        title: baseUrl.replace('/', ''),
        fileList: files,
      });
    });
  }
  // else {
  //   var filePath = process.cwd() + '/resources' + baseUrl;
  //   if (fs.existsSync(filePath)) {
  //     downloadFile(filePath, res);
  //   } else {
  //     errorTips(res);
  //   }
  // }
});

module.exports = project;
