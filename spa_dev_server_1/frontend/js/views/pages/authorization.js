import Component from '../../views/component';

import Auth from '../../models/auth';

import AuthorizationTemplate from '../../../templates/pages/authorization';

class Authorization extends Component {
	constructor() {
		super();

		this.model = new Auth();
	}

	async login(email, password) {
		return await this.model.login(email, password);
	}

	async render() {
		return await (AuthorizationTemplate());
	}

	afterRender() {
		this.setActions();
	}

	setActions() {
		const authForm = document.getElementById('authorization-form'),
			authFormInputs = authForm.getElementsByTagName('input'),
			rememberUser = document.getElementById('rememberUser');

		authForm.addEventListener('submit', async(e) => {
			e.preventDefault();

			let email = authFormInputs.email.value.trim(),
				password = authFormInputs.password.value.trim();

			const user = await this.login(email, password);

			if (rememberUser.checked == true) {
				localStorage.setItem('user', JSON.stringify(user));
			} else {
				sessionStorage.setItem('user', JSON.stringify(user));
			}
		});
	}
}

export default Authorization;
