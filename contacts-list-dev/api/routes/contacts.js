const express = require('express'),
	router = express.Router(),
	config = require('config'),
	fs = require('file-system');

router.get('/api/contacts',  (req, res) => {
	res.send(getContactsFromDB());
});

function getContactsFromDB() {
	const contacts = JSON.parse(fs.readFileSync(config.get('database.contacts'), 'utf8'));


	return contacts.sort((a, b) => a.surname > b.surname ? 1 : -1);
}

module.exports = router;
