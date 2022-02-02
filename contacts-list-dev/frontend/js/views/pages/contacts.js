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

	fixedFilterBtn(filter, filterInputs, filterBtns, filterReset, filterFindBtn) {
		for (const input of filterInputs) {
			if ((input.value && input.value != 'on') || input.checked) {
				filterReset.classList.remove('hidden');
				filterFindBtn.disabled = false;

				if (window.innerHeight + window.pageYOffset < filter.offsetTop + filter.offsetHeight - 95) {
					filterBtns.classList.add('fix');
				} else {
					filterBtns.classList.remove('fix');
				}
				return;
			}
		}

		filterReset.classList.add('hidden');
		filterFindBtn.disabled = true;
		filterBtns.classList.remove('fix');
	}

	listenChangesInFilter(filterInputs) {
		return {
			'name' : filterInputs.name.value || '',
			'surname' : filterInputs.surname.value || '',
			'patronymic' : filterInputs.patronymic.value || '',
			'birthdate' : [filterInputs['year-min'].value || '', filterInputs['year-max'].value || ''],
			'gender' : filterInputs['gender-man'].checked ? filterInputs['gender-man'].value : filterInputs['gender-woman'].checked ? filterInputs['gender-woman'].value : '',
			'family' : filterInputs.family.checked ? filterInputs.family.value : '',
			'country' : filterInputs.country.value || '',
			'city' : filterInputs.city.value || '',
			'street' : filterInputs.street.value || '',
			'house' : filterInputs.house.value || '',
			'apartment' : filterInputs.apartment.value || '',
			'postcode' : filterInputs.postcode.value || ''
		};
	}

	async setActions() {
		const contacts = await this.getData(),
			counter = document.getElementsByClassName('js-contacts-counter')[0],
			controlsBtn = document.getElementsByClassName('js-contacts-controls')[0],
			changeShowItem = document.getElementsByClassName('js-show-items')[0],
			contactsTableBody = document.getElementsByClassName('js-table-body')[0],
			filter = document.querySelector('.js-filter'),
			filterInputs = filter.getElementsByTagName('input'),
			filterBtns = filter.querySelector('.js-filter-btns'),
			filterReset = filterBtns.querySelector('.js-filter-reset'),
			filterFindBtn = filterBtns.querySelector('.js-filter-show-btn');

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
			}

			/*Изменение чекбоксов в фильтре контактов*/
			if (target.classList.contains('js-choose-option')) {
				this.listenChangesInFilter(filterInputs);
				this.fixedFilterBtn(filter, filterInputs, filterBtns, filterReset, filterFindBtn);
			}
		});

		/*Изменение полей в фильтре*/
		document.body.addEventListener('keyup', (e) => {
			const target = e.target;

			if (target.closest('.js-filter')) {
				this.listenChangesInFilter(filterInputs);
				this.fixedFilterBtn(filter, filterInputs, filterBtns, filterReset, filterFindBtn);
			}
		});

		window.addEventListener('scroll', () => {

			if($(".js-filter .checkbox__label-check").filter(":checked").length > 0 && $(document).scrollTop() > $('.js-filter').offset().top - $(window).height() && $(window).height() + $(document).scrollTop() <  $('.js-filter').offset().top + $('.js-filter').height()) {
				$('.js-filter-btns').addClass('fix');
			}
			else {
				$('.js-filter-btns').removeClass('fix');
			}

			this.fixedFilterBtn(filter, filterInputs, filterBtns, filterReset, filterFindBtn);
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




		/*// Изменение чекбоксов в фильтре
		$(".js-filter .checkbox__label-check").each(function () {
			$(this).change(function () {
				if($(".checkbox__label-check").filter(":checked").length > 0) {
					$('.hashtags').removeClass('hidden');
					$('.js-filter-reset').removeClass('hidden');
					$('.js-filter-show-btn').removeAttr('disabled');
					$('.js-filter-wrap').addClass('checked');

					if($(window).height() + $(document).scrollTop() < $('.js-filter').offset().top + $('.js-filter').height() - 100) {
						$('.js-filter-btns').addClass('fix');
					}
					else {
						if($('.js-filter').scrollTop() < $('.js-filter-wrap').height() - $(window).height() - 100 && $('.js-filter-wrap').height() > $('.js-filter').height()) {
							$('.js-filter-btns').addClass('fix');
						}
						else {
							$('.js-filter-btns').removeClass('fix');
						}
					}
				}
				else {
					$('.js-filter-reset').addClass('hidden');
					$('.js-filter-show-btn').attr('disabled', true);
					$('.js-filter-btns').removeClass('fix');
					$('.js-filter-wrap').removeClass('checked');
				}
			});
		});


		$(document).scroll(function () {
			// Кнопки снизу фильтра, когда выбран чекбокс фиксируются к низу
			if($(".js-filter .checkbox__label-check").filter(":checked").length > 0 && $(document).scrollTop() > $('.js-filter').offset().top - $(window).height() && $(window).height() + $(document).scrollTop() <  $('.js-filter').offset().top + $('.js-filter').height()) {
				$('.js-filter-btns').addClass('fix');
			}
			else {
				$('.js-filter-btns').removeClass('fix');
			}


			// Кнопки снизу таблицы, когда выбран чекбокс фиксируются к низу
			if($(".js-table .checkbox__label-check").filter(":checked").length > 0 && $(document).scrollTop() > $('.js-table').offset().top - $(window).height() && $(window).height() + $(document).scrollTop() <  $('.js-table').offset().top + $('.js-table').height()) {
				$('.contacts__controls').addClass('fix');
			}
			else {
				$('.contacts__controls').removeClass('fix');
			}


		});
		$('.js-filter').scroll(function () {
			if(($(".checkbox__label-check").filter(":checked").length > 0 && $('.js-filter').scrollTop() < $('.js-filter-wrap').height() - $(window).height() - 100)) {
				$('.js-filter-btns').addClass('fix');
			}
			else {
				$('.js-filter-btns').removeClass('fix');
			}
		});*/
	}
}

export default ContactsList;
