const express = require('express'),
	router = express.Router(),
	config = require('config'),
	fs = require('file-system'),
	shortId = require('shortid');


router.get('/api/order/:id', (req, res) => {
	const ordersData = getOrdersFromDB(),
		orderTasksData = getOrdersTasksFromDB(),
		order = ordersData.find(order => order.id === req.params.id),
		orderTasks = orderTasksData.filter(order => order.order_id === req.params.id);

	order ? res.send([order, orderTasks]) : res.send({});
});












router.post('/api/task', (req, res) => {
	const tasksData = getTasksFromDB(),
		task = req.body;

	task.id = shortId.generate();
	task.description = task.description.trim() || 'No Description';
	task.status = 'In Progress';

	tasksData.push(task);
	setTasksToDB(tasksData);

	res.send(task);
});

router.get('/api/task/:id', (req, res) => {
	const tasksData = getTasksFromDB(),
		task = tasksData.find(task => task.id === req.params.id);

	task ? res.send(task) : res.send({});
});

router.put('/api/task/:id', (req, res) => {
	const tasksData = getTasksFromDB(),
		task = tasksData.find(task => task.id === req.params.id),
		updatedTask = req.body;

	task.title = updatedTask.title;
	task.description = updatedTask.description || 'No Description';

	setTasksToDB(tasksData);

	res.sendStatus(204);
});

router.put('/api/task/:id/done', (req, res) => {
	const tasksData = getTasksFromDB();

	tasksData.find(task => task.id === req.params.id).status = 'Done';

	setTasksToDB(tasksData);

	res.sendStatus(204);
});

router.delete('/api/task/:id', (req, res) => {
	const tasksData = getTasksFromDB(),
		updatedData = tasksData.filter(task => task.id !== req.params.id);

	setTasksToDB(updatedData);

	res.sendStatus(204);
});

function getOrdersFromDB() {
	return JSON.parse(fs.readFileSync(config.get('database.orders'), 'utf8'));
}

function getOrdersTasksFromDB() {
	return JSON.parse(fs.readFileSync(config.get('database.order_tasks'), 'utf8'));
}

module.exports = router;