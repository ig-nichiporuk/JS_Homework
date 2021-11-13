import {formatOrders} from '../../helpers/utils';

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
		return formatOrders(await this.model.getOrdersList());
	}

	async getServices() {
		return await this.model.getServicesList();
	}

	async getSortOrdersList(sortOptions) {
		return formatOrders(await this.model.getSortOrdersList(sortOptions));
	}

	async getOrderNum(num, unp) {
		return formatOrders([await this.model.getOrderNum(num, unp)]);
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

		sortSelect.addEventListener('change', () => {
			this.getSortOrdersList(sortSelect.value).then(orders => {
				tableOrders.innerHTML = OrdersTableTemplate({orders});
			});
		});

		searchOrderNumForm.addEventListener('submit', () => {
			event.preventDefault();

			inputUnpNum.value = '',
			sortSelect.disabled = !!inputOrderNum.value.trim();

			this.getOrderNum(inputOrderNum.value.trim().toUpperCase(), null).then(orders => {
				resetOrderNum.disabled = false;
				tableOrders.innerHTML = OrdersTableTemplate({orders});
			});
		});

		searchOrderNumForm.addEventListener('reset', () => {
			event.preventDefault();

			inputOrderNum.value = '';
			sortSelect.disabled = false;
			resetOrderNum.disabled = true;

			this.getData().then(orders => {
				tableOrders.innerHTML = OrdersTableTemplate({orders});
			});
		});

		searchUnpNumForm.addEventListener('submit', () => {
			event.preventDefault();

			sortSelect.disabled = !!inputUnpNum.value.trim();

			if (inputUnpNum.value.trim()) {
				this.getOrderNum(null, inputUnpNum.value.trim().toUpperCase()).then(orders => {
					tableOrders.innerHTML = OrdersTableTemplate({orders});
				});
			} else {
				this.getData().then(orders => {
					tableOrders.innerHTML = OrdersTableTemplate({orders});
				});
			}
		});
	}
}

export default OrdersList;
