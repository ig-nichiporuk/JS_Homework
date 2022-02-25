import {hideL, showInfoModal} from '../../helpers/utils';

import Component from '../../views/component';

import contactsTemplate from '../../../templates/pages/contacts.hbs';
import contactsTableRow from '../../../templates/pages/contacts/contactsTableRow.hbs';
import filterHashtagsTemplate from '../../../templates/pages/filter/filterHashtags.hbs';
import paginationTemplate from '../../../templates/pages/pagination/pagination.hbs';

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
		try {
			return await this.model.deleteContacts(id);

		} catch {
			hideL();

			showInfoModal('alert-modal', 'alert', {
				title : 'Ошибка!',
				message : 'Не удалось удалить котакты'
			});
		}
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
			if ((input.value && input.value !== 'on') || input.checked) {
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
		const options = {};

		filterInputs.name.value && (options.name = filterInputs.name.value);
		filterInputs.surname.value && (options.surname = filterInputs.surname.value);
		filterInputs.patronymic.value && (options.patronymic = filterInputs.patronymic.value);
		filterInputs['year-min'].value && (options.birthdateMin = filterInputs['year-min'].value);
		filterInputs['year-max'].value && (options.birthdateMax = filterInputs['year-max'].value);
		filterInputs['gender-man'].checked && (options.gender = filterInputs['gender-man'].dataset.value);
		filterInputs['gender-woman'].checked && (options.gender = filterInputs['gender-woman'].dataset.value);
		filterInputs.family.checked && (options.family = true);
		filterInputs.country.value && (options.country = filterInputs.country.value);
		filterInputs.city.value && (options.city = filterInputs.city.value);
		filterInputs.street.value && (options.street = filterInputs.street.value);
		filterInputs.house.value && (options.house = filterInputs.house.value);
		filterInputs.apartment.value && (options.apartment = filterInputs.apartment.value);

		return options;
	}

	filterContacts(contacts, filterInputs) {
		const options = this.listenChangesInFilter(filterInputs);

		let contactsResult = [];

		if (options.surname) {
			contactsResult = contacts.filter(item => item.surname.toLowerCase() === options.surname.toLowerCase());

			if (!contactsResult.length) return [];
		}
		if (options.name) {
			const result = contactsResult.length ? contactsResult : contacts;

			contactsResult = result.filter(item => item.name.toLowerCase() === options.name.toLowerCase());

			if (!contactsResult.length) return [];
		}
		if (options.patronymic) {
			const result = contactsResult.length ? contactsResult : contacts;

			contactsResult = result.filter(item => item.patronymic.toLowerCase() === options.patronymic.toLowerCase());

			if (!contactsResult.length) return [];
		}

		if (options.birthdateMin && options.birthdateMax) {
			const result = contactsResult.length ? contactsResult : contacts;

			contactsResult = result.filter(item => {
				const year = item.birthdate.year;

				return (year >= options.birthdateMin && year <= options.birthdateMax);
			});

			if (!contactsResult.length) return [];
		}

		if (options.birthdateMin) {
			const result = contactsResult.length ? contactsResult : contacts;

			contactsResult = result.filter(item => {
				const year = item.birthdate.year;

				if (year && year >= options.birthdateMin) return year;
			});

			if (!contactsResult.length) return [];
		}

		if (options.birthdateMax) {
			const result = contactsResult.length ? contactsResult : contacts;

			contactsResult = result.filter(item => {
				const year = item.birthdate.year;

				if (year && year <= options.birthdateMax) return year;
			});

			if (!contactsResult.length) return [];
		}

		if (options.gender) {
			const result = contactsResult.length ? contactsResult : contacts;

			contactsResult = result.filter(item => item.gender === options.gender);

			if (!contactsResult.length) return [];
		}

		if (options.family) {
			const result = contactsResult.length ? contactsResult : contacts;

			contactsResult = result.filter(item => item.family === options.family ? item : '');

			if (!contactsResult.length) return [];
		}

		if (options.country) {
			const result = contactsResult.length ? contactsResult : contacts;

			contactsResult = result.filter(item => item.country.toLowerCase() === options.country.toLowerCase());

			if (!contactsResult.length) return [];
		}

		if (options.city) {
			const result = contactsResult.length ? contactsResult : contacts;

			contactsResult = result.filter(item => item.city.toLowerCase() === options.city.toLowerCase());

			if (!contactsResult.length) return [];
		}

		if (options.street) {
			const result = contactsResult.length ? contactsResult : contacts;

			contactsResult = result.filter(item => item.street.toLowerCase() === options.street.toLowerCase());

			if (!contactsResult.length) return [];
		}

		if (options.house) {
			const result = contactsResult.length ? contactsResult : contacts;

			contactsResult = result.filter(item => item.house.toLowerCase() === options.house.toLowerCase());

			if (!contactsResult.length) return [];
		}

		if (options.apartment) {
			const result = contactsResult.length ? contactsResult : contacts;

			contactsResult = result.filter(item => item.apartment.toLowerCase() === options.apartment.toLowerCase());

			if (!contactsResult.length) return [];
		}

		return contactsResult;
	}

	showContacts(contacts, table, filterHashtags, filter, filterInputs, filterBtns, filterFindBtn, titleWrap) {
		const contactsResult = this.filterContacts(contacts, filterInputs),
			options = this.listenChangesInFilter(filterInputs);

		options.birthdateMin && (options.birthdateMin = `с ${options.birthdateMin}`);
		options.birthdateMax && (options.birthdateMax = `по ${options.birthdateMax}`);
		options.family && (options.family = 'Замужем / женат');

		const optionsArr = Object.values(options);

		if (contactsResult.length && optionsArr.length) {
			table.innerHTML = this.renderTable(contactsResult);
		} else if (optionsArr.length) {
			table.innerHTML = '<p>Ничего не найдено</p>';
		} else {
			table.innerHTML = this.renderTable(contacts);
		}

		filterHashtags.innerHTML = optionsArr.length ? filterHashtagsTemplate({optionsArr}) : '';

		titleWrap.nextElementSibling && titleWrap.nextElementSibling.remove();

		optionsArr.length && titleWrap.insertAdjacentHTML('afterend', `<p>Найдено: ${contactsResult.length}</p>`);
	}

	async getData() {
		try {
			return await this.model.getContactsList();

		} catch {
			hideL();

			showInfoModal('alert-modal', 'alert', {
				title : 'Ошибка!',
				message : 'Не удалось получить список контактов'
			});
		}
	}

	async render(data) {
		const showContactsCount = JSON.parse(localStorage.getItem('showContactsCount')),
			contactsDivide = this.divideContactsArr(data),
			contactsDivideLength = contactsDivide.length,
			showContacts = contactsDivide[0],
			indexPage = 0;

		return contactsTemplate({indexPage, contactsDivide, contactsDivideLength, showContacts, showContactsCount});
	}

	async afterRender(data) {
		await this.setActions(data);
	}

	async setActions(data) {
		const contactsBlock = document.getElementsByClassName('js-contacts-block')[0],
			counter = document.getElementsByClassName('js-contacts-counter')[0],
			controlsBtn = document.getElementsByClassName('js-contacts-controls')[0],
			contactsTable = document.getElementsByClassName('js-table')[0],
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

		let contacts = data;

		counter.textContent = this.showContactsAmount(0, contactsResult.length || contacts.length);







		window.addEventListener('scroll', () => {
			this.fixedBlock(filter, filterInputs, filterBtns, filterFindBtn);
			this.fixedBlock(contactsTable, contactsInputs, contactsControls, null);
		});

		window.addEventListener('resize', function() {
			contactsControls.style.width = `${contactsTable.clientWidth}px`;
		});

		contactsBlock.addEventListener('click', async(e) => {
			const target = e.target,
				contactsResult = this.filterContacts(contacts, filterInputs),
				options = this.listenChangesInFilter(filterInputs),
				pagination = contactsBlock.getElementsByClassName('js-pagination')[0],
				paginationSelect = contactsBlock.getElementsByClassName('js-pagination-select')[0];

			if (target.classList.contains('js-filter-reset')) {
				for (const input of filterInputs) {
					input.value = '';
					input.checked = false;
				}

				this.fixedBlock(filter, filterInputs, filterBtns, filterFindBtn);

				filterHashtags.innerHTML = '';
				titleWrap.nextElementSibling && titleWrap.nextElementSibling.remove();

				contactsTable.innerHTML = this.renderTable(contacts, target.dataset.show);

				counter.textContent = this.showContactsAmount(0, contacts.length);

				this.renderPagination(contactsBlock, pagination, contacts);
			}

			if (target.classList.contains('js-filter-delete-option')) {
				for (const input of filterInputs) {
					if (/^((с|по)\s?)(?<=.)\d{4}/igm.test( target.innerText)) {
						target.innerText = target.innerText.replace(/(с|по)/igm, '');
					}
					if (input.value === target.innerText || input.dataset.value === target.innerText) {
						input.value = '';
						input.checked = false;
					}
				}

				const contactsResult = this.filterContacts(contacts, filterInputs),
					options = this.listenChangesInFilter(filterInputs),
					optionsArr = Object.values(options);

				this.showContacts(contacts, contactsTable, filterHashtags, filter, filterInputs, filterBtns, filterFindBtn, titleWrap);

				this.fixedBlock(filter, filterInputs, filterBtns, filterFindBtn);

				if (contactsResult.length && optionsArr.length) {
					counter.textContent = this.showContactsAmount(0, contactsResult.length);

					this.renderPagination(contactsBlock, pagination, contactsResult);
				} else if (optionsArr.length) {
					counter.textContent = this.showContactsAmount(0, 0);

					contactsBlock.insertAdjacentHTML('beforeend', '');
				} else {
					counter.textContent = this.showContactsAmount(0, contacts.length);

					this.renderPagination(contactsBlock, pagination, contacts);
				}
			}

			if (target.closest('.js-delete-contact')) {
				target.classList.add('hidden');
				contactDeleteOptions.classList.remove('hidden');
			}

			if (target.classList.contains('js-delete-cancel')) {
				for (const input of contactsInputs) {
					input.checked = false;
				}

				counter.textContent = this.showContactsAmount(0, contactsResult.length || contacts.length);

				this.displayContactsControlBtns(controlsBtn, contactDelete, contactDeleteOptions);
			}

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

				contacts = await this.getData();

				counter.textContent = this.showContactsAmount(0, contactsResult.length || contacts.length);

				contactsTable.innerHTML = this.renderTable(contacts);

				this.renderPagination(contactsBlock, pagination, contactsResult.length ? contactsResult : contacts);
			}

			if (target.classList.contains('js-show-option')) {
				const changeShowItem = document.getElementsByClassName('js-show-items')[0],
					optionsArr = Object.values(options);

				localStorage.setItem('showContactsCount', JSON.stringify(target.dataset.show));

				changeShowItem.querySelector('.js-show-option.active').classList.remove('active');

				target.classList.add('active');

				if (contactsResult.length && optionsArr.length) {
					contactsTable.innerHTML = this.renderTable(contactsResult);
				} else if (optionsArr.length) {
					return;
				} else {
					contactsTable.innerHTML = this.renderTable(contacts);
				}

				this.renderPagination(contactsBlock, pagination, contactsResult.length ? contactsResult : contacts);
			}

			if (target.closest('.js-next-page')) {
				contactsTable.innerHTML = this.renderTable(contacts, +paginationSelect.value);

				this.renderPagination(contactsBlock, pagination, contacts, +paginationSelect.value);
			}

			if (target.closest('.js-prev-page')) {
				contactsTable.innerHTML = this.renderTable(contacts, +paginationSelect.value - 2);

				this.renderPagination(contactsBlock, pagination, contacts, +paginationSelect.value - 2);
			}
		});

		contactsBlock.addEventListener('change', async(e) => {
			const target = e.target;

			if (target.classList.contains('js-contact-check')) {
				const contactChecked = contactsTable.querySelectorAll('.js-contact-check:checked'),
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

			if (target.classList.contains('js-pagination-select')) {
				const pagination = contactsBlock.getElementsByClassName('js-pagination')[0];

				contactsTable.innerHTML = this.renderTable(contacts, +target.value - 1);

				this.renderPagination(contactsBlock, pagination, contacts, +target.value - 1);
			}
		});

		filter.addEventListener('keyup', (e) => {
			const target = e.target;

			if (target.closest('.js-filter')) {
				this.fixedBlock(filter, filterInputs, filterBtns, filterFindBtn);
			}
		});

		filter.addEventListener('change', async(e) => {
			const target = e.target;

			if (target.classList.contains('js-choose-option')) {
				this.fixedBlock(filter, filterInputs, filterBtns, filterFindBtn);
			}
		});

		filter.addEventListener('submit', async(e) => {
			e.preventDefault();

			const contactsResult = this.filterContacts(contacts, filterInputs),
				pagination = contactsBlock.getElementsByClassName('js-pagination')[0];

			this.displayContactsControlBtns(controlsBtn, contactDelete, contactDeleteOptions);

			this.showContacts(contacts, contactsTable, filterHashtags, filter, filterInputs, filterBtns, filterFindBtn, titleWrap);

			this.renderPagination(contactsBlock, pagination, contactsResult);

			counter.textContent = this.showContactsAmount(0, contactsResult.length);
		});
	}
}

export default ContactsList;
