<template>
	<b-container fluid>
		<app-menu></app-menu>
		<dataset :initial-search-filter="searchFilter" class="mt-3"></dataset>
	</b-container>
</template>

<script>
import Dataset from '@/components/dataset/Dataset';
import DatasetSearchFilter from '@/services/svo/DatasetSearchFilter';

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
