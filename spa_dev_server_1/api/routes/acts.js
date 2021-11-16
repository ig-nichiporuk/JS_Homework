const express = require('express'),
	router = express.Router(),
	config = require('config'),
	fs = require('file-system');

// API GET Orders list
router.get('/api/acts',(req, res) => {
	const acts = fs.readFileSync(config.get('database.acts'), 'utf8');

	res.send(acts)
});

router.post('/api/acts',(req, res) => {
	const actsData = getActsFromDB(),
		{num} = req.body;

	if(num) {
		res.send(actsData.find(act => act.code_1c == num));
	}
});

router.delete('/api/acts', (req, res) => {
	const actsData = getActsFromDB(),
		{code} = req.body,
		updatedData = actsData.filter(act => act.code_1c !== code);

	setActsToDB(updatedData);

	res.sendStatus(204);
});

function getActsFromDB() {
	return JSON.parse(fs.readFileSync(config.get('database.acts'), 'utf8'));
}

function setActsToDB(actsData) {
	fs.writeFileSync(config.get('database.acts'), JSON.stringify(actsData));
}

module.exports = router;
