var macAddress = "98:D3:31:30:76:9E";
var macAddress2 = "20:16:01:20:55:22";

var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        bluetoothSerial.connect(macAddress, app.onConnect, app.onDisconnect);
        Measure.ontouchstart = app.test;
    },
    test: function(event) {
//        tempDiv.innerHTML="Wazzzzaaaaa";
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
