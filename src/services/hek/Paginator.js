export default class Paginator {
	#pageNumber = 1;

	constructor(api, searchParams = null, perPage = 10) {
		this.api = api;
		this.searchParams = searchParams;
		this.perPage = perPage;
		this.totalRows = 0;
		this.items = [];
		this.loading = false;
	}

	get pageNumber() {
		return this.#pageNumber;
	}

	set pageNumber(pageNumber) {
		this.loadPage(pageNumber);
	}

	async loadPage(pageNumber) {
		this.loading = true;
		this.items = await this.api.getPaginated(this.searchParams, this.perPage, pageNumber);
		// We don't know how many events there is, so
		// if we received less events than requested, it is the last page
		// Else there is maybe 1 or more page left
		if (this.items.length < this.perPage) {
			this.totalRows = pageNumber * this.perPage - 1;
		} else {
			this.totalRows = pageNumber * this.perPage + 1;
		}
		this.#pageNumber = pageNumber;
		this.loading = false;
	}
}
