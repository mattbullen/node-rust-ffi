function sendMessage(ws) {
    var msg = $("#input").val();
    console.log("Message:", msg);
    ws.send(msg, function ack(error) {
        console.log("Error:", error);
    });
    
}

function init() {
    
    var host = location.origin.replace(/^http/, "ws");
    var ws = new WebSocket(host);
    ws.onmessage = function(event) {
        console.log("Reply:", event.data);
        var li = document.createElement("li");
        li.innerHTML = event.data;
        document.querySelector("#list").appendChild(li);
    };
     
    $("#button").on("click", function(event) {
        event.preventDefault();
        var msg = $("#input").val();
        console.log("Message:", msg);
        ws.send(msg);
    });
}

window.addEventListener("DOMContentLoaded", init);