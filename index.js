var fs = require('fs');
var http = require('http');
var https = require('https');
var express = require('express');


var app = express();
app.use(express.static('public'));
var httpServer = http.createServer(app);


// This was created using openssl (under Git for Windows installation) using instructions in the first part of 
// https://nodejs.org/en/knowledge/HTTP/servers/how-to-create-a-HTTPS-server/
var privateKey  = fs.readFileSync('..\\..\\certs\\key.pem', 'utf8');
var certificate = fs.readFileSync('..\\..\\certs\\cert.pem', 'utf8');
var credentials = {key: privateKey, cert: certificate};

var httpsServer = https.createServer(credentials, app);


httpServer.listen(8080);
httpsServer.listen(8443);

console.log("here");