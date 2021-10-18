var deadline = 2; // minutes
var timer = document.getElementById('timer'),
	timerControl = timer.querySelector('.timer__control');



function setTimer(total) {
	total += 1;
	localStorage.setItem('timerMilliseconds', total);
	var min = Math.floor((total / 100 / 60) % 60),
		sec = Math.floor((total / 100) % 60),
		millisec = total % 100;
	return {
		min : min,
		sec : sec,
		millisec : millisec,
	}
}


function initTimer() {
	var minutes = document.getElementById('minutes'),
		seconds = document.getElementById('seconds'),
		milliseconds = document.getElementById('milliseconds');

	var timeInterval = setInterval(function () {
		var t = setTimer(+localStorage.getItem('timerMilliseconds'));
		minutes.innerHTML = t.min < 10 ? '0' + t.min : t.min;
		seconds.innerHTML = t.sec < 10 ? '0' + t.sec : t.sec;
		milliseconds.innerHTML = t.millisec < 10 ? '0' + t.millisec : t.millisec;

		if(t.min > 0) clearInterval(timeInterval);

	}, 10);
}

if(localStorage.getItem('timerInfo')) {
	initTimer();
}


timerControl.onclick = function () {
	switch (this.dataset.state) {
		case 'init':
			localStorage.setItem('timerInfo', JSON.stringify({
				milleseconds : 0,
				status : 'run',
				text : 'Stop'
			}));
			var timerInfo = JSON.parse(localStorage.getItem('timerState'));
			this.dataset.state = timerInfo.status;
			this.innerText = timerInfo.text;
			initTimer();
			break;
		case 'run':
			localStorage.setItem('timerMilliseconds', 0);
			this.dataset.state = 'stop';
			this.innerText = 'Start';
			initTimer();
			break;
	}
	/*localStorage.setItem('timerMilliseconds', 0);
	initTimer(timer, deadline);*/
};







