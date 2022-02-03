import Component from '../../views/component';

import contactsTemplate from '../../../templates/pages/contacts.hbs';
import contactsTableRow from '../../../templates/pages/contactsTableRow.hbs';
import filterHashtagsTemplate from '../../../templates/pages/filterHashtags.hbs';

import Contacts from '../../models/contacts';

class ContactsList extends Component {
	constructor() {
		super();

		this.model = new Contacts();
	}

	divideContactsArr(arr, size = 10) {
		var outputArr = [];

		for (var i = 0; i < arr.length; i += size) {
			outputArr.push(arr.slice(i, i + size));
		}

		return outputArr;
	}

	renderTable(contacts, table, count = 10) {
		const showContacts = this.divideContactsArr(contacts, count)[0];

		return contactsTableRow({showContacts});
	}








	async getData() {
		return await this.model.getContactsList();
	}

	async render(contacts) {
		const showContacts = this.divideContactsArr(contacts)[0],
			showContactsCount = JSON.parse(localStorage.getItem('showContactsCount') || '2');

		return contactsTemplate({showContacts, showContactsCount});
	}

	afterRender() {
		// super.afterRender();
		this.setActions();
	}

	fixedFilterBtn(filter, filterInputs, filterBtns, filterFindBtn) {
		for (const input of filterInputs) {
			if ((input.value && input.value != 'on') || input.checked) {
				if (filterFindBtn) filterFindBtn.disabled = false;

				if (window.innerHeight + window.pageYOffset < filter.offsetTop + filter.offsetHeight) {
					filterBtns.classList.add('fix');
				} else {
					filterBtns.classList.remove('fix');
				}
				return;
			}
		}

		if (filterFindBtn) filterFindBtn.disabled = true;
		filterBtns.classList.remove('fix');
	}

	listenChangesInFilter(filterInputs) {
		return {
			'name' : filterInputs.name.value || '',
			'surname' : filterInputs.surname.value || '',
			'patronymic' : filterInputs.patronymic.value || '',
			'birthdateMin' : filterInputs['year-min'].value || '',
			'birthdateMax' : filterInputs['year-max'].value || '',
			'gender' : filterInputs['gender-man'].checked ? filterInputs['gender-man'].dataset.value : filterInputs['gender-woman'].checked ? filterInputs['gender-woman'].dataset.value : '',
			'family' : filterInputs.family.checked ? true : false,
			'country' : filterInputs.country.value || '',
			'city' : filterInputs.city.value || '',
			'street' : filterInputs.street.value || '',
			'house' : filterInputs.house.value || '',
			'apartment' : filterInputs.apartment.value || ''
		};
	}

	setFilterOptions(contacts, contactsTableBody, filterHashtags, filter, filterInputs, filterBtns, filterFindBtn) {
		const options = this.listenChangesInFilter(filterInputs),
			optionsArr = Object.values(options).filter(item => !!item).map(val => {
				if (val === true) {
					val = 'Замужем / женат';
				}
				return val;
			});
		let contactsResult = [];

		if (options.surname) {
			const result = contactsResult.length ? contactsResult : contacts;

			contactsResult = result.filter(item => item.surname === options.surname ? item : '');
		}
		if (options.name) {
			const result = contactsResult.length ? contactsResult : contacts;

			contactsResult = result.filter(item => item.name === options.name ? item : '');
		}
		if (options.patronymic) {
			const result = contactsResult.length ? contactsResult : contacts;

			contactsResult = result.filter(item => item.patronymic === options.patronymic ? item : '');
		}

		if (options.birthdateMin && options.birthdateMax) {
			const result = contactsResult.length ? contactsResult : contacts;

			contactsResult = result.filter(item => {
				const year = item.birthdate.split('.')[2];

				return (year >= options.birthdateMin && year <= options.birthdateMax) ? item : '';
			});
		}

		if (options.birthdateMin) {
			const result = contactsResult.length ? contactsResult : contacts;

			contactsResult = result.filter(item => {
				const year = item.birthdate.split('.')[2];

				return year >= options.birthdateMin ? item : '';
			});
		}

		if (options.birthdateMax) {
			const result = contactsResult.length ? contactsResult : contacts;

			contactsResult = result.filter(item => {
				const year = item.birthdate.split('.')[2];

				return year <= options.birthdateMax ? item : '';
			});
		}

		if (options.gender) {
			const result = contactsResult.length ? contactsResult : contacts;

			contactsResult = result.filter(item => item.gender === options.gender ? item : '');
		}

		if (options.family) {
			const result = contactsResult.length ? contactsResult : contacts;

			contactsResult = result.filter(item => item.family === options.family ? item : '');
		}

		if (options.country) {
			const result = contactsResult.length ? contactsResult : contacts;

			contactsResult = result.filter(item => item.country === options.country ? item : '');
		}

		if (options.city) {
			const result = contactsResult.length ? contactsResult : contacts;

			contactsResult = result.filter(item => item.city === options.city ? item : '');
		}

		if (options.street) {
			const result = contactsResult.length ? contactsResult : contacts;

			contactsResult = result.filter(item => item.street === options.street ? item : '');
		}

		if (options.house) {
			const result = contactsResult.length ? contactsResult : contacts;

			contactsResult = result.filter(item => item.house === options.house ? item : '');
		}

		if (options.apartment) {
			const result = contactsResult.length ? contactsResult : contacts;

			contactsResult = result.filter(item => item.apartment === options.apartment ? item : '');
		}

		contactsTableBody.innerHTML = contactsResult.length ? this.renderTable(contactsResult, contactsTableBody) : this.renderTable(contacts, contactsTableBody);

		filterHashtags.innerHTML = optionsArr.length ? filterHashtagsTemplate({optionsArr}) : '';

		this.fixedFilterBtn(filter, filterInputs, filterBtns, filterFindBtn);
	}

	async setActions() {
		const contacts = await this.getData(),
			counter = document.getElementsByClassName('js-contacts-counter')[0],
			controlsBtn = document.getElementsByClassName('js-contacts-controls')[0],
			changeShowItem = document.getElementsByClassName('js-show-items')[0],
			contactsTable = document.getElementsByClassName('js-table')[0],
			contactsTableBody = contactsTable.getElementsByClassName('js-table-body')[0],
			contactsControls = document.getElementsByClassName('js-contacts-control')[0],
			filter = document.querySelector('.js-filter'),
			filterInputs = filter.getElementsByTagName('input'),
			filterBtns = filter.querySelector('.js-filter-btns'),
			filterFindBtn = filterBtns.querySelector('.js-filter-show-btn'),
			filterHashtags = document.querySelector('.js-filter-hashtags');

		counter.textContent = `Выбрано: 0 / ${contacts.length}`;

		document.body.addEventListener('change', (e) => {
			const target = e.target;

			/*Изменение чекбоксов в таблице контактов*/
			if (target.classList.contains('js-contact-check')) {
				const contactChecked = contactsTableBody.querySelectorAll('.js-contact-check:checked');

				counter.textContent = `Выбрано: ${contactChecked.length} / ${contacts.length}`;

				if (contactChecked.length  > 0) {
					controlsBtn.classList.remove('hidden');
				}

				this.fixedFilterBtn(contactsTable, contactChecked, contactsControls, null);
			}

			/*Изменение чекбоксов в фильтре контактов*/
			if (target.classList.contains('js-choose-option')) {
				this.fixedFilterBtn(filter, filterInputs, filterBtns, filterFindBtn);
			}
		});

		/*Изменение полей в фильтре*/
		document.body.addEventListener('keyup', (e) => {
			const target = e.target;

			if (target.closest('.js-filter')) {
				this.fixedFilterBtn(filter, filterInputs, filterBtns, filterFindBtn);
			}
		});

		window.addEventListener('scroll', () => {
			this.fixedFilterBtn(filter, filterInputs, filterBtns, filterFindBtn);
		});

		document.body.addEventListener('click', (e) => {
			const target = e.target;

			/*Сброс фильтра*/
			if (target.classList.contains('js-filter-reset')) {
				for (const input of filterInputs) {
					input.value = '';
					input.checked = false;
				}

				this.fixedFilterBtn(filter, filterInputs, filterBtns, filterFindBtn);

				filterHashtags.innerHTML = '';

				contactsTableBody.innerHTML = this.renderTable(contacts, contactsTableBody, target.dataset.show);
			}

			/*Удаление одной опции фильтра*/
			if (target.classList.contains('js-filter-delete-option')) {
				for (const input of filterInputs) {
					if (input.value === target.innerText || input.dataset.value === target.innerText) {
						input.value = '';
						input.checked = false;
					}
				}
				this.setFilterOptions(contacts, contactsTableBody, filterHashtags, filter, filterInputs, filterBtns, filterFindBtn);
			}
		});

		/*Изменение отображаемых контактов в таблице*/
		changeShowItem.addEventListener('click', (e) => {
			const target = e.target;

			if (target.classList.contains('js-show-option')) {
				localStorage.setItem('showContactsCount', JSON.stringify(target.dataset.show));

				changeShowItem.querySelector('.js-show-option.active').classList.remove('active');

				target.classList.add('active');

				contactsTableBody.innerHTML = this.renderTable(contacts, contactsTableBody, target.dataset.show);
			}
		});

		filterFindBtn.addEventListener('click', (e) => {
			e.preventDefault();

			this.setFilterOptions(contacts, contactsTableBody, filterHashtags, filter, filterInputs, filterBtns, filterFindBtn);
		});
	}
}

export default ContactsList;
