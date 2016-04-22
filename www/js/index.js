var macAddress = "98:D3:31:30:76:9E";
var macAddress2 = "20:16:01:20:55:22";

var app = {
    initialize: function() {
        this.bindEvents();
        localStorage.currentUnit = JSON.stringify("kg");
    },
    initializeSettings: function() {
        document.getElementById("current-unit").innerHTML = JSON.parse(localStorage.currentUnit);
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        bluetoothSerial.connect(macAddress, app.onConnect, app.onDisconnect);
        Measure.ontouchstart = app.test;
    },
    test: function(event) {
        bluetoothSerial.write("1");
    },
    onConnect: function() {
        bluetoothSerial.subscribe("\n", app.onMessage, app.subscribeFailed);
        statusDiv.innerHTML="Connected to " + macAddress + ".";        
    },
    sendToArduino: function(c) {
        bluetoothSerial.write(c);
    },
    onDisconnect: function() {
        alert("Disconnected");
        statusDiv.innerHTML="Disconnected.";
    },
    onMessage: function(data) {
        counter.innerHTML = data;
    },
    subscribeFailed: function() {
        alert("subscribe failed");
    }
};

$(document).ready(function(){
    $("#kg-button").on("click",function() {
        localStorage.currentUnit = JSON.stringify("kg");
        document.getElementById("current-unit").innerHTML = "kg";
        return false;
    });

    $("#lb-button").on("click",function() {
        localStorage.currentUnit = JSON.stringify("lb");
        document.getElementById("current-unit").innerHTML = "lb";
        return false;
    });
});

