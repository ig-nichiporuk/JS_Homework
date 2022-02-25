import {generateID} from '../../helpers/utils';

import Component from '../../views/component';

import contactTemplate from '../../../templates/pages/contact.hbs';
import contactPhoneFields from '../../../templates/pages/contactPhoneFields.hbs';
import contactDataForm from '../../../templates/pages/contactData.hbs';
import Contacts from '../../models/contacts';



class Contact extends Component {
	constructor() {
		super();

		this.model = new Contacts();
	}

	checkData(inputs) {
		let valid = true;

		if (!inputs.surname.value.trim() || !inputs.name.value.trim()) {
			alert('Введите Имя и Фамилию!');

			valid = false;

			return valid;
		}

		for (let input of inputs) {
			switch (input.id) {
				case 'surname':
				case 'name':
				case 'patronymic':
				case 'company':
				case 'country':
				case 'city':
				case 'street':
					if (input.value.trim() && !/^[a-zа-я]+[a-zа-я\s-]?[a-zа-я]+$/img.test(input.value)){
						input.classList.add('error');

						valid = false;
					}

					break;
				case 'birthday':
					if (input.value.trim() && (!/^\d+$/img.test(input.value) || input.value < 1 || input.value > 31)){
						input.classList.add('error');

						valid = false;
					}

					break;
				case 'year':
					if (input.value.trim() && (!/^\d+$/img.test(input.value) || input.value > new Date().getFullYear() || input.value < 1900)){
						input.classList.add('error');

						valid = false;
					}

					break;

				case 'apartment':
				case 'house':
					if (input.value.trim() && !/^[\d]+[a-zа-яё/]?$/img.test(input.value)){
						input.classList.add('error');

						valid = false;
					}

					break;
				case 'postcode':
					if (input.value.trim() && !/^\d+$/img.test(input.value)){
						input.classList.add('error');

						valid = false;
					}

					break;

				case 'site':
					if (input.value.trim() && !/^[a-z\d]+([_\-.]?[a-z\d]+)(?<=[a-z\d].+)\.[a-z]{2,10}$/img.test(input.value)){
						input.classList.add('error');

						valid = false;
					}

					break;

				case 'email':
					if (input.value.trim() && !/^[a-z\d]+([_\-.]?[a-z\d]+)(?<=[a-z\d].+)@(?=.{2,20}\.)([a-z\d]+[_\-.]?[a-z\d]+)\.[a-z]{2,10}$/img.test(input.value)){
						input.classList.add('error');

						valid = false;
					}

					break;

				case 'phone':
					if (input.value.trim() && !/^\+\d{12}$/img.test(input.value)){
						input.classList.add('error');

						valid = false;
					}

					break;
			}
		}

		return valid;
	}

	formatData(str) {
		let updateStr = '';

		for (let word of str.split(/(\s|-|\.)+/)) {
			word && (updateStr += (word[0].toUpperCase() + word.slice(1)));
		}

		return updateStr;
	}

	async getData() {
		return this.request.id ? await this.model.getContactItem(this.request.id) : '';
	}

	async setData(id, data) {
		return await this.model.setContactData(id, data);
	}


	async render(data) {
		const contact = data;

		return contactTemplate({contact, type : this.request.id ? 1: 0});
	}

	async afterRender(data) {
		await this.setActions(data);
	}

