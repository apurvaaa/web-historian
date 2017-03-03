var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

//reads URL from .txt file
exports.readListOfUrls = function(callback) {
  var stream = fs.createReadStream(this.paths.list, {'encoding': 'utf-8'});
  var lines = [];
  var fileData = '';

  stream.on('data', function (data) {
    fileData += data;
    lines = fileData.split('\n');
  });

  stream.on('end', function () {
    console.log('ending stream');
    callback(lines);
  });
};

//checks .txt for URL 
exports.isUrlInList = function(url, callback) {
  this.readListOfUrls(function (urlArr) {
    var isInside = urlArr.indexOf(url);
    callback(isInside >= 0);
  });
};

//adds URL to .txt
exports.addUrlToList = function(url, callback) {
  var stream = fs.createWriteStream(this.paths.list, {encoding: 'utf-8', flags: 'a'});
  stream.write(url + '\n');
  stream.end();
  callback();
};

//checks archive dir for file with name URL
exports.isUrlArchived = function(url, callback) {
  fs.readdir(this.paths.archivedSites, function (err, fileArr) {
    var isPresent = false;
    fileArr.forEach(file => {
      if (file === url) {
        isPresent = true;
        callback(true);
      }
    });
    if (!isPresent) {
      callback(false);
    }
  });
};

exports.downloadUrls = function(urls) {
  
};






























