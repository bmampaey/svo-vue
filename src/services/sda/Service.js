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

	async create(data) {
		console.log('create', data);
		if (Array.isArray(data)) {
			let response = await this.api.axios.patch(this.resourceUrl, { objects: data });
			return response.objects;
		} else {
			data = [data];
			let response = await this.api.axios.patch(this.resourceUrl, { objects: data });
			return response.objects[0];
		}
	}

	async delete(resourceUri) {
		return await this.api.axios.delete(resourceUri);
	}
}
