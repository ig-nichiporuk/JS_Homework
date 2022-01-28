import Component from '../../views/component';

import contactsTemplate from '../../../templates/pages/contacts.hbs';
import contactsTableRow from '../../../templates/pages/contactsTableRow.hbs';

import Contacts from '../../models/contacts';

class ContactsList extends Component {
	constructor() {
		super();

		this.model = new Contacts();
	}

	divideContactsArr(arr, size = 10) {
		var outputArr = [];

		while (arr.length) {
			outputArr.push(arr.splice(0, size));
		}

		return outputArr;
	}

	renderTable(table, count) {
		const contacts = JSON.parse(localStorage.getItem('contacts')),
			showContacts = this.divideContactsArr(contacts, count)[0];

		return contactsTableRow({showContacts});
	}








	async getData() {
		return await this.model.getContactsList();
	}

	async render(contacts) {
		localStorage.setItem('contacts', JSON.stringify(contacts));

		const showContacts = this.divideContactsArr(contacts)[0],
			showContactsCount = JSON.parse(localStorage.getItem('showContactsCount') || '2');

		return contactsTemplate({showContacts, showContactsCount});
	}

	afterRender() {
		// super.afterRender();
		this.setActions();
	}

	async setActions() {
		const contacts = await this.getData(),
			counter = document.getElementsByClassName('js-contacts-counter')[0],
			controlsBtn = document.getElementsByClassName('js-contacts-controls')[0],
			changeShowItem = document.getElementsByClassName('js-show-items')[0],
			contactsTableBody = document.getElementsByClassName('js-table-body')[0];

		counter.textContent = `Выбрано: 0 / ${contacts.length}`;

		/*Изменение чекбоксов в таблице контактов*/
		document.body.addEventListener('change', (e) => {
			const target = e.target;

			if (target.classList.contains('js-contact-check')) {
				const contactChecked = contactsTableBody.querySelectorAll('.js-contact-check:checked');

				counter.textContent = `Выбрано: ${contactChecked.length} / ${contacts.length}`;

				if (contactChecked.length  > 0) {
					controlsBtn.classList.remove('hidden');
				}
			}
		});

		/*Изменение отображаемых контактов в таблице*/
		changeShowItem.addEventListener('click', (e) => {
			const target = e.target;

			if (target.classList.contains('js-show-option')) {
				localStorage.setItem('showContactsCount', JSON.stringify(target.dataset.show));

				changeShowItem.querySelector('.js-show-option.active').classList.remove('active');

				target.classList.add('active');

				contactsTableBody.innerHTML = this.renderTable(contactsTableBody, target.dataset.show);
			}
		});
	}
}

export default ContactsList;
