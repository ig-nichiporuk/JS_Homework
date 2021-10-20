var app = document.getElementById('app'),
	form = document.querySelector('[name="auth-form"]'),
	email = document.getElementById('email'),
	password = document.getElementById('password'),
	usersID = JSON.parse(localStorage.getItem('usersID'));

if (usersID) {
	showMessage(usersID);
}

form.onclick = function (e) {
	if(e.target.tagName === 'INPUT') {
		email.classList.remove('error-input');
		password.classList.remove('error-input');
		removeErrorMessage();
	}
};

form.onsubmit = function (e) {
	e.preventDefault();

	removeErrorMessage();

	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'https://reqres.in/api/register');
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send(JSON.stringify({
		email : email.value,
		password : password.value
	}));
	xhr.onload = function () {
		try {
			var id = JSON.parse(this.response).id;
			if (id) {
				localStorage.setItem('usersID', JSON.stringify(id));
				showMessage(id);
			} else {
				showError(JSON.parse(this.response).error);
			}
		} catch {
			showError(JSON.parse(this.response).error);
		}
	};
	xhr.error =function () {
		showError(JSON.parse(this.response).error);
	};
}

function showMessage(id) {
	app.innerHTML = '<p>User ' +id+ ' has been successfully registered</p>';
}

function showError(error) {
	form.insertAdjacentHTML('afterend', '<p class="error-message">Error: ' + error + '</p>');
	var inputs = form.getElementsByTagName('input');
	for (var i = 0; i < inputs.length; i++) {
		inputs[i].value = '';
		inputs[i].classList.add('error-input');
	}
}

function removeErrorMessage() {
	var errorMessage = app.getElementsByTagName('p')[0];
	if (errorMessage) {
		errorMessage.remove();
	}
}


