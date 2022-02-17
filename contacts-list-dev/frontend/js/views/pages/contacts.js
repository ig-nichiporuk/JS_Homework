import Component from '../../views/component';

import contactsTemplate from '../../../templates/pages/contacts.hbs';
import contactsTableRow from '../../../templates/pages/contactsTableRow.hbs';
import filterHashtagsTemplate from '../../../templates/pages/filterHashtags.hbs';
import paginationTemplate from '../../../templates/pages/pagination.hbs';

import Contacts from '../../models/contacts';

class ContactsList extends Component {
	constructor() {
		super();

		this.model = new Contacts();
	}

	divideContactsArr(arr) {
		const outputArr = [],
			size = +JSON.parse(localStorage.getItem('showContactsCount')) || 10;

		for (let i = 0; i < arr.length; i += size) {
			outputArr.push(arr.slice(i, i + size));
		}

		return outputArr;
	}

	createPagination(contacts, indexPage) {
		const contactsDivide = this.divideContactsArr(contacts),
			contactsDivideLength = contactsDivide.length,
			indexPageNumber = indexPage + 1;

		return paginationTemplate({indexPage, indexPageNumber, contactsDivide, contactsDivideLength});
	}

	renderPagination(contactsBlock, pagination, contacts, indexPage = 0) {
		if (pagination) pagination.remove();

		contactsBlock.insertAdjacentHTML('beforeend', this.createPagination(contacts, indexPage));
	}

	renderTable(contacts, index = 0) {
		const showContacts = this.divideContactsArr(contacts)[index];

		return contactsTableRow({showContacts});
	}

	async deleteContacts(id) {
		return await this.model.deleteContacts(id);
	}

	showContactsAmount(checked, total) {
		return `Выбрано: ${checked} / ${total}`;
	}

	displayContactsControlBtns(btnWrap, deleteBtn, deleteoptions) {
		btnWrap.classList.add('hidden');
		deleteoptions.classList.add('hidden');
		deleteBtn.classList.remove('hidden');
	}

	fixedBlock(parent, inputs, fixedBlock, filterFindBtn) {
		for (const input of inputs) {
			if ((input.value && input.value != 'on') || input.checked) {
				if (filterFindBtn) filterFindBtn.disabled = false;

				if (window.innerHeight + window.pageYOffset < parent.offsetTop + parent.offsetHeight) {
					fixedBlock.classList.add('fix');
				} else {
					fixedBlock.classList.remove('fix');
				}
				return;
			}
		}

		if (filterFindBtn) filterFindBtn.disabled = true;
		fixedBlock.classList.remove('fix');
	}

	listenChangesInFilter(filterInputs) {
		return {
			'name': filterInputs.name.value || '',
			'surname': filterInputs.surname.value || '',
			'patronymic': filterInputs.patronymic.value || '',
			'birthdateMin': filterInputs['year-min'].value || '',
			'birthdateMax': filterInputs['year-max'].value || '',
			'gender': filterInputs['gender-man'].checked ? filterInputs['gender-man'].dataset.value : filterInputs['gender-woman'].checked ? filterInputs['gender-woman'].dataset.value : '',
			'family': filterInputs.family.checked ? true : false,
			'country': filterInputs.country.value || '',
			'city': filterInputs.city.value || '',
			'street': filterInputs.street.value || '',
			'house': filterInputs.house.value || '',
			'apartment': filterInputs.apartment.value || ''
		};
	}

	filterContacts(contacts, filterInputs) {
		const options = this.listenChangesInFilter(filterInputs);

		let contactsResult = [];

		if (options.surname) {
			const result = contactsResult.length ? contactsResult : contacts;

			contactsResult = result.filter(item => item.surname.toLowerCase() === options.surname.toLowerCase() ? item : '');
		}
		if (options.name) {
			const result = contactsResult.length ? contactsResult : contacts;

			contactsResult = result.filter(item => item.name.toLowerCase() === options.name.toLowerCase() ? item : '');
		}
		if (options.patronymic) {
			const result = contactsResult.length ? contactsResult : contacts;

			contactsResult = result.filter(item => item.patronymic.toLowerCase() === options.patronymic.toLowerCase() ? item : '');
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

			contactsResult = result.filter(item => item.country.toLowerCase() === options.country.toLowerCase() ? item : '');
		}

		if (options.city) {
			const result = contactsResult.length ? contactsResult : contacts;

			contactsResult = result.filter(item => item.city.toLowerCase() === options.city.toLowerCase() ? item : '');
		}

		if (options.street) {
			const result = contactsResult.length ? contactsResult : contacts;

			contactsResult = result.filter(item => item.street.toLowerCase() === options.street.toLowerCase() ? item : '');
		}

		if (options.house) {
			const result = contactsResult.length ? contactsResult : contacts;

			contactsResult = result.filter(item => item.house.toLowerCase() === options.house.toLowerCase() ? item : '');
		}

		if (options.apartment) {
			const result = contactsResult.length ? contactsResult : contacts;

			contactsResult = result.filter(item => item.apartment.toLowerCase() === options.apartment.toLowerCase() ? item : '');
		}

		return contactsResult;
	}

