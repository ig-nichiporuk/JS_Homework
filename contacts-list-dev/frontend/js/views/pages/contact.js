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
					if (input.value.trim() && !/^[a-zа-я]+[a-zа-я\s-]?[a-zа-я]$/img.test(input.value)){
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
					if (input.value.trim() && (!/^\d+$/img.test(input.value) || input.value > new Date().getFullYear())){
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

	async afterRender() {
		await this.setActions();
	}

	async setActions() {
		const editBtn = document.getElementsByClassName('js-contact-edit')[0],
			contactForm = document.getElementsByClassName('js-contact-form')[0],
			contactName = document.getElementsByClassName('js-contact-name')[0],
			contactOptions = document.getElementsByTagName('input'),
			contactMonth = document.getElementById('month'),
			changes = {};

		if (editBtn) {
			editBtn.addEventListener('click', async() => {
				const contact = await this.getData();

				contactForm.innerHTML = contactDataForm({contact, type : 0});
			});
		}

		for (let option of contactOptions) {
			option.onfocus = () => option.classList.remove('error');
		}

		document.body.addEventListener('keypress', (e) => {
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
					if (!/[a-zA-zа-яА-яЁё\s-]/.test(e.key) || /[\^_]/.test(e.key)) {
						e.preventDefault();
					}

					break;
				case target.id === 'house':
				case target.id === 'apartment':
					if (!/[a-zA-zа-яА-яЁё\d/]/.test(e.key) || /[\^_]/.test(e.key)) {
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
					if (!/[a-z\d-_.]/.test(e.key) || /[\^]/.test(e.key)) {
						e.preventDefault();
					}

					break;
			}
		});

		document.body.addEventListener('keyup', (e) => {
			const target = e.target;

			if (target.id === 'phone') {
				const phoneDesc = target.parentElement.nextElementSibling.getElementsByTagName('textarea')[0];

				phoneDesc.disabled = !/^\+\d{12}$/img.test(target.value);
			}
		});

		document.body.addEventListener('click', (e) => {
			const target = e.target;

			if (target.closest('.js-add-phone')) {
				target.closest('.js-add-phone').insertAdjacentHTML('beforebegin', contactPhoneFields());
			}
		});


		contactForm.addEventListener('submit', async(e) => {
			e.preventDefault();

			const contactPhones = document.getElementsByClassName('js-contact-phone');

			if (this.checkData(contactOptions)) {
				changes.id = generateID();
				changes.surname = contactOptions.surname.value;
				changes.name = contactOptions.name.value;
				changes.patronymic = contactOptions.patronymic.value || 'Не указано';
				if (contactOptions.birthday.value && contactOptions.year.value) {
					changes.birthdate = `${contactOptions.birthday.value}.${contactMonth.value}.${contactOptions.year.value}`;
				} else {
					changes.birthdate = 'Не указано';
				}
				if (contactOptions['gender-man'].checked) {
					changes.gender = contactOptions['gender-man'].dataset.value;
				} else if (contactOptions['gender-woman'].checked) {
					changes.gender = contactOptions['gender-woman'].dataset.value;
				} else {
					changes.gender = 'Не указано';
				}
				changes.family = contactOptions.family.checked || 'Не указано';
				changes.company = contactOptions.company.value || 'Не указано';
				changes.country = contactOptions.country.value || 'Не указано';
				changes.city = contactOptions.city.value || 'Не указано';
				changes.street = contactOptions.street.value || 'Не указано';
				changes.house = contactOptions.house.value || 'Не указано';
				changes.apartment = contactOptions.apartment.value || 'Не указано';
				changes.site = contactOptions.site.value || 'Не указано';
				changes.postcode = contactOptions.postcode.value || 'Не указано';
				changes.email = contactOptions.email.value || 'Не указано';
				changes.phones = [];

				for (let phone of contactPhones) {
					const phoneInfo = {},
						phoneType = phone.getElementsByTagName('select')[0].value,
						phoneNumber = phone.getElementsByTagName('input')[0].value,
						phonedesc = phone.getElementsByTagName('textarea')[0].value.trim();

					if (phoneNumber) {
						phoneInfo.type = phoneType;
						phoneInfo.number = phoneNumber;
						phoneInfo.desc = phonedesc || 'Не указано';
					}

					if (Object.keys(phoneInfo).length) changes.phones.push(phoneInfo);

				}

				await this.setData(null, changes);

				location.hash = '#/';

				/*if (this.request.id) {
					await this.setData(this.request.id, changes);

					contactName.innerText = `${contactOptions.surname.value} ${contactOptions.name.value}`;

					for (const contactOption of contactOptions) {
						contactOption.setAttribute('readonly', true);
						contactOption.classList.add('edit');
					}
				} else {
					await this.setData(null, changes);

					location.hash = '#/';
				}*/

			}
		});
	}
}

export default Contact;
