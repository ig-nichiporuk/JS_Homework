export const parseRequestURL = () => {
    const url = location.hash.slice(2),
        request = {};

    [request.resource, request.id, request.action] = url.split('/');

    return request;
};

export const generateID = () => {
    return Math.random().toString(36).substr(2, 10);
};




export const openDropdown = (elem, duration) => {
	let dropdownBody = elem.nextElementSibling;

	elem.classList.add('open');
	dropdownBody.classList.add('open');
	dropdownBody.style.height = 'auto';

	let originHeight = `${dropdownBody.clientHeight}px`;

	dropdownBody.style.cssText = `height : 0px; transition-duration : ${duration / 1000}s`;
	setTimeout( () => dropdownBody.style.height = originHeight, 0);
};


export const closeDropdown = (elem, duration) => {
	elem.forEach(function (activeDropdownBtn) {
		activeDropdownBtn.classList.remove('open');
		activeDropdownBtn.nextElementSibling.style.height = '0';
		setTimeout( () => activeDropdownBtn.nextElementSibling.classList.remove('open'), duration);
	});
};


export function openModal(id) {
	let modal = document.getElementById(id),
		body = document.body,
		winScrollTop = window.scrollY,
		winHeight = document.documentElement.clientHeight,
		docHeight = document.documentElement.scrollHeight;

	modal.classList.add('open');

	let modalHeight = modal.clientHeight,
		modalTop = modalHeight > winHeight ? winScrollTop + 50 : winScrollTop + (winHeight - modalHeight) / 2;

	body.classList.add('modal-open', 'overlay-open');

	if(modalTop + modalHeight + 300 > docHeight) {
		modalTop = docHeight - modalHeight - 300;
		window.scrollTo({
			top: modalTop - 50,
			behavior: 'smooth'
		});
	}
	modal.style.cssText = `top : ${modalTop}px`;
}


export function closeModal() {
	let modal = document.querySelectorAll('.modalJs.open'),
		body = document.body;
	modal.forEach((activeModal) => activeModal.classList.remove('open'))
	body.classList.remove('modal-open',  'overlay-open',  'js-scroll-lock');
}








export const getTokenFromCookies = () => {
	if ((/token=(.+?)(;|$)/).test(document.cookie)){
		let access = document.cookie.match(/token=(.+?)(;|$)/)[1] == '1' ? 'manager' : 'user';
		return access;
	}
};










