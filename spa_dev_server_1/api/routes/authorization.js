const express = require('express'),
	router = express.Router(),
	config = require('config'),
	fs = require('file-system'),
	jwt = require('jsonwebtoken');

const auth = require('../middleware/auth')

const {secret} = require("../secret");

const users = getActsFromDB();

const generateAccessToken = (name, login, is_manager) => {
	const payload = {name, login, is_manager}
	return jwt.sign(payload, secret, /*{expiresIn: "24h"} */)
}


router.post('/api/login',(req, res) => {

	const {email, password} = req.body;

	const user = users.find(user => user.email === email);

	console.log(user);
	if (!user) {
		return res.status(400).json({message: `Пользователь ${username} не найден`})
	}
	const validPassword = users.find(user => user.password = password)
	if (!validPassword) {
		return res.status(400).json({message: `Введен неверный пароль`})
	}
	const token = generateAccessToken(user.name, user.login, user.is_manager)
	return res.json({token, name : user.name, status : user.is_manager})

});


/*router.get('/api/acts', auth, (req, res) => {
	const acts = fs.readFileSync(config.get('database.acts'), 'utf8');

	res.send(JSON.parse(acts));
});*/


function getActsFromDB() {
	return JSON.parse(fs.readFileSync(config.get('database.users'), 'utf8'));
}

module.exports = router;