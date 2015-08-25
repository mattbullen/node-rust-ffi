// Configuration settings
var WebSocketServer = require("ws").Server;
var http = require("http");
var express = require("express");
var app = express();
var port = process.env.PORT || 5000;
var ffi = require("ffi");
var path = require("path");
var sopath = path.join(__dirname, "/target/debug/libcc.so");
app.use(express.static(__dirname + "/"));

// Start the server
var server = http.createServer(app);
server.listen(port);
console.log("HTTP server listening on port %d", port);

// Start the websocket server
var wss = new WebSocketServer({server: server});
console.log("Websocket: created");

// Message counter: resets on new connection for this example
var messageCount = 0;

// Define websocket events
wss.on("connection", function(ws) {
    
    console.log("Websocket: open");
    
    ws.on("message", function(data) {
        
        console.log("Message received:", data);
        
        var ffiLibrary = ffi.Library(sopath, {
            how_many_characters: ["uint32", ["string"]],
        });
        var chars = ffiLibrary.how_many_characters(data);
        console.log("FFI:", chars);
        
        var reply = {
            id: messageCount,
            message: data,
            count: chars,
            date: new Date().toLocaleString(),
            status: "OK"
        }
        ws.send(JSON.stringify(reply));
        console.log("Reply sent:",reply);
        
        messageCount++;
    });

    ws.on("close", function() {
        console.log("Websocket: closed");
        messageCount = 0;
    })
    
});