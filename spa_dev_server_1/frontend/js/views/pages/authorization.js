import Component from '../../views/component';

import Auth from '../../models/auth';

import AuthorizationTemplate from '../../../templates/pages/authorization';

class Authorization extends Component {
	constructor() {
		super();

		this.model = new Auth();
	}

	render() {
		return new Promise(resolve => resolve(AuthorizationTemplate()));
	}

	afterRender() {
		this.setActions();
	}

	setActions() {
		const form = document.getElementById('authorization-form'),
			inputs = form.getElementsByTagName('input'),
			test = document.getElementById('test');
		form.addEventListener('submit', () => {
			event.preventDefault();
			this.ddd(inputs.email.value, inputs.password.value);
		});

		test.addEventListener('click', () => {
			this.testUsers();
		});

	}

	ddd(email, password) {
		this.model.test(email, password).then((data) => {
			console.log(data);
		});
	}

	testUsers() {
		this.model.testUsers().then(() => {});
	}


}

export default Authorization;