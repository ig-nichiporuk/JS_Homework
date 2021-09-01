var parent = document.getElementById('id');

var	p2 = document.createElement('p'),
	p1 = document.createElement('p');
parent.appendChild(p1);
p1.innerHTML = 'Links: <a href="#">Link1</a> <a href="#">Link2</a>';
p2.innerHTML = 'Links: <a href="#">Link3</a> <a href="#">Link4</a>';
parent.appendChild(p1);
parent.appendChild(p2);
