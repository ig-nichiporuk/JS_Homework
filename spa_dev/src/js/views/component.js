import {closeDropdown, openDropdown, openModal, closeModal, parseRequestURL} from '../helpers/utils.js';

import Tasks from '../models/tasks.js';

class Component {
    constructor() {
        this.request = parseRequestURL();
        this.tasks = new Tasks().getTasksFromLS();
    }

    afterRender() {
	    document.body.onclick = () => {
		    const target = event.target,
			    dropdownBtn = target.closest('.dropdownBtnJs'),
			    activeDropdownBtns = document.querySelectorAll('.dropdownBtnJs.open');

		    if(dropdownBtn) {
			    if (!dropdownBtn.classList.contains('open')) {
				    closeDropdown(activeDropdownBtns, 300);
				    openDropdown(dropdownBtn, 300);
			    }
			    else {
				    closeDropdown(activeDropdownBtns, 300);
			    }
		    } else if (activeDropdownBtns.length && !target.closest('.dropdownWrapJs')) {
			    closeDropdown(activeDropdownBtns, 300);
		    }

		    if(target.closest('.modalOpenJs')) {
			    event.preventDefault();

			    let href = target.closest('.modalOpenJs').getAttribute('href');

			    closeModal();
			    openModal(href);
		    }

		    if(target.classList.contains('modalCloseJs') || target.classList.contains('overlayJs')) {
			    closeModal();
		    }
	    };
    }
}

export default Component;
