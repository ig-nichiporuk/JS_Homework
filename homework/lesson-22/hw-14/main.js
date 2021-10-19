var timer = document.getElementById('timer'),
	timerControl = timer.querySelector('.timerControlJs'),
	timerList = timer.querySelector('.timerListJs'),
	timerReset,
	timerSave,
	timerInterval,
	deadline = 1; //минуты

if(localStorage.getItem('timerInfo')) {
	var t = stateTimer();
	switch (t.status) {
		case 'run':
			startTimer(deadline);
			showTimerBtns();
			showTimerList();
			break;
		case 'stop':
			getTimer();
			showTimerBtns();
			showTimerList();
			break;
		default:
			resetTimer();
	}
}

timerControl.onclick = function () {
	switch (this.dataset.state) {
		case 'init':
			showTimerBtns();
			startTimer(deadline);
			break;
		case 'stop':
			startTimer(deadline);
			break;
		case 'run':
			stopTimer();
			break;
	}
};

timer.onclick = function (e) {
	if (e.target.classList.contains('timerResetJs')) {
		resetTimer();
	} else if(e.target.classList.contains('timerSaveJs')) {
		saveTimer();
	}
};

function showTimerBtns() {
	timerList.insertAdjacentHTML('beforebegin', '<button class="timer__control timerResetJs">Reset</button>'
		+'<button class="timer__control timerSaveJs">Save</button>');
}

function showTimerList() {
	var points = JSON.parse(localStorage.getItem('timerPointsList'));
	if (points) {
		points.forEach(function (point) {
			timerList.insertAdjacentHTML('beforeend', '<li class="timer__list-item">' +point+'</li>');
		});
	}
}

function formatData(num) {
	return num < 10 ? '0' + num : num;
}

function setTimer(total) {
	var min = Math.floor((total / 100 / 60) % 60),
		sec = Math.floor((total / 100) % 60),
		millisec = total % 100;
	return {
		min : formatData(min),
		sec : formatData(sec),
		millisec : formatData(millisec)
	}
}

function getTimer() {
	var minutes = document.getElementById('minutes'),
		seconds = document.getElementById('seconds'),
		milliseconds = document.getElementById('milliseconds'),
		t = setTimer(+localStorage.getItem('timerMilliseconds'));

	minutes.innerHTML = t.min;
	seconds.innerHTML = t.sec;
	milliseconds.innerHTML = t.millisec;
	return t;
}

function updateTimer(endtime) {
	localStorage.setItem('timerMilliseconds', +localStorage.getItem('timerMilliseconds') + 1);

	var t = getTimer();

	if(t.min == endtime) {
		clearInterval(timerInterval);
		localStorage.setItem('timerInfo', JSON.stringify({
			status : 'end',
		}));
		timerSave = timer.getElementsByClassName('timerSaveJs')[0];
		timerSave.remove();
		timerControl.remove();
	}
}

function resetTimer() {
	var timerWrap = timer.getElementsByClassName('timerWrapJs')[0];
	timer.insertBefore(timerControl, timerWrap);
	timerReset = timer.getElementsByClassName('timerResetJs')[0];
	timerSave = timer.getElementsByClassName('timerSaveJs')[0];
	if(timerReset) {
		timerReset.remove();
	}
	if(timerSave) {
		timerSave.remove();
	}
	timerList.innerHTML = '';
	clearInterval(timerInterval);
	localStorage.removeItem('timerMilliseconds');
	localStorage.removeItem('timerPointsList');
	localStorage.setItem('timerInfo', JSON.stringify({
		status : 'init',
		text : 'Start'
	}));
	stateTimer();
	getTimer();
}

function saveTimer() {
	var t = setTimer(+localStorage.getItem('timerMilliseconds'));
	if (localStorage.getItem('timerPointsList')) {
		var points = JSON.parse(localStorage.getItem('timerPointsList'));
		points.push(t.min+ ' : '+t.sec+ ' : '+t.millisec);
		localStorage.setItem('timerPointsList', JSON.stringify(points));
	} else {
		localStorage.setItem('timerPointsList', JSON.stringify([t.min+ ' : '+t.sec+ ' : '+t.millisec]));
	}
	timerList.insertAdjacentHTML('beforeend', '<li class="timer__list-item">' +t.min+ ' : '+t.sec+ ' : '+t.millisec+'</li>');
}

function startTimer(endtime) {
	localStorage.setItem('timerInfo', JSON.stringify({
		status : 'run',
		text : 'Stop'
	}));
	stateTimer();
	timerInterval = setInterval(updateTimer, 10, endtime);
}

function stopTimer() {
	clearInterval(timerInterval);
	localStorage.setItem('timerInfo', JSON.stringify({
		status : 'stop',
		text : 'Run'
	}));
	stateTimer();
}

function stateTimer() {
	var timerInfo = JSON.parse(localStorage.getItem('timerInfo'));

	timerControl.dataset.state = timerInfo.status;
	timerControl.innerText = timerInfo.text;

	return timerInfo;
}












