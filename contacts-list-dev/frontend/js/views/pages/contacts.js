import Component from '../../views/component';

import contactsTemplate from '../../../templates/pages/contacts.hbs';

import Contacts from '../../models/contacts';

class ContactsList extends Component {
	constructor() {
		super();

		this.model = new Contacts();
	}

	async render() {

		return contactsTemplate();
	}

	afterRender() {
		super.afterRender();
		this.setActions();
	}

	setActions() {}
}

export default ContactsList;
