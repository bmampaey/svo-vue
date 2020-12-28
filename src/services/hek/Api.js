import jsonp from "jsonp-promise";
import Event from "./Event";

export default class Api {
	constructor(apiUrl, timeout = 15000) {
		this.apiUrl = apiUrl;
		this.timeout = timeout;
	}

	async searchEvents(searchParams, pageNumber = null) {
		let url = new URL(this.apiUrl);
		if (pageNumber) {
			searchParams.set("page", pageNumber);
		}
		url.search = searchParams;

		let data = await jsonp(url.href, { timeout: this.timeout }).promise;

		if (data.result instanceof Array) {
			return data.result.map(item => new Event(item));
		} else {
			throw Error("Could not retrieve events");
		}
	}
}
