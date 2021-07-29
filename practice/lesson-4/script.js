var user = {
	'person age' : 34,
}
user.name = 'Igor';
user['person age'] = 29;
for(key in user) {
	console.log(key + ' : ' + user[key]);
}
delete user.name;
console.log('name' in user);
