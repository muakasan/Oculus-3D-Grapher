
function cone(a, b, c) {
    return function(u,v) {
        var x = a*v*Math.cos(2*Math.PI*u)*100;
        var y = b*v*Math.sin(2*Math.PI*u)*100;
        var z = c*v*100;
        return new THREE.Vector3(z,x,y);
    }
}

function ellipsoid(a,b,c) {
    return function(u,v) {
        var x = a*Math.sin(2*Math.PI*u)*Math.cos(2*Math.PI*v)*100;
        var y = b*Math.sin(2*Math.PI*u)*Math.sin(2*Math.PI*v)*100;
        var z = c*Math.cos(2*Math.PI*u)*100;
        return new THREE.Vector3(x,y,z);
    }
}


function hyperboloidOne(a,b,c) {
    return function(u,v) {
        var x = a*Math.sqrt(1^u*u)*Math.cos(2*Math.PI*v)*100;
        var y = a*Math.sqrt(1+u*u)*Math.sin(2*Math.PI*v)*100;
        var z = c*u*100;
        return new THREE.Vector3(x,y,z);
    }
}

function paraboloid(a,b) {
    return function(u,v) {
        var x = a*Math.sqrt(u)*Math.cos(2*Math.PI*v)*100;
        var y = b*Math.sqrt(u)*Math.sin(2*Math.PI*v)*100;
        var z = u * 100;
        return new THREE.Vector3(x,y,z);
    }
}

function hyperboloidTwo(a,b,c) {
    return function(u,v)  {
        var x = a*Math.sinh(2*Math.PI*u)*Math.cos(2*Math.PI*v)*100;
        var y = a*Math.sinh(2*Math.PI*u)*Math.sin(2*Math.PI*v)*100;
        var z = c*Math.cosh(2*Math.PI*u)*100;
        return new THREE.Vector3(x,y,z);
    }
}

function torus(a,c) { 
    return function(u,v) {
        var x = (c+a*Math.cos(2*Math.PI*v))*Math.cos(2*Math.PI*u);

        var y = (c+a*Math.cos(2*Math.PI*v))*Math.sin(2*Math.PI*u);
        var z = a*Math.sin(Math.PI*v);
        //var x = a*Math.cos(2*Math.PI*u)+b*Math.cos(2*Math.PI*v)*Math.cos(2*Math.PI*u)*100;
        //var y = c*Math.sin(2*Math.PI*u)+d*Math.cos(2*Math.PI*v)*Math.sin(2*Math.PI*u)*100;
        //var z = e*Math.sin(2*Math.PI*v)*100;
        return new THREE.Vector3(x,y,z);
    }
}

function shell(a,b,c) {
    return function(u,v) {
        var x = Math.pow(a,v)*Math.sin(2*Math.PI*u)*Math.sin(2*Math.PI*u)*Math.cos(2*Math.PI*v)*100;
        var y = Math.pow(b,v)*Math.sin(2*Math.PI*u)*Math.sin(2*Math.PI*u)*Math.sin(2*Math.PI*v)*100;
        var z = Math.pow(c,v)*Math.sin(2*Math.PI*u)*Math.cos(2*Math.PI*u)*100;
        return new THREE.Vector3(x,y,z);
    }
}

function trumpet(a) {
    return function(u,v) {  
        var x = u*100;
        var y = a*Math.cos(2*Math.PI*v)/u*100;
        var z = a*Math.sin(2*Math.PI*v)/u*100;
        return new THREE.Vector3(x,y,z);
    }
}

function mobius(a) {
    return function(u,v) {
        var x = (a+v*Math.cos(0.5*2*Math.PI*u))*Math.cos(2*Math.PI*u);
        var y = (a+v*Math.sin(0.5*2*Math.PI*u))*Math.cos(2*Math.PI*u);
        var z = v*Math.sin(0.5*2*Math.PI*u);
        return new THREE.Vector3(x,y,z);
    }
}

function hyperbolicParaboloid(a,b) {
    return function(u,v) {
        var x = u*100;
        var y = v*100;
        var z = u*v*100;
        return new THREE.Vector3(x,y,z);
    }
}

function cylinder(a,b) {
    return function(u,v) {
        var x = a*Math.cos(2*Math.PI*v)*100;
        var y = b*Math.sin(2*Math.PI*v)*100;
        var z = u*100;
        return new THREE.Vector3(x,y,z);
    }
}

function plane(a,b,c,d) {
    return function(u,v) {
        var x = u*100;
        var y = v*100;
        var z = (d-a*u-b*v)/c * 100;
        return new THREE.Vector3(x,y,z);
    }
}