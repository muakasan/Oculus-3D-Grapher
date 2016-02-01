var camera, scene, renderer;
var geometry, material, mesh;
var controls, time = Date.now();

var effect;

var objects = [];

var ray;

var surface;

vr.load(function(error) {
    if (error) {
        //statusEl.innerText = 'Plugin load failed: ' + error.toString();
        //alert('Plugin load failed: ' + error.toString());
    }
    $("#button").click(function(){
        console.log("hi");
        init(ellipsoid(5,5,5));
        animate();
    });
});
function init(surfaceFunction) {
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    scene = new THREE.Scene();

    controls = new THREE.OculusRiftControls( camera );
    scene.add( controls.getObject() );

    ray = new THREE.Raycaster();
    ray.ray.direction.set( 0, -1, 0 );

    parGeometry = new THREE.ParametricGeometry(surfaceFunction, 100, 100);
    parMaterial = new THREE.MeshBasicMaterial({color:0x0000ff, wireframe:true});

    surface = new THREE.Mesh(parGeometry, parMaterial);
    scene.add(surface);
    objects.push(surface);

    renderer = new THREE.WebGLRenderer({
        devicePixelRatio: 1,
        alpha: false,
        clearColor: 0xFFFFFF,
        antialias: true
    });
    effect = new THREE.OculusRiftEffect(renderer);
    document.body.appendChild( renderer.domElement );
}
var vrstate = new vr.State();

function animate() {
    var firstFrame;

    var controller = Leap.loop({enableGestures:true}, function(frame){
        if(!firstFrame){
            firstFrame = frame;
        }
        var linearMovement = frame.translation(firstFrame); 
        surface.position.x += parseInt(linearMovement[0])/100;
        surface.position.y += parseInt(linearMovement[1])/100;
        surface.position.z += parseInt(linearMovement[2])/100;
        controls.isOnObject(false);

        ray.ray.origin.copy(controls.getObject().position);
        ray.ray.origin.y -= 10;

        var intersections = ray.intersectObjects(objects);
        if(intersections.length>0) {
            var distance = intersections[0].distance;
            if(distance>0 && distance<10) {
                controls.isOnObject(true);
            }
        }

        var polled = vr.pollState(vrstate);
        controls.update(Date.now() - time, polled ? vrstate: null);

        effect.render(scene, camera, polled ? vrstate : null);

        time = Date.now();
    });
    controller.connect();
    console.log(controller.connected());
}