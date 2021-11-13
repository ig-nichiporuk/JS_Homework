class Orders {
	async getOrdersList() {
		const orders = await fetch('http://localhost:3000/api/orders')
			.then(orders => orders.json())
			.then(data => data);

		return orders;
	}

	async getSortOrdersList(param) {
		const orders = await fetch('http://localhost:3000/api/orders', {
			method: 'POST',
			headers: {'Content-Type' : 'application/json'},
			body: JSON.stringify({sort : param})

		})
		.then(orders => orders.json())
		.then(data => data);

		return orders;
	}

	async getOrderNum(num, unp) {
		const order = await fetch('http://localhost:3000/api/orders', {
			method: 'POST',
			headers: {'Content-Type' : 'application/json'},
			body: JSON.stringify({num : num, unp : unp})

		})
		.then(orders => orders.json())
		.then(data => data);

		return order;
	}

	async getOrder(id) {
		const order = await fetch(`http://localhost:3000/api/order/${id}`)
			.then(orders => orders.json())
			.then(data => data);

		return order;
	}

	async getServicesList() {
		const services = await fetch('http://localhost:3000/api/services')
			.then(orders => orders.json())
			.then(data => data);

		return services;
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
