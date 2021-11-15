const express = require('express'),
	router = express.Router(),
	config = require('config'),
	fs = require('file-system');

// API GET Order info
router.get('/api/order/:id', (req, res) => {
	const ordersData = getOrdersFromDB(),
		orderTasksData = getOrdersTasksFromDB(),
		order = ordersData.find(order => order.id === req.params.id),
		orderTasks = orderTasksData.filter(order => order.order_id === req.params.id);

	order ? res.send([order, orderTasks]) : res.send({});
});

// API SET Order changes
router.put('/api/order/changes', (req, res) => {
	const orders = getOrdersFromDB(),
		orderTasksData = getOrdersTasksFromDB(),
		{changesInfo, changesTasks} = req.body;

	console.log(changesInfo.status_id);

	updateOrders = orders.map(task => {
		if(task.id == changesInfo.id) {
			task.status_id = changesInfo.status_id;
			task.fio = changesInfo.fio;
			task.car = changesInfo.car;
			task.reg_number = changesInfo.reg_number;
			task.closed_at = changesInfo.closed_at;
		}
		return task;
	});

	updateOrderTasksData = orderTasksData.filter(task => task.order_id != changesInfo.id);

	for (let obj of changesTasks) {
		updateOrderTasksData.push(obj);
	}

	setOrdersToDB(updateOrders);
	setOrdersTasksToDB(updateOrderTasksData);

	res.sendStatus(204);
});

function getOrdersFromDB() {
	return JSON.parse(fs.readFileSync(config.get('database.orders'), 'utf8'));
}

function getOrdersTasksFromDB() {
	return JSON.parse(fs.readFileSync(config.get('database.order_tasks'), 'utf8'));
}

function setOrdersToDB(ordersTasksData) {
	fs.writeFileSync(config.get('database.orders'), JSON.stringify(ordersTasksData));
}

function setOrdersTasksToDB(ordersTasksData) {
	fs.writeFileSync(config.get('database.order_tasks'), JSON.stringify(ordersTasksData));
}

module.exports = router;
