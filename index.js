var http = require("http"), fs = require("fs"), qs = require("querystring"); 
let albums = require("./albums.js");


http.createServer(function(req,res) {
  var query = req.url.toLowerCase().split("?");
  console.log(query);
  var path = query[0]; // part before the ?
  var title = decodeURI((query[1]) ? query[1].split("=")[1] : '');


  switch(path) {
    case '/':
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('Home page');
      break;
    case '/about':
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('About page');
      break;
    case '/getall':
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('All albums: ' + JSON.stringify(albums.getAll()));
      break; 
    case '/get':
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('Searched for: ' + JSON.stringify(albums.get(title)));
      break;  
    case '/delete':
      var deleted = albums.delete(title); // note that title is lowercase
      if (deleted) {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('Album ' + title + ' removed');
      } else {
      res.writeHead(200, {'Content-Type': 'text/plain'});  
      res.end('Album ' + title + ' not removed');
      }
      break;
    default:
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('Not found');
      break;
    }
}).listen(process.env.PORT || 3000);