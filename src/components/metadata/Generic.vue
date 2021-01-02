<template>
	<b-row>
		<b-col cols="4">
			<b-form @submit.prevent="onSubmit">
				<base-datetime-range v-model="searchFilter.dateRange" label="Observation date" min-label="Start" max-label="End"></base-datetime-range>
				<b-button type="submit" variant="primary">Search</b-button>
			</b-form>
		</b-col>
		<b-col cols="8">
			<metadata-list :dataset="dataset" :columns="columns" :search-filter="searchFilter"></metadata-list>
		</b-col>
	</b-row>
</template>

<script>
import GenericSearchFilter from './GenericSearchFilter';

export default {
	name: 'GenericSearchFilter',
	props: {
		dataset: { type: Object, required: true },
		initialSearchFilter: { type: Object, required: true }
	},
	data: function() {
		return {
			searchFilter: GenericSearchFilter.fromDatasetSearchFilter(this.initialSearchFilter),
			columns: [
				{ label: 'Observation date', key: 'date_beg', formatter: this.$utils.formatDate },
				{ label: 'Wavelength', key: 'wavemin' }
			]
		};
	},
	methods: {
		onSubmit: function() {
			console.log('TODO update list');
		}
	}
};
</script>

<style lang="scss"></style>
