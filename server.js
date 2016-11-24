var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var cache = {};

// Three helper functions used for serving static HTTP files
// The first helper is to sending 404 errors
function send404(response){
  response.writeHead(404,{'Content-type':'text/plain'});
  response.write('Error 404: resource not found.');
  response.end();
}

// The second helper serves file data
function(response, filepath, fileContents){
  response.writeHead(200, {'Content-type':mime.lookup(path.basename(filePath))});
  response.end(fileContents);
}

// The third helper determined whether or not a file is cached and,if so, serves it.
function serveStatic(response, cache, absPath){
  if(cache[absPath]){
    sendFile(response, absPath, cache[absPath]);
  }else{
    fs.exists(absPath, function(exists){
      if(exists){
        fs.readFile(absPath, function(err, data){
          if(err){
           send404(response);
          }else{
            cache[absPath] = data;
            sendFile(response, absPath, data);
           }
        });
      }else{
        send404(response);
      }
    });
  }
}

var server = http.createServer (function(request, response){
    var filepath = false;

    if(request.url == '/'){
          filepath = 'public/index.html';
        }else{
          filepath = 'public' + request.url;
        }
    var absPath = './' + filePath;
})

server.lister(3000, function(){
    console.log("server listening on port 3000.");;
});
