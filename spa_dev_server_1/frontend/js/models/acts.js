class Acts {
	async getActsList(cookie) {
		const acts = await fetch(`http://localhost:3000/api/acts?id=${cookie}`);

		return await acts.json();
	}

	async getActsNum(num, cookie) {
		const acts = await fetch(`http://localhost:3000/api/acts?id=${cookie}`, {
			method: 'POST',
			headers: {'Content-Type' : 'application/json'},
			body: JSON.stringify({num})
		});

		return await acts.json();
	}

	async removeAct(code, cookie) {
		await fetch(`http://localhost:3000/api/acts?id=${cookie}`, {
			method: 'DELETE',
			headers: {'Content-Type' : 'application/json'},
			body: JSON.stringify({code})
		});
	}
}

export default Acts;
