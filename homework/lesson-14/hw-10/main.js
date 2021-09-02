var table = document.getElementById('table'),
	button = table.getElementsByClassName('btn')[0],
	rows = table.getElementsByTagName('tr');
function addRow(){
	var newRow = document.createElement('tr');
	newRow.innerHTML = '<td></td><td></td><td></td>';
	table.children[0].insertBefore(newRow, rows[0]);
}
function blurInput(input) {
	input.addEventListener('keyup', function (e){
		if(e.keyCode === 13) {
			if(input.value) {
				input.parentElement.dataset.status = 'edited';
			}
			else {
				delete input.parentElement.dataset.status;
			}
			input.parentElement.innerHTML = input.value;
		}
	}, false);
}
function addInput(e) {
	var target = e.target,
		newInput = document.createElement('input');
	newInput.type = 'text';
	if (target.tagName == 'TD' && !target.classList.contains('btn')) {
		if(target.dataset.status) {
			newInput.value = target.textContent;
			target.textContent = '';
			target.appendChild(newInput).focus();
			var input = table.getElementsByTagName('input')[0];
			blurInput(input);
		}
		else {
			target.appendChild(newInput).focus();
			var input = table.getElementsByTagName('input')[0];
			blurInput(input);
		}
	}
}
function test(e) {
	var target = e.target;
	if (target.tagName !== 'input') {
		var inputs = table.getElementsByTagName('input');
		for (var i in inputs) {
			inputs[i].onblur = function(e) {
				if(e.target.value) {
					e.target.parentElement.dataset.status = 'edited';
				}
				else {
					delete e.target.parentElement.dataset.status;
				}
				e.target.parentElement.innerHTML = e.target.value;
			};
		}
	}
}

button.addEventListener('click', addRow, false);
table.addEventListener('click', addInput, false);
document.addEventListener('click', test, false);




