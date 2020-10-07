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

app.get('/', function(req, res) {
    res.send('Do nothing :) \n');
});
  

var port = process.env.PORT || 3000;
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

