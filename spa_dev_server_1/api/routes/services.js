const express = require('express'),
	router = express.Router(),
	config = require('config'),
	fs = require('file-system');

router.get('/api/services',(req, res) => {
	console.log(fs.readFileSync(config.get('database.services'), 'utf8'));
	res.send(fs.readFileSync(config.get('database.services'), 'utf8'))
});

module.exports = router;
