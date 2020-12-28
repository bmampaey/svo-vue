import Paginator from "./Paginator";

export default class Service {
	constructor(api, url) {
		this.api = api;
		this.url = url;
	}

	async all(searchParams = {}) {
		let params = new URLSearchParams({ ...searchParams, limit: 0 });
		let response = await this.api.axios.get(this.url, { params: params });
		return response.data;
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
