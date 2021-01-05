const wavelengths = [94, 131, 171, 193, 211, 304, 335, 1600, 1700, 4500];
const wavelengthOptions = wavelengths.map(w => ({ value: w, text: `${w} Å` }));

export default class AiALev1SearchFilter {
	constructor({ dateRange = { min: null, max: null }, wavelengths = [], bestQuality = null, search = null } = {}) {
		this.dateRange = dateRange;
		this.wavelengths = wavelengths;
		this.bestQuality = bestQuality;
		this.search = search;
		this.wavelengthOptions = wavelengthOptions;
	}

	getSearchParams() {
		let searchParams = new URLSearchParams();

		if (this.dateRange.min) {
			searchParams.set('date_end__gte', this.dateRange.min.toISOString());
		}

		if (this.dateRange.max) {
			searchParams.set('date_beg__lte', this.dateRange.max.toISOString());
		}

		for (const wavelength of this.wavelengths) {
			searchParams.append('wavelnth__in', wavelength);
		}

		if (this.bestQuality) {
			searchParams.set('quality', 0);
		}

		if (this.search) {
			searchParams.set('search', this.search);
		}

		return searchParams;
	}

	deepCopy() {
		return new AiALev1SearchFilter({
			dateRange: { ...this.dateRange },
			wavelengths: [...this.wavelengths],
			bestQuality: this.bestQuality,
			search: this.search
		});
	}

	static fromDatasetSearchFilter(datasetSearchFilter) {
		let z = new AiALev1SearchFilter({
			dateRange: { ...datasetSearchFilter.dateRange },
			wavelengths: AiALev1SearchFilter.walengthsInRange(datasetSearchFilter.wavelengthRange),
			search: datasetSearchFilter.search
		});
		console.log(datasetSearchFilter, z);
		return z;
	}

	static walengthsInRange({ min = null, max = null }) {
		if (min != null && max != null) {
			return wavelengths.filter(w => (min == null || w * 10 >= min) && (max == null || w * 10 <= max));
		} else {
			return [];
		}
	}
}
