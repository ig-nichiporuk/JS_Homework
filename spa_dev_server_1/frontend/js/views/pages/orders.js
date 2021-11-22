import {checkUser, formatOrders, hideL, showInfoModal, showL} from '../../helpers/utils';

import Component from '../../views/component';

import OrdersTemplate from '../../../templates/pages/orders.hbs';

import OrdersTableTemplate from '../../../templates/pages/orders/ordersTable.hbs';


import Orders from '../../models/orders';

class OrdersList extends Component {
	constructor() {
		super();

		this.model = new Orders();
	}

	async getData() {
		try {
			return formatOrders(await this.model.getOrdersList(checkUser().token));
		} catch {
			hideL();

			showInfoModal('alert-modal', 'alert', {
				title : 'Ошибка!',
				message : 'Не удалось получить список заказов!'
			});
		}
	}

	async getServices() {
		try {
			return await this.model.getServicesList();
		} catch {
			hideL();

			showInfoModal('alert-modal', 'alert', {
				title : 'Ошибка!',
				message : 'Не удалось получить справочник услуг!'
			});
		}
	}

	async getSortOrdersList(unp, sortOptions, token) {
		try {
			return formatOrders(await this.model.getSortOrdersList(unp,sortOptions, token));
		} catch (e) {
			hideL();

			showInfoModal('alert-modal', 'alert', {
				title : 'Ошибка!',
				message : 'Не удалось отсортировать заказ-наряды!'
			});
			throw new Error (e);
		}

	}

	async getOrderByNum(num, sortSelect, token) {
		const val = num.value.trim().toUpperCase();
		try {
			return formatOrders([await this.model.getOrderByNum(val, token)]);
		} catch {
			hideL();

			showInfoModal('alert-modal', 'alert', {
				title : 'Ошибка!',
				message : 'Не удалось получить заказ-наряд!'
			});

			sortSelect.disabled = false;
			num.value = '';
		}
	}

	async getOrderByUnp(unp, sortSelect, token) {
		const val = unp.value.trim();
		try {
			return formatOrders(await this.model.getOrderByUnp(val, token));
		} catch {
			hideL();

			showInfoModal('alert-modal', 'alert', {
				title : 'Ошибка!',
				message : 'Не удалось получить заказ-наряд!'
			});

			sortSelect.disabled = false;
			unp.value = '';
		}
	}

	async render(orders) {
		const request = this.request,
			auth = checkUser();

		return OrdersTemplate({orders, request, auth});
	}

	afterRender() {
		super.afterRender();
		this.setActions();
	}

	setActions() {
		const openTaskModal = document.getElementsByClassName('openTasksModalJs')[0],
			sortSelect = document.getElementById('sort-orders'),
			tableOrders = document.getElementsByClassName('tableOrdersBodyJs')[0],
			unpNumForm = document.getElementById('search-unp-num'),
			inputUnpNum = unpNumForm ? unpNumForm.getElementsByClassName('inputUnpNumJs')[0] : null,
			orderNumForm = document.getElementById('search-order-num'),
			inputOrderNum = orderNumForm.getElementsByClassName('searchOrderNumJs')[0],
			resetOrderNum = orderNumForm.getElementsByClassName('resetOrderNumJs')[0];

		if (openTaskModal) {
			openTaskModal.addEventListener('click', async(e) => {
				e.preventDefault();

				const services = await this.getServices(),
					href = openTaskModal.getAttribute('href');

				showInfoModal(href, 'services-prices', {services});
			});
		}

		sortSelect.addEventListener('change', async() => {
			showL();

			if (inputUnpNum) {
				const orders = await this.getSortOrdersList(inputUnpNum.value, sortSelect.value, checkUser().token);

				inputOrderNum.value = '';

				tableOrders.innerHTML = OrdersTableTemplate({orders});
			} else {
				const orders = await this.getSortOrdersList(null, sortSelect.value, checkUser().token);

				tableOrders.innerHTML = OrdersTableTemplate({orders});
			}

			hideL();
		});

		orderNumForm.addEventListener('submit', async(e) => {
			e.preventDefault();

			showL();

			sortSelect.disabled = !!inputOrderNum.value.trim();

			const orders = await this.getOrderByNum(inputOrderNum, sortSelect, checkUser().token);

			if (orders.length) {
				if (inputUnpNum) inputUnpNum.value = '';
				resetOrderNum.disabled = false;

				tableOrders.innerHTML = OrdersTableTemplate({orders});
			}

			hideL();
		});

		orderNumForm.addEventListener('reset', async(e) => {
			e.preventDefault();

			showL();

			inputOrderNum.value = '';
			sortSelect.disabled = false;
			resetOrderNum.disabled = true;

			const orders = await this.getData();

			tableOrders.innerHTML = OrdersTableTemplate({orders});

			hideL();
		});

		if (unpNumForm) {
			unpNumForm.addEventListener('submit', async(e) => {
				e.preventDefault();

				showL();

				if (inputUnpNum.value.trim()) {
					const orders = await this.getOrderByUnp(inputUnpNum, sortSelect,checkUser().token);

					if (orders.length) {
						inputOrderNum.value = '';

						sortSelect.disabled = false;
						sortSelect.value = 'up-date';

						tableOrders.innerHTML = OrdersTableTemplate({orders});
					} else {
						showInfoModal('alert-modal', 'alert', {
							title : 'Ошибка!',
							message : 'Не найдено заказов по веденному УНП!'
						});

						inputUnpNum.value = '';
					}
				} else {
					const orders = await this.getData();

					sortSelect.value = 'up-date';

					tableOrders.innerHTML = OrdersTableTemplate({orders});
				}

				hideL();
			});
		}
	}
}

export default OrdersList;