	showContacts(contacts, contactsTableBody, filterHashtags, filter, filterInputs, filterBtns, filterFindBtn, titleWrap) {
		const contactsResult = this.filterContacts(contacts, filterInputs).length ? this.filterContacts(contacts, filterInputs) : contacts,
			options = this.listenChangesInFilter(filterInputs);

		options.birthdateMin && (options.birthdateMin = `с ${options.birthdateMin}`);
		options.birthdateMax && (options.birthdateMax = `по ${options.birthdateMax}`);
		options.family && (options.family = 'Замужем / женат');

		const optionsArr = Object.values(options).filter(item => !!item);

		contactsTableBody.innerHTML = contactsResult.length ? this.renderTable(contactsResult) : this.renderTable(contacts);

		filterHashtags.innerHTML = optionsArr.length ? filterHashtagsTemplate({optionsArr}) : '';

		titleWrap.nextElementSibling && titleWrap.nextElementSibling.remove();

		optionsArr.length && titleWrap.insertAdjacentHTML('afterend', `<p>Найдено: ${contactsResult.length}</p>`);
	}

	async getData() {
		return await this.model.getContactsList();
	}

	async render(data) {
		const showContactsCount = JSON.parse(localStorage.getItem('showContactsCount')),
			contactsDivide = this.divideContactsArr(data),
			contactsDivideLength = contactsDivide.length,
			showContacts = contactsDivide[0],
			indexPage = 0;

		return contactsTemplate({indexPage, contactsDivide, contactsDivideLength, showContacts, showContactsCount});
	}

	afterRender() {
		this.setActions();
	}

	async setActions() {
		const contacts = await this.getData(),
			contactsBlock = document.getElementsByClassName('js-contacts-block')[0],
			counter = document.getElementsByClassName('js-contacts-counter')[0],
			controlsBtn = document.getElementsByClassName('js-contacts-controls')[0],
			contactsTable = document.getElementsByClassName('js-table')[0],
			contactsTableBody = contactsTable.getElementsByClassName('js-table-body')[0],
			contactsInputs = contactsTable.getElementsByTagName('input'),
			contactsControls = document.getElementsByClassName('js-contacts-control')[0],
			contactDelete = contactsControls.getElementsByClassName('js-delete-contact')[0],
			contactDeleteOptions = contactsControls.getElementsByClassName('js-controls-options')[0],
			titleWrap = document.getElementsByClassName('js-title-wrap')[0],
			filter = document.querySelector('.js-filter'),
			filterInputs = filter.getElementsByTagName('input'),
			filterBtns = filter.querySelector('.js-filter-btns'),
			filterFindBtn = filterBtns.querySelector('.js-filter-show-btn'),
			filterHashtags = document.querySelector('.js-filter-hashtags'),
			contactsResult = this.filterContacts(contacts, filterInputs);

		counter.textContent = this.showContactsAmount(0, contactsResult.length || contacts.length);

		document.body.addEventListener('change', async(e) => {
			const target = e.target,
				contacts = await this.getData(),
				pagination = contactsBlock.getElementsByClassName('js-pagination')[0];

			/*Изменение чекбоксов в таблице контактов*/
			if (target.classList.contains('js-contact-check')) {
				const contactChecked = contactsTableBody.querySelectorAll('.js-contact-check:checked'),
					contactsResult = this.filterContacts(contacts, filterInputs);


				counter.textContent = this.showContactsAmount(contactChecked.length, contactsResult.length || contacts.length);

				if (contactChecked.length > 0) {
					controlsBtn.classList.remove('hidden');
				} else {
					this.displayContactsControlBtns(controlsBtn, contactDelete, contactDeleteOptions);
				}

				contactsControls.style.width = `${contactsTable.clientWidth}px`;

				this.fixedBlock(contactsTable, contactsInputs, contactsControls, null);
			}

			/*Изменение чекбоксов в фильтре контактов*/
			if (target.classList.contains('js-choose-option')) {
				this.fixedBlock(filter, filterInputs, filterBtns, filterFindBtn);
			}

			/*Изменение страницы*/
			if (target.classList.contains('js-pagination-select')) {
				contactsTableBody.innerHTML = this.renderTable(contacts, +target.value - 1);

				this.renderPagination(contactsBlock, pagination, contacts, +target.value - 1);
			}


		});

		/*Изменение полей в фильтре*/
		document.body.addEventListener('keyup', (e) => {
			const target = e.target;

			if (target.closest('.js-filter')) {
				this.fixedBlock(filter, filterInputs, filterBtns, filterFindBtn);
			}
		});

		window.addEventListener('scroll', () => {
			this.fixedBlock(filter, filterInputs, filterBtns, filterFindBtn);
			this.fixedBlock(contactsTable, contactsInputs, contactsControls, null);
		});

		window.addEventListener('resize', function () {
			contactsControls.style.width = `${contactsTable.clientWidth}px`;
		});

		document.body.addEventListener('click', async (e) => {
			const target = e.target,
				contacts = await this.getData(),
				contactsResult = this.filterContacts(contacts, filterInputs),
				pagination = contactsBlock.getElementsByClassName('js-pagination')[0],
				paginationSelect = contactsBlock.getElementsByClassName('js-pagination-select')[0];

			/*Сброс фильтра*/
			if (target.classList.contains('js-filter-reset')) {
				const contacts = await this.getData();

				for (const input of filterInputs) {
					input.value = '';
					input.checked = false;
				}

				this.fixedBlock(filter, filterInputs, filterBtns, filterFindBtn);

				filterHashtags.innerHTML = '';
				titleWrap.nextElementSibling && titleWrap.nextElementSibling.remove();

				contactsTableBody.innerHTML = this.renderTable(contacts, target.dataset.show);

				counter.textContent = this.showContactsAmount(0, contacts.length);

				this.renderPagination(contactsBlock, pagination, contacts);
			}

			/*Удаление одной опции фильтра*/
			if (target.classList.contains('js-filter-delete-option')) {
				for (const input of filterInputs) {
					if (/^((с|по)\s{1})(?<=.)\d{4}/igm.test( target.innerText)) {
						target.innerText = target.innerText.replace(/(с|по)/igm, '');
					}
					if (input.value === target.innerText || input.dataset.value === target.innerText) {
						input.value = '';
						input.checked = false;
					}
				}

				const contactsResult = this.filterContacts(contacts, filterInputs);

				this.showContacts(contacts, contactsTableBody, filterHashtags, filter, filterInputs, filterBtns, filterFindBtn, titleWrap);

				this.fixedBlock(filter, filterInputs, filterBtns, filterFindBtn);

				counter.textContent = this.showContactsAmount(0, contactsResult.length || contacts.length);

				this.renderPagination(contactsBlock, pagination, contactsResult.length ? contactsResult : contacts);
			}

			/*Удалить контакт*/
			if (target.closest('.js-delete-contact')) {
				target.classList.add('hidden');
				contactDeleteOptions.classList.remove('hidden');
			}

			/*Удалить контакт Отмена*/
			if (target.classList.contains('js-delete-cancel')) {
				for (const input of contactsInputs) {
					input.checked = false;
				}

				counter.textContent = this.showContactsAmount(0, contactsResult.length || contacts.length);

				this.displayContactsControlBtns(controlsBtn, contactDelete, contactDeleteOptions);
			}

			/*Удалить контакт Удалить*/
			if (target.classList.contains('js-delete-ok')) {
				const contactsTable = document.getElementsByClassName('js-table')[0],
					contactsInputs = contactsTable.getElementsByTagName('input'),
					contactsIds = [];

				for (const input of contactsInputs) {
					if (input.checked) {
						contactsIds.push(input.dataset.id);
					}
				}

				await this.deleteContacts(contactsIds);

				this.displayContactsControlBtns(controlsBtn, contactDelete, contactDeleteOptions);

				const contacts = await this.getData();

				counter.textContent = this.showContactsAmount(0, contactsResult.length || contacts.length);

				contactsTableBody.innerHTML = this.renderTable(contacts);

				this.renderPagination(contactsBlock, pagination, contactsResult.length ? contactsResult : contacts);
			}

			/*Изменение отображаемых контактов в таблице*/
			if (target.classList.contains('js-show-option')) {
				const changeShowItem = document.getElementsByClassName('js-show-items')[0];

				localStorage.setItem('showContactsCount', JSON.stringify(target.dataset.show));

				changeShowItem.querySelector('.js-show-option.active').classList.remove('active');

				target.classList.add('active');

				contactsTableBody.innerHTML = contactsResult.length ? this.renderTable(contactsResult) : this.renderTable(contacts);

				this.renderPagination(contactsBlock, pagination, contactsResult.length ? contactsResult : contacts);
			}

			/*Следующая страница*/
			if (target.closest('.js-next-page')) {
				contactsTableBody.innerHTML = this.renderTable(contacts, +paginationSelect.value);

				this.renderPagination(contactsBlock, pagination, contacts, +paginationSelect.value);
			}

			/*Предыдущая страница*/
			if (target.closest('.js-prev-page')) {
				contactsTableBody.innerHTML = this.renderTable(contacts, +paginationSelect.value - 2);

				this.renderPagination(contactsBlock, pagination, contacts, +paginationSelect.value - 2);
			}
		});

		filter.addEventListener('submit', async(e) => {
			e.preventDefault();

			const contacts = await this.getData(),
				contactsResult = this.filterContacts(contacts, filterInputs),
				pagination = contactsBlock.getElementsByClassName('js-pagination')[0];

			this.displayContactsControlBtns(controlsBtn, contactDelete, contactDeleteOptions);

			this.showContacts(contacts, contactsTableBody, filterHashtags, filter, filterInputs, filterBtns, filterFindBtn, titleWrap);

			this.renderPagination(contactsBlock, pagination, contactsResult);

			counter.textContent = this.showContactsAmount(0, contactsResult.length);
		});
	}
}

export default ContactsList;
