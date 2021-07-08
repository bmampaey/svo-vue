/* The Service makes the requests to the SVO server for a particular resource */

export default class Service {
	constructor(api, resourceUri) {
		this.api = api;
		this.resourceUri = resourceUri;
	}

	async getAll(searchParams = null) {
		searchParams = new URLSearchParams(searchParams);
		searchParams.set('limit', 0);
		let response = await this.api.axios.get(this.resourceUri, { params: searchParams });
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
		let response = await this.api.axios.get(this.resourceUri, { params: searchParams });
		return response.data;
	}

	async create(data) {
		console.log('create', data);
		let response = await this.api.axios.post(this.resourceUri, data);
		return response.data;
	}
	
	async update(resourceUri, data) {
		console.log('update', data);
		let response = await this.api.axios.patch(resourceUri, data);
		return response.data;
	}
	
	async delete(resourceUri) {
		return await this.api.axios.delete(resourceUri);
	}
}
