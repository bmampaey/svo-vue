<template>
	<b-container fluid>
		<app-menu></app-menu>
		<hek-event :initial-search-filter="searchFilter"></hek-event>
	</b-container>
</template>

<script>
// @ is an alias to /src
import AppMenu from '@/components/AppMenu.vue';
import HekEvent from '@/components/HekEvent.vue';
import HekEventSearchFilter from '@/services/hek/EventSearchFilter';

export default {
	name: 'HekEvents',
	components: {
		AppMenu,
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
