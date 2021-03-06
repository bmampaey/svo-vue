/* The EventSearchFilter holds the data for the HEKEventForm and generate corresponding URLSerachParams for the HEK API */

import { HEK_EVENT_TYPE_NAMES } from '@/constants';

const eventTypeOptions = Object.entries(HEK_EVENT_TYPE_NAMES).map(([key, value]) => ({ value: key, text: value }));

export default class EventSearchFilter {
	constructor({ eventType = [], eventTimeRange = { min: null, max: null } } = {}) {
		this.eventType = eventType;
		this.eventTimeRange = eventTimeRange;
		this.eventTypeOptions = eventTypeOptions;
	}

	getSearchParams() {
		let searchParams = new URLSearchParams();

		if (this.eventType && this.eventType.length > 0) {
			searchParams.set('event_type', this.eventType.join(','));
		}

		if (this.eventTimeRange.min) {
			searchParams.set('event_starttime', this.eventTimeRange.min.toISOString());
		}

		if (this.eventTimeRange.max) {
			searchParams.set('event_endtime', this.eventTimeRange.max.toISOString());
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
