var users = document.getElementById('users'),
	btn = document.getElementsByTagName('button')[0];

function getUserData() {
	var usersInfo = JSON.parse(localStorage.getItem('users')).data,
		usersTabs = users.getElementsByClassName('usersTabsJS')[0],
		usersContent = users.getElementsByClassName('usersContentJS')[0];

	btn.disabled = true;

	for (var i in usersInfo) {
		usersTabs.insertAdjacentHTML('beforeend',
			'<span class="'+ (i == 0 ? 'active users__tab userTabJS' : 'users__tab userTabJS') +'" data-id='+ usersInfo[i].id +'>Пользователь ' + ++i +'</span>')
	}
	usersContent.insertAdjacentHTML('beforeend',
		'<div class="users__content-wrap">' +
				'<img src="'+usersInfo[0].avatar+'" alt="user-photo" class="users__photo userAvatarJS" width="130" height="130">' +
				'<div class="users__info userInfoJS">' +
					'<p class="name">First Name: <span class="userNameJS">'+ usersInfo[0].first_name +'</span></p>' +
					'<p class="suname">Last Name: <span class="userSunameJS">'+ usersInfo[0].last_name +'</span></p>' +
				'</div>' +
			'</div>'
	);
	users.onclick = function (e) {
		if (e.target.classList.contains('userTabJS') && !e.target.classList.contains('active')) {
			var tabs = usersTabs.getElementsByClassName('userTabJS');
			for (var i = 0;  i < tabs.length; i++) {
				tabs[i].classList.remove('active');
			}
			e.target.classList.add('active');
		}
		for (var j in usersInfo) {
			if(usersInfo[j].id == e.target.dataset.id) {
				var userAvatar = users.getElementsByClassName('userAvatarJS')[0],
					userName = users.getElementsByClassName('userNameJS')[0],
					userSuname = users.getElementsByClassName('userSunameJS')[0];
				userAvatar.src = usersInfo[j].avatar;
				userName.textContent = usersInfo[j].first_name;
				userSuname.textContent = usersInfo[j].last_name;
				break;
			}
		}
	}

}
function errorMessageStatus(xhr) {
	btn.remove();
	users.insertAdjacentHTML('beforeend','<div class="error">' + '' +
		'<p>Извините, что-то пошло&nbsp;не&nbsp;так</p>' +
		'<span>'+ xhr.status +'</span>' +
		'</div>'
	);
}

btn.onclick = function () {
	if(localStorage.getItem('users')) {
		getUserData();
	} else {

		var xhr = new XMLHttpRequest();

		xhr.open('GET', 'https://reqres.in/api/users?page=2');

		xhr.send();

		xhr.onload = function () {
			var statusType = +String(this.status)[0];

			if (statusType === 2) {
				localStorage.setItem('users', this.response);
				getUserData();
			} else {
				errorMessageStatus(xhr);
			}
		}

		xhr.onerror = function () {
			errorMessageStatus(xhr);
		}
	}





}