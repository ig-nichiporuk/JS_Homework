import ModalAlertTemplate from '../../templates/pages/modalAlert.hbs';

const body = document.body;

export const parseRequestURL = () => {
    const url = location.hash.slice(2),
        request = {};

    [request.resource, request.id, request.action] = url.split('/');

    return request;
};



export const openDropdown = (elem, duration) => {
	const dropdownBody = elem.nextElementSibling;

	elem.classList.add('open');
	dropdownBody.classList.add('open');
	dropdownBody.style.height = 'auto';

	let originHeight = `${dropdownBody.clientHeight}px`;

	dropdownBody.style.cssText = `height : 0px; transition-duration : ${duration / 1000}s`;
	setTimeout( () => dropdownBody.style.height = originHeight, 0);
};

export const closeDropdown = (elem, duration) => {
	elem.forEach(function(activeDropdownBtn) {
		activeDropdownBtn.classList.remove('open');
		activeDropdownBtn.nextElementSibling.style.height = '0';
		setTimeout( () => activeDropdownBtn.nextElementSibling.classList.remove('open'), duration);
	});
};

export const openModal = (id) => {
	const modal = document.getElementById(id),
		winScrollTop = window.scrollY,
		winHeight = document.documentElement.clientHeight,
		docHeight = document.documentElement.scrollHeight;

	body.insertAdjacentHTML('afterbegin', '<div class="overlay overlayJs"></div>');

	modal.classList.add('open');

	let modalHeight = modal.clientHeight,
		modalTop = modalHeight > winHeight ? winScrollTop + 50 : winScrollTop + (winHeight - modalHeight) / 2;

	body.classList.add('modal-open', 'overlay-open');

	if (modalTop + modalHeight + 300 > docHeight) {
		modalTop = docHeight - modalHeight - 300;
		window.scrollTo({
			top: modalTop - 50,
			behavior: 'smooth'
		});
	}
	modal.style.cssText = `top : ${modalTop}px`;
};

export const closeModal = () => {
	const modal = body.querySelectorAll('.modalJs.open'),
		overlay = body.getElementsByClassName('overlayJs')[0];

	if (overlay) overlay.remove();

	modal.forEach((activeModal) => activeModal.classList.remove('open'));
	body.classList.remove('modal-open',  'overlay-open',  'js-scroll-lock');

	resetAllInput();
};

export const showAlertModal = (id, content) => {
	closeModal();
	const modal = document.getElementById(id);
	modal.innerHTML = ModalAlertTemplate(content);
	openModal(id);
};

export const formatOrders = (data) => {
	return data.map(order => {
		order.status_id = order.status_id == 1 ? 'Новый' : order.status_id == 2 ? 'Отменен' : 'Выполнен';

		order.fio = [order.fio.split(' ')[0], `${order.fio.split(' ')[1][0]}.${order.fio.split(' ')[2][0]}.`].join(' ');

		order.created_at = order.created_at.split(' ')[0].split('-').reverse().join('.');

		order.closed_at = order.closed_at ? order.closed_at.split(' ')[0].split('-').reverse().join('.') : '—';

		return order;
	});
};

const resetAllInput = () => {
	const inputsChecked = body.querySelectorAll('input:checked');

	for (let input of inputsChecked) {
		input.checked = false;
	}
};
