const express = require('express'),
	router = express.Router(),
	config = require('config'),
	fs = require('file-system'),
	shortId = require('shortid');


router.get('/api/order/:id', (req, res) => {
	const ordersData = getOrdersFromDB(),
		orderTasksData = getOrdersTasksFromDB(),
		sevicesList = getServicesListFromDB(),
		order = ordersData.find(order => order.id === req.params.id),
		orderTasks = orderTasksData.filter(order => order.order_id === req.params.id);

	order ? res.send([order, formatOrderTasksData(orderTasks, sevicesList)]) : res.send({});
});

router.put('/api/order/add', (req, res) => {
	const orderTasksData = getOrdersTasksFromDB(),
		{newServices, orderId} = req.body,
		newTaskInOrder ={};

	orderTasks = orderTasksData.filter(task => task.order_id == orderId);

	for (let serviceId of newServices) {
		const taskInOrder = orderTasks.find(task => task.task_id == serviceId);

		if(taskInOrder) {
			taskInOrder.amount = `${++taskInOrder.amount}`;

			setOrdersTasksToDB(orderTasksData);
		} else {
			newTaskInOrder.id = shortId.generate();
			newTaskInOrder.order_id = orderId;
			newTaskInOrder.task_id = serviceId;
			newTaskInOrder.amount = '1';
			orderTasksData.push(newTaskInOrder);

			setOrdersTasksToDB(orderTasksData);
		}
	}

	res.sendStatus(204);
});


router.put('/api/order/amount', (req, res) => {
	const orderTasksData = getOrdersTasksFromDB(),
		{amount, taskId, orderId} = req.body;

	orderTasks = orderTasksData.filter(task => task.order_id == orderId);

	orderTasks.find(task => task.id == taskId).amount = amount;

	setOrdersTasksToDB(orderTasksData);

	res.sendStatus(204);
});


router.delete('/api/order/remove', (req, res) => {

	const orderTasksData = getOrdersTasksFromDB(),
		{taskId} = req.body;

	updateOrderTasksData = orderTasksData.filter(task => task.id !=taskId);

	setOrdersTasksToDB(updateOrderTasksData);

	res.sendStatus(204);
});



function formatOrderTasksData(orderTasks, sevicesList) {
	return orderTasks.map(orderTask => {
		const serviceTitle = sevicesList.find(service => service.id == orderTask.task_id).title,
			servicePrice = sevicesList.find(service => service.id == orderTask.task_id).price;
		orderTask.task_id = serviceTitle;
		orderTask.task_price = servicePrice;

		return orderTask;
	});
}

function getOrdersFromDB() {
	return JSON.parse(fs.readFileSync(config.get('database.orders'), 'utf8'));
}

function getOrdersTasksFromDB() {
	return JSON.parse(fs.readFileSync(config.get('database.order_tasks'), 'utf8'));
}

function getServicesListFromDB() {
	return JSON.parse(fs.readFileSync(config.get('database.services'), 'utf8'));
}

function setOrdersTasksToDB(ordersTasksData) {
	fs.writeFileSync(config.get('database.order_tasks'), JSON.stringify(ordersTasksData));
}

module.exports = router;
