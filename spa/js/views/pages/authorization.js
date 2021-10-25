import Component from '../../views/component.js';

class Authorization extends Component {
	render() {
		return new Promise(resolve => {
			resolve(`
				<div class="authorization">
	                <form class="authorization__form">
						<span class="authorization__title">Вход в систему</span>
						<div class="authorization__item">
							<label class="authorization__label">Имя пользователя</label>
							<input type="text" class="input-style">
						</div>
						<div class="authorization__item">
							<label class="authorization__label">Пароль</label>
							<input type="password" class="input-style">
						</div>
						<div class="authorization__item authorization__item_check">
							<label class="checkbox">
								<input type="checkbox" class="checkbox__check">
								<span class="checkbox__text">Запомнить меня</span>
							</label>
						</div>
						<div class="authorization__item authorization__item_btn">
							<button class="btn-style btn-style_red">Войти</button>
						</div>
					</form>
				</div>
            `);
		});
	}
}

export default Authorization;