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
        init();
        animate();
    });

    /*} catch (e) {
        //statusEl.innerText = e.toString();
        console.log(e);
    }*/
});
function init() {

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.x
    scene = new THREE.Scene();

    controls = new THREE.OculusRiftControls( camera );
    scene.add( controls.getObject() );

    ray = new THREE.Raycaster();
    ray.ray.direction.set( 0, -1, 0 );

    //var test = new THREE.Geometry();
    //test.computeCentroids();

    geometry = new THREE.CubeGeometry( 20, 20, 20 )
    material = new THREE.MeshBasicMaterial({color:0x0000ff, wireframe:true});

    //console.log(geometry);

    //parGeometry =THREE.ParametricGeometry(surface, 10, 10);
    //parMaterial = new THREE.MeshBasicMaterial({color:0x0000ff, wireframe:true});

    //curve = new THREE.Mesh(parGeometry, parMaterial);

    surface = new THREE.Mesh( geometry, material );
    
    //console.log(cube.computeCentroids());

    surface.position.x = 10;
    surface.position.y = 10;
    surface.position.z = -10;
    scene.add(surface);
    objects.push(surface);
    //scene.add(curve);
    //objects.push(curve);

    renderer = new THREE.WebGLRenderer({
        devicePixelRatio: 1,
        alpha: false,
        clearColor: 0x00ff00,
        antialias: true
    });
    effect = new THREE.OculusRiftEffect(renderer);

    

    document.getElementById('ipd').innerHTML =
        effect.getInterpupillaryDistance().toFixed(3);

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
        /*
        cube.rotation.x+=0.1;
        cube.rotation.y+=0.1;
        */
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
}

function surface(u, v) {
    var z = (u-0.5)*(u-0.5)+(v-0.5)*(v-0.5);
    return new THREE.Vector3((u-0.5)*10, (v-0.5)*10, z*10);
}