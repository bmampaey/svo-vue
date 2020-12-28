import Vue from "vue";

Vue.prototype.$utils = {
	parseDate: function parseDate(date) {
		/* Parse only date string with format YYYY-MM-DD */
		if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
			date = new Date(date);
			// Make sure the date is valid
			if (date.getTime() == date.getTime()) {
				return date;
			}
		}
		return null;
	},
	formatDate: function(date) {
		if (date instanceof Date) {
			let temp = date.toISOString();
			return temp.substring(0, 10) + " " + temp.substring(11, 19);
		} else {
			return date;
		}
	}
};
