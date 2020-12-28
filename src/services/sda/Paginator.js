export default class Paginator {
	constructor(service, searchParams, data) {
		this.service = service;
		this.searchParams = searchParams;
		this.objects = data.objects;
		this.meta = data.meta;
	}
	get has_next() {
		return this.meta.next != null;
	}
	get has_previous() {
		return this.meta.previous != null;
	}
	get page_number() {
		return this.meta.limit > 0 ? Math.floor(this.meta.offset / this.meta.limit) + 1 : 1;
	}
	get page_count() {
		return this.meta.limit > 0 ? Math.ceil(this.meta.total_count / this.meta.limit) : 1;
	}
	load_next_page() {
		if (this.has_next) {
			return this.service;
		}
	}
	load_previous_page() {
		if (this.has_previous) {
			return this.service;
		}
	}
}
