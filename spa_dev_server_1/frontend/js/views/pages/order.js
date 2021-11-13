import {closeModal, openModal, formatOrders} from '../../helpers/utils';

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

	async getData() {
		return await this.model.getOrder(this.request.id);
	}

	async getServices() {
		return await this.model.getServicesList();
	}

	async render(data) {
		const [orderInfo, orderTasks] = data,
			request = this.request,
			formatOrderInfo = formatOrders([orderInfo])[0],
			services = await this.getServices();

		orderTasks.map(orderTask => {
			orderTask.task_total = this.formatTotalPrice(orderTask.task_price * orderTask.amount);
		});

		return Object.keys(data).length ? OrderInfo({formatOrderInfo, orderTasks, services, request}) : Error404Template();
	}

	removeService(taskId, table) {
		document.body.addEventListener('click', (e) => {
			const target = e.target;
			if (target.closest('.removeServiceIdJs')) {
				this.model.removeServiceFromOrder(taskId).then(() => {
					this.getData().then(data => {
						const [, orderTasks] = data;
						table.innerHTML = this.renderOrderServicesTable(orderTasks);
						closeModal();
					});
				});
			}
		});
	}

	addServices(checkServices, amount, table) {
		this.getData().then(data => {
			const [orderInfo] = data;

			this.model.addServicesToOrder(checkServices, amount, orderInfo.id).then(() => {
				this.getData().then(data => {
					const [, orderTasks] = data;
					table.innerHTML = this.renderOrderServicesTable(orderTasks);
				});
			});
		});
	}

	addServiceAmount(amount, taskId) {
		this.getData().then(data => {
			const [orderInfo] = data;

			this.model.addServiceAmountToOrder(amount, taskId, orderInfo.id);
		});
	}

	renderOrderServicesTable(orderTasks) {
		orderTasks.map(orderTask => orderTask.task_total = this.formatTotalPrice(orderTask.task_price * orderTask.amount));
		return OrderServicesRow({orderTasks});
	}

	formatTotalPrice(value) {
		return Math.ceil(value * 100) / 100;
	}

	afterRender() {
		super.afterRender();
		this.setActions();
	}

	setActions() {
		const addServiceBtn = document.getElementsByClassName('addServicesBtnJs')[0],
			addServicesList = document.getElementsByClassName('addServicesListJs')[0],
			servicesTable = document.getElementsByClassName('orderServicesTableBodyJs')[0];

		servicesTable.addEventListener('click', (e) => {
			const target = e.target,
				serviceRow = target.closest('.serviceRowJs'),
				counterService = serviceRow.querySelectorAll('.counterValueJs'),
				totalSevice = serviceRow.querySelectorAll('.serviceTotalPriceJs'),
				priceService = +(serviceRow.querySelectorAll('.servicePriceJs')[0]).innerText;

			if (target.closest('.counterMinusJs')) {
				if (+target.nextElementSibling.innerText > 1) {
					for (let counter of counterService) {
						counter.innerText = +counter.innerText - 1;
					}
					this.addServiceAmount(counterService[0].innerText, serviceRow.dataset.taskId);
				}
			}
			if (target.closest('.counterPlusJs')) {
				for (let counter of counterService) {
					counter.innerText = +counter.innerText + 1;
				}
				this.addServiceAmount(counterService[0].innerText, serviceRow.dataset.taskId);
			}

			if (target.closest('.removeServiceJs')) {
				event.preventDefault();

				let href = target.closest('.removeServiceJs').getAttribute('href');

				closeModal();
				openModal(href);
				this.removeService(serviceRow.dataset.taskId, servicesTable);
			}

			for (let total of totalSevice) {
				total.innerText = this.formatTotalPrice(counterService[0].innerText * priceService);
			}

		});

		addServiceBtn.addEventListener('click', () => {
			const checkedCheckBoxs = addServicesList.querySelectorAll('input:checked'),
				checkedServicesId = [];

			for (let checkbox of checkedCheckBoxs) {
				checkedServicesId.push(checkbox.parentElement.dataset.id);
			}

			this.addServices(checkedServicesId, null, servicesTable);
		});
	}
}

export default Order;
