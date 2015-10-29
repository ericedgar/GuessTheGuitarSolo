var http = require('http');
var url = require('url');

 http.createServer(function (request, response) {
     var jsonObject;
	 var jsonString;
	 
     response.writeHead(200, {'Content-Type': 'application/json'});

     if( url.parse(request.url).pathname == '/data' ){
	 
    jsonObject = [
  {
    "name": "Judas Priest",
    "messages": [
      "msg 1",
      "msg 2",
      "msg 3"
    ]
  },
  {
    "name": "Neds Atomic Dustbin",
    "messages": [
      "msg 1",
      "msg 2",
      "msg 3"
    ]
  }
];
	  jsonString = JSON.stringify(jsonObject);
	  console.log(jsonString);
	  response.write(jsonString);
     }
     else{
         response.write('Hello!');
     }

     response.end();
 }).listen(9000);

 console.log('9000 Server started');