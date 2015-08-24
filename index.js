var WebSocketServer = require("ws").Server;
var http = require("http");
var express = require("express");
var app = express();
var port = process.env.PORT || 5000;

app.use(express.static(__dirname + "/"));

var server = http.createServer(app);
server.listen(port);
console.log("HTTP server listening on port %d", port);

var wss = new WebSocketServer({server: server});
console.log("Websocket: created");

wss.on("connection", function(ws) {
    
    console.log("Websocket: open");
    
    ws.on("message", function(data) {
        console.log("Message received:", data);
        var reply = {
            message: data,
            status: "OK"
        }
        ws.send(JSON.stringify(reply));
        console.log("Reply sent:",reply);
    });

    ws.on("close", function() {
        console.log("Websocket: closed");
    })
    
});