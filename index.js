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
    
    //var id = setInterval(function() {
    //    ws.send(JSON.stringify(new Date()), function() {});
    //}, 5000);
    
    ws.on("message", function(data) {
        console.log("Message received:", data);
        //var msg = ws.unmaskMessage(data);
        //console.log(ws.convertToString("Message received:", msg.opcode, msg.message));
        
        //var packagedMessage = wss.packageMessage(msg.opcode, msg.message);
        //wss.sendMessage("all", packagedMessage);
        //ws.send(JSON.stringify(data));
        var reply = {
            message: data,
            status: "OK"
        }
        ws.send(JSON.stringify(reply));
    });

    ws.on("close", function() {
        console.log("Websocket: closed");
        //clearInterval(id);
    })
    
});