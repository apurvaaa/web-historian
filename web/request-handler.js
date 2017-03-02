var path = require('path');
var archive = require('../helpers/archive-helpers');
var displayHelper = require('./http-helpers.js');
// require more modules/folders here!


exports.handleRequest = function (req, res) {
  console.log('request.url : ', req.url, 'request.method : ', req.method);
  if (req.url.indexOf('/') === 0 && req.method === 'GET') {
    console.log('inside if');
    res.statusCode = 200;
    displayHelper.serveAssets(res, path.join(__dirname, 'public/index.html'));
    // res.end('<input />');
  } else {
    res.end(archive.paths.list);
    
  }
  
};
