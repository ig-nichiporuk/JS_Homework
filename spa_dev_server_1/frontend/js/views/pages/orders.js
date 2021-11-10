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

	render(orders) {
		const editOrders = this.formatOrders(orders),
			request = this.request;
		return new Promise(resolve => {
			this.getServices().then(services => {
				resolve(OrdersTemplate({editOrders, services, request}));
			});
		});
	}

	renderOrdersTable(orders) {
		const editOrders = this.formatOrders(orders);
		return new Promise(resolve => resolve(OrdersTableTemplate({editOrders})));
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

			this.getOrderNum(inputOrderNum.value.trim(), null, resetOrderNum, tableOrders);
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
				this.getOrderNum(null, inputUnpNum.value.trim(), resetOrderNum, tableOrders);
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

	getOrderNum(num, unp, resetBtn, table) {
		this.model.getOrderNum(num, unp).then(order => {
			this.renderOrdersTable([order]).then(html => {
				resetBtn.disabled = false;
				table.innerHTML = html;
				this.afterRender();
			});
		});
	}

	formatOrders(data) {
		return data.map(order => {
			order.status_id = order.status_id == 1 ? 'Новый' : order.status_id == 2 ? 'Отменен' : 'Выполнен';

			order.fio = [order.fio.split(' ')[0], `${order.fio.split(' ')[1][0]}.${order.fio.split(' ')[2][0]}.`].join(' ');

			order.created_at = order.created_at.split(' ')[0].split('-').reverse().join('.');

			order.closed_at = order.closed_at ? order.closed_at.split(' ')[0].split('-').reverse().join('.') : '—';

			return order;
		});
	}
}

export default OrdersList;
