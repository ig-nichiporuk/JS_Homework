import {getTokenFromCookies} from '../../helpers/utils.js';

import Component from '../../views/component.js';

class Header extends Component {
	render() {

		const userToken = getTokenFromCookies();

		return new Promise(resolve => {
			resolve(`
				<div class="header__wrap ${userToken ? 'header_inside' : ''}">
					<div class="header__main headerMainJs">
						<div class="container">
							<div class="header__main-wrapper">
								<div class="header__main-logo">
									<a href="#/">
										<svg>
											<use xlink:href="#autoset-small"></use>
										</svg>
									</a>
								</div>
								<ul class="header__links">
									<li class="phone">
										<svg class="phone">
											<use xlink:href="#phone"></use>
										</svg>
										<a href="tel:+375295020151">+375 (29) 502-01-51</a>
									</li>
									<li class="email">
										<svg class="email">
											<use xlink:href="#email"></use>
										</svg>
										<a href="mailto:partners@autoset.by">partners@autoset.by</a>
									</li>
								</ul>
								${userToken ? `
									<div class="header__cabinet dropdown dropdownWrapJs">
										<div class="header__cabinet-btn dropdown__btn dropdownBtnJs">
											<svg class="char">
												<use xlink:href="#icon-user"></use>
											</svg>
											<span>Кабинет</span>
											<svg class="arrow">
												<use xlink:href="#arrow"></use>
											</svg>
										</div>
										<div class="dropdown__body" >
											<div class="dropdown__wrap">
												<div class="user">
													${userToken == 'user' ? '<span>Организация:</span><p>ИП Толокнников В. А.</p>' : '<span>Пользователь:</span><p>Мадорский Кирилл</p>'}
												</div>
												${userToken == 'manager' ? '<div class="status"><span>Статус:</span><p>Администратор</p></div>' : ''}
												${userToken == 'user' ? '<a href="#/help/" class="helper"><svg><use xlink:href="#help"></use></svg>Помощь</a>' : ''}
												<a href="#" class="btn-style btn-style_red">Выход</a>
											</div>
										</div>
									</div>
								` : ''}

							</div>
						</div>
					</div>
					<div class="header__links-mob">
						<div class="container">
							<ul class="header__links">
								<li class="phone">
									<svg class="phone">
										<use xlink:href="#phone"></use>
									</svg>
									<a href="tel:+375295020151">+375 (29) 502-01-51</a>
								</li>
								<li class="email">
									<svg class="email">
										<use xlink:href="#email"></use>
									</svg>
									<a href="mailto:partners@autoset.by">partners@autoset.by</a>
								</li>
							</ul>
						</div>
					</div>
					${userToken ? `
						<div class="header__full">
						<div class="container">
							<div class="header__full-wrapper">
								<a href="#/" class="header__full-logo">
									<svg>
										<use xlink:href="#autoset-big"></use>
									</svg>
								</a>
								<nav class="header__nav">
									<a href="#/orders/">
										<svg>
											<use xlink:href="#orders"></use>
										</svg>
										Заказы
									</a>
									<a href="#/acts/">
										<svg>
											<use xlink:href="#acts"></use>
										</svg>
										Акты
									</a>
									<a href="#/help/">
										<svg>
											<use xlink:href="#help"></use>
										</svg>
										Помощь
									</a>
								</nav>
							</div>
						</div>
					</div>
					` : ''}
				</div>
            `);
		});
	}


	afterRender() {
		super.afterRender();
		const headerTop = document.querySelector('.headerMainJs');

		window.onscroll = () => {
			window.scrollY > 60 ? headerTop.classList.add('scrollable') : headerTop.classList.remove('scrollable');
		};
	}
}

export default Header;