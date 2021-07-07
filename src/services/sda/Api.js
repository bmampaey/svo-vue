/* The API makes the requests to the SDA server and manages authentication */

import axios from 'axios';
import Service from './Service';
import User from './User';

export default class Api {
	constructor(server, apiUrl, authenticationUrl, timeout = 15000) {
		this.apiUrl = apiUrl;
		this.authenticationUrl = authenticationUrl;
		this.currentUser = User.getFromLocalStorage();
		this.isSetup = false;

		this.axios = axios.create({
			baseURL: server,
			timeout: timeout
		});
		this.axios.interceptors.request.use(config => this.setHeaders(config));
	}

	setHeaders(config) {
		if (this.currentUser) {
			config.headers.common['Authorization'] = `ApiKey ${this.currentUser.email}:${this.currentUser.apiKey}`;
		}
		return config;
	}

	async setup() {
		if (!this.isSetup) {
			let response = await this.axios.get(this.apiUrl);
			for (const service in response.data) {
				this[service] = new Service(this, response.data[service]['list_endpoint']);
			}
			let telescopes = await this.telescope.getAll();
			let characteristics = await this.characteristic.getAll();
			let tags = await this.tag.getAll();
			this.telescopeOptions = telescopes.map(telescope => ({ value: telescope.name, text: telescope.name })).sort();
			this.characteristicOptions = characteristics.map(characteristic => ({ value: characteristic.name, text: characteristic.name }));
			this.tagOptions = tags.map(tag => ({ value: tag.name, text: tag.name }));
			this.isSetup = true;
		}
	}

	async logInUser(email, password) {
		// TODO what in case of error
		let authentication = {
			username: email,
			password: password
		};
		let response = await this.axios.get(this.authenticationUrl, {
			auth: authentication
		});
		this.currentUser = new User(response.data.name, email, response.data.api_key);
		this.currentUser.saveToLocalStorage();
	}

	async registerUser(email, firstName, lastName, password) {
		// TODO add first name and last name
		// TODO what in case of error
		let data = {
			email: email,
			first_name: firstName,
			last_name: lastName,
			password: password
		};
		let response = await this.axios.post(this.authenticationUrl, data);
		this.currentUser = new User(response.data.name, email, response.data.api_key);
		this.currentUser.saveToLocalStorage();
	}

	async updateUser(firstName, lastName, oldPassword, newPassword) {
		// TODO
		let data = {
			firstName: firstName,
			lastName: lastName,
			password: newPassword
		};
		let authentication = {
			username: this.currentUser.email,
			password: oldPassword
		};
		let response = await this.axios.patch(this.authenticationUrl, data, {
			auth: authentication
		});
		this.currentUser = new User(response.data.name, this.currentUser.email, response.data.api_key);
		this.currentUser.saveToLocalStorage();
	}

	async deleteUser(password) {
		// TODO what in case of error
		await this.axios.delete(this.authenticationUrl, {
			auth: { username: this.currentUser.email, password: password }
		});
		User.deleteFromLocalStorage();
		this.currentUser = null;
	}

	logOutUser() {
		User.deleteFromLocalStorage();
		this.currentUser = null;
	}

	parseError(error) {
		if (error.response) {
			// The request was made and the server responded with a status code
			// that falls out of the range of 2xx
			return error.response.data;
		} else if (error.request) {
			// The request was made but no response was received
			return 'No response received';
		} else {
			// Something happened in setting up the request that triggered an Error
			return error.message;
		}
	}
}
