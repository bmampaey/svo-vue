export default class Service {
	constructor(api, url) {
		this.api = api;
		this.url = url;
	}

	async getAll(searchParams = null) {
		searchParams = new URLSearchParams(searchParams);
		searchParams.set('limit', 0);
		let response = await this.api.axios.get(this.url, { params: searchParams });
		return response.data.objects;
	}

	async getPaginated(searchParams = null, limit = null, offset = 0) {
		searchParams = new URLSearchParams(searchParams);
		if (limit) {
			searchParams.set('limit', limit);
		}
		if (offset) {
			searchParams.set('offset', offset);
		}
		let response = await this.api.axios.get(this.url, { params: searchParams });
		return response.data;
	}
	// get(id) {}
	// create(data) {}
	// update(data) {}
	// delete(id) {}
}
