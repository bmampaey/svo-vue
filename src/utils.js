import { HEK_EVENT_LIST_SEARCH_PARAMS } from "@/constants";

/* Parse only date string with format YYYY-MM-DD */
export function parseDate(date) {
	if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
		date = new Date(date);
		// Make sure the date is valid
		if (date.getTime() == date.getTime()) {
			return date;
		}
	}
	return null;
}

export function formatDate(date) {
	date = date != null ? new Date(date) : null;
	if (!date) {
		return null;
	}
	let temp = date.toISOString();
	return temp.substring(0, 10) + " " + temp.substring(11, 19);
}

export class HekEventSearchFilter {
	constructor({ eventType = [], eventStartTime = null, eventEndTime = null } = {}) {
		this.eventType = eventType;
		this.eventStartTime = eventStartTime;
		this.eventEndTime = eventEndTime;
	}

	getSearchParams() {
		let searchParams = { ...HEK_EVENT_LIST_SEARCH_PARAMS };

		if (this.eventType && this.eventType.length > 0) {
			searchParams.event_type = this.eventType.join(",");
		}

		if (this.eventStartTime) {
			searchParams.event_starttime = new Date(this.eventStartTime).toISOString();
		}

		if (this.eventEndTime) {
			searchParams.event_endtime = new Date(this.eventEndTime).toISOString();
		}

		return searchParams;
	}
}

export class DatasetSearchFilter {
	constructor({ telescopes = [], characteristics = [], tags = [], minDate = null, maxDate = null, minWavelength = null, maxWavelength = null, search = null } = {}) {
		this.telescopes = telescopes;
		this.characteristics = characteristics;
		this.tags = tags;
		this.minDate = minDate;
		this.maxDate = maxDate;
		this.minWavelength = minWavelength;
		this.maxWavelength = maxWavelength;
		this.search = search;
	}

	getSearchParams() {
		let searchParams = {};

		if (this.telescopes && this.telescopes.length > 0) {
			searchParams.telescope__in = this.telescopes;
		}

		if (this.characteristics && this.characteristics.length > 0) {
			searchParams.characteristics__in = this.characteristics;
		}

		if (this.tags && this.tags.length > 0) {
			searchParams.tags__in = this.tags;
		}

		if (this.minDate) {
			searchParams.date_end__gte = new Date(this.minDate).toISOString();
		}

		if (this.maxDate) {
			searchParams.date_beg__lte = new Date(this.maxDate).toISOString();
		}

		if (this.minWavelength) {
			searchParams.wavemax__gte = this.minWavelength;
		}

		if (this.maxWavelength) {
			searchParams.wavemin__lte = this.maxWavelength;
		}

		if (this.search) {
			searchParams.search = this.search;
		}

		return searchParams;
	}
}
