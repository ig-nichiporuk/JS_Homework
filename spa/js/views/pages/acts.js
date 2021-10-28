import Component from "../../views/component.js";
import UserInfo from "../../views/partials/user-info.js";
import {getTokenFromCookies} from "../../helpers/utils.js";

class Acts extends Component{
	async render() {
		const page = await this.viewPage();
		const info = await this.viewUserInfo();
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
						<div class="controls">
							<div class="controls__item">
								<label>Год</label>
								<select class="select-style">
									<option value="">2018</option>
									<option value="">2019</option>
									<option value="">2020</option>
									<option value="">2021</option>
								</select>
							</div>
							<div class="controls__item">
								<input type="text" class="search input-style" placeholder="Поиск по номеру">
							</div>
						</div>
						<table class="table table_acts">
							<thead>
							<tr class="table__row">
								<th class="cell__act-month">
									<span>Месяц</span>
								</th>
								<th class="cell__act-num">
									<span>№&nbsp;документа</span>
								</th>
								<th class="cell__act-month-num">
									<span>Месяц</span>
									<span class="br"></span>
									<span>/&nbsp;№&nbsp;документа</span>
								</th>
								<th class="cell__act-sum">
									<span>Сумма, руб.</span>
								</th>
								<th class="cell__act-status">
									<span>Статус</span>
								</th>
								<th class="cell__act-print">
									<span>Печать</span>
								</th>
							</tr>
							</thead>
							<tbody>
							<tr class="table__row new">
								<td class="cell__act-month">
									<span>Апрель 2021</span>
								</td>
								<td class="cell__act-num">
									<a href="#" class="link link_blue">АС000002</a>
								</td>
								<td class="cell__act-month-num">
									<span>Апрель 2021</span>
									<a href="#" class="link link_blue">АС000002</a>
								</td>
								<td class="cell__act-sum">
									<span class="text_bold">1100,32</span>
								</td>
								<td class="cell__act-status">
									<span class="text_medium">Новый</span>
								</td>
								<td class="cell__act-print ${userToken == 'manager' ? 'edited' : ''}">
									<a href="#">
										<svg>
											<use xlink:href="#print"></use>
										</svg>
									</a>
									<a href="delete-act" class="delete-item ${userToken == 'user' ? 'hidden' : ''} modalOpenJs" data-status-scroll="0">
										<svg>
										    <use xlink:href="#close"></use>
										</svg>
									</a>
								</td>
							</tr>
							<tr class="table__row done">
								<td class="cell__act-month">
									<span>Апрель 2021</span>
								</td>
								<td class="cell__act-num">
									<a href="#" class="link link_blue">АС000002</a>
								</td>
								<td class="cell__act-month-num">
									<span>Апрель 2021</span>
									<a href="#" class="link link_blue">АС000002</a>
								</td>
								<td class="cell__act-sum">
									<span class="text_bold">1100,32</span>
								</td>
								<td class="cell__act-status">
									<span class="text_medium">Закрыт</span>
								</td>
								<td class="cell__act-print ${userToken == 'manager' ? 'edited' : ''}">
									<a href="#">
										<svg>
											<use xlink:href="#print"></use>
										</svg>
									</a>
									<a href="delete-act" class="delete-item ${userToken == 'user' ? 'hidden' : ''} modalOpenJs" data-status-scroll="0">
										<svg>
										    <use xlink:href="#close"></use>
										</svg>
									</a>
								</td>
							</tr>
							<tr class="table__row cancel">
								<td class="cell__act-month">
									<span>Апрель 2021</span>
								</td>
								<td class="cell__act-num">
									<a href="#" class="link link_blue">АС000002</a>
								</td>
								<td class="cell__act-month-num">
									<span>Апрель 2021</span>
									<a href="#" class="link link_blue">АС000002</a>
								</td>
								<td class="cell__act-sum">
									<span class="text_bold">1100,32</span>
								</td>
								<td class="cell__act-status">
									<span class="text_medium">Отменён</span>
								</td>
								<td class="cell__act-print ${userToken == 'manager' ? 'edited' : ''}">
									<a href="#">
										<svg>
											<use xlink:href="#print"></use>
										</svg>
									</a>
									<a href="delete-act" class="delete-item ${userToken == 'user' ? 'hidden' : ''} modalOpenJs" data-status-scroll="0">
										<svg>
										    <use xlink:href="#close"></use>
										</svg>
									</a>
								</td>
							</tr>
							</tbody>
						</table>
						
						<div class="modal-container ${userToken == 'user' ? 'hidden' : ''}">
							<div class="modal modal_info modalJs" id="delete-act">
								<div class="modal__header">
									Удаление акта <span class="br"></span> №&nbsp;АС000202
								</div>
								<div class="modal__main">
									<p>
										Выдействительно хотите удалить<span class="br"></span>
										 №&nbsp;АС000202?
									</p>
								</div>
								<div class="modal__footer">
									<span class="btn-style btn-style_gray modalCloseJs">Закрыть</span>
									<span class="btn-style btn-style_red">Удалить</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			`)}
		);
	}
}

export default Acts;