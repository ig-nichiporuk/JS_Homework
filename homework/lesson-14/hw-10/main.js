var table = document.getElementById('table'),
	button = table.getElementsByClassName('btn')[0],
	rows = table.getElementsByTagName('tr');

function addRow() {
	var newRow = document.createElement('tr');
	newRow.innerHTML = '<td></td><td></td><td></td>';
	table.children[0].insertBefore(newRow, rows[0]);
}

function blurInput(input) {
	input.onblur = function () {
		if (input.value) {
			input.parentElement.dataset.status = 'edited';
		} else {
			delete input.parentElement.dataset.status;
		}
		input.parentElement.innerHTML = input.value;
	};
}

function addInput(e) {
	var target = e.target,
		newInput = document.createElement('input');
	newInput.type = 'text';

	if (target.tagName == 'TD' && !target.classList.contains('btn')) {
		if (target.dataset.status) {
			newInput.value = target.textContent;
			target.textContent = '';
			target.appendChild(newInput).focus();
			var input = table.getElementsByTagName('input')[0];
		} else {
			target.appendChild(newInput).focus();
			var input = table.getElementsByTagName('input')[0];
		}

		blurInput(input);
	}
}

function keyTapInput(e) {
	var target = e.target;

	if (target.tagName === 'INPUT') {
		if (e.keyCode == 13) {
			var input = table.getElementsByTagName('input')[0];

			input.blur();
		}
	}
}

button.addEventListener('click', addRow, false);
document.addEventListener('click', addInput, false);
table.addEventListener('keyup', keyTapInput, false);




