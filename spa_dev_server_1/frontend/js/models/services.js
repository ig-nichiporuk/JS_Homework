class Services {
	getServicesList() {
		return new Promise(resolve => {
			const xhr = new XMLHttpRequest();

			xhr.open('GET', 'http://localhost:3000/api/services');

			xhr.onload = () => resolve(JSON.parse(xhr.response));

			xhr.send();
		});
	}
}

export default Services;
