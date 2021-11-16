import {formatOrders, showAlertModal} from '../../helpers/utils';

import Component from '../../views/component';

import OrdersTemplate from '../../../templates/pages/orders.hbs';

import OrdersTableTemplate from '../../../templates/pages/ordersTable.hbs';


import Orders from '../../models/orders';

class OrdersList extends Component {
	constructor() {
		super();

		this.model = new Orders();
	}

	async getData() {
		try {
			return formatOrders(await this.model.getOrdersList());
		} catch {
			showAlertModal('alert-modal', 'alert', {
				title : 'Ошибка!',
				message : 'Не удалось получить список заказов!'
			});
		}
	}

	async getServices() {
		try {
			return await this.model.getServicesList();
		} catch (e) {
			showAlertModal('alert-modal', 'alert', {
				title : 'Ошибка!',
				message : 'Не удалось получить справочник услуг!'
			});
		}
	}

	async getSortOrdersList(sortOptions) {
		try {
			return formatOrders(await this.model.getSortOrdersList(sortOptions));
		} catch (e) {
			showAlertModal('alert-modal', 'alert', {
				title : 'Ошибка!',
				message : 'Не удалось отсортировать заказ-наряды!'
			});
			throw new Error (e);
		}

	}

	async getOrderByNum(num, sortSelect) {
		const val = num.value.trim().toUpperCase();
		try {
			return formatOrders([await this.model.getOrderByNum(val)]);
		} catch (e) {
			showAlertModal('alert-modal', 'alert', {
				title : 'Ошибка!',
				message : 'Не удалось получить заказ-наряд!'
			});

			sortSelect.disabled = false;
			num.value = '';
		}
	}

	async getOrderByUnp(unp, sortSelect) {
		const val = unp.value.trim();
		try {
			return formatOrders(await this.model.getOrderByUnp(val));
		} catch (e) {
			showAlertModal('alert-modal', 'alert', {
				title : 'Ошибка!',
				message : 'Не удалось получить заказ-наряд!'
			});

			sortSelect.disabled = false;
			unp.value = '';
		}
	}

	async render(orders) {
		const request = this.request;

		return OrdersTemplate({orders, request});
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
			inputUnpNum = unpNumForm.getElementsByClassName('inputUnpNumJs')[0],
			orderNumForm = document.getElementById('search-order-num'),
			inputOrderNum = orderNumForm.getElementsByClassName('searchOrderNumJs')[0],
			resetOrderNum = orderNumForm.getElementsByClassName('resetOrderNumJs')[0];

		openTaskModal.addEventListener('click', async(e) => {
			e.preventDefault();

			const services = await this.getServices(),
				href = openTaskModal.getAttribute('href');

			showAlertModal(href, 'services-prices', {services});
		});

		sortSelect.addEventListener('change', async() => {
			const orders = await this.getSortOrdersList(sortSelect.value);

			inputOrderNum.value = '';
			inputUnpNum.value = '';

			tableOrders.innerHTML = OrdersTableTemplate({orders});
		});

		orderNumForm.addEventListener('submit', async(e) => {
			e.preventDefault();

			const orders = await this.getOrderByNum(inputOrderNum, sortSelect);

			if (orders.length) {
				tableOrders.innerHTML = OrdersTableTemplate({orders});
				sortSelect.disabled = !!inputOrderNum.value.trim();
				resetOrderNum.disabled = false;
			}

		});

		orderNumForm.addEventListener('reset', async(e) => {
			e.preventDefault();

			inputOrderNum.value = '';
			sortSelect.disabled = false;
			resetOrderNum.disabled = true;

			const orders = await this.getData();

			tableOrders.innerHTML = OrdersTableTemplate({orders});
		});

		unpNumForm.addEventListener('submit', async(e) => {
			e.preventDefault();

			if (inputUnpNum.value.trim()) {
				const orders = await this.getOrderByUnp(inputUnpNum);

				if (orders.length) {
					tableOrders.innerHTML = OrdersTableTemplate({orders});
					sortSelect.disabled = !!inputUnpNum.value.trim();
				} else {
					showAlertModal('alert-modal', 'alert', {
						title : 'Ошибка!',
						message : 'Не удалось получить заказ-наряд!'
					});

					sortSelect.disabled = false;
				}
			} else {
				const orders = await this.getData();

				tableOrders.innerHTML = OrdersTableTemplate({orders});
			}
		});
	}
}

export default OrdersList;
