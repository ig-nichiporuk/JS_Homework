class Acts {
	async getActsList() {
		const acts = await fetch('http://localhost:3000/api/acts');

		return await acts.json();
	}

	async getActsNum(num) {
		const acts = await fetch('http://localhost:3000/api/acts', {
			method: 'POST',
			headers: {'Content-Type' : 'application/json'},
			body: JSON.stringify({num})
		});

		return await acts.json();
	}

	async removeAct(code) {
		await fetch('http://localhost:3000/api/acts', {
			method: 'DELETE',
			headers: {'Content-Type' : 'application/json'},
			body: JSON.stringify({code})
		});
	}
}

export default Acts;
