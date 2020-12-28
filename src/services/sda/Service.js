import Paginator from "./Paginator";

export default class Service {
	constructor(api, url) {
		this.api = api;
		this.url = url;
	}

	async all(searchParams = {}) {
		searchParams = new URLSearchParams(searchParams);
		searchParams.set("limit", 0);
		let response = await this.api.axios.get(this.url, { params: searchParams });
		return response.data.objects;
	}

	async paginator(searchParams = {}) {
		let response = await this.api.axios.get(this.url, { params: searchParams });
		return new Paginator(this, searchParams, response.data);
	}
	// get(id) {}
	// create(data) {}
	// update(data) {}
	// delete(id) {}
}
