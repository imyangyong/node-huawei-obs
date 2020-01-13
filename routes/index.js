var fs = require('fs');
var path = require('path');

var express = require('express');
var router = express.Router();
var resources = [];

var obs = require('../utils/obs')

/**
 * method 获取project资源列表.
 * @return {Array} return 列表.
 */
function getResources() {
  return new Promise((resolve, reject) => {
    var bucketName = 'dxhy';
    var files = [];
  
    obs.listObjects({
      Bucket: bucketName,
      Delimiter: '/'
    }).then((result) => {
      if(result.CommonMsg.Status < 300){
        console.log('Root path:');
        for(let j=0;j<result.InterfaceResult.CommonPrefixes.length;j++){
          files.push({
            url: result.InterfaceResult.CommonPrefixes[j]['Prefix'].replace(/\/$/, ''),
            name: result.InterfaceResult.CommonPrefixes[j]['Prefix'].replace(/\/$/, '')
          })
        }
        console.log('\n');
        resolve(files);
      }
    }).catch(e => reject(e))
  })
}

/* GET home page. */
router.get(/.*/, function(req, res, next) {
  getResources().then(files => {
    resources = files;
    req.url.replace('/', '') === '' ? res.render('index', { title: '前端项目资源', resources, }) : next();
  });
});

module.exports = router;
