import {openDropdown, closeDropdown, openModal, closeModal} from './helpers/utils.js';




let body = document.body,
	selectStatus = document.getElementById('status-change'),
	printOrder = document.getElementById('print-order'),
	headerTop = document.querySelector('.headerMainJs');

body.addEventListener('click', function (e) {
	let target = e.target,
		dropdownBtn = target.closest('.dropdownBtnJs'),
		activeDropdownBtns = document.querySelectorAll('.dropdownBtnJs.open');
	if(dropdownBtn) {
		if (!dropdownBtn.classList.contains('open')) {
			closeDropdown(activeDropdownBtns, 0);
			openDropdown(dropdownBtn, 300);
		}
		else {
			closeDropdown(activeDropdownBtns, 300);
		}
	} else if (activeDropdownBtns.length && !e.target.closest('.dropdownWrapJs')) {
		closeDropdown(activeDropdownBtns, 300);
	}

	if(target.closest('.modalOpenJs')) {
		e.preventDefault();

		let href = target.closest('.modalOpenJs').getAttribute('href');

		closeModal();
		openModal(href);
	}
	if(target.classList.contains('modalCloseJs') || target.classList.contains('overlayJs')) {
		closeModal();
	}
});

/*selectStatus.onchange = () => {
	printOrder.disabled = +selectStatus.value ? false : true;
	+selectStatus.value ? selectStatus.classList.add('done') : selectStatus.classList.remove('done');
}

window.onscroll = () => {
	window.scrollY > 60 ? headerTop.classList.add('scrollable') : headerTop.classList.remove('scrollable');
}*/

















