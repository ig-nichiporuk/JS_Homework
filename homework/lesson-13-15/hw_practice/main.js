localStorage.clear();

var parent = document.getElementById('id'),
	button = document.getElementsByTagName('button')[0];

var	p2 = document.createElement('p'),
	p1 = document.createElement('p');

p1.innerHTML = 'Links: <a href="https://www.instagram.com">Link1</a> <a href="https://www.google.com">Link2</a>';
p2.innerHTML = 'Links: <a href="https://www.onliner.by">Link3</a> <a href="https://habr.com">Link4</a>';

parent.appendChild(p1);
parent.appendChild(p2);


button.onclick = function () {
	var links = p1.children;

	for (var i = 0; i < links.length; i++ ) {
		links[i].classList.add('text-weight', 'text-red');
	}
}


p2.addEventListener('click', function (e) {
	var target = e.target;

	if(target.tagName == 'A') {
		e.preventDefault();
		if(target.getAttribute('href') == '#') {
			alert('Ссылка: ' + target.textContent + ' находится в localStorage, её путь: ' + JSON.parse(localStorage.getItem(target.textContent)).path);
		} else {
			localStorage.setItem(target.textContent, JSON.stringify({path: target.href}));
			target.href = '#';
			alert('Ссылка ' + target.textContent + ' была сохранена в localStorage');
		}
	}
})
