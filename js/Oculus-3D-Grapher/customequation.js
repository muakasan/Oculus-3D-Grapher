function getCustomEquation(){
	eval("run(function(u, v){" + 
		$("#custom-equation-textbox").val() + 
		"\n return new THREE.Vector3(x, y, z);})");
}