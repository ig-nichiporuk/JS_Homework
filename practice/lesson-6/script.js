var val = 0;
function f() {
	if(1) {
		val = true;
	}
	else {
		var val = false;
	}
	alert(val);
}
f();
