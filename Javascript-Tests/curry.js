function ellipsoid(a, b, c){
	return function ellipsoidHelper(u,v) {
	    var x = a*Math.sin(u)*Math.cos(v)*100;
	    var y = b*Math.sin(u)*Math.sin(v)*100;
	    var z = c*Math.cos(u)*100;
	    return new Vector3(x,y,z);
	}
}