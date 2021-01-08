/* The Paginator makes the link between the API, the table and the pagination buttons */

export default class Paginator {
	static #lastId = 0;
	#pageNumber = 1;

	constructor(service, searchParams = null, perPage = 10) {
		this.service = service;
		this.searchParams = searchParams;
		this.perPage = perPage;
		this.totalRows = 0;
		this.items = [];
		this.loading = false;
		this.ariaControl = `__sda_paginator__${++Paginator.#lastId}`;
	}

	get pageNumber() {
		return this.#pageNumber;
	}

	set pageNumber(pageNumber) {
		this.loadPage(pageNumber);
	}

	async loadPage(pageNumber) {
		this.loading = true;
		let data = await this.service.getPaginated(this.searchParams, this.perPage, (pageNumber - 1) * this.perPage);
		this.items = data.objects;
		this.perPage = data.meta.limit;
		this.totalRows = data.meta.total_count;
		this.#pageNumber = this.perPage > 0 ? Math.floor(data.meta.offset / this.perPage) + 1 : 1;
		this.loading = false;
	}
}
