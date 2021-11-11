class Orders {
	getOrdersList() {
		return new Promise(resolve => {
			const xhr = new XMLHttpRequest();

			xhr.open('GET', 'http://localhost:3000/api/orders');

			xhr.onload = () => resolve(JSON.parse(xhr.response));

			xhr.send();
		});
	}

	getSortOrdersList(param) {
		return new Promise(resolve => {
			const xhr = new XMLHttpRequest();

			xhr.open('POST', 'http://localhost:3000/api/orders');
			xhr.setRequestHeader('Content-Type', 'application/json');

			xhr.onload = () => resolve(JSON.parse(xhr.response));

			xhr.send(JSON.stringify({sort : param}));
		});
	}

	getOrderNum(num, unp) {
		return new Promise(resolve => {
			const xhr = new XMLHttpRequest();

			xhr.open('POST', 'http://localhost:3000/api/orders');
			xhr.setRequestHeader('Content-Type', 'application/json');

			xhr.onload = () => resolve(JSON.parse(xhr.response));

			xhr.send(JSON.stringify({num : num, unp : unp}));
		});
	}

	getOrder(id) {
		return new Promise(resolve => {
			const xhr = new XMLHttpRequest();

			xhr.open('GET', `http://localhost:3000/api/order/${id}`);

			xhr.onload = () => resolve(JSON.parse(xhr.response));

			xhr.send();
		});
	}

	getServicesList() {
		return new Promise(resolve => {
			const xhr = new XMLHttpRequest();

			xhr.open('GET', 'http://localhost:3000/api/services');

			xhr.onload = () => resolve(JSON.parse(xhr.response));

			xhr.send();
		});
	}

	addServicesToOrder(newServices, orderId) {
		return new Promise(resolve => {
			const xhr = new XMLHttpRequest();

			xhr.open('PUT', 'http://localhost:3000/api/order/add');
			xhr.setRequestHeader('Content-Type', 'application/json');

			xhr.onload = () => resolve();

			xhr.send(JSON.stringify({newServices, orderId}));
		});
	}
}

export default Orders;
