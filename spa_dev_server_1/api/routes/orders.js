const express = require('express'),
	router = express.Router(),
	config = require('config'),
	fs = require('file-system');

const auth = require('../middleware/auth');

// API GET Orders list
router.post('/api/orders', auth,(req, res) => {
	const ordersData = getOrdersFromDB(),
		{unp, num, param} = req.body;

	if(req.user.is_manager !== '0') {
		if(unp) {
			const ordersByUnp = ordersData.filter(order => order.unp == unp);

			if(num) {
				res.send(ordersByUnp.filter(order => order.code_1c.startsWith(num)));
			} else if(param) {
				res.send(setSort(param, ordersByUnp));
			} else {
				res.send(ordersByUnp);
			}
		} else if(param) {
			if(num) {
				res.send(ordersData.filter(order => order.code_1c.startsWith(num)));
			} else {
				res.send(setSort(param, ordersData));
			}
		} else if(num) {
			res.send(ordersData.filter(order => order.code_1c.startsWith(num)));
		} else {
			res.send(ordersData);
		}

	} else {
		const userOrders = ordersData.filter(order => order.login == req.user.login)
		if(param) {
			if(num) {
				res.send(userOrders.filter(order => order.code_1c.startsWith(num)));
			} else {
				res.send(setSort(param, userOrders));
			}
		} else if(num) {
			res.send(ordersData.filter(order => order.code_1c.startsWith(num)));
		} else {
			res.send(userOrders);
		}
	}
});

// API Orders SORT
router.post('/api/orders/sort', auth, (req, res) => {
	const ordersData = getOrdersFromDB(),
		{unp, param} = req.body;

	if(req.user.is_manager !== '0') {
		if(unp) {
			const ordersDataByUnp = ordersData.filter(order => order.unp == unp)
			res.send(setSort(param, ordersDataByUnp));
		} else {
			res.send(setSort(param, ordersData));
		}
	} else {
		const userOrders = ordersData.filter(order => order.login == req.user.login);

		res.send(setSort(param, userOrders));
	}
});

// API Orders find NUM
router.post('/api/orders/num', auth, (req, res) => {
	const ordersData = getOrdersFromDB(),
		{num} = req.body;

	if(req.user.is_manager !== '0') {
		res.send(ordersData.filter(order => order.code_1c.startsWith(num)));
	} else {
		const userOrders = ordersData.filter(order => order.login == req.user.login);

		res.send(userOrders.filter(order => order.code_1c.startsWith(num)));
	}
});

// API Orders find UNP
router.post('/api/orders/unp', auth,  (req, res) => {
	const ordersData = getOrdersFromDB(),
		{unp} = req.body;

	if(req.user.is_manager !== '0') {
		res.send(ordersData.filter(order => order.unp == unp));
	} else {
		res.send('У пользователя нет прав доступа!');
	}
});

//SORT options
function setSort(value, data) {
	switch (value) {
		case ('up-date') :
			return sortByDate(data, true);
		case ('down-date') :
			return sortByDate(data, false);
		case ('done') :
			return sortByStatus(data, 3);
		case ('cancel') :
			return sortByStatus(data, 2);
		case ('new') :
			return sortByStatus(data, 1);
	}
}

//SORT later to earlier, earlier to later
function sortByDate(orders, flag) {
	return orders.sort((current, next) => {
		if (current.created_at.split(' ')[0] < next.created_at.split(' ')[0]) return flag ? 1 : -1;
		if (current.created_at.split(' ')[0] > next.created_at.split(' ')[0]) return flag ? -1 : 1;
	});
}

//SORT status
function sortByStatus(orders, status) {
	return orders.filter(order => order.status_id == status);
}

function getOrdersFromDB() {
	return JSON.parse(fs.readFileSync(config.get('database.orders'), 'utf8'));
}

module.exports = router;
