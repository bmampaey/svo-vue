<template>
	<b-row>
		<b-col cols="4">
			<b-form @submit.prevent="updateSearchFilter">
				<base-datetime-range v-model="searchFilter.dateRange" label="Observation date" min-label="Start" max-label="End"></base-datetime-range>
				<b-button type="submit" variant="primary">Search</b-button>
			</b-form>
		</b-col>
		<b-col cols="8">
			<metadata-list :dataset="dataset" :columns="columns" :search-filter="listSearchFilter"></metadata-list>
		</b-col>
	</b-row>
</template>

<script>
import MetadataList from './MetadataList';
import GenericSearchFilter from './GenericSearchFilter';

export default {
	name: 'GenericSearchFilter',
	components: {
		MetadataList
	},
	props: {
		dataset: { type: Object, required: true },
		initialSearchFilter: { type: Object, required: true }
	},
	data: function() {
		let searchFilter = GenericSearchFilter.fromDatasetSearchFilter(this.initialSearchFilter);
		return {
			searchFilter: searchFilter,
			listSearchFilter: searchFilter.deepCopy(),
			columns: [
				{ label: 'Observation date', key: 'date_beg', formatter: this.$utils.formatDate },
				{ label: 'Wavelength', key: 'wavemin' }
			]
		};
	},
	methods: {
		updateSearchFilter: function() {
			// Set a copy of the searchFilter so that local modifications are not visible to the list until the form is submitted
			this.listSearchFilter = this.searchFilter.deepCopy();
		}
	}
};
</script>
