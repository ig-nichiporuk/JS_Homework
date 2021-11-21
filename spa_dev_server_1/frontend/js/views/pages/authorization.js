import Component from '../../views/component';

import Auth from '../../models/auth';

import AuthorizationTemplate from '../../../templates/pages/authorization';

class Authorization extends Component {
	constructor() {
		super();

		this.model = new Auth();
	}

	async getData(email, password) {
		return await this.model.getData(email, password);
	}

	render() {
		return (AuthorizationTemplate());
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

			const user = await this.getData(email, password);

			localStorage.setItem('user', JSON.stringify(user));

			if (rememberUser.checked !== true) {
				window.addEventListener('unload', () => localStorage.removeItem('user'));
			}
			location.hash = '#/orders';
		});
	}
}

export default Authorization;
