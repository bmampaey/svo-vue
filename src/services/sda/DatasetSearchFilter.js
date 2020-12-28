export default class DatasetSearchFilter {
	constructor({ telescopes = [], characteristics = [], tags = [], dateRange = { min: null, max: null }, wavelengthRange = { min: null, max: null }, search = null } = {}) {
		this.telescopes = telescopes;
		this.characteristics = characteristics;
		this.tags = tags;
		this.dateRange = dateRange;
		this.wavelengthRange = wavelengthRange;
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

		if (this.dateRange.min) {
			searchParams.date_end__gte = new Date(this.dateRange.min).toISOString();
		}

		if (this.dateRange.max) {
			searchParams.date_beg__lte = new Date(this.dateRange.max).toISOString();
		}

		if (this.wavelengthRange.min) {
			searchParams.wavemax__gte = this.wavelengthRange.min;
		}

		if (this.wavelengthRange.max) {
			searchParams.wavemin__lte = this.wavelengthRange.max;
		}

		if (this.search) {
			searchParams.search = this.search;
		}

		return searchParams;
	}

	deepCopy() {
		return new DatasetSearchFilter({
			telescopes: [...this.telescopes],
			characteristics: [...this.characteristics],
			tags: [...this.tags],
			dateRange: { ...this.dateRange },
			wavelengthRange: { ...this.wavelengthRange },
			search: this.search
		});
	}
}
