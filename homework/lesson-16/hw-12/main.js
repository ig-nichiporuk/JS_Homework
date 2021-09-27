var users = document.getElementById('users'),
	btn = document.getElementsByTagName('button')[0];

function getUserData() {
	try {
		var usersInfo = JSON.parse(localStorage.getItem('users')).data,
			usersTab = users.getElementsByClassName('usersTabsJS')[0],
			usersTContent = users.getElementsByClassName('usersContentJS')[0];

		btn.disabled = true;

		for (var i in usersInfo) {
			usersTab.insertAdjacentHTML('beforeend',
				'<span class="'+ (i == 0 ? 'active users_tab userTabJS' : 'users_tab userTabJS') +'" data-id='+ usersInfo[i].id +'>Пользователь' + ++i +'</span>')
		}
		usersTContent.insertAdjacentHTML('beforeend',
			'<img src='+usersInfo[0].avatar+' alt="user-photo" class="users__photo userAvatarJS">' +
			'<div class="users_info userInfoJS">' +
			'<p class="name userNameJS">First Name: '+ usersInfo[0].first_name +'</p>' +
			'<p class="suname userSunameJS">Last Name: '+ usersInfo[0].last_name +'</p>' +
			'</div>'
		);
		users.onclick = function (e) {
			if (e.target.classList.contains('userTabJS') && !e.target.classList.contains('active')) {
				var tabs = usersTab.getElementsByClassName('userTabJS');
				for (var i = 0;  i < tabs.length; i++) {
					tabs[i].classList.remove('active');
				}
				e.target.classList.add('active');
			}
			for (var i in usersInfo) {
				if(usersInfo[i].id == e.target.dataset.id) {
					var userAvatar = users.getElementsByClassName('userAvatarJS')[0],
						userName = users.getElementsByClassName('userNameJS')[0],
						userSuname = users.getElementsByClassName('userSunameJS')[0];
					userAvatar.src = usersInfo[i].avatar;
					userName.textContent = 'First Name: '+ usersInfo[i].first_name;
					userSuname.textContent = 'Last Name: '+ usersInfo[i].last_name;
					break;
				}
			}
		}
		throw { name:'MyError', message:'что-то пошло не так!' };
	}
	catch(err) {
		console.log(err.name);
		console.log(err.message );
	}

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

			if (statusType == 2) {
				localStorage.setItem('users', this.response);
				getUserData();
			} else {
				console.error(this.status);
			}
		}
	}





}