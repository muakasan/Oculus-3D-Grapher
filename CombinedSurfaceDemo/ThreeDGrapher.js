var ws;
var paused = false;
var pauseOnGesture = false;
var focusListener;
var blurListener;

// Support both the WebSocket and MozWebSocket objects
if ((typeof(WebSocket) == 'undefined') &&
    (typeof(MozWebSocket) != 'undefined')) {
    WebSocket = MozWebSocket;
}

var width = 1000;
var height = 1000;

var x = 500;
var z = 500;

var firstFrame;
// Create the socket with event handlers
function init() {
var n = 0;
var controller = Leap.loop({enableGestures:true}, function(frame){
    n++;
    if(!firstFrame){
        firstFrame = frame;
    }
    else {
        try {
            var linearMovement = frame.translation(firstFrame);
            document.getElementById('xtranslation').innerText = linearMovement;
            var c = document.getElementById("myCanvas");
            var ctx = c.getContext("2d");
            ctx.fillStyle = "#FF0000";
            ctx.clearRect(0, 0, width, height); 
            x += parseInt(linearMovement[0])/10;
            z += parseInt(linearMovement[2])/10;
            ctx.fillRect(x, z, 10, 10);
        }   
        catch(err){}    
    }});
    controller.connect();
}
