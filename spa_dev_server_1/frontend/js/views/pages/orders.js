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
			showAlertModal('alert-modal', {
				title : 'Ошибка!',
				message : 'Не удалось получить список заказов!'
			});
		}
	}

	async getServices() {
		try {
			return await this.model.getServicesList();
		} catch (e) {
			showAlertModal('alert-modal', {
				title : 'Ошибка!',
				message : 'Не удалось получить справочник услуг!'
			});
		}
	}

	async getSortOrdersList(sortOptions) {
		try {
			return formatOrders(await this.model.getSortOrdersList(sortOptions));
		} catch (e) {
			showAlertModal('alert-modal', {
				title : 'Ошибка!',
				message : 'Не удалось отсортировать заказ-наряды!'
			});
			throw new Error (e);
		}

	}

	async getOrderNum(num, unp, sortSelect) {
		try {
			let numVal = num ? num.value.trim().toUpperCase() : null,
				unpVal = unp ? unp.value.trim() : null;
			return formatOrders([await this.model.getOrderNum(numVal, unpVal)]);
		} catch (e) {
			showAlertModal('alert-modal', {
				title : 'Ошибка!',
				message : 'Не удалось получить заказ-наряд!'
			});

			sortSelect.disabled = false;
			num.value = '';
			unp.value = '';

			throw new Error (e);
		}

	}

	async render(orders) {
		const request = this.request,
			services = await this.getServices();

		return OrdersTemplate({orders, services, request});
	}

	afterRender() {
		super.afterRender();
		this.setActions();
	}

	setActions() {
		const sortSelect = document.getElementById('sort-orders'),
			tableOrders = document.getElementsByClassName('tableOrdersBodyJs')[0],
			searchUnpNumForm = document.getElementById('search-unp-num'),
			inputUnpNum = searchUnpNumForm.getElementsByClassName('inputUnpNumJs')[0],
			searchOrderNumForm = document.getElementById('search-order-num'),
			inputOrderNum = searchOrderNumForm.getElementsByClassName('searchOrderNumJs')[0],
			resetOrderNum = searchOrderNumForm.getElementsByClassName('resetOrderNumJs')[0];

		sortSelect.addEventListener('change', async() => {
			const orders = await this.getSortOrdersList(sortSelect.value);

			tableOrders.innerHTML = OrdersTableTemplate({orders});
		});

		searchOrderNumForm.addEventListener('submit', async(e) => {
			e.preventDefault();

			const orders = await this.getOrderNum(inputOrderNum, inputUnpNum, sortSelect);

			inputUnpNum.value = '',
			sortSelect.disabled = !!inputOrderNum.value.trim();
			resetOrderNum.disabled = false;
			tableOrders.innerHTML = OrdersTableTemplate({orders});
		});

		searchOrderNumForm.addEventListener('reset', async(e) => {
			e.preventDefault();

			inputOrderNum.value = '';
			sortSelect.disabled = false;
			resetOrderNum.disabled = true;

			const orders = await this.getData();

			tableOrders.innerHTML = OrdersTableTemplate({orders});
		});

		searchUnpNumForm.addEventListener('submit', async(e) => {
			e.preventDefault();

			sortSelect.disabled = !!inputUnpNum.value.trim();

			if (inputUnpNum.value.trim()) {
				const orders = await this.getOrderNum(inputOrderNum, inputUnpNum, sortSelect);

				tableOrders.innerHTML = OrdersTableTemplate({orders});
			} else {
				const orders = await this.getData();

				tableOrders.innerHTML = OrdersTableTemplate({orders});
			}
		});
	}
}

export default OrdersList;
