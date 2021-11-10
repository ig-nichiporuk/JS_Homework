import {parseRequestURL, openDropdown, closeDropdown, openModal, closeModal} from '../helpers/utils';

import Services from '../models/services';

class Component {
    constructor() {
		this.services = new Services();
        this.request = parseRequestURL();
    }

    getData() {
        return new Promise(resolve => resolve());
    }

	getServices() {
		return new Promise(resolve => this.services.getServicesList().then(orders => {
			resolve(orders);
		}));
	}

	afterRender() {
		document.body.onclick = () => {
			const target = event.target,
				dropdownBtn = target.closest('.dropdownBtnJs'),
				activeDropdownBtns = document.querySelectorAll('.dropdownBtnJs.open');

			if (dropdownBtn) {
				if (!dropdownBtn.classList.contains('open')) {
					closeDropdown(activeDropdownBtns, 300);
					openDropdown(dropdownBtn, 300);
				} else {
					closeDropdown(activeDropdownBtns, 300);
				}
			} else if (activeDropdownBtns.length && !target.closest('.dropdownWrapJs')) {
				closeDropdown(activeDropdownBtns, 300);
			}

			if (target.closest('.modalOpenJs')) {
				event.preventDefault();

				let href = target.closest('.modalOpenJs').getAttribute('href');

				console.log(href);

				closeModal();
				openModal(href);
			}

			if (target.classList.contains('modalCloseJs') || target.classList.contains('overlayJs')) {
				closeModal();
			}
		};
	}
}

export default Component;