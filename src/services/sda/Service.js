/* The Service makes the requests to the SDA server for a particular resource */

export default class Service {
	constructor(api, resourceUrl) {
		this.api = api;
		this.resourceUrl = resourceUrl;
	}

	async getAll(searchParams = null) {
		searchParams = new URLSearchParams(searchParams);
		searchParams.set('limit', 0);
		let response = await this.api.axios.get(this.resourceUrl, { params: searchParams });
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
		let response = await this.api.axios.get(this.resourceUrl, { params: searchParams });
		return response.data;
	}
	// get(id) {}
	// create(data) {}
	// update(data) {}
	async delete(resourceUri) {
		return await this.api.axios.delete(resourceUri);
	}
}
