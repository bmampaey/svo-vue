import Vue from "vue";
import jsonp from "jsonp-promise";
import { HEK_API_URL, HEK_EVENT_DETAIL_SEARCH_PARAMS, HEK_EVENT_TYPE_NAMES } from "@/constants.js";

class HekEvent {
	constructor(data) {
		Object.assign(this, data);
	}

	get type() {
		return HEK_EVENT_TYPE_NAMES[this.event_type] || this.event_type;
	}

	get detailUrl() {
		if (this.kb_archivid) {
			let url = new URL(HEK_API_URL);
			for (const [key, value] of Object.entries(HEK_EVENT_DETAIL_SEARCH_PARAMS)) {
				url.searchParams.set(key, value);
			}
			url.searchParams.set("ivorn", this.kb_archivid);
			return url.href;
		} else {
			return null;
		}
	}
}

class HekApi {
	constructor(apiUrl, timeout = 15000) {
		this.apiUrl = apiUrl;
		this.timeout = timeout;
	}

	async searchEvents(searchParams) {
		let url = new URL(this.apiUrl);
		for (const [key, value] of Object.entries(searchParams)) {
			url.searchParams.set(key, value);
		}

		let data = await jsonp(url.href, { timeout: this.timeout }).promise;

		if (data.result instanceof Array) {
			return data.result.map(item => new HekEvent(item));
		} else {
			throw Error("Could not retrieve events");
		}
	}
}

Vue.prototype.$HEK = new HekApi(HEK_API_URL);
