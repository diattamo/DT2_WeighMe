var macAddress = "98:D3:31:30:76:9E";
var macAddress2 = "20:16:02:14:33:51";

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
        Measure.addEventListener('touchstart', this.connect1, false);
    },
    onDeviceReady: function() {
         console.log("device ready");
    },

    connect1: function() {
        var onConnect = function() {
                // subscribe for incoming data
                console.log("connected to bluetooth");
                bluetoothSerial.subscribe("\n", app.onMessage1, app.subscribeFailed); 
                // statusDiv.innerHTML="Connected to " + macAddress + ".";  
                bluetoothSerial.write("1");

            };

        bluetoothSerial.connect(macAddress, onConnect, app.onDisconnect);

        // then send 1

    },

    sendToArduino: function(c) {
        bluetoothSerial.write(c);
    },
    onDisconnect: function() {
        // alert("Disconnected");
        // statusDiv.innerHTML="Disconnected.";
        console.log("connection failed");
    },
    onMessage1: function(data) {
        console.log("reading 1");
        counter.innerHTML = data;
        bluetoothSerial.disconnect(app.successDisc, app.failDisc);
    },
    subscribeFailed: function() {
        alert("subscribe failed");
    },
    successDisc: function() {
        console.log("Disconnect successful");
    },
    failDisc: function() {
        console.log("Disconnect Unsuccessful");
    },

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

