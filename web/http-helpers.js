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

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)

  fs.open(asset, 'r', (err, fd) => {
    if (err) {
      if (err.code === 'ENOENT') {
        console.error('myfile does not exist');
        return;
      } else {
        throw err;
      }
    }
    console.log('received data: ' + fd);
    fs.readFile(asset, {encoding: 'utf-8'}, function (err, fd) {
      if (!err) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        // console.log('index : ', fd);
        res.end(fd);
      } else {
        console.error(err);
      }

    });
  });
};



// As you progress, keep thinking about what helper functions you can put here!
