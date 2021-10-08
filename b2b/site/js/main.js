function closeDropdown() {
	$('body').removeClass('cabinet-dropdown-open');
	$('.cabinetBtnJs').next().slideUp(300);
}

function changeStatus(select) {
	switch (select.val()) {
		case 'done':
			select.addClass('done');
			$('.printOrderJS').prop('disabled', false);
			break;
		case 'in-process':
			select.addClass('in-process');
			$('.printOrderJS').prop('disabled', true);
	}
}

function openModal(modal) {
	var modal = $(modal);
	modal.addClass('open');
	$('body').addClass('modal-open overlay-open');
	var modalHeight = modal.outerHeight();
	var winHeight = $(window).height();
	var winScrollTop = $(window).scrollTop();
	var modalTop = modalHeight > winHeight ? winScrollTop + 50 : winScrollTop + (winHeight - modalHeight) / 2;
	if(modalTop + modalHeight + 300 > $('body').height()) {
		modalTop = $('body').height() - modalHeight - 300;
		$('html, body').animate({scrollTop: modalTop - 50}, Math.abs(modalTop - winScrollTop));
	}
	modal.css('top', modalTop);
}


function closeModal() {
	$('body').removeClass('modal-open overlay-open js-scroll-lock');
	$('.modalJs.open').removeClass('open');
	enableScroll();
}

function disableScroll() {
	if (scrollLock.getScrollState()) {
		scrollLock.disablePageScroll();
	}
}

function enableScroll() {
	if (!scrollLock.getScrollState()) {
		scrollLock.enablePageScroll();
	}
}
function disableScrollOnWidth() {
	$('body').addClass('js-scroll-lock');
	if ($(window).width() <= '767') {
		disableScroll();
	}
}

$(document).ready(function () {
	$('.cabinetBtnJs').on('click', function () {
		if ($('body').hasClass('cabinet-dropdown-open')) {
			closeDropdown()
		} else {
			$('body').addClass('cabinet-dropdown-open');
			$(this).next().slideDown(300);
		}
	});

	$(document).mousedown(function (e) {
		if (!$('.cabinetWrapJs').is(e.target) && $('.cabinetWrapJs').has(e.target).length === 0) {
			closeDropdown();
		}
		e.stopPropagation();
	});

	$(window).scroll(function () {
		if($(window).scrollTop() > $('.headerMainJs').height() + 16) {
			$('.header').addClass('scrollable');
		}
		else {
			$('.header').removeClass('scrollable');
		}
	});

	/*input COUNTER with plus minus buttons*/
	var $quantityArrowMinus = $(".counterMinusJs"),
		$quantityArrowPlus = $(".counterPlusJs"),
	    $quantityNum = $(".counterValueJs");
	$quantityArrowMinus.on('click', function () {
		if (+$(this).next($quantityNum).text() > 1) {
			$(this).next($quantityNum).text(+$(this).next($quantityNum).text() - 1);
		}
	});
	$quantityArrowPlus.on('click', function () {
		$(this).prev($quantityNum).text(+$(this).prev($quantityNum).text() + 1);
	});
	/*input COUNTER with plus minus buttons*/


	$('.orderStatusJs').on('change', function () {
		$(this).removeClass('done in-process')
		changeStatus($(this));
	});

	$('.modalOpenJs').on('click', function(e) {
		e.preventDefault();
		openModal($(this).attr('href'));
		if(!$(this).attr('data-status-scroll')) {
			disableScrollOnWidth()
		}
	});

	$('.modalCloseJs').on('click', function() {
		closeModal();
	});

	$('.overlayJs').on('click', function () {
		closeModal();
	});

	$(window).resize(function () {
		if($('body').hasClass('js-scroll-lock')) {
			$(window).width() > '767' ? enableScroll() : disableScroll();
		}
	});

});
