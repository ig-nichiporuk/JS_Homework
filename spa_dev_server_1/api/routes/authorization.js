const express = require('express'),
	router = express.Router(),
	config = require('config'),
	fs = require('file-system'),
	jwt = require('jsonwebtoken');

const tokenKey = '1a2b-3c4d-5e6f-7g8h';

let refreshTokens = [];



router.use(express.json())
router.use((req, res, next) => {
	if (req.headers.authorization) {
		jwt.verify(
			req.headers.authorization.split(' ')[1],
			tokenKey,
			(err, payload) => {
				if (err) next()
				else if (payload) {
					for (let user of users) {
						if (user.id === payload.id) {
							req.user = user
							next()
						}
					}

					if (!req.user) next()
				}
			}
		)
	}

	next()
})

router.post('/api/auth', (req, res) => {
	const usersData = getUsersFromDB();

	usersData.find(user => {
		if (
			req.body.email === user.email &&
			req.body.password === user.password
		) {
			const accessToken = generateAccessToken(user),
				refreshToken = jwt.sign(user, tokenKey);
			router.use((req, res, next) => {
				next();
			});
			refreshTokens.push(refreshToken);
			return res.status(200).json({
				id: user.id,
				login: user.password,
				accessToken: accessToken,
				refreshToken: refreshToken
			});
		}
	})
});

router.get('/api/users', (req, res) => {
	const usersData = getUsersFromDB();
	console.log(usersData);
	// res.json(usersData.filter(user => user.id === req.user.id))
})





function generateAccessToken(user) {
	return jwt.sign(user, tokenKey, /*{ expiresIn: '15s' }*/)
}

function getUsersFromDB() {
	return JSON.parse(fs.readFileSync(config.get('database.users'), 'utf8'));
}

module.exports = router;