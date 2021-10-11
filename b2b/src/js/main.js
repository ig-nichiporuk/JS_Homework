let body = document.body,
	selectStatus = document.getElementById('status-change'),
	printOrder = document.getElementById('print-order'),
	headerTop = document.querySelector('.headerMainJs');

const openDropdown = (elem, duration) => {
	let dropdownBody = elem.nextElementSibling;
	elem.classList.add('open');
	dropdownBody.classList.add('open');
	dropdownBody.style.height = 'auto';
	let originHeight = `${dropdownBody.clientHeight}px`;
	dropdownBody.style.cssText = `height : 0px; transition-duration : ${duration / 1000}s`
	setTimeout( () => dropdownBody.style.height = originHeight, 0);
};
const closeDropdown = (elem, duration) => {
	elem.forEach(function (activeDropdownBtn) {
		activeDropdownBtn.classList.remove('open')
		activeDropdownBtn.nextElementSibling.style.height = 0;
		setTimeout( () => activeDropdownBtn.nextElementSibling.classList.remove('open'), duration);
	});
};
body.addEventListener('click', function (e) {
	let dropdownBtn = e.target.closest('.dropdownBtnJs'),
		activeDropdownBtns = document.querySelectorAll('.dropdownBtnJs.open');

	if(dropdownBtn) {
		if (!dropdownBtn.classList.contains('open')) {
			closeDropdown(activeDropdownBtns, 300);
			openDropdown(dropdownBtn, 300);
		}
		else {
			closeDropdown(activeDropdownBtns, 300);
		}
	} else if (activeDropdownBtns.length && !e.target.closest('.dropdownWrapJs')) {
		closeDropdown(activeDropdownBtns, 300);
	}
});

selectStatus.onchange = () => {
	printOrder.disabled = +selectStatus.value ? false : true;
	+selectStatus.value ? selectStatus.classList.add('done') : selectStatus.classList.remove('done');
}

window.onscroll = () => {
	window.scrollY > 60 ? headerTop.classList.add('scrollable') : headerTop.classList.remove('scrollable');
}
















