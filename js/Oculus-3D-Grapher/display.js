function findRightSurface() {
    
    var headerDivValue = $($.grep($(".collapsible-body"), function( i ) {      
            return $(i).css("display") !== "none";
        })[0]).prev().html();

    switch(headerDivValue)
    {
        case "Torus":
            run(torus($("#torusa").val(), $("#torusc").val()));
            break;
        case "Cone":
            break;
        case "Ellipsoid":
            break;
        case "Plane":
            break;
        case "Cylinder":
            break;
        case "Trumpet":
            break;
        case "Mobius Band":
            break;
        case "Hyperboloid of One Sheet":
            break;
        case "Hyperboloid of Two Sheets":
            break;
        case "Elliptic Paraboloid":
            break;
        case "Hyperbolic Paraboloid":
            break;
        case "Custom Equation":
            runCustomEquation();
            break;
    }


    else if(document.getElementById("conea").value!='')
        run(cone(document.getElementById("conea").value, document.getElementById("coneb").value,document.getElementById("conec").value));
    else if(document.getElementById("ellipa").value!='')
        run(ellipsoid(document.getElementById("ellipa").value, document.getElementById("ellipb").value,document.getElementById("ellipc").value));
    else if(document.getElementById("trumpeta").value!='')
        run(trumpet(document.getElementById("trumpeta").value));//fix this?
    else if(document.getElementById("mobiusa").value!='')
        run(mobius(document.getElementById("mobiusa").value)); //fix this //done I think
    else if(document.getElementById("hypera").value!='')
        run(hyperboloidOne(document.getElementById("hypera").value, document.getElementById("hyperb").value, document.getElementById("hyperc").value));
    else if(document.getElementById("hypera2").value!='')
        run(hyperboloidTwo(document.getElementById("hypera2").value, document.getElementById("hyperb2").value));
    else if(document.getElementById("paraba").value!='')
        run(paraboloid(document.getElementById("paraba").value, document.getElementById("parabb").value)); //also fix this //done!
    else if(document.getElementById("paraba2").value!='')
        run(hyperbolicParaboloid(document.getElementById("paraba2").value, document.getElementById("parabb2").value)); //and this. definitely fix this.
    else if(document.getElementById("cylina").value!='')
        run(cylinder(document.getElementById("cylina").value, document.getElementById("cylinb").value));
    else if(document.getElementById("planea").value!='')
        run(plane(document.getElementById("planea").value, document.getElementById("planeb").value, document.getElementById("planec").value, document.getElementById("planed").value));
}
        getCustomEquation();
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