const express = require('express'),
	router = express.Router(),
	config = require('config'),
	fs = require('file-system');

router.get('/api/orders',(req, res) => res.send(fs.readFileSync(config.get('database.orders'), 'utf8')));


module.exports = router;
