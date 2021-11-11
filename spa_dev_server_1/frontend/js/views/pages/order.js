import Component from '../../views/component';

import OrderInfo from '../../../templates/pages/order.hbs';
import Error404Template from '../../../templates/pages/error404.hbs';
import OrderServicesRow from '../../../templates/pages/orderServicesRow.hbs';

import Orders from '../../models/orders';


class Order extends Component {
	constructor() {
		super();

		this.model = new Orders();
	}

	getData() {
		return new Promise(resolve => this.model.getOrder(this.request.id).then(data => resolve(data)));
	}

	getServices() {
		return new Promise(resolve => this.model.getServicesList().then(orders => {
			resolve(orders);
		}));
	}

	render(data) {
		return new Promise(resolve => {
			const [orderInfo, orderTasks] = data,
				request = this.request;
			this.getServices().then(services => {
				resolve(Object.keys(data).length ? OrderInfo({orderInfo, orderTasks, services, request}) : Error404Template());
			});
		});
	}

	renderOrderServicesTable(orderTasks) {
		return new Promise(resolve => resolve(OrderServicesRow({orderTasks})));
	}

	afterRender() {
		super.afterRender();
		this.setActions();
	}

	setActions() {
		const addServiceBtn = document.getElementsByClassName('addServicesBtnJs')[0],
			addServicesList = document.getElementsByClassName('addServicesListJs')[0],
			servicesTable = document.getElementsByClassName('orderServicesTableBodyJs')[0];

		addServiceBtn.addEventListener('click', () => {
			const checkedCheckBoxs = addServicesList.querySelectorAll('input:checked'),
				checkedServicesId = [];
			for (let checkbox of checkedCheckBoxs) {
				checkedServicesId.push(checkbox.parentElement.dataset.id);
			}
			this.getData().then(data => {
				const [orderInfo] = data;
				this.addServices(checkedServicesId, orderInfo.id, servicesTable);
			});
		});
	}

	addServices(checkServices, orderId, table) {
		this.model.addServicesToOrder(checkServices, orderId).then(() => {
			this.getData().then(data => {
				const [, orderTasks] = data;

				this.renderOrderServicesTable(orderTasks).then (html => {
					table.innerHTML = html;
				});
			});
		});
	}


}



export default Order;