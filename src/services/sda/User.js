export default class User {
	constructor(name, email, apiKey) {
		this.name = name;
		this.email = email;
		this.apiKey = apiKey;
	}

	static getFromLocalStorage() {
		let name = window.localStorage.getItem('userName');
		let email = window.localStorage.getItem('userEmail');
		let apiKey = window.localStorage.getItem('userApiKey');

		if (name && email && apiKey) {
			return new User(name, email, apiKey);
		} else {
			return null;
		}
	}

	static delFromLocalStorage() {
		window.localStorage.removeItem('userName');
		window.localStorage.removeItem('userEmail');
		window.localStorage.removeItem('userApiKey');
	}

	saveToLocalStorage() {
		window.localStorage.setItem('userName', this.name);
		window.localStorage.setItem('userEmail', this.email);
		window.localStorage.setItem('userApiKey', this.apiKey);
	}
}
