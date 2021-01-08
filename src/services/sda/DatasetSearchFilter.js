/* The DatasetSearchFilter holds the data for the DatasetForm and generate corresponding URLSerachParams for the SDA API */

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
		let searchParams = new URLSearchParams();

		for (const telescope of this.telescopes) {
			searchParams.append('telescope__in', telescope);
		}

		for (const characteristic of this.characteristics) {
			searchParams.append('characteristics__in', characteristic);
		}

		for (const tag of this.tags) {
			searchParams.append('tags__in', tag);
		}

		if (this.dateRange.min) {
			searchParams.set('date_end__gte', this.dateRange.min.toISOString());
		}

		if (this.dateRange.max) {
			searchParams.set('date_beg__lte', this.dateRange.max.toISOString());
		}

		if (this.wavelengthRange.min) {
			searchParams.set('wavemax__gte', this.wavelengthRange.min);
		}

		if (this.wavelengthRange.max) {
			searchParams.set('wavemin__lte', this.wavelengthRange.max);
		}

		if (this.search) {
			searchParams.set('search', this.search);
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
