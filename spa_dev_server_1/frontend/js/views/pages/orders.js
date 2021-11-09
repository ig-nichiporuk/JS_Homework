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
		const editOrders = this.formatOrders(orders);
		return new Promise(resolve => resolve(OrdersTemplate({editOrders})));
	}

	renderOrdersTable(orders) {
		const editOrders = this.formatOrders(orders);
		return new Promise(resolve => resolve(OrdersTableTemplate({editOrders})));
	}

	afterRender() {
		this.setActions();
	}

	setActions() {
		const sortSelect = document.getElementById('sort-orders'),
			tableOrders = document.getElementsByClassName('tableOrdersBodyJs')[0];

		sortSelect.addEventListener('change', () => {
			this.getData().then(data => {
				this.renderOrdersTable(this.setSort(sortSelect.value, data)).then(html => {
					tableOrders.innerHTML = html;
					this.afterRender();
				});
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

	setSort(value, data) {
		switch (value) {
			case ('up-date') :
				return this.sortByDate(data, true);
			case ('down-date') :
				return this.sortByDate(data, false);
			case ('done') :
				return this.sortByStatus(data, 3);
			case ('new') :
				return this.sortByStatus(data, 1);
		}
	}

	sortByDate(orders, flag) {
		return orders.sort((current, next) => {
			if (current.created_at.split(' ')[0] < next.created_at.split(' ')[0]) return flag ? 1 : -1;
			if (current.created_at.split(' ')[0] > next.created_at.split(' ')[0]) return flag ? -1 : 1;
		});
	}

	sortByStatus(orders, status) {
		return orders.filter(order => order.status_id == status);
	}
}

export default OrdersList;