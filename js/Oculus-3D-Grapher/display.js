function findRightSurface() {
    
    var headerDivValue = $($.grep($(".collapsible-body"), function( i ) {      
            return $(i).css("display") !== "none";
        })[0]).prev().html();

    //console.log(headerDivValue);
    
    switch(headerDivValue)
    {
        case "Torus":
            run([$("#torusa").val(), $("#torusc").val()]);
            break;
        case "Cone":
            run(cone($("#conea").val(), $("#coneb").val(), $("#conec").val()));
            break;
        case "Ellipsoid":
            run(ellipsoid($("#ellipa").val(), $("#ellipb").val(), $("#ellipc").val()));
            break;
        case "Plane":
            run(plane($("#planea").val(), $("#planeb").val(), $("#planec").val(), $("#planed").val()));
            break;
        case "Cylinder":
            run(cylinder($("#cylina").val(), $("#cylinb").val()));
            break;
        case "Gabriel's Horn":
            run(trumpet($("#trumpeta").val()));
            break;
        case "Mobius Band":
            run(mobius($("#mobiusa").val()));
            break;
        case "Hyperboloid of One Sheet":
            run(hyperboloidOne($("#hypera").val(), $("#hyperb").val(), $("#hyperc").val()));
            break;
        case "Hyperboloid of Two Sheets":
            run(hyperboloidTwo($("#hypera2").val(), $("#hyperb2").val()));
            break;
        case "Elliptic Paraboloid":
            run(paraboloid($("#paraba").val(), $("#parabb").val(), $("#parabc").val()));
            break;
        case "Hyperbolic Paraboloid":
            run(hyperbolicParaboloid($("#paraba2").val(), $("#parabb2").val(), $("#parabc2").val()));
            break;
        case "Custom Equation":
            runCustomEquation();
            break;
    }

/*
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
        getCustomEquation();*/
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

    var moveForward = false;
    var moveBackward = false;
    var moveLeft = false;
    var moveRight = false;

    var moveUp = false;
    var moveDown = false;

    var rotateLeft = false;
    var rotateRight = false;
    var rotateUp = false;
    var rotateDown = false;
    var tiltLeft = false;
    var tiltRight = false;

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
        bindKeys();
        camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        scene = new THREE.Scene();


        controls = new THREE.OculusRiftControls( camera );
        scene.add( controls.getObject() );

        ray = new THREE.Raycaster();
        ray.ray.direction.set( 0, -1, 0 );

        parGeometry = null;
        if(Array.isArray(surfaceData))
            parGeometry = new THREE.TorusGeometry(parseInt(surfaceData[0]), parseInt(surfaceData[1])*2, 16, 100);
        else
            parGeometry = new THREE.ParametricGeometry(surfaceData, 100, 100);
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
        camera.position.z=30;
        camera.position.x=10;
        
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
                //controls.isOnObject(true);
            }
        }

        var polled = vr.pollState(vrstate);
        //controls.update(Date.now() - time, polled ? vrstate: null);

        

        time = Date.now();
        //camera.position.z+=100;
        //console.log(camera.position.x, " ", camera.position.y, " ", camera.position.z);
        if(moveForward) { //actually moves forward :/
            //console.log("x: ", camera.rotation.x, " y: ", camera.rotation.y, " z: ", camera.rotation.z);
            //var theta = camera.rotation.z;
            //var phi = camera.rotation.
            var v = new THREE.Vector3(0,0,1);
            //var newV = camera.worldToLocal(v);
            //console.log(newV);
            //var v = THREE.Vector3(0,1,0);
            //camera.translateZ(1);
            camera.translateOnAxis(v,1);
            //camera.position.z+=2*Math.cos(camera.rotation.x)*Math.cos(camera.rotation.y);
            //camera.position.y-=5*Math.sin(camera.rotation.y);//*Math.sin(camera.rotation.z);
            //camera.position.x+=2*Math.sin(camera.rotation.y);//*Math.sin(camera.rotation.z);
        }
        if(moveBackward) {
            var v = new THREE.Vector3(0,0,-1);
            camera.translateOnAxis(v,1);
            //camera.position.z-=10;
            //camera.position.z-=2*Math.cos(camera.rotation.x)*Math.cos(camera.rotation.y);
            //camera.position.y+=5*Math.sin(camera.rotation.y);//*Math.sin(camera.rotation.z);
            //camera.position.x-=2*Math.sin(camera.rotation.y);//*Math.sin(camera.rotation.z);
        }
        if(moveLeft)
        {
            //camera.position.x-=5;
            var v = new THREE.Vector3(-1,0,0);
            camera.translateOnAxis(v,1);
        }
        if(moveRight) {
            //camera.position.x+=5;
            var v = new THREE.Vector3(1,0,0);
            camera.translateOnAxis(v,1);
        }
        if(moveUp) {
            var v = new THREE.Vector3(0,1,0);
            camera.translateOnAxis(v,1);
        }
        if(moveDown) {
            //camera.position.y-=5;
            var v = new THREE.Vector3(0,-1,0);
            camera.translateOnAxis(v,1);
        }
        if(rotateLeft)
            camera.rotateY(0.1);
        if(rotateRight)
            camera.rotateY(-0.1);
        if(rotateUp) {
            //camera.rotation.x+=Math.PI/36;
            //camera.rotateByAxis
            //var v = new THREE.Vector3(1,0,0);
            //camera.rotate(v, 1);
            camera.rotateX(0.1);
        }
        if(rotateDown) {
            //var v = new THREE.Vector3(-1,0,0);
            //camera.rotate(v, 1);
            camera.rotateX(-0.1);
        }
        if(tiltLeft)
            camera.rotation.z+=Math.PI/36;
        if(tiltRight)
            camera.rotation.z-=Math.PI/36;
        effect.render(scene, camera, polled ? vrstate : null);
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

    function bindKeys() {
        var onKeyDown = function ( event ) {

            switch ( event.keyCode ) {

                //case 38: // up
                case 87: // w
                    moveUp = true;
                     break;

                //case 37: // left
                case 65: // a
                    moveLeft = true; 
                    break;

                //case 40: // down
                case 83: // s
                    moveDown = true;
                    break;

                //case 39: // right
                case 68: // d
                    moveRight = true;
                    break;

                /*case 32: // space
                    if ( canJump === true ) velocity.y += this.jumpSpeed;
                    canJump = false;
                    break;*/

                case 81: //q
                    moveForward = true;
                    break;

                case 69: //e
                    moveBackward = true;
                    break;

                case 73: //I
                    rotateUp = true;
                    break;

                case 75: //K
                    rotateDown = true;
                    break;

                case 74: //J
                    rotateLeft = true;
                    break;

                case 76://L
                    rotateRight = true;
                    break;

                /*case 85://U
                    tiltRight = true;
                    break;

                case 79://O
                    tiltLeft = true;
                    break;*/

            }

        }

        var onKeyUp = function ( event ) {

            switch( event.keyCode ) {

                //case 38: // up
                case 87: // w
                    moveUp = false;
                    break;

                //case 37: // left
                case 65: // a
                    moveLeft = false;
                    break;

                //case 40: // down
                case 83: // a
                    moveDown = false;
                    break;

                //case 39: // right
                case 68: // d
                    moveRight = false;
                    break;

                case 81: //q
                    moveForward = false;
                    break;

                case 69: //e
                    moveBackward = false;
                    break;

                
                 case 73: //I
                    rotateUp = false;
                    break;

                case 75: //K
                    rotateDown = false;
                    break;

                case 74: //J
                    rotateLeft = false;
                    break;

                case 76://L
                    rotateRight = false;
                    break;

                /*case 85://U
                    tiltRight = false;
                    break;

                case 79://O
                    tiltLeft = false;
                    break;*/
            }
        }
        document.addEventListener("keydown", onKeyDown, false);
        document.addEventListener("keyup", onKeyUp, false);
    }
}