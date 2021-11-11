const express = require('express'),
	router = express.Router(),
	config = require('config'),
	fs = require('file-system'),
	session = require('express-session'),
	FileStore = require('session-file-store')(session),
	passport = require('passport');



router.use(
	session({
		secret: 'MY_SECRET_KEY_BUBALECH',
		store: new FileStore(),
		cookie: {
			path: '/',
			httpOnly: true,
			maxAge: 3600000,
		},
		resave: false,
		saveUninitialized: false,
	})
);
const auth = (req, res, next) => {
	console.log(req);
	if (req.isAuthenticated()) {
		next();
	} else {
		return res.redirect('/');
	}
};
router.post('/api/login', (req, res, next) => {
	passport.authenticate('local', function(err, user) {
		if (err) {
			return next(err);
		}
		if (!user) {
			return res.send({message : 'Укажите правильный email или пароль!'});
		}
		req.logIn(user, function(err) {
			if (err) {
				return next(err);
			}
			return res.send(user);
		});
	})(req, res, next);
});

router.get('/api/logout', (req, res) => {
	req.logOut();
	res.redirect('/');
});

module.exports = router;