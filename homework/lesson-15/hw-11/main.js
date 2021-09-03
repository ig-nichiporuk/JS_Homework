var chess = document.getElementById('chess'),
	form = document.getElementsByTagName('form')[0],
	inputs = form.getElementsByTagName('input'),
	button = document.getElementsByTagName('button')[0];

form.onkeyup = function () {
	var flag = false;
	for (var i = 0; i < inputs.length; i++) {
		if(!inputs[i].value || inputs[i].value.indexOf(' ') != -1) {
			flag = true;
			break;
		}
	}
	button.disabled = flag;
}

form.onmousedown = function (e) {
	if(e.target.tagName = 'INPUT') {
		e.target.classList.remove('error');
	}
}

button.onclick = function (e) {
	e.preventDefault();

	if(chess.dataset.status) {
		var oldChessBoard = chess.getElementsByTagName('table')[0];
		oldChessBoard.remove();
	}
	chess.dataset.status = 'chessboard-completed';

	var chessSize = {},
		chessBody = document.createElement('table');

	for (var i = 0; i < inputs.length; i++) {
		var val = inputs[i].value;
		if(+val && val >= 1 && val <= 10 && (val % parseInt(val) ==0) ) {
			chessSize[inputs[i].dataset.id] = val;
		} else {
			inputs[i].classList.add('error');
			alert('В поле ' + inputs[i].dataset.id + ' введено не корректное значение. Введите целое число от 1 до 10');
		}
	}

	chess.appendChild(chessBody);

	for(var row = 0; row < chessSize.X; row++) {
		var chessRow = document.createElement('tr');
		chessBody.appendChild(chessRow);
		for(var cell = 0; cell < chessSize.Y; cell++) {
			var chessCell = document.createElement('td');
			if(row % 2 && cell % 2) {
				chessCell.classList.add('black');
			}
			if(!(row % 2) && !(cell % 2)) {
				chessCell.classList.add('black');
			}
			chessRow.appendChild(chessCell);
		}
	}

	chessBody.onclick = function (e) {
		if (e.target.tagName = 'TD') {
			var chessCells = chessBody.getElementsByTagName('td');
			for (var i = 0; i < chessCells.length; i++) {
				if (chessCells[i].className) {
					chessCells[i].classList.remove('black');
				} else {
					chessCells[i].classList.add('black');
				}
			}
		}
	}
}

