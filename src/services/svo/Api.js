/* The API makes the requests to the SVO server and manages authentication */

import axios from 'axios';
import Resource from './Resource';
import UserResource from './UserResource';

export default class Api {
	#isSetup = false;

	constructor(server, apiUrl, timeout = 15000) {
		this.server = server;
		this.apiUrl = apiUrl;
		this.resourceUris = {};
		this.axios = axios.create({
			baseURL: server,
			timeout: timeout
		});
		this.authenticatedAxios = axios.create({
			baseURL: server,
			timeout: timeout
		});
		this.authenticatedAxios.interceptors.request.use(config => this.setAuthentication(config), null, { synchronous: true });
	}

	async setup() {
		if (!this.#isSetup) {
			// The api URL will list all the resources and their URIs (or list endpoint)
			let response = await this.axios.get(this.apiUrl);
			// For each resource, add the URI and create a Resource object
			// passing an authenticated axios instance to it so that all request have the proper headers set
			for (const [name, value] of Object.entries(response.data)) {
				let uri = value['list_endpoint'];
				this.resourceUris[name] = uri;
				this[name] = new Resource(this.authenticatedAxios, uri);
			}
			// Override the user resource with the adhoc UserResource, authentication is managed by the UserResource itself
			this.user = new UserResource(this.axios, this.resourceUris.user);
			this.#isSetup = true;
		}
	}

	setAuthentication(config) {
		if (this.user.isAuthenticated) {
			config.headers.common['Authorization'] = `ApiKey ${this.user.email}:${this.user.apiKey}`;
			return config;
		}
		// TODO howto reject if not user.isAuthenticated
	}

	parseError(error) {
		if (error.response) {
			// The request was made and the server responded with a status code that falls out of the range of 2xx
			// Most of the time, the SVO api will return an error as JSON object with an error attribute
			if (error.response.data.error) {
				return error.response.data.error;
			} else {
				return error.response.data;
			}
		} else {
			// The request was made but no response was received
			// or something happened in setting up the request that triggered an Error
			return 'An unknown error happened, please retry or contact the site administrator';
		}
	}
}
