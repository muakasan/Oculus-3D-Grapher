var width = 1000;
var height = 1000;

var rotation = 0;

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
            var xRotation = frame.rotationAngle(firstFrame, [1, 0, 0]);
            var yRotation = frame.rotationAngle(firstFrame, [0, 1, 0]);
            var zRotation = frame.rotationAngle(firstFrame, [0, 0, 1]);

            document.getElementById('xRotation').innerText = xRotation;
            document.getElementById('yRotation').innerText = yRotation;
            document.getElementById('zRotation').innerText = zRotation;

            var c = document.getElementById("myCanvas");
            var ctx = c.getContext("2d");
            ctx.fillStyle = "#FF0000";
            ctx.translate(500,500);
            ctx.rotate(zRotation/100);
            ctx.translate(-500,-500);
            ctx.clearRect(0, 0, width, height); 
            ctx.fillRect(350, 350, 300, 300);
        }   
        catch(err){
            console.log(err)
        }    
    }});
    controller.connect();
}
