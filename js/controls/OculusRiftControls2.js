THREE.OculusRiftControls2 = function(camera) {
    var scope = this;

    var moveForward = false;
    var moveBackward = false;
    var moveLeft = false;
    var moveRight = false;

    var moveUp = false;
    var moveDown = false;



    var onKeyDown = function ( event ) {

        switch ( event.keyCode ) {

            case 38: // up
            //case 87: // w
                moveForward = true;
                break;

            case 37: // left
            //case 65: // a
                moveLeft = true; break;

            case 40: // down
            //case 83: // s
                moveBackward = true;
                break;

            case 39: // right
            //case 68: // d
                moveRight = true;
                break;

            /*case 32: // space
                if ( canJump === true ) velocity.y += this.jumpSpeed;
                canJump = false;
                break;*/

            case 81: //q
                moveUp = true;
                break;

            case 87: //w
                moveDown = true;
                break;

        }

    }.bind(this);

    var onKeyUp = function ( event ) {

        switch( event.keyCode ) {

            case 38: // up
            //case 87: // w
                moveForward = false;
                break;

            case 37: // left
            //case 65: // a
                moveLeft = false;
                break;

            case 40: // down
            //case 83: // a
                moveBackward = false;
                break;

            case 39: // right
            //case 68: // d
                moveRight = false;
                break;

            case 81: //q
                moveUp = false;
                break;

            case 87: //w
                moveDown = false;
                break;

        }

    }.bind(this);

    document.addEventListener( 'keydown', onKeyDown, false );
    document.addEventListener( 'keyup', onKeyUp, false );

    this.update = function(delta, vrstate) {
        console.log(camera.position.z);
        if(moveUp)
            camera.position.z+=10;
        if(moveDown)
            camera.position.z-=10;
        if(moveLeft)
            camera.position.x-=10;
        if(moveRight)
            camera.position.x+=10;
        if(moveForward)
            camera.position.y+=10;
        if(moveBackward)
            camera.position.y-=10;
    }
}