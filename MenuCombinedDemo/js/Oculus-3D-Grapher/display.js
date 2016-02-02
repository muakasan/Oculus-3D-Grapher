function findRightSurface() {
    if(document.getElementById("torusa").value!='')
        run(torus(document.getElementById("torusa").value, document.getElementById("torusc").value));
    else if(document.getElementById("conea").value!='')
        run(cone(document.getElementById("conea").value, document.getElementById("coneb").value,document.getElementById("conec").value));
    else if(document.getElementById("ellipa").value!='')
        run(ellipsoid(document.getElementById("ellipa").value, document.getElementById("ellipb").value,document.getElementById("ellipc").value));
    else if(document.getElementById("trumpeta").value!='')
        run(trumpet(document.getElementById("trumpeta").value, document.getElementById("trumpetb").value));
    else if(document.getElementById("mobiusa").value!='')
        run(mobius(document.getElementById("mobiusa").value, document.getElementById("mobiusa").value)) //fix this
}
function run(surfaceData) {
    var camera, scene, renderer;
    var geometry, material, mesh;
    var controls, time = Date.now();

    var effect;

    var objects = [];

    var ray;

    var cube;
    var surface;

    vr.load(function(error) {
        if (error) {
            //statusEl.innerText = 'Plugin load failed: ' + error.toString();
            //alert('Plugin load failed: ' + error.toString());
        }

        init();
        animate();
        /*} catch (e) {
            //statusEl.innerText = e.toString();
            console.log(e);
        }*/
    });
    function init() {
        camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        scene = new THREE.Scene();

        controls = new THREE.OculusRiftControls( camera );
        scene.add( controls.getObject() );

        ray = new THREE.Raycaster();
        ray.ray.direction.set( 0, -1, 0 );

        parGeometry = new THREE.ParametricGeometry(surfaceData, 100, 100);
        parMaterial = new THREE.MeshBasicMaterial({color:0x0000ff, wireframe:true});

        var surface = new THREE.Mesh(parGeometry, parMaterial);

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
        $("#menu-div").hide();
        window.addEventListener("keydown", function(e) {
            // space and arrow keys
            if([32, 38, 40].indexOf(e.keyCode) > -1) {
                e.preventDefault();
            }
        }, false);

    }
    var vrstate = new vr.State();
    
    function iter() {
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
    }

    function animateWithLeap() {
        var firstFrame;

        var controller = Leap.loop({enableGestures:true}, function(frame){
            if(!firstFrame){
                firstFrame = frame;
            }
            var linearMovement = frame.translation(firstFrame); 
            surface.position.x += parseInt(linearMovement[0])/100;
            surface.position.y += parseInt(linearMovement[1])/100;
            surface.position.z += parseInt(linearMovement[2])/100;
            iter();
        });
        controller.connect();
        console.log(controller.connected());
    }

    function animateNoLeap() {
        vr.requestAnimationFrame(animateNoLeap);
        iter();
    }
    function animate() {
        if(!$("#disable-leap-checkbox").is(":checked"))
        {
            animateWithLeap();
           
        }
        else {
            animateNoLeap();

        }
    }
}