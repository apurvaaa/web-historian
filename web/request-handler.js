var path = require('path');
var archive = require('../helpers/archive-helpers');
var displayHelper = require('./http-helpers.js');
var urlParse = require('url');
var actions = {
  'GET': function(req, res) {
    var urlToSearch = urlParse.parse(req.url).pathname;
    console.log('inside /GET ');
    if (urlToSearch === '/') {
      urlToSearch = '/index.html';
    }
      //serverAssets will look into public and then into Archives
    displayHelper.serveAssets(res, urlToSearch, function () {
      //slice off first character ('/')
      urlToSearch = urlToSearch.slice(1);
      //check if URL is in the list
      archive.isUrlInList(urlToSearch, function (thereOrNot) {
        if (thereOrNot) { //if it is,
          //redirect to loading page
          displayerHelper.sendRedirect(res, '/loading.html');
        } else { //if not
          //send 404 error
          console.log('before 404: ');
          displayHelper.send404(res);
        }
      });

    });

  },
  'POST': function(req, res) {

    var ourUrl = urlParse.parse(req.url);
    ourUrl = ourUrl.split('=')[1];
    displayHelper.sendRedirect(res, archive.paths.archivedSites + ourUrl);
    //call collectData to get data in the post body
      //split string with '=' as delimiter, use last element
      //replace http:// with empty string

    //check if urlIsInList 
      //if true
        //check if url is in archives
          //if true
            //redirect to cached page
          //if NOT in archives
            //redirect to loading page
      //if false 
         // add url to list
         //redirect to loading page


  }
};

exports.handleRequest = function (req, res) {
  console.log('request.url : ', req.url, 'request.method : ', req.method);
  //handles GET request
  if (actions[req.method]) {
    actions[req.method](req, res); 
  } else {
    displayHelper.send404(res);
  }

  
};















// implement a big picture plan
//   break apart each problem
//   allocate time to each portion of the plan

// flash cards for syntax
  //ex fs.write, fs.read, etc....
  //basic server...

