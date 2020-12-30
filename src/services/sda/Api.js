import axios from "axios";
import Service from "./Service";
import User from "./User";

export default class Api {
	constructor(server, apiUrl, timeout = 15000) {
		this.axios = axios.create({
			baseURL: server,
			timeout: timeout,
			headers: this.headers
		});
		this.apiUrl = apiUrl;
		this.loggedUser = this.getUser();
		this.isSetup = false;
	}

	async setup() {
		if (!this.isSetup) {
			let response = await this.axios.get(this.apiUrl);
			for (let service in response.data) {
				this[service] = new Service(this, response.data[service]["list_endpoint"]);
			}
			this.isSetup = true;
		}
	}

	get headers() {
		if (this.loggedUser) {
			return { ApiKey: this.loggedUser.userName + ":" + this.loggedUser.userApiKey };
		} else {
			return {};
		}
	}

	async login(email, password) {
		// TODO put login url in constants
		let response = await this.axios.post("/SDA/api/v1/user/login/", { email: email, password: password });
		window.localStorage.setItem("userName", response.data.name);
		window.localStorage.setItem("userApiKey", response.data.api_key);
		this.loggedUser = this.getUser();
	}

	async register(email, username, password) {
		// TODO do proper registration
		await this.login(email, password);
	}

	async deleteAccount() {
		console.log("TODO deleteAccount");
	}

	logout() {
		window.localStorage.removeItem("userName");
		window.localStorage.removeItem("userApiKey");
		this.loggedUser = null;
	}

	getUser() {
		let userName = window.localStorage.getItem("userName");
		let userApiKey = window.localStorage.getItem("userApiKey");

		if (userName && userApiKey) {
			return new User(userName, userApiKey);
		} else {
			return null;
		}
	}

	parseError(error) {
		if (error.response) {
			// The request was made and the server responded with a status code
			// that falls out of the range of 2xx
			return error.response.data;
		} else if (error.request) {
			// The request was made but no response was received
			return "No response received";
		} else {
			// Something happened in setting up the request that triggered an Error
			return error.message;
		}
	}
}

// TODO
// - add an update prototype method that does put/patch?
// - save should check if resource_uri is set
// - save static should do patch instead of post with {'objects: [array of resources]}
// - replace $save by create ? no we want $resource like

//class Model {}

// angular
// 	.module("ngTastyResource", ["ngResource"])
// 	.provider("tastyResource", function() {
// 		var provider = this;
//

// 			// default parameter
// 			paramDefaults: {
// 				limit: 0
// 			},

//
// 			// cache request
// 			cache: true,
// 			// by default limit page size to 10
// 			page_size: 10,
//
// 			// make request cancellable
// 			cancellable: true
// 		};
//

