# 3scale-private-api

Sample private API applicaiton to be used to test 3scale APICast polices. 
Current version of the application has the ability to return a spacific status 
code based on the request URI. e.g. `/status/302`

## Install

`git clone https://github.com/chamalabey/3scale-private-api.git`

`cd 3scale-private-api`

`npm install`

## Deploy
`npm start`


## Make a request to the API to return a response with the status

`curl localhost:3000/status/302`


