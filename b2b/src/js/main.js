let body = document.body,
	selectStatus = document.getElementById('status-change'),
	printOrder = document.getElementById('print-order'),
	headerTop = document.querySelector('.headerMainJs');

const openDropdown = elem => {
	let dropdownBody = elem.nextElementSibling;
	const DURATION = 300;

	elem.classList.add('open');
	dropdownBody.style.height = 'auto';

	let originHeight = `${dropdownBody.clientHeight}px`;

	dropdownBody.style.cssText = `height : 0px; transition-duration : ${DURATION / 1000}s`
	setTimeout( () => dropdownBody.style.height = originHeight, 0);
};

const closeAll = elem => {
	elem.forEach(function (block) {
		block.classList.remove('open');
	});
};



body.addEventListener('click', function (e) {
	let dropdownBtn = e.target.closest('.dropdownBtnJs'),
		openUi = document.querySelectorAll('.open');

	if(dropdownBtn) {
		if (!dropdownBtn.classList.contains('open')) {
			closeAll(openUi);
			openDropdown(dropdownBtn);
		}
		else {
			closeAll(openUi);
		}
	} else if (openUi.length && !e.target.closest('.dropdownWrapJs')) {
		closeAll(openUi);
	}
});

selectStatus.onchange = () => {
	printOrder.disabled = +selectStatus.value ? false : true;
	+selectStatus.value ? selectStatus.classList.add('done') : selectStatus.classList.remove('done');
}

window.onscroll = () => {
	window.scrollY > 60 ? headerTop.classList.add('scrollable') : headerTop.classList.remove('scrollable');
}
















