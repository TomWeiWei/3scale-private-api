const { response } = require('express');
var http = require('http');
const app = require('express')()




/**
 * Requests to the route will return a response 
 * with the response code sent as part of the get request path. 
 */
app.get('/status/*', function(req, res) {
    let fetchNumberArray = fetchIntegerValueInRequestPath(req);
    let statusCode = fetchNumberArray[0];
    let errorMessage = fetchNumberArray[1];
    let messageString= "";
    if(statusCode != undefined && statusCode >= 100 && statusCode < 600 ){
        res.writeHead(statusCode, {'Content-Type': 'text/plain'});
        messageString =  "status code "+  statusCode + " set to the header\n"
        
    } else {
        if(statusCode != undefined && (statusCode < 100 || statusCode >= 600)){
        errorMessage = "Status code can not be lower than 100 or over 600"
        }
        messageString = "Invalid status code. " +  errorMessage;
    }
    res.end(messageString);

});

app.get('/contentlength/*', function(req, res) {
  let fetchNumberArray = fetchIntegerValueInRequestPath(req);
  let contentLength = fetchNumberArray[0];
  let errorMessage = fetchNumberArray[1];
  let messageString= "";
  console.log("contentLength: "+ contentLength);
  console.log(JSON.stringify(req.headers,null, 2));
  if(contentLength != undefined && contentLength > 50){
    messageString =  "Content length "+  contentLength + " set to the header\n"
    let stringLength = messageString.length;
    // Appending chracters to matche the body size to content-length
    while(stringLength<contentLength){
      messageString += ".";
      stringLength++;
    }
    
  } else {
    if(contentLength != undefined && contentLength <= 50){
      errorMessage = "Content lenght can not be less than 50"
    }
    messageString = "Invalid content length. "+  errorMessage;
  }
  res.end(messageString); 
});

app.get('/timeout/*', function(req, res) {
  let fetchNumberArray = fetchIntegerValueInRequestPath(req);
  let timeoutLenght = fetchNumberArray[0];
  let errorMessage = fetchNumberArray[1];
  if(timeoutLenght != undefined){
    setTimeout((function() {
      // res.writeHead(203, {'Content-Type': 'text/plain'});
      res.send("Hello I am still alive after the timeout of " + timeoutLenght + " millisconds \n");
    }), timeoutLenght);
  } else {
    res.end("Invalid timeout value passed");
  }

});


app.get('/', function(req, res) {
    res.send('Do nothing :) \n');
});
  

var port = process.env.PORT || 8080;
// server.listen(port, () => {
//   console.log("server starting on port : " + port)
// });
app.listen(port);
console.log('Listening on localhost:'+ port);


function fetchIntegerValueInRequestPath(request){
    let numberString = request.path.split('/')[2];
    var numberValue;
    var errorMessage;
    console.log(numberString);
    if(numberString != undefined ){
      try {
        numberValue = Number.parseInt(numberString);
      } catch (error) {
        errorMessage = error;
        console.log(error);
      } finally {
        return [numberValue, errorMessage];
      }
    }
}

