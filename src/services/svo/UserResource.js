/* The UserResource is different than the other SVO API resources :
- it uses the basic Authorization and not the ApiKey Authorization, with the email as username
- it only allow operations on the list end point
- the user information is saved in the local storage information to permit the user to stay logged in between sessions
*/

export default class UserResource {
	// Don't make firstName and lastName completely private of vue will not update on change
	_firstName = null;
	_lastName = null;
	#email = null;
	#apiKey = null;

	constructor(api, resourceUri) {
		this.api = api;
		this.resourceUri = resourceUri;
	}

	get firstName() {
		if (!this._firstName) {
			this._firstName = window.localStorage.getItem('userFirstName');
		}
		return this._firstName;
	}

	set firstName(value) {
		this._firstName = value;
		window.localStorage.setItem('userFirstName', value);
	}

	get lastName() {
		if (!this._lastName) {
			this._lastName = window.localStorage.getItem('userLastName');
		}
		return this._lastName;
	}

	set lastName(value) {
		this._lastName = value;
		window.localStorage.setItem('userLastName', value);
	}

	get email() {
		if (!this.#email) {
			this.#email = window.localStorage.getItem('userEmail');
		}
		return this.#email;
	}

	set email(value) {
		this.#email = value;
		window.localStorage.setItem('userEmail', value);
	}

	get apiKey() {
		if (!this.#apiKey) {
			this.#apiKey = window.localStorage.getItem('userApiKey');
		}
		return this.#apiKey;
	}

	set apiKey(value) {
		this.#apiKey = value;
		window.localStorage.setItem('userApiKey', value);
	}

	get fullName() {
		return `${this.firstName} ${this.lastName}`.trim();
	}

	get isAuthenticated() {
		return this.email && this.apiKey ? true : false;
	}

	async logIn(email, password) {
		let authentication = {
			username: email,
			password: password
		};
		let response = await this.api.axios.get(this.resourceUri, {
			auth: authentication
		});
		this.parseResponseData(response.data);
		this.email = email;
	}

	logOut() {
		this.firstName = null;
		this.lastName = null;
		this.email = null;
		this.apiKey = null;
	}

	async register(firstName, lastName, email, password) {
		let data = {
			email: email,
			first_name: firstName,
			last_name: lastName,
			password: password
		};
		let response = await this.api.axios.post(this.resourceUri, data);
		this.parseResponseData(response.data);
		this.email = email;
	}

	async update(firstName, lastName, newPassword, currentPassword) {
		// If password is left blank, then don't update it
		let data = {
			first_name: firstName || '',
			last_name: lastName || '',
			password: newPassword || undefined
		};
		let authentication = {
			username: this.email,
			password: currentPassword
		};
		let response = await this.api.axios.patch(this.resourceUri, data, {
			auth: authentication
		});
		this.parseResponseData(response.data);
	}

	async delete(password) {
		let authentication = {
			username: this.email,
			password: password
		};
		await this.api.axios.delete(this.resourceUri, {
			auth: authentication
		});
		this.logOut();
	}

	parseResponseData(data) {
		this.firstName = data.first_name;
		this.lastName = data.last_name;
		this.apiKey = data.api_key;
	}
}
