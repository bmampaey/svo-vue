<template>
	<b-container fluid>
		<app-menu></app-menu>
		<dataset :initial-search-filter="searchFilter" class="mt-3"></dataset>
	</b-container>
</template>

<script>
// @ is an alias to /src
import Dataset from '@/components/dataset/Dataset';
import DatasetSearchFilter from '@/services/sda/DatasetSearchFilter';

export default {
	name: 'Datasets',
	components: {
		Dataset
	},
	data: function() {
		return {
			searchFilter: new DatasetSearchFilter()
		};
	}
};
</script>

<style lang="scss"></style>
