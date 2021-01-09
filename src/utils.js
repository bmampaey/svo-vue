import Vue from 'vue';

// Make utilities function accessible in all Vue components
Vue.prototype.$utils = {
	/* Convert a date string in the format YYYY-MM-DD to a Date object */
	parseDate: function parseDate(date) {
		// Parse only date string with format YYYY-MM-DD
		if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
			date = new Date(date);
			// Make sure the date is valid, if it isn't getTime will return NaN
			if (date.getTime() == date.getTime()) {
				return date;
			}
		}
		return null;
	},
	/* Convert a Date object or anything that can be converted to a Date object to a string in the format YYYY-MM-DD hh:mm:ss */
	formatDate: function(date) {
		if (!date) {
			return date;
		} else if (!(date instanceof Date)) {
			date = new Date(date);
		}

		let temp = date.toISOString();
		return `${temp.substring(0, 10)} ${temp.substring(11, 19)}`;
	}
};
