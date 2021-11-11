import Component from '../../views/component';

import OrdersTemplate from '../../../templates/pages/orders.hbs';

import OrdersTableTemplate from '../../../templates/pages/ordersTable.hbs';


import Orders from '../../models/orders';


class OrdersList extends Component {
	constructor() {
		super();

		this.model = new Orders();
	}

	getData() {
		return new Promise(resolve => this.model.getOrdersList().then(orders => {
			resolve(orders);
		}));
	}

	getServices() {
		return new Promise(resolve => this.model.getServicesList().then(orders => {
			resolve(orders);
		}));
	}

	getOrderNum(num, unp, resetBtn, table) {
		this.model.getOrderNum(num, unp).then(order => {
			this.renderOrdersTable(order).then(html => {
				resetBtn.disabled = false;
				table.innerHTML = html;
				this.afterRender();
			});
		});
	}

	render(orders) {
		const request = this.request;
		return new Promise(resolve => {
			this.getServices().then(services => {
				resolve(OrdersTemplate({orders, services, request}));
			});
		});
	}

	renderOrdersTable(orders) {
		return new Promise(resolve => resolve(OrdersTableTemplate({orders})));
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
			this.model.getSortOrdersList(sortSelect.value).then(orders => {
				this.renderOrdersTable(orders).then(html => {
					tableOrders.innerHTML = html;
					this.afterRender();
				});
			});
		});

		searchOrderNumForm.addEventListener('submit', () => {
			event.preventDefault();

			inputUnpNum.value = '',

			sortSelect.disabled = !!inputOrderNum.value.trim();

			this.getOrderNum(inputOrderNum.value.trim().toUpperCase(), null, resetOrderNum, tableOrders);
		});

		searchOrderNumForm.addEventListener('reset', () => {
			event.preventDefault();

			inputOrderNum.value = '';
			sortSelect.disabled = false;
			resetOrderNum.disabled = true;

			this.getData().then(orders => {
				this.renderOrdersTable(orders).then(html => {
					tableOrders.innerHTML = html;
					this.afterRender();
				});
			});
		});

		searchUnpNumForm.addEventListener('submit', () => {
			event.preventDefault();

			sortSelect.disabled = !!inputUnpNum.value.trim();

			if (inputUnpNum.value.trim()) {
				this.getOrderNum(null, inputUnpNum.value.trim().toUpperCase(), resetOrderNum, tableOrders);
			} else {
				this.getData().then(orders => {
					this.renderOrdersTable(orders).then(html => {
						tableOrders.innerHTML = html;
						this.afterRender();
					});
				});
			}
		});
	}
}

export default OrdersList;
