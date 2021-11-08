import Component from '../../views/component';

import Tasks from '../../models/tasks';

import AuthorizationTemplate from '../../../templates/pages/authorization';

class Authorization extends Component {
	constructor() {
		super();

		this.model = new Tasks();
	}

	render() {
		return new Promise(resolve => resolve(AuthorizationTemplate()));
	}

	afterRender() {
		this.setActions();

		// this.countTasksAmount();
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

	testUsers() {
		this.model.testUsers().then(() => {});
	}

	ddd(email, password) {
		this.model.test(email, password).then((data) => {
			console.log(data);
		});
	}
}

export default Authorization;