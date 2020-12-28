import { HEK_EVENT_TYPE_NAMES, HEK_EVENT_LIST_SEARCH_PARAMS } from "@/constants";

const eventTypeOptions = Object.entries(HEK_EVENT_TYPE_NAMES).map(([key, value]) => ({ value: key, text: value }));

export default class EventSearchFilter {
	constructor({ eventType = [], eventTimeRange = { min: null, max: null } } = {}) {
		this.eventType = eventType;
		this.eventTimeRange = eventTimeRange;
		this.eventTypeOptions = eventTypeOptions;
	}

	getSearchParams() {
		let searchParams = { ...HEK_EVENT_LIST_SEARCH_PARAMS };

		if (this.eventType && this.eventType.length > 0) {
			searchParams.event_type = this.eventType.join(",");
		}

		if (this.eventTimeRange.min) {
			searchParams.event_starttime = new Date(this.eventTimeRange.min).toISOString();
		}

		if (this.eventTimeRange.max) {
			searchParams.event_endtime = new Date(this.eventTimeRange.max).toISOString();
		}

		return searchParams;
	}

	deepCopy() {
		return new EventSearchFilter({
			eventType: [...this.eventType],
			eventTimeRange: { ...this.eventTimeRange }
		});
	}
}
