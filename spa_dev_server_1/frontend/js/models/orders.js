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

	async setOrderChanges(changesInfo, changesTasks) {
		await fetch('http://localhost:3000/api/order/changes', {
			method: 'PUT',
			headers: {'Content-Type' : 'application/json'},
			body: JSON.stringify({changesInfo, changesTasks})
		});
	}
}

export default Orders;
