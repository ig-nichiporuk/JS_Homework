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
			authFormInputs = authForm.getElementsByTagName('input');

		authForm.addEventListener('submit', async(e) => {
			e.preventDefault();

			let email = authFormInputs.email.value.trim(),
				password = authFormInputs.password.value.trim();

			const user = await this.getData(email, password);

			localStorage.setItem('user', JSON.stringify(user));

			location.hash = '#/orders';
		});
	}
}

export default Authorization;
