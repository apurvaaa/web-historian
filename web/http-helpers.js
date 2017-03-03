var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

//callback is optional here
exports.serveAssets = function(res, url, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)

  
  //this checks if we can open file
 /* fs.open(url, 'r', (err, fd) => {
    if (err) {
      if (err.code === 'ENOENT') {
        console.error('myfile does not exist');
        return;
      } else {
        throw err;
      }
    }

*/
    //need to check public folder AND archive folder
  // console.log('received data: ' + fd);
  fs.readFile(archive.paths.siteAssets + url, {encoding: 'utf-8'}, function (err, fd) {
    if (!err) { //found file inside public
      //rendering index.html
      res.writeHead(200, exports.headers);
      res.end(fd);
    } else {  //NOT inside public
      //checking archives
      console.log('trying to find google cached copy in archieve', archive.paths.archivedSites + url);
      fs.readFile(archive.paths.archivedSites + url, {encoding: 'utf-8'}, function (err, fd) {
        if (!err) {
          res.writeHead(200, exports.headers);
          res.end(fd);
        } else {
          callback();
        }
      });
    }

  });
};

exports.sendRedirect = function(response, location, status) {
  status = status || 302;
  response.writeHead(status, {Location: location});
  response.end();
};
  
exports.sendResponse = function(response, obj, status) {
  status = status || 200;
  response.writeHead(status, exports.headers);
  response.end(obj);
};

exports.collectData = function(request, callback) {
  var data = '';
  request.on('data', function(chunk) {
    data += chunk;
  });
  request.on('end', function() {
    callback(data);
  });
};

exports.send404 = function(response) {
  exports.sendResponse(response, '404: Page not found', 404);
};

// As you progress, keep thinking about what helper functions you can put here!

















