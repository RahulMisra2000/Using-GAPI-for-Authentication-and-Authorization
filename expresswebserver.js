var fs = require("fs");
var http = require("http");
var https = require("https");
var express = require("express");

process.on("uncaughtException", (err) =>
  console.error("uncaughtException", err)
);
process.on("unhandledRejection", (err) =>
  console.error("unhandledRejection", err)
);

var app = express();
app.use(express.static("public"));
var httpServer = http.createServer(app);

// This was created using openssl (under Git for Windows installation) using instructions in the first part of
// https://nodejs.org/en/knowledge/HTTP/servers/how-to-create-a-HTTPS-server/

var privateKey = fs.readFileSync("..\\..\\certs\\key.pem", "utf8");
var certificate = fs.readFileSync("..\\..\\certs\\cert.pem", "utf8");
var credentials = { key: privateKey, cert: certificate };

var httpsServer = https.createServer(credentials, app);

httpServer.listen(8080, () => {
  console.log("Web Server (http) started at port: 8080");
});
httpsServer.listen(8443, () => {
  console.log("Web Server (httpS) started at port: 8443");
});

console.warn(`Open Chrome browser and go to 
http://localhost:8080 or 
https://localhost:8443 
because the google project has been configured to only allow these Javascript ORIGINS`);
