/* The User manages the local storage information needed for the authentication with the SVO API */

export default class User {
	constructor({ name, email, apiKey } = {}) {
		Object.assign(this, { name, email, apiKey });
	}

	static getFromLocalStorage() {
		return new User({
			name: window.localStorage.getItem('userName'),
			email: window.localStorage.getItem('userEmail'),
			apiKey: window.localStorage.getItem('userApiKey')
		});
	}

	update({ name, email, apiKey } = {}) {
		if (name !== undefined) {
			this.name = name;
			window.localStorage.setItem('userName', name);
		}
		if (email !== undefined) {
			this.email = email;
			window.localStorage.setItem('userEmail', email);
		}
		if (apiKey !== undefined) {
			this.apiKey = apiKey;
			window.localStorage.setItem('userApiKey', apiKey);
		}
	}

	delete() {
		Object.assign(this, { name: null, email: null, apiKey: null });
		window.localStorage.removeItem('userName');
		window.localStorage.removeItem('userEmail');
		window.localStorage.removeItem('userApiKey');
	}

	get isAuthenticated() {
		return this.email && this.apiKey;
	}
}
