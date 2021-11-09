class Auth {
	test(email, password) {
		return new Promise(resolve => {
			const xhr = new XMLHttpRequest();

			xhr.open('POST', 'http://localhost:3000/api/login');
			xhr.setRequestHeader('Content-Type', 'application/json');

			xhr.onload = () => {
				// console.log(resolve);
				resolve(JSON.parse(xhr.response));
			};

			xhr.send(JSON.stringify({
				email,
				password
			}));
		});
	}

	testUsers() {
		return new Promise(resolve => {
			const xhr = new XMLHttpRequest();

			xhr.open('GET', 'http://localhost:3000/api/logout');

			xhr.onload = () => resolve();

			xhr.send();
		});
	}
}

export default Auth;