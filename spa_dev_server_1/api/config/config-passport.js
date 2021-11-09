const passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	fs = require("file-system"),
	config = require("config");

const usersData = getUsersFromDB();

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	console.log('Десериализация ' + id);
	const user = usersData.find(user => user.id == id);
	return done(null, user ? user : false);
});

passport.use(new LocalStrategy({ usernameField: 'email' },
	function(email, password, done) {
		const user = usersData.find(user => (email == user.email && password == user.password));
		return done(null, user ? user : false);
	})
);

function getUsersFromDB() {
	return JSON.parse(fs.readFileSync(config.get('database.users'), 'utf8'));
}