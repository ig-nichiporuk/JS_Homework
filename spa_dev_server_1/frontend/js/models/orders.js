class Orders {
	async getOrdersList() {
		const orders = await fetch('http://localhost:3000/api/orders');

		return await orders.json();
	}

	async getSortOrdersList(param) {
		const orders = await fetch('http://localhost:3000/api/orders', {
			method: 'POST',
			headers: {'Content-Type' : 'application/json'},
			body: JSON.stringify({sort : param})
		});

		return await orders.json();
	}

	async getOrderNum(num, unp) {
		const order = await fetch('http://localhost:3000/api/orders', {
			method: 'POST',
			headers: {'Content-Type' : 'application/json'},
			body: JSON.stringify({num : num, unp : unp})
		});

		return await order.json();
	}

	async getOrder(id) {
		const order = await fetch(`http://localhost:3000/api/order/${id}`);

		if (!order.ok) {
			throw new Error(`Невозможно отправить запрос на ${order.url}. ${order.status} ${order.statusText}`);
		}

		return await order.json();
	}

	async getServicesList() {
		const services = await fetch('http://localhost:3000/api/services');

		return await services.json();
	}

	async addServicesToOrder(newServices, amount, orderId) {
		await fetch('http://localhost:3000/api/order/add', {
			method: 'PUT',
			headers: {'Content-Type' : 'application/json'},
			body: JSON.stringify({newServices, amount, orderId})
		});
	}

	async addServiceAmountToOrder(amount, taskId, orderId) {
		await fetch('http://localhost:3000/api/order/amount', {
			method: 'PUT',
			headers: {'Content-Type' : 'application/json'},
			body: JSON.stringify({amount, taskId, orderId})
		});
	}

	async removeServiceFromOrder(taskId) {
		await fetch('http://localhost:3000/api/order/remove', {
			method: 'DELETE',
			headers: {'Content-Type' : 'application/json'},
			body: JSON.stringify({taskId})
		});
	}
}

export default Orders;
