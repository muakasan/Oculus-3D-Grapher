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
var vx = 0;
var vz = 0;

// Create the socket with event handlers
function init() {
//alert("Ayy Lmao");
var n = 0;
var controller = Leap.loop({enableGestures:true}, function(frame){
	n++;
  /*
	if(x%100==0)
	{
	  var startFrame = controller.frame(100);
    var linearMovement = frame.translation(startFrame);
    document.getElementById('xtranslation').innerText = linearMovement;
  }
  */
  //document.getElementById('translation').innerText = x;
  
  var previousFrame = controller.frame(1);
  var linearMovement = frame.translation(previousFrame);
  try {
    //alert(x+ " " +y);
    document.getElementById('xtranslation').innerText = linearMovement;
      var c = document.getElementById("myCanvas");
      var ctx = c.getContext("2d");
      ctx.fillStyle = "#FF0000";
      ctx.clearRect(0, 0, width, height); 
      vx+=parseInt(linearMovement[0]);
      vz+=parseInt(linearMovement[2]);
      x+=vx/10;
      z+=vz/10; 
      ctx.fillRect(x, z, 10, 10);
  }
  catch(err){}
  });


/*
var controller = new Leap.Controller({
                         enableGestures: true,
                         frameEventName: 'animationFrame'
                         });

var fpsDisplay = document.getElementById('leapFPS');
var handCountDisplay = document.getElementById('handCount');
var pointableCountDisplay = document.getElementById('pointableCount');
var fingerCountDisplay = document.getElementById('fingerCount');
var toolCountDisplay = document.getElementById('toolCount');
var gestureCountDisplay = document.getElementById('gestureCount');

  controller.on('frame', function(frame){
  fpsDisplay.innerText = frame.currentFrameRate;
  handCountDisplay.innerText = frame.hands.length;
  pointableCountDisplay.innerText = frame.pointables.length;
  fingerCountDisplay.innerText = frame.fingers.length;
  toolCountDisplay.innerText = frame.tools.length;
  gestureCountDisplay.innerText = frame.gestures.length;
  });
*/
controller.connect();
}
