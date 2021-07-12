/* The API makes the requests to the SVO server and manages authentication */

import axios from 'axios';
// import Resource from './Resource';
import UserResource from './UserResource';

export default class Api {
	#isSetup = false;

	constructor(server, apiUrl, timeout = 15000) {
		this.server = server;
		this.apiUrl = apiUrl;
		this.axios = axios.create({
			baseURL: server,
			timeout: timeout
		});
	}

	setAuthorization(config) {
		if (this.user.isAuthenticated) {
			config.headers.common['Authorization'] = `ApiKey ${this.user.email}:${this.user.apiKey}`;
			return config;
		}
	}

	async setup() {
		if (!this.#isSetup) {
			let response = await this.axios.get(this.apiUrl);
			this.resourceUris = Object.fromEntries(Object.entries(response.data).map(([key, value]) => [key, value['list_endpoint']]));
			this.user = new UserResource(this, this.resourceUris.user);
			this.axios.interceptors.request.use(config => this.setAuthorization(config), null, { synchronous: true });
			this.#isSetup = true;
		}
	}
	// let telescopes = await this.telescope.getAll();
	// let characteristics = await this.characteristic.getAll();
	// let tags = await this.tag.getAll();
	// this.telescopeOptions = telescopes.map(telescope => ({ value: telescope.name, text: telescope.name })).sort();
	// this.characteristicOptions = characteristics.map(characteristic => ({ value: characteristic.name, text: characteristic.name }));
	// this.tagOptions = tags.map(tag => ({ value: tag.name, text: tag.name }));

	parseError(error) {
		if (error.response) {
			// The request was made and the server responded with a status code
			// that falls out of the range of 2xx
			if (error.response.data.error) {
				return error.response.data.error;
			} else {
				return error.response.data;
			}
			
		} else {
			// The request was made but no response was received
			// Or something happened in setting up the request that triggered an Error
			return 'An unknown error happened, please retry or contact the site administrator';
		}
	}
}
