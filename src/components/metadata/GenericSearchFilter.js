export default class GenericSearchFilter {
	constructor({ dateRange = { min: null, max: null }, search = null } = {}) {
		this.dateRange = dateRange;
		this.search = search;
	}

	getSearchParams() {
		let searchParams = new URLSearchParams();

		if (this.dateRange.min) {
			searchParams.set('date_end__gte', this.dateRange.min.toISOString());
		}

		if (this.dateRange.max) {
			searchParams.set('date_beg__lte', this.dateRange.max.toISOString());
		}

		if (this.search) {
			searchParams.set('search', this.search);
		}

		return searchParams;
	}

	deepCopy() {
		return new GenericSearchFilter({
			dateRange: { ...this.dateRange },
			search: this.search
		});
	}

	static fromDatasetSearchFilter(datasetSearchFilter) {
		return new GenericSearchFilter({
			dateRange: { ...datasetSearchFilter.dateRange },
			search: datasetSearchFilter.search
		});
	}
}
