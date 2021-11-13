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

	setActions() {}
}

export default Authorization;
