import {generateID} from '../../helpers/utils';

import Component from '../../views/component';

import contactTemplate from '../../../templates/pages/contact.hbs';
import Contacts from '../../models/contacts';



class Contact extends Component {
	constructor() {
		super();

		this.model = new Contacts();
	}

	async getData() {
		return this.request.id ? await this.model.getContactItem(this.request.id) : '';
	}

	async setData(id, data) {
		return await this.model.setContactData(id, data);
	}


	async render(contact) {
		return contactTemplate({contact});
	}

	async afterRender() {
		super.afterRender();
		await this.setActions();
	}

	async setActions() {
		const editBtn = document.getElementsByClassName('js-contact-edit')[0],
			saveBtn = document.getElementsByClassName('js-contact-save')[0],
			contactName = document.getElementsByClassName('js-contact-name')[0],
			contactOptions = document.getElementsByTagName('input'),
			changes = {};

		if (editBtn) {
			editBtn.addEventListener('click', () => {
				for (const contactOption of contactOptions) {
					contactOption.removeAttribute('readonly');
					contactOption.classList.remove('edit');
				}
			});
		}


		saveBtn.addEventListener('click', () => {
			changes.id = generateID();
			changes.surname = contactOptions.surname.value;
			changes.name = contactOptions.name.value;
			changes.patronymic = contactOptions.patronymic.value;
			changes.birthdate = contactOptions.birthdate.value;
			changes.company = contactOptions.company.value;
			changes.country = contactOptions.country.value;
			changes.city = contactOptions.city.value;
			changes.street = contactOptions.street.value;
			changes.house = contactOptions.house.value;
			changes.apartment = contactOptions.apartment.value;
			changes.gender = contactOptions.gender.value;
			changes.family = contactOptions.family.value;
			changes.site = contactOptions.site.value;
			changes.postcode = contactOptions.postcode.value;

			if (this.request.id) {
				this.setData(this.request.id, changes);

				contactName.innerText = `${contactOptions.surname.value} ${contactOptions.name.value}`;

				for (const contactOption of contactOptions) {
					contactOption.setAttribute('readonly', true);
					contactOption.classList.add('edit');
				}
			} else {
				this.setData(null, changes);

				location.hash = '#/';
			}
		});
	}
}

export default Contact;
