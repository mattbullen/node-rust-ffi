var WebSocketServer = require("ws").Server;
var http = require("http");
var express = require("express");
var app = express();
var port = process.env.PORT || 5000;
var ffi = require("ffi");

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
        
        var ffiLibrary = ffi.Library("cc", {
            how_many_characters: ["uint32", ["string"]],
        });
        var chars = ffiLibrary.how_many_characters(data);
        console.log("FFI:", chars);
        
        var reply = {
            message: data,
            count: chars,
            status: "OK"
        }
        ws.send(JSON.stringify(reply));
        console.log("Reply sent:",reply);
    });

    ws.on("close", function() {
        console.log("Websocket: closed");
    })
    
});