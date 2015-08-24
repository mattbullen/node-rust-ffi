function sendMessage(event, ws) {
    event.preventDefault();
    var msg = $("#input").val();
    ws.send(msg, function ack(error) {
        console.log("Error:", error);
    });
}

function init() {
    
    var host = location.origin.replace(/^http/, "ws");
    var ws = new WebSocket(host);
    ws.onmessage = function(event) {
        var li = document.createElement("li");
        li.innerHTML = JSON.parse(event.data);
        document.querySelector("#result").appendChild(li);
    };
     
    document.getElementById("button").addEventListener("click", function inputClickHandler(event, ws) { sendMessage(event, ws); });
}

window.addEventListener("DOMContentLoaded", init);