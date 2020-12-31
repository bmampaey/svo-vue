import axios from 'axios';
import Service from './Service';
import User from './User';

export default class Api {
	constructor(server, apiUrl, loginUrl, timeout = 15000) {
		this.apiUrl = apiUrl;
		this.loginUrl = loginUrl;
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
			// TODO auth should be done by user.name not user.email
			config.headers.common['Authorization'] = 'ApiKey ' + this.currentUser.email + ':' + this.currentUser.apiKey;
		}
		return config;
	}

	async setup() {
		if (!this.isSetup) {
			let response = await this.axios.get(this.apiUrl);
			for (let service in response.data) {
				this[service] = new Service(this, response.data[service]['list_endpoint']);
			}
			this.isSetup = true;
		}
	}

	async login(email, password) {
		// TODO put login url in constants
		let response = await this.axios.post(this.loginUrl, { email: email, password: password });
		this.currentUser = new User(response.data.name, email, response.data.api_key);
		this.currentUser.saveToLocalStorage();
	}

	async register(email, username, password) {
		// TODO do proper registration
		await this.login(email, password);
	}

	async deleteAccount() {
		console.log('TODO deleteAccount');
	}

	logout() {
		User.delFromLocalStorage();
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