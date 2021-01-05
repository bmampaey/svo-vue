<template>
	<b-container fluid>
		<app-menu></app-menu>
		<hek-event :initial-search-filter="searchFilter" class="mt-3"></hek-event>
	</b-container>
</template>

<script>
// @ is an alias to /src
import HekEvent from '@/components/hek_event/HekEvent';
import HekEventSearchFilter from '@/services/hek/EventSearchFilter';

export default {
	name: 'HekEvents',
	components: {
		HekEvent
	},
	data: function() {
		return {
			searchFilter: new HekEventSearchFilter()
		};
	}
};
</script>

<style lang="scss"></style>