	async setActions(data) {
		const contactForm = document.getElementsByClassName('js-contact-form')[0],
			contactName = document.getElementsByClassName('js-contact-name')[0],
			contactOptions = contactForm.getElementsByTagName('input'),
			changes = {};

		let contact = data;

		for (let option of contactOptions) {
			option.onfocus = () => option.classList.remove('error');
		}

		contactForm.addEventListener('keypress', (e) => {
			const target = e.target;

			switch (true) {
				case target.id === 'birthday':
				case target.id === 'year':
				case target.id === 'postcode':
					!/\d/.test(e.key) && e.preventDefault();

					break;
				case target.id === 'surname':
				case target.id === 'name':
				case target.id === 'patronymic':
				case target.id === 'company':
				case target.id === 'country':
				case target.id === 'city':
				case target.id === 'street':
					if (!/[a-zа-яё\s-]/i.test(e.key) || /[\^_]/.test(e.key)) {
						e.preventDefault();
					}

					break;
				case target.id === 'house':
				case target.id === 'apartment':
					if (!/[a-zа-яё\d/]/i.test(e.key) || /[\^_]/.test(e.key)) {
						e.preventDefault();
					}

					break;
				case target.id === 'phone':
					!/\d/.test(e.key) && e.preventDefault();

					!/^\+\d+$/.test(target.value) && (target.value = '+');

					break;
				case target.id === 'site':
					if (!/[a-z\d-_.]/.test(e.key) || /[\^]/.test(e.key)) {
						e.preventDefault();
					}

					break;
				case target.id === 'email':
					if (!/[a-z\d-_.@]/.test(e.key) || /[\^]/.test(e.key)) {
						e.preventDefault();
					}

					break;
			}
		});

		contactForm.addEventListener('keyup', (e) => {
			const target = e.target;

			if (target.id === 'phone') {
				const phoneDesc = target.parentElement.nextElementSibling.getElementsByTagName('textarea')[0];

				if (!target.value) {
					phoneDesc.innerHTML = '';

					phoneDesc.disabled = true;
				}

				phoneDesc.disabled = !/^\+\d{12}$/img.test(target.value);
			}

			if (target.id === 'street') {
				const houseInput = target.parentElement.nextElementSibling.getElementsByTagName('input')[0],
					apartmentInput = target.parentElement.nextElementSibling.nextElementSibling.getElementsByTagName('input')[0];

				if (!target.value) {
					houseInput.value = apartmentInput.value = '';

					apartmentInput.disabled = houseInput.disabled  = true;
				}

				houseInput.disabled = !houseInput.value;
			}

			if (target.id === 'house') {
				const apartmentInput = target.parentElement.nextElementSibling.getElementsByTagName('input')[0];

				if (!target.value) {
					apartmentInput.value = '';

					apartmentInput.disabled = true;
				}

				apartmentInput.disabled = !/^[\d]+$/img.test(target.value) && !apartmentInput.value;
			}
		});

		contactForm.addEventListener('click', async(e) => {
			const target = e.target;

			if (target.closest('.js-add-phone')) {
				target.closest('.js-add-phone').insertAdjacentHTML('beforebegin', contactPhoneFields());
			}

			if (target.classList.contains('js-contact-edit')) {
				contactForm.innerHTML = contactDataForm({contact, type : 0});

				for (let option of contactOptions) {
					option.onfocus = () => option.classList.remove('error');
				}
			}
		});

		contactForm.addEventListener('submit', async(e) => {
			e.preventDefault();

			const contactPhones = document.getElementsByClassName('js-contact-phone'),
				contactMonth = document.getElementById('month');

			if (this.checkData(contactOptions)) {
				changes.id = generateID();
				changes.surname = this.formatData(contactOptions.surname.value);
				changes.name = this.formatData(contactOptions.name.value);
				changes.patronymic = this.formatData(contactOptions.patronymic.value);

				if (contactOptions.birthday.value && contactOptions.year.value) {
					changes.birthdate = {
						day : contactOptions.birthday.value,
						month : contactMonth.value,
						year : contactOptions.year.value
					};
				} else if (contactOptions.birthday.value) {
					changes.birthdate = {
						day : contactOptions.birthday.value,
						month : contactMonth.value,
						year : ''
					};
				} else if (contactOptions.year.value) {
					changes.birthdate = {
						day: '',
						month: contactMonth.value,
						year: contactOptions.year.value
					};
				} else {
					changes.birthdate = {
						day: '',
						month: '',
						year: ''
					};
				}

				if (contactOptions['gender-man'].checked) {
					changes.gender = contactOptions['gender-man'].dataset.value;
				} else if (contactOptions['gender-woman'].checked) {
					changes.gender = contactOptions['gender-woman'].dataset.value;
				}

				changes.family = contactOptions.family.checked;
				changes.company = contactOptions.company.value;
				changes.country = this.formatData(contactOptions.country.value);
				changes.city = this.formatData(contactOptions.city.value);
				changes.street = this.formatData(contactOptions.street.value);
				changes.house = contactOptions.house.value;
				changes.apartment = contactOptions.apartment.value;
				changes.site = contactOptions.site.value;
				changes.postcode = contactOptions.postcode.value;
				changes.email = contactOptions.email.value;
				changes.phones = [];

				for (let phone of contactPhones) {
					const phoneInfo = {},
						phoneType = phone.getElementsByTagName('select')[0].value,
						phoneNumber = phone.getElementsByTagName('input')[0].value,
						phoneDesc = phone.getElementsByTagName('textarea')[0].value.trim();

					if (phoneNumber) {
						phoneInfo.type = phoneType;
						phoneInfo.number = phoneNumber;
						phoneInfo.desc = phoneDesc;
					}

					if (Object.keys(phoneInfo).length) changes.phones.push(phoneInfo);

				}


				if (this.request.id) {

					await this.setData(this.request.id, changes);

					contact = await this.model.getContactItem(this.request.id);

					contactName.innerText = `${contactOptions.surname.value} ${contactOptions.name.value}`;

					contactForm.innerHTML = contactDataForm({contact, type : 1});
				} else {
					await this.setData(null, changes);

					location.hash = '#/';
				}

			}
		});
	}
}

export default Contact;
