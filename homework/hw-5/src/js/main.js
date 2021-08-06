$(document).ready(function () {
	var	body = $('body'),
		overlay = $('.overlayJs'),
	    mobMenu = $('.navJS'),
	    sidebar = $('.sidebarJS'),
		mobMenuSidebarBtn = $('.openMenuJs, .sidebarBtnJS');

	mobMenuSidebarBtn.on('click', function () {
		var data = $(this).attr('data-info');
		if(data !== 'sidebar') {
			body.removeClass('sidebar-open');
		}
		if (body.hasClass(data + '-open')) {
			body.addClass('close-all-main');
			closeAll();
		} else {
			body.addClass('overlay-open ' + data + '-open');
		}
	});

	overlay.on('click', function () {
		body.addClass('close-all-main');
		closeAll();
	});

	$(document).mousedown(function (e){
		if (!mobMenu.is(e.target) && mobMenu.has(e.target).length === 0 &&
			!mobMenuSidebarBtn.is(e.target) && mobMenuSidebarBtn.has(e.target).length === 0 &&
			!sidebar.is(e.target) && sidebar.has(e.target).length === 0) {
			body.addClass('close-all-main');
			closeAll();
		}
	});

	$( window ).resize(function() {
		if($(window).width() > 767) {
			if(body.hasClass('menu-open')) {
				body.removeClass('overlay-open menu-open');
			}
			if(body.hasClass('sidebar-open')) {
				body.removeClass('overlay-open sidebar-open');
			}
		}
	});
});

function closeAll() {
	setTimeout(function () {
		$('body').removeClass('overlay-open menu-open sidebar-open close-all-main');
	}, 400);
}
