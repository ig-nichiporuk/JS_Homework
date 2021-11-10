import Component from '../../views/component';

import OrderInfo from '../../../templates/pages/order.hbs';
import Error404Template from '../../../templates/pages/error404.hbs';
import Orders from '../../models/orders';

class Order extends Component {
	constructor() {
		super();

		this.model = new Orders();
	}

	getData() {
		return new Promise(resolve => this.model.getOrder(this.request.id).then(data => resolve(data)));
	}

	render(data) {
		return new Promise(resolve => {
			const [orderInfo, orderTasks] = data,
				request = this.request;
			this.getServices().then(services => {
				const formatOrderTasks = orderTasks.map(orderTask => {
					const serviceTitle = services.find(service => service.id == orderTask.task_id).title,
						servicePrice = services.find(service => service.id == orderTask.task_id).price;
					orderTask.task_id = serviceTitle;
					orderTask.task_price = servicePrice;
					orderTask.task_total = Math.round(servicePrice * orderTask.amount / 0.01) * 0.01;
					return orderTask;
				});
				resolve(Object.keys(data).length ? OrderInfo({orderInfo, formatOrderTasks, services, request}) : Error404Template());
			});
		});
	}
}

export default Order;