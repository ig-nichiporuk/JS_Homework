import Component from "../../views/component.js";
import UserInfo from "../../views/partials/user-info.js";
import {getTokenFromCookies} from "../../helpers/utils.js";

class Orders extends Component{
	async render() {
		const info = await this.viewUserInfo();
		const page = await this.viewPage();
		return info + page;
	}

	async viewUserInfo() {
		const userInfo = new UserInfo();
		return await userInfo.render();
	}

	viewPage() {
		const userToken = getTokenFromCookies();

		return new Promise(resolve => {
			resolve(`
				<div class="content">
					<div class="container">
						${userToken == 'manager' ? `
							<div class="controls controls_admin">
								<div class="controls__item">
									<div class="unp-wrap">
										<div>
											<label>УНП / Наименование</label>
											<input type="text" class="input-style">
										</div>
										<span class="btn-style btn-style_green">Показать</span>
									</div>
								</div>
								<div class="controls__item">
									<a href="services-prices" class="link_blue modalOpenJs">Справочник работ</a>
								</div>
							</div>
						` : ''}

						<div class="controls">
							<div class="controls__item">
								<label>Месяц</label>
								<select class="select-style">
									<option value="">Январь</option>
									<option value="">Февраль</option>
									<option value="">Март</option>
									<option value="">Апрель</option>
									<option value="">Май</option>
									<option value="">Июнь</option>
									<option value="">Июль</option>
									<option value="">Август</option>
									<option value="">Сентябрь</option>
									<option value="">Октябрь</option>
									<option value="">Ноябрь</option>
									<option value="">Декабрь</option>
								</select>
							</div>
							<div class="controls__item">
								<label>Сортировать</label>
								<select class="select-style">
									<option value="">По дате &#129045;</option>
									<option value="">По дате &#129047;</option>
									<option value="">Выполненные</option>
									<option value="">Новые</option>
								</select>
							</div>
							<div class="controls__item">
								<form class="search__form">
									<label class="search__label">
										<input type="text" class="search__input input-style" placeholder="Поиск по номеру">
										<span class="search__find">
											<svg>
												<use xlink:href="#magnifying"></use>
											</svg>
										</span>
									</label>
									<span class="search__reset">
										<svg>
											<use xlink:href="#close"></use>
										</svg>
									</span>
								</form>
							</div>
						</div>

						<table class="table table_orders">
							<thead>
							<tr class="table__row">
								<th class="cell__order-num">
									<span>Номер</span>
								</th>
								<th class="cell__order-type">
									<span>Тип</span>
								</th>
								<th class="cell__order-type_order-num">
									<span>Номер / Тип</span>
								</th>
								${userToken == 'manager' ? `<th class="cell__order-code"><span>Код</span></th>` : ''}
								<th class="cell__date-add">
									<span>Дата <span class="br"></span>создания</span>
								</th>
								<th class="cell__date-close">
									<span>Дата <span class="br"></span>закрытия</span>
								</th>
								<th class="cell__date-all">
									<span>Даты</span>
								</th>
								<th class="cell__user">
									<span>ФИО</span>
								</th>
								<th class="cell__auto">
									<span>Марка</span>
								</th>
								<th class="cell__user_auto">
									<span>ФИО / Марка</span>
								</th>
								<th class="cell__auto-num">
									<span>Рег. номер</span>
								</th>
								<th class="cell__price">
									<span>Сумма, руб.</span>
								</th>
								<th class="cell__status">
									<span>Статус</span>
								</th>
								<th class="cell__print">
									<span>Печать</span>
								</th>
								<th class="cell__status_print">
									<span>Статус / Печать</span>
								</th>
								<th class="cell-left">
									<span>Тип</span>
									<span>/&nbsp;Номер</span>
									${userToken == 'manager' ? `<span>/ Код</span>` : ''}
									<span>/&nbsp;ФИО</span>
									<span class="br"></span>
									<span>/&nbsp;Марка</span>
									<span>/&nbsp;Рег.&nbsp;номер</span>
								</th>
								<th class="cell-right">
									<span>Даты</span>
									<span>/&nbsp;Сумма</span>
									<span class="br"></span>
									<span>/&nbsp;Статус</span>
									<span>/&nbsp;Печать</span>
								</th>
							</tr>
							</thead>
							<tbody>
							<tr class="table__row new">
								<td class="cell__order-num">
									<a href="#" class="link link_blue">АС000002</a>
								</td>
								<td class="cell__order-type">
									<span>1</span>
								</td>
								<td class="cell__order-type_order-num">
									<span>1</span>
									<a href="#" class="link link_blue">АС000002</a>
								</td>
								${userToken == 'manager' ? `<td class="cell__order-code"><span>КС</span></td>` : ''}
								<td class="cell__date-add">
									<span>01.04.2021</span>
								</td>
								<td class="cell__date-close">
									<span>—</span>
								</td>
								<td class="cell__date-all">
									<span>01.04.2021</span>
									<span>-</span>
								</td>
								<td class="cell__user">
									<span>Глушинский А. Л.</span>
								</td>
								<td class="cell__auto">
									<span>Mercedes-maybach</span>
								</td>
								<td class="cell__user_auto">
									<span>Глушинский А. Л.</span>
									<span>Mercedes-maybach</span>
								</td>
								<td class="cell__auto-num">
									<span>2533 EX-6</span>
								</td>
								<td class="cell__price">
									<span class="text_bold">244,00</span>
								</td>
								<td class="cell__status">
									<span class="text text_medium">Новый</span>
								</td>
								<td class="cell__print">
									<a href="#">
										<svg>
											<use xlink:href="#print"></use>
										</svg>
									</a>
								</td>
								<td class="cell__status_print">
									<div class="status-print__wrap">
										<span class="text text_medium">Новый</span>
										<a href="#">
											<svg>
												<use xlink:href="#print"></use>
											</svg>
										</a>
									</div>
								</td>
								<td class="cell-left">
									<span>1 <a href="#" class="link link_blue">АС000002</a> ${userToken == 'manager' ? `<span>КС</span>` : ''}</span>
									<span>Глушинский А. Л.</span>
									<span>Mercedes-maybach</span>
									<span>2533 EX-6</span>
								</td>
								<td class="cell-right">
									<span>01.04.2021</span>
									<span>-</span>
									<span class="text_bold">244,00</span>
									<div class="status-print__wrap">
										<span class="text text_medium">Новый</span>
										<a href="#">
											<svg>
												<use xlink:href="#print"></use>
											</svg>
										</a>
									</div>
								</td>
							</tr>
							<tr class="table__row done">
								<td class="cell__order-num">
									<a href="#" class="link link_blue">АС000002</a>
								</td>
								<td class="cell__order-type">
									<span>2</span>
								</td>
								<td class="cell__order-type_order-num">
									<span>2</span>
									<a href="#" class="link link_blue">АС000002</a>
								</td>
								${userToken == 'manager' ? `<td class="cell__order-code"><span>БШ</span></td>` : ''}
								<td class="cell__date-add">
									<span>01.04.2021</span>
								</td>
								<td class="cell__date-close">
									<span>03.04.2021</span>
								</td>
								<td class="cell__date-all">
									<span>01.04.2021</span>
									<span>03.04.2021</span>
								</td>
								<td class="cell__user">
									<span>Соколовский В. Б.</span>
								</td>
								<td class="cell__auto">
									<span>Renault Samsung</span>
								</td>
								<td class="cell__user_auto">
									<span>Соколовский В. Б.</span>
									<span>Renault Samsung</span>
								</td>
								<td class="cell__auto-num">
									<span>2533 EX-6</span>
								</td>
								<td class="cell__price">
									<span class="text_bold">244,00</span>
								</td>
								<td class="cell__status">
									<span class="text text_medium">Выполнен</span>
								</td>
								<td class="cell__print">
									<a href="#">
										<svg>
											<use xlink:href="#print"></use>
										</svg>
									</a>
								</td>
								<td class="cell__status_print">
									<div class="status-print__wrap">
										<span class="text text_medium">Выполнен</span>
										<a href="#">
											<svg>
												<use xlink:href="#print"></use>
											</svg>
										</a>
									</div>
								</td>
								<td class="cell-left">
									<span>2 <a href="#" class="link link_blue">АС000002</a> ${userToken == 'manager' ? `<span>БШ</span>` : ''}</span>
									<span>Соколовский В. Б.</span>
									<span>Renault Samsung</span>
									<span>2533 EX-6</span>
								</td>
								<td class="cell-right">
									<span>01.04.2021</span>
									<span>03.04.2021</span>
									<span class="text_bold">244,00</span>
									<div class="status-print__wrap">
										<span class="text text_medium">Выполнен</span>
										<a href="#">
											<svg>
												<use xlink:href="#print"></use>
											</svg>
										</a>
									</div>
								</td>
							</tr>
							<tr class="table__row cancel">
								<td class="cell__order-num">
									<a href="#" class="link link_blue">АС000002</a>
								</td>
								<td class="cell__order-type">
									<span>2</span>
								</td>
								<td class="cell__order-type_order-num">
									<span>2</span>
									<a href="#" class="link link_blue">АС000002</a>
								</td>
								${userToken == 'manager' ? `<td class="cell__order-code"><span>КС</span></td>` : ''}
								<td class="cell__date-add">
									<span>01.04.2021</span>
								</td>
								<td class="cell__date-close">
									<span>03.04.2021</span>
								</td>
								<td class="cell__date-all">
									<span>01.04.2021</span>
									<span>03.04.2021</span>
								</td>
								<td class="cell__user">
									<span>Соколовский В. Б.</span>
								</td>
								<td class="cell__auto">
									<span>Renault Samsung</span>
								</td>
								<td class="cell__user_auto">
									<span>Соколовский В. Б.</span>
									<span>Renault Samsung</span>
								</td>
								<td class="cell__auto-num">
									<span>2533 EX-6</span>
								</td>
								<td class="cell__price">
									<span class="text_bold">244,00</span>
								</td>
								<td class="cell__status">
									<span class="text text_medium">Отменен</span>
								</td>
								<td class="cell__print">
									<a href="#">
										<svg>
											<use xlink:href="#print"></use>
										</svg>
									</a>
								</td>
								<td class="cell__status_print">
									<div class="status-print__wrap">
										<span class="text text_medium">Отменен</span>
										<a href="#">
											<svg>
												<use xlink:href="#print"></use>
											</svg>
										</a>
									</div>
								</td>
								<td class="cell-left">
									<span>2 <a href="#" class="link link_blue">АС000002</a> ${userToken == 'manager' ? `<span>БШ</span>` : ''}</span>
									<span>Соколовский В. Б.</span>
									<span>Renault Samsung</span>
									<span>2533 EX-6</span>
								</td>
								<td class="cell-right">
									<span>01.04.2021</span>
									<span>03.04.2021</span>
									<span class="text_bold">244,00</span>
									<div class="status-print__wrap">
										<span class="text text_medium">Отменен</span>
										<a href="#">
											<svg>
												<use xlink:href="#print"></use>
											</svg>
										</a>
									</div>
								</td>
							</tr>

							<tr class="table__row new">
								<td class="cell__order-num">
									<a href="#" class="link link_blue">АС000002</a>
								</td>
								<td class="cell__order-type">
									<span>1</span>
								</td>
								<td class="cell__order-type_order-num">
									<span>1</span>
									<a href="#" class="link link_blue">АС000002</a>
								</td>
								${userToken == 'manager' ? `<td class="cell__order-code"><span>КС</span></td>` : ''}
								<td class="cell__date-add">
									<span>01.04.2021</span>
								</td>
								<td class="cell__date-close">
									<span>—</span>
								</td>
								<td class="cell__date-all">
									<span>01.04.2021</span>
									<span>-</span>
								</td>
								<td class="cell__user">
									<span>Глушинский А. Л.</span>
								</td>
								<td class="cell__auto">
									<span>Mercedes-maybach</span>
								</td>
								<td class="cell__user_auto">
									<span>Глушинский А. Л.</span>
									<span>Mercedes-maybach</span>
								</td>
								<td class="cell__auto-num">
									<span>2533 EX-6</span>
								</td>
								<td class="cell__price">
									<span class="text_bold">244,00</span>
								</td>
								<td class="cell__status">
									<span class="text text_medium">Новый</span>
								</td>
								<td class="cell__print">
									<a href="#">
										<svg>
											<use xlink:href="#print"></use>
										</svg>
									</a>
								</td>
								<td class="cell__status_print">
									<div class="status-print__wrap">
										<span class="text text_medium">Новый</span>
										<a href="#">
											<svg>
												<use xlink:href="#print"></use>
											</svg>
										</a>
									</div>
								</td>
								<td class="cell-left">
									<span>1 <a href="#" class="link link_blue">АС000002</a> ${userToken == 'manager' ? `<span>КС</span>` : ''}</span>
									<span>Глушинский А. Л.</span>
									<span>Mercedes-maybach</span>
									<span>2533 EX-6</span>
								</td>
								<td class="cell-right">
									<span>01.04.2021</span>
									<span>-</span>
									<span class="text_bold">244,00</span>
									<div class="status-print__wrap">
										<span class="text text_medium">Новый</span>
										<a href="#">
											<svg>
												<use xlink:href="#print"></use>
											</svg>
										</a>
									</div>
								</td>
							</tr>
							<tr class="table__row done">
								<td class="cell__order-num">
									<a href="#" class="link link_blue">АС000002</a>
								</td>
								<td class="cell__order-type">
									<span>2</span>
								</td>
								<td class="cell__order-type_order-num">
									<span>2</span>
									<a href="#" class="link link_blue">АС000002</a>
								</td>
								${userToken == 'manager' ? `<td class="cell__order-code"><span>БШ</span></td>` : ''}
								<td class="cell__date-add">
									<span>01.04.2021</span>
								</td>
								<td class="cell__date-close">
									<span>03.04.2021</span>
								</td>
								<td class="cell__date-all">
									<span>01.04.2021</span>
									<span>03.04.2021</span>
								</td>
								<td class="cell__user">
									<span>Соколовский В. Б.</span>
								</td>
								<td class="cell__auto">
									<span>Renault Samsung</span>
								</td>
								<td class="cell__user_auto">
									<span>Соколовский В. Б.</span>
									<span>Renault Samsung</span>
								</td>
								<td class="cell__auto-num">
									<span>2533 EX-6</span>
								</td>
								<td class="cell__price">
									<span class="text_bold">244,00</span>
								</td>
								<td class="cell__status">
									<span class="text text_medium">Выполнен</span>
								</td>
								<td class="cell__print">
									<a href="#">
										<svg>
											<use xlink:href="#print"></use>
										</svg>
									</a>
								</td>
								<td class="cell__status_print">
									<div class="status-print__wrap">
										<span class="text text_medium">Выполнен</span>
										<a href="#">
											<svg>
												<use xlink:href="#print"></use>
											</svg>
										</a>
									</div>
								</td>
								<td class="cell-left">
									<span>2 <a href="#" class="link link_blue">АС000002</a> ${userToken == 'manager' ? `<span>БШ</span>` : ''}</span>
									<span>Соколовский В. Б.</span>
									<span>Renault Samsung</span>
									<span>2533 EX-6</span>
								</td>
								<td class="cell-right">
									<span>01.04.2021</span>
									<span>03.04.2021</span>
									<span class="text_bold">244,00</span>
									<div class="status-print__wrap">
										<span class="text text_medium">Выполнен</span>
										<a href="#">
											<svg>
												<use xlink:href="#print"></use>
											</svg>
										</a>
									</div>
								</td>
							</tr>
							<tr class="table__row cancel">
								<td class="cell__order-num">
									<a href="#" class="link link_blue">АС000002</a>
								</td>
								<td class="cell__order-type">
									<span>2</span>
								</td>
								<td class="cell__order-type_order-num">
									<span>2</span>
									<a href="#" class="link link_blue">АС000002</a>
								</td>
								${userToken == 'manager' ? `<td class="cell__order-code"><span>КС</span></td>` : ''}
								<td class="cell__date-add">
									<span>01.04.2021</span>
								</td>
								<td class="cell__date-close">
									<span>03.04.2021</span>
								</td>
								<td class="cell__date-all">
									<span>01.04.2021</span>
									<span>03.04.2021</span>
								</td>
								<td class="cell__user">
									<span>Соколовский В. Б.</span>
								</td>
								<td class="cell__auto">
									<span>Renault Samsung</span>
								</td>
								<td class="cell__user_auto">
									<span>Соколовский В. Б.</span>
									<span>Renault Samsung</span>
								</td>
								<td class="cell__auto-num">
									<span>2533 EX-6</span>
								</td>
								<td class="cell__price">
									<span class="text_bold">244,00</span>
								</td>
								<td class="cell__status">
									<span class="text text_medium">Отменен</span>
								</td>
								<td class="cell__print">
									<a href="#">
										<svg>
											<use xlink:href="#print"></use>
										</svg>
									</a>
								</td>
								<td class="cell__status_print">
									<div class="status-print__wrap">
										<span class="text text_medium">Отменен</span>
										<a href="#">
											<svg>
												<use xlink:href="#print"></use>
											</svg>
										</a>
									</div>
								</td>
								<td class="cell-left">
									<span>2 <a href="#" class="link link_blue">АС000002</a> ${userToken == 'manager' ? `<span>БШ</span>` : ''}</span>
									<span>Соколовский В. Б.</span>
									<span>Renault Samsung</span>
									<span>2533 EX-6</span>
								</td>
								<td class="cell-right">
									<span>01.04.2021</span>
									<span>03.04.2021</span>
									<span class="text_bold">244,00</span>
									<div class="status-print__wrap">
										<span class="text text_medium">Отменен</span>
										<a href="#">
											<svg>
												<use xlink:href="#print"></use>
											</svg>
										</a>
									</div>
								</td>
							</tr>
							<tr class="table__row new">
								<td class="cell__order-num">
									<a href="#" class="link link_blue">АС000002</a>
								</td>
								<td class="cell__order-type">
									<span>1</span>
								</td>
								<td class="cell__order-type_order-num">
									<span>1</span>
									<a href="#" class="link link_blue">АС000002</a>
								</td>
								${userToken == 'manager' ? `<td class="cell__order-code"><span>КС</span></td>` : ''}
								<td class="cell__date-add">
									<span>01.04.2021</span>
								</td>
								<td class="cell__date-close">
									<span>—</span>
								</td>
								<td class="cell__date-all">
									<span>01.04.2021</span>
									<span>-</span>
								</td>
								<td class="cell__user">
									<span>Глушинский А. Л.</span>
								</td>
								<td class="cell__auto">
									<span>Mercedes-maybach</span>
								</td>
								<td class="cell__user_auto">
									<span>Глушинский А. Л.</span>
									<span>Mercedes-maybach</span>
								</td>
								<td class="cell__auto-num">
									<span>2533 EX-6</span>
								</td>
								<td class="cell__price">
									<span class="text_bold">244,00</span>
								</td>
								<td class="cell__status">
									<span class="text text_medium">Новый</span>
								</td>
								<td class="cell__print">
									<a href="#">
										<svg>
											<use xlink:href="#print"></use>
										</svg>
									</a>
								</td>
								<td class="cell__status_print">
									<div class="status-print__wrap">
										<span class="text text_medium">Новый</span>
										<a href="#">
											<svg>
												<use xlink:href="#print"></use>
											</svg>
										</a>
									</div>
								</td>
								<td class="cell-left">
									<span>1 <a href="#" class="link link_blue">АС000002</a> ${userToken == 'manager' ? `<span>КС</span>` : ''}</span>
									<span>Глушинский А. Л.</span>
									<span>Mercedes-maybach</span>
									<span>2533 EX-6</span>
								</td>
								<td class="cell-right">
									<span>01.04.2021</span>
									<span>-</span>
									<span class="text_bold">244,00</span>
									<div class="status-print__wrap">
										<span class="text text_medium">Новый</span>
										<a href="#">
											<svg>
												<use xlink:href="#print"></use>
											</svg>
										</a>
									</div>
								</td>
							</tr>
							<tr class="table__row done">
								<td class="cell__order-num">
									<a href="#" class="link link_blue">АС000002</a>
								</td>
								<td class="cell__order-type">
									<span>2</span>
								</td>
								<td class="cell__order-type_order-num">
									<span>2</span>
									<a href="#" class="link link_blue">АС000002</a>
								</td>
								${userToken == 'manager' ? `<td class="cell__order-code"><span>БШ</span></td>` : ''}
								<td class="cell__date-add">
									<span>01.04.2021</span>
								</td>
								<td class="cell__date-close">
									<span>03.04.2021</span>
								</td>
								<td class="cell__date-all">
									<span>01.04.2021</span>
									<span>03.04.2021</span>
								</td>
								<td class="cell__user">
									<span>Соколовский В. Б.</span>
								</td>
								<td class="cell__auto">
									<span>Renault Samsung</span>
								</td>
								<td class="cell__user_auto">
									<span>Соколовский В. Б.</span>
									<span>Renault Samsung</span>
								</td>
								<td class="cell__auto-num">
									<span>2533 EX-6</span>
								</td>
								<td class="cell__price">
									<span class="text_bold">244,00</span>
								</td>
								<td class="cell__status">
									<span class="text text_medium">Выполнен</span>
								</td>
								<td class="cell__print">
									<a href="#">
										<svg>
											<use xlink:href="#print"></use>
										</svg>
									</a>
								</td>
								<td class="cell__status_print">
									<div class="status-print__wrap">
										<span class="text text_medium">Выполнен</span>
										<a href="#">
											<svg>
												<use xlink:href="#print"></use>
											</svg>
										</a>
									</div>
								</td>
								<td class="cell-left">
									<span>2 <a href="#" class="link link_blue">АС000002</a> ${userToken == 'manager' ? `<span>БШ</span>` : ''}</span>
									<span>Соколовский В. Б.</span>
									<span>Renault Samsung</span>
									<span>2533 EX-6</span>
								</td>
								<td class="cell-right">
									<span>01.04.2021</span>
									<span>03.04.2021</span>
									<span class="text_bold">244,00</span>
									<div class="status-print__wrap">
										<span class="text text_medium">Выполнен</span>
										<a href="#">
											<svg>
												<use xlink:href="#print"></use>
											</svg>
										</a>
									</div>
								</td>
							</tr>
							<tr class="table__row cancel">
								<td class="cell__order-num">
									<a href="#" class="link link_blue">АС000002</a>
								</td>
								<td class="cell__order-type">
									<span>2</span>
								</td>
								<td class="cell__order-type_order-num">
									<span>2</span>
									<a href="#" class="link link_blue">АС000002</a>
								</td>
								${userToken == 'manager' ? `<td class="cell__order-code"><span>КС</span></td>` : ''}
								<td class="cell__date-add">
									<span>01.04.2021</span>
								</td>
								<td class="cell__date-close">
									<span>03.04.2021</span>
								</td>
								<td class="cell__date-all">
									<span>01.04.2021</span>
									<span>03.04.2021</span>
								</td>
								<td class="cell__user">
									<span>Соколовский В. Б.</span>
								</td>
								<td class="cell__auto">
									<span>Renault Samsung</span>
								</td>
								<td class="cell__user_auto">
									<span>Соколовский В. Б.</span>
									<span>Renault Samsung</span>
								</td>
								<td class="cell__auto-num">
									<span>2533 EX-6</span>
								</td>
								<td class="cell__price">
									<span class="text_bold">244,00</span>
								</td>
								<td class="cell__status">
									<span class="text text_medium">Отменен</span>
								</td>
								<td class="cell__print">
									<a href="#">
										<svg>
											<use xlink:href="#print"></use>
										</svg>
									</a>
								</td>
								<td class="cell__status_print">
									<div class="status-print__wrap">
										<span class="text text_medium">Отменен</span>
										<a href="#">
											<svg>
												<use xlink:href="#print"></use>
											</svg>
										</a>
									</div>
								</td>
								<td class="cell-left">
									<span>2 <a href="#" class="link link_blue">АС000002</a> ${userToken == 'manager' ? `<span>БШ</span>` : ''}</span>
									<span>Соколовский В. Б.</span>
									<span>Renault Samsung</span>
									<span>2533 EX-6</span>
								</td>
								<td class="cell-right">
									<span>01.04.2021</span>
									<span>03.04.2021</span>
									<span class="text_bold">244,00</span>
									<div class="status-print__wrap">
										<span class="text text_medium">Отменен</span>
										<a href="#">
											<svg>
												<use xlink:href="#print"></use>
											</svg>
										</a>
									</div>
								</td>
							</tr>
							<tr class="table__row new">
								<td class="cell__order-num">
									<a href="#" class="link link_blue">АС000002</a>
								</td>
								<td class="cell__order-type">
									<span>1</span>
								</td>
								<td class="cell__order-type_order-num">
									<span>1</span>
									<a href="#" class="link link_blue">АС000002</a>
								</td>
								${userToken == 'manager' ? `<td class="cell__order-code"><span>КС</span></td>` : ''}
								<td class="cell__date-add">
									<span>01.04.2021</span>
								</td>
								<td class="cell__date-close">
									<span>—</span>
								</td>
								<td class="cell__date-all">
									<span>01.04.2021</span>
									<span>-</span>
								</td>
								<td class="cell__user">
									<span>Глушинский А. Л.</span>
								</td>
								<td class="cell__auto">
									<span>Mercedes-maybach</span>
								</td>
								<td class="cell__user_auto">
									<span>Глушинский А. Л.</span>
									<span>Mercedes-maybach</span>
								</td>
								<td class="cell__auto-num">
									<span>2533 EX-6</span>
								</td>
								<td class="cell__price">
									<span class="text_bold">244,00</span>
								</td>
								<td class="cell__status">
									<span class="text text_medium">Новый</span>
								</td>
								<td class="cell__print">
									<a href="#">
										<svg>
											<use xlink:href="#print"></use>
										</svg>
									</a>
								</td>
								<td class="cell__status_print">
									<div class="status-print__wrap">
										<span class="text text_medium">Новый</span>
										<a href="#">
											<svg>
												<use xlink:href="#print"></use>
											</svg>
										</a>
									</div>
								</td>
								<td class="cell-left">
									<span>1 <a href="#" class="link link_blue">АС000002</a> ${userToken == 'manager' ? `<span>КС</span>` : ''}</span>
									<span>Глушинский А. Л.</span>
									<span>Mercedes-maybach</span>
									<span>2533 EX-6</span>
								</td>
								<td class="cell-right">
									<span>01.04.2021</span>
									<span>-</span>
									<span class="text_bold">244,00</span>
									<div class="status-print__wrap">
										<span class="text text_medium">Новый</span>
										<a href="#">
											<svg>
												<use xlink:href="#print"></use>
											</svg>
										</a>
									</div>
								</td>
							</tr>
							<tr class="table__row done">
								<td class="cell__order-num">
									<a href="#" class="link link_blue">АС000002</a>
								</td>
								<td class="cell__order-type">
									<span>2</span>
								</td>
								<td class="cell__order-type_order-num">
									<span>2</span>
									<a href="#" class="link link_blue">АС000002</a>
								</td>
								${userToken == 'manager' ? `<td class="cell__order-code"><span>БШ</span></td>` : ''}
								<td class="cell__date-add">
									<span>01.04.2021</span>
								</td>
								<td class="cell__date-close">
									<span>03.04.2021</span>
								</td>
								<td class="cell__date-all">
									<span>01.04.2021</span>
									<span>03.04.2021</span>
								</td>
								<td class="cell__user">
									<span>Соколовский В. Б.</span>
								</td>
								<td class="cell__auto">
									<span>Renault Samsung</span>
								</td>
								<td class="cell__user_auto">
									<span>Соколовский В. Б.</span>
									<span>Renault Samsung</span>
								</td>
								<td class="cell__auto-num">
									<span>2533 EX-6</span>
								</td>
								<td class="cell__price">
									<span class="text_bold">244,00</span>
								</td>
								<td class="cell__status">
									<span class="text text_medium">Выполнен</span>
								</td>
								<td class="cell__print">
									<a href="#">
										<svg>
											<use xlink:href="#print"></use>
										</svg>
									</a>
								</td>
								<td class="cell__status_print">
									<div class="status-print__wrap">
										<span class="text text_medium">Выполнен</span>
										<a href="#">
											<svg>
												<use xlink:href="#print"></use>
											</svg>
										</a>
									</div>
								</td>
								<td class="cell-left">
									<span>2 <a href="#" class="link link_blue">АС000002</a> ${userToken == 'manager' ? `<span>БШ</span>` : ''}</span>
									<span>Соколовский В. Б.</span>
									<span>Renault Samsung</span>
									<span>2533 EX-6</span>
								</td>
								<td class="cell-right">
									<span>01.04.2021</span>
									<span>03.04.2021</span>
									<span class="text_bold">244,00</span>
									<div class="status-print__wrap">
										<span class="text text_medium">Выполнен</span>
										<a href="#">
											<svg>
												<use xlink:href="#print"></use>
											</svg>
										</a>
									</div>
								</td>
							</tr>
							<tr class="table__row cancel">
								<td class="cell__order-num">
									<a href="#" class="link link_blue">АС000002</a>
								</td>
								<td class="cell__order-type">
									<span>2</span>
								</td>
								<td class="cell__order-type_order-num">
									<span>2</span>
									<a href="#" class="link link_blue">АС000002</a>
								</td>
								${userToken == 'manager' ? `<td class="cell__order-code"><span>КС</span></td>` : ''}
								<td class="cell__date-add">
									<span>01.04.2021</span>
								</td>
								<td class="cell__date-close">
									<span>03.04.2021</span>
								</td>
								<td class="cell__date-all">
									<span>01.04.2021</span>
									<span>03.04.2021</span>
								</td>
								<td class="cell__user">
									<span>Соколовский В. Б.</span>
								</td>
								<td class="cell__auto">
									<span>Renault Samsung</span>
								</td>
								<td class="cell__user_auto">
									<span>Соколовский В. Б.</span>
									<span>Renault Samsung</span>
								</td>
								<td class="cell__auto-num">
									<span>2533 EX-6</span>
								</td>
								<td class="cell__price">
									<span class="text_bold">244,00</span>
								</td>
								<td class="cell__status">
									<span class="text text_medium">Отменен</span>
								</td>
								<td class="cell__print">
									<a href="#">
										<svg>
											<use xlink:href="#print"></use>
										</svg>
									</a>
								</td>
								<td class="cell__status_print">
									<div class="status-print__wrap">
										<span class="text text_medium">Отменен</span>
										<a href="#">
											<svg>
												<use xlink:href="#print"></use>
											</svg>
										</a>
									</div>
								</td>
								<td class="cell-left">
									<span>2 <a href="#" class="link link_blue">АС000002</a> ${userToken == 'manager' ? `<span>БШ</span>` : ''}</span>
									<span>Соколовский В. Б.</span>
									<span>Renault Samsung</span>
									<span>2533 EX-6</span>
								</td>
								<td class="cell-right">
									<span>01.04.2021</span>
									<span>03.04.2021</span>
									<span class="text_bold">244,00</span>
									<div class="status-print__wrap">
										<span class="text text_medium">Отменен</span>
										<a href="#">
											<svg>
												<use xlink:href="#print"></use>
											</svg>
										</a>
									</div>
								</td>
							</tr>
							<tr class="table__row new">
								<td class="cell__order-num">
									<a href="#" class="link link_blue">АС000002</a>
								</td>
								<td class="cell__order-type">
									<span>1</span>
								</td>
								<td class="cell__order-type_order-num">
									<span>1</span>
									<a href="#" class="link link_blue">АС000002</a>
								</td>
								${userToken == 'manager' ? `<td class="cell__order-code"><span>КС</span></td>` : ''}
								<td class="cell__date-add">
									<span>01.04.2021</span>
								</td>
								<td class="cell__date-close">
									<span>—</span>
								</td>
								<td class="cell__date-all">
									<span>01.04.2021</span>
									<span>-</span>
								</td>
								<td class="cell__user">
									<span>Глушинский А. Л.</span>
								</td>
								<td class="cell__auto">
									<span>Mercedes-maybach</span>
								</td>
								<td class="cell__user_auto">
									<span>Глушинский А. Л.</span>
									<span>Mercedes-maybach</span>
								</td>
								<td class="cell__auto-num">
									<span>2533 EX-6</span>
								</td>
								<td class="cell__price">
									<span class="text_bold">244,00</span>
								</td>
								<td class="cell__status">
									<span class="text text_medium">Новый</span>
								</td>
								<td class="cell__print">
									<a href="#">
										<svg>
											<use xlink:href="#print"></use>
										</svg>
									</a>
								</td>
								<td class="cell__status_print">
									<div class="status-print__wrap">
										<span class="text text_medium">Новый</span>
										<a href="#">
											<svg>
												<use xlink:href="#print"></use>
											</svg>
										</a>
									</div>
								</td>
								<td class="cell-left">
									<span>1 <a href="#" class="link link_blue">АС000002</a> ${userToken == 'manager' ? `<span>КС</span>` : ''}</span>
									<span>Глушинский А. Л.</span>
									<span>Mercedes-maybach</span>
									<span>2533 EX-6</span>
								</td>
								<td class="cell-right">
									<span>01.04.2021</span>
									<span>-</span>
									<span class="text_bold">244,00</span>
									<div class="status-print__wrap">
										<span class="text text_medium">Новый</span>
										<a href="#">
											<svg>
												<use xlink:href="#print"></use>
											</svg>
										</a>
									</div>
								</td>
							</tr>
							<tr class="table__row done">
								<td class="cell__order-num">
									<a href="#" class="link link_blue">АС000002</a>
								</td>
								<td class="cell__order-type">
									<span>2</span>
								</td>
								<td class="cell__order-type_order-num">
									<span>2</span>
									<a href="#" class="link link_blue">АС000002</a>
								</td>
								${userToken == 'manager' ? `<td class="cell__order-code"><span>БШ</span></td>` : ''}
								<td class="cell__date-add">
									<span>01.04.2021</span>
								</td>
								<td class="cell__date-close">
									<span>03.04.2021</span>
								</td>
								<td class="cell__date-all">
									<span>01.04.2021</span>
									<span>03.04.2021</span>
								</td>
								<td class="cell__user">
									<span>Соколовский В. Б.</span>
								</td>
								<td class="cell__auto">
									<span>Renault Samsung</span>
								</td>
								<td class="cell__user_auto">
									<span>Соколовский В. Б.</span>
									<span>Renault Samsung</span>
								</td>
								<td class="cell__auto-num">
									<span>2533 EX-6</span>
								</td>
								<td class="cell__price">
									<span class="text_bold">244,00</span>
								</td>
								<td class="cell__status">
									<span class="text text_medium">Выполнен</span>
								</td>
								<td class="cell__print">
									<a href="#">
										<svg>
											<use xlink:href="#print"></use>
										</svg>
									</a>
								</td>
								<td class="cell__status_print">
									<div class="status-print__wrap">
										<span class="text text_medium">Выполнен</span>
										<a href="#">
											<svg>
												<use xlink:href="#print"></use>
											</svg>
										</a>
									</div>
								</td>
								<td class="cell-left">
									<span>2 <a href="#" class="link link_blue">АС000002</a> ${userToken == 'manager' ? `<span>БШ</span>` : ''}</span>
									<span>Соколовский В. Б.</span>
									<span>Renault Samsung</span>
									<span>2533 EX-6</span>
								</td>
								<td class="cell-right">
									<span>01.04.2021</span>
									<span>03.04.2021</span>
									<span class="text_bold">244,00</span>
									<div class="status-print__wrap">
										<span class="text text_medium">Выполнен</span>
										<a href="#">
											<svg>
												<use xlink:href="#print"></use>
											</svg>
										</a>
									</div>
								</td>
							</tr>
							<tr class="table__row cancel">
								<td class="cell__order-num">
									<a href="#" class="link link_blue">АС000002</a>
								</td>
								<td class="cell__order-type">
									<span>2</span>
								</td>
								<td class="cell__order-type_order-num">
									<span>2</span>
									<a href="#" class="link link_blue">АС000002</a>
								</td>
								${userToken == 'manager' ? `<td class="cell__order-code"><span>КС</span></td>` : ''}
								<td class="cell__date-add">
									<span>01.04.2021</span>
								</td>
								<td class="cell__date-close">
									<span>03.04.2021</span>
								</td>
								<td class="cell__date-all">
									<span>01.04.2021</span>
									<span>03.04.2021</span>
								</td>
								<td class="cell__user">
									<span>Соколовский В. Б.</span>
								</td>
								<td class="cell__auto">
									<span>Renault Samsung</span>
								</td>
								<td class="cell__user_auto">
									<span>Соколовский В. Б.</span>
									<span>Renault Samsung</span>
								</td>
								<td class="cell__auto-num">
									<span>2533 EX-6</span>
								</td>
								<td class="cell__price">
									<span class="text_bold">244,00</span>
								</td>
								<td class="cell__status">
									<span class="text text_medium">Отменен</span>
								</td>
								<td class="cell__print">
									<a href="#">
										<svg>
											<use xlink:href="#print"></use>
										</svg>
									</a>
								</td>
								<td class="cell__status_print">
									<div class="status-print__wrap">
										<span class="text text_medium">Отменен</span>
										<a href="#">
											<svg>
												<use xlink:href="#print"></use>
											</svg>
										</a>
									</div>
								</td>
								<td class="cell-left">
									<span>2 <a href="#" class="link link_blue">АС000002</a> ${userToken == 'manager' ? `<span>БШ</span>` : ''}</span>
									<span>Соколовский В. Б.</span>
									<span>Renault Samsung</span>
									<span>2533 EX-6</span>
								</td>
								<td class="cell-right">
									<span>01.04.2021</span>
									<span>03.04.2021</span>
									<span class="text_bold">244,00</span>
									<div class="status-print__wrap">
										<span class="text text_medium">Отменен</span>
										<a href="#">
											<svg>
												<use xlink:href="#print"></use>
											</svg>
										</a>
									</div>
								</td>
							</tr>
							</tbody>
						</table>


					</div>
				</div>
				${userToken == 'manager' ? `
				<div class="modal-container">
					<div class="modal modalJs modal_prices" id="services-prices">
						<div class="modal__header">
							Справочник работ - от&nbsp;14.07.2021
							<span class="modal__close modalCloseJs"></span>
						</div>
						<div class="modal__main">
							<table class="table table_service">
								<thead>
								<tr class="table__row">
									<th class="cell__service-index">
										<span>№</span><span> п/п</span>
									</th>
									<th class="cell__service-work">
										<span>Наименование работ</span>
									</th>
									<th class="cell__service-price">
										<span>
											Стоимость,<span class="br"></span>
											без НДС, руб.
										</span>
									</th>
								</tr>
								</thead>
								<tbody>
								<tr class="table__row">
									<td class="cell__service-index">
										<span>1</span>
									</td>
									<td class="cell__service-work">
										<p>Комплексное обслуживание колеса (снятие/установка, монтаж/демонтаж, балансировка) до 16"</p>
									</td>
									<td class="cell__service-price">
										<span class="text_bold">46,00</span>
									</td>
								</tr>
								<tr class="table__row">
									<td class="cell__service-index">
										<span>2</span>
									</td>
									<td class="cell__service-work">
										<p>Комплексное обслуживание колеса (снятие/установка, монтаж/демонтаж, балансировка)  17" и более</p>
									</td>
									<td class="cell__service-price">
										<span class="text_bold">46,00</span>
									</td>
								</tr>
								<tr class="table__row">
									<td class="cell__service-index">
										<span>3</span>
									</td>
									<td class="cell__service-work">
										<p>Балансировка колеса (снятие/установка, балансировка) стальной диск</p>
									</td>
									<td class="cell__service-price">
										<span class="text_bold">46,00</span>
									</td>
								</tr>
								<tr class="table__row">
									<td class="cell__service-index">
										<span>4</span>
									</td>
									<td class="cell__service-work">
										<p>Ремонт шины с горячей вулканизацией</p>
									</td>
									<td class="cell__service-price">
										<span class="text_bold">46,00</span>
									</td>
								</tr>
								<tr class="table__row">
									<td class="cell__service-index">
										<span>5</span>
									</td>
									<td class="cell__service-work">
										<p>Ремонт шины (пластырь)</p>
									</td>
									<td class="cell__service-price">
										<span class="text_bold">46,00</span>
									</td>
								</tr>
								<tr class="table__row">
									<td class="cell__service-index">
										<span>6</span>
									</td>
									<td class="cell__service-work">
										<p>Ремонт прокола шины (грибок, универсальная латка)</p>
									</td>
									<td class="cell__service-price">
										<span class="text_bold">46,00</span>
									</td>
								</tr>
								<tr class="table__row">
									<td class="cell__service-index">
										<span>7</span>
									</td>
									<td class="cell__service-work">
										<p>Комплексное обслуживание колеса с вентилем (снятие/установка, монтаж/демонтаж, балансировка) до 16"</p>
									</td>
									<td class="cell__service-price">
										<span class="text_bold">46,00</span>
									</td>
								</tr>
								<tr class="table__row">
									<td class="cell__service-index">
										<span>8</span>
									</td>
									<td class="cell__service-work">
										<p>Комплексное обслуживание колеса с вентилем (снятие/установка, монтаж/демонтаж, балансировка)  17" и более</p>
									</td>
									<td class="cell__service-price">
										<span class="text_bold">46,00</span>
									</td>
								</tr>
								<tr class="table__row">
									<td class="cell__service-index">
										<span>9</span>
									</td>
									<td class="cell__service-work">
										<p>Балансировка</p>
									</td>
									<td class="cell__service-price">
										<span class="text_bold">46,00</span>
									</td>
								</tr>
								<tr class="table__row">
									<td class="cell__service-index">
										<span>10</span>
									</td>
									<td class="cell__service-work">
										<p>Cнятие/установка</p>
									</td>
									<td class="cell__service-price">
										<span class="text_bold">46,00</span>
									</td>
								</tr>
								<tr class="table__row">
									<td class="cell__service-index">
										<span>11</span>
									</td>
									<td class="cell__service-work">
										<p>Демонтаж/монтаж</p>
									</td>
									<td class="cell__service-price">
										<span class="text_bold">46,00</span>
									</td>
								</tr>
								</tbody>
							</table>
							<div class="services-list__btn">
								<span class="btn-style btn-style_blue btn-style_svg modalCloseJs">
									<span>
										<svg>
										    <use xlink:href="#print"></use>
										</svg>
										Печать
									</span>
								</span>
							</div>
						</div>
					</div>
				</div>
				` : ''}
			`)}
		);
	}
}

export default Orders
