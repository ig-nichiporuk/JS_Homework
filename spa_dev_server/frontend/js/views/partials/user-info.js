import {parseRequestURL} from "../../helpers/utils.js";

import Component from "../../views/component.js";


class UserInfo extends Component {
	render() {

		const request = parseRequestURL();

		return new Promise(resolve => {
			resolve(`
				<div class="info">
					<div class="container">
						<div class="info__title">
							<span class="info__order">${request.resource == 'orders' ? 'Заказы' : request.resource == 'acts' ? 'Акты выполненных работ' : 'TEST'}</span>
							<span class="info__user">ИП Толоконников А. А.</span>
						</div>
						<div class="info__data ${!request.id ? 'hidden' : ''}">
							<ul>
								<li>
									<span class="text">Дата:</span>
									<span class="value">--.--.----</span>
								</li>
								<li>
									<span class="text">ФИО:</span>
									<span class="value">Соколовский В. Б.</span>
								</li>
								<li>
									<span class="text">Автомобиль:</span>
									<span class="value">Renault Samsung</span>
								</li>
								<li>
									<span class="text">Рег. номер:</span>
									<span class="value">2533 EX-6</span>
								</li>
							</ul>
							<a href="edit-data" class="info__data-change @@isAdmin modalOpenJs" data-status-scroll="0">
								<svg>
									<use xlink:href="#pencil"></use>
								</svg>
								изменить
							</a>
						</div>
					</div>
				</div>
			`)
		})
	}
}

export default UserInfo;