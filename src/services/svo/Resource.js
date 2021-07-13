/* Resource makes the requests to the SVO api for a particular resource */

export default class Resource {
	constructor(axios, resourceUri) {
		this.axios = axios;
		this.resourceUri = resourceUri;
	}

	async getAll(searchParams = null) {
		searchParams = new URLSearchParams(searchParams);
		searchParams.set('limit', 0);
		let response = await this.axios.get(this.resourceUri, { params: searchParams });
		return response.data.objects;
	}
	// TODO rename to getPaginator (if we really need it)
	async getPaginated(searchParams = null, limit = null, offset = 0) {
		searchParams = new URLSearchParams(searchParams);
		if (limit) {
			searchParams.set('limit', limit);
		}
		if (offset) {
			searchParams.set('offset', offset);
		}
		let response = await this.axios.get(this.resourceUri, { params: searchParams });
		return response.data;
	}

	async create(data) {
		console.debug('create', data);
		let response = await this.axios.post(this.resourceUri, data);
		return response.data;
	}

	async update(resourceUri, data) {
		console.debug('update', data);
		let response = await this.axios.patch(resourceUri, data);
		return response.data;
	}

	async delete(resourceUri) {
		return await this.axios.delete(resourceUri);
	}
}
