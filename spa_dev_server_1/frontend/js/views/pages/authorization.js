import Component from '../../views/component';

import Auth from '../../models/auth';

import AuthorizationTemplate from '../../../templates/pages/authorization';

class Authorization extends Component {
	constructor() {
		super();

		this.model = new Auth();
	}

	async render() {
		return await (AuthorizationTemplate());
	}

	afterRender() {
		this.setActions();
	}

	setActions() {}
}

export default Authorization;
