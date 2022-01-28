class Contacts {
	async getContactsList() {
		const contacts = await fetch('http://localhost:4000/api/contacts');

		return await contacts.json();
	}
}

export default Contacts;