//
// 			function resourceFactory(url, _config) {
// 				// merge the default config with the resource config
// 				var config = angular.extend({}, provider.config, _config);
//
// 				// if url is local, append it after the api url
// 				if (url[0] != "/") {
// 					if (config.api_url.charAt(config.api_url.length - 1) != "/") {
// 						url = config.api_url + "/" + url;
// 					} else {
// 						url = config.api_url + url;
// 					}
// 				}
// 				// tastypie url must always end by slash
// 				if (url.charAt(url.length - 1) != "/") {
// 					url += "/";
// 				}
//
// 				// redefine all actions with auth, headers and cache
// 				// and add our special paginator action
// 				var default_actions = {
// 					get: {
// 						method: "GET",
// 						cache: config.cache,
// 						headers: {
// 							Authorization: config.authHeader
// 						},
// 						auth: config.auth
// 					},
// 					query: {
// 						method: "GET",
// 						isArray: true,
// 						cache: config.cache,
// 						transformResponse: transformObjectToList($http),
// 						headers: {
// 							Authorization: config.authHeader
// 						},
// 						auth: config.auth
// 					},
// 					paginator: {
// 						method: "GET",
// 						cache: config.cache,
// 						headers: {
// 							Authorization: config.authHeader
// 						},
// 						auth: config.auth
// 					},
// 					save: {
// 						method: "POST",
// 						headers: {
// 							Authorization: config.authHeader
// 						},
// 						auth: config.auth
// 					},
// 					save_bulk: {
// 						method: "PATCH",
// 						headers: {
// 							Authorization: config.authHeader,
// 							"Content-Type": "application/json"
// 						},
// 						auth: config.auth
// 					},
// 					delete: {
// 						method: "DELETE",
// 						headers: {
// 							Authorization: config.authHeader
// 						},
// 						auth: config.auth
// 					}
// 				};
// 				// allow the user to add/override the actions
// 				var actions = angular.extend(default_actions, config.actions);
//
// 				// create a regular resource with our redefined and special actions
// 				var resource = $resource(url, config.paramDefaults, actions, {
// 					stripTrailingSlashes: false,
// 					cancellable: config.cancellable
// 				});
//
// 				// allow to modify the config a posteriori
// 				resource.config = config;
//
// 				// allow to modify the auth a posteriori
// 				resource.setAuth = function(auth) {
// 					// update the config auth
// 					angular.copy(auth, config.auth);
// 				};
//
// 				// hack the paginator method to return a TastyPaginator instead of a resource on paginator
// 				var original_paginator = resource.paginator;
//
// 				resource.paginator = function(_parameters, _success, _error) {
// 					// add offset and limit to the parameters
// 					var parameters = angular.extend({ limit: config.page_size, offset: 0 }, _parameters);
//
// 					var paginator = new TastyPaginator(resource, parameters);
//
// 					// hack the success function to transform the result
// 					var success = function(data, responseHeaders) {
// 						// convert data objects to resources
// 						var resources = data.objects.map(function(object) {
// 							return new resource(object);
// 						});
// 						// update in place the paginator objects with the resources
// 						Array.prototype.splice.apply(paginator.objects, [0, paginator.objects.length].concat(resources));
//
// 						//update in place the paginator meta info
// 						angular.copy(data.meta, paginator.meta);
//
// 						// call original success
// 						if (_success != undefined) {
// 							_success(data, responseHeaders);
// 						}
// 					};
//
// 					// call the original action with our new success funtion
// 					var result = original_paginator(parameters, success, _error);
// 					// attach the promise to the paginator
// 					paginator.$promise = result.$promise;
//
// 					return paginator;
// 				};
//
// 				return resource;
// 			}
//
// 			return resourceFactory;
// 		};
// 	})
// 	.factory("TastyPaginator", function() {
// 		// Define the constructor function.
// 		function TastyPaginator(resource, search_params, objects, meta) {
// 			this.resource = resource;
// 			this.search_params = search_params;
// 			this.meta = meta || { limit: 0, offset: 0, total_count: 0 };
// 			this.objects = objects || [];
// 		}
// 		TastyPaginator.prototype.page_number = function() {
// 			return this.meta.limit > 0 ? Math.floor(this.meta.offset / this.meta.limit) + 1 : 1;
// 		};
// 		TastyPaginator.prototype.total_count = function() {
// 			return this.meta.total_count;
// 		};
// 		TastyPaginator.prototype.number_pages = function() {
// 			return this.meta.limit > 0 ? Math.ceil(this.meta.total_count / this.meta.limit) : 1;
// 		};
// 		TastyPaginator.prototype.has_next = function() {
// 			return this.meta.next != null;
// 		};
// 		TastyPaginator.prototype.has_previous = function() {
// 			return this.meta.previous != null;
// 		};
// 		TastyPaginator.prototype.next_page_number = function() {
// 			var next_page_number = this.page_number() + 1;
// 			return next_page_number <= this.number_pages() ? next_page_number : null;
// 		};
// 		TastyPaginator.prototype.previous_page_number = function() {
// 			var previous_page_number = this.page_number() - 1;
// 			return previous_page_number > 0 ? previous_page_number : null;
// 		};
// 		TastyPaginator.prototype.page = function(page_number, success, error) {
// 			if (page_number < 1 || page_number > this.number_pages()) {
// 				throw "Invalid page number";
// 			}
// 			var offset = (page_number - 1) * this.meta.limit;
// 			var search_params = angular.extend(this.search_params, { limit: this.meta.limit, offset: offset });
// 			return this.resource.paginator(search_params, success, error);
// 		};
// 		TastyPaginator.prototype.next_page = function(success, error) {
// 			return this.page(this.page_number() + 1, success, error);
// 		};
// 		TastyPaginator.prototype.previous_page = function(success, error) {
// 			return this.page(this.page_number() - 1, success, error);
// 		};
//
// 		return TastyPaginator;
// 	});
