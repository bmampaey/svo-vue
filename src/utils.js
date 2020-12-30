import Vue from 'vue';

Vue.prototype.$utils = {
	parseDate: function parseDate(date) {
		/* Parse only date string with format YYYY-MM-DD */
		if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
			date = new Date(date);
			// Make sure the date is valid, if it isn't getTime will return NaN
			if (date.getTime() == date.getTime()) {
				return date;
			}
		}
		return null;
	},
	formatDate: function(date) {
		if (!date) {
			return date;
		} else if (!(date instanceof Date)) {
			date = new Date(date);
		}

		let temp = date.toISOString();
		return temp.substring(0, 10) + ' ' + temp.substring(11, 19);
	}
};
