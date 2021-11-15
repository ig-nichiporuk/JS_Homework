const express = require('express'),
	router = express.Router(),
	config = require('config'),
	fs = require('file-system');

// API GET Orders list
router.get('/api/orders',(req, res) => {
	const orders = fs.readFileSync(config.get('database.orders'), 'utf8');
	res.send(orders)
});

// API Orders SORT, find UNP, find NUM
router.post('/api/orders',(req, res) => {
	const ordersData = getOrdersFromDB(),
		{sort, num, unp} = req.body;

	if(num && num.length) {
		res.send(ordersData.find(order => order.code_1c == num));
	}

	if(sort) {
		res.send(setSort(sort, ordersData));
	}

	if(unp && unp.length) {
		res.send(ordersData.find(order => order.unp == unp));
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
