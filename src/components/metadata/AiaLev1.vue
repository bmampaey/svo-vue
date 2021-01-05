<template>
	<b-row>
		<b-col cols="4">
			<b-form @submit.prevent="onSubmit">
				<base-datetime-range v-model="searchFilter.dateRange" label="Observation date" min-label="Start" max-label="End"></base-datetime-range>
				<b-form-group label="Wavelength" label-for="wavelengths">
					<b-form-select id="wavelengths" v-model="searchFilter.wavelengths" :options="searchFilter.wavelengthOptions" multiple></b-form-select>
				</b-form-group>
				<b-form-group description="Only display data with a quality of 0">
					<b-form-checkbox v-model="searchFilter.bestQuality">Best quality only</b-form-checkbox>
				</b-form-group>
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
import AiALev1SearchFilter from './AiaLev1SearchFilter';

export default {
	name: 'AiaLev1',
	components: {
		MetadataList
	},
	props: {
		dataset: { type: Object, required: true },
		initialSearchFilter: { type: Object, required: true }
	},
	data: function() {
		let searchFilter = AiALev1SearchFilter.fromDatasetSearchFilter(this.initialSearchFilter);
		return {
			searchFilter: searchFilter,
			listSearchFilter: searchFilter.deepCopy(),
			columns: [
				{ label: 'Observation date', key: 'date_obs', formatter: this.$utils.formatDate },
				{ label: 'Wavelength (Å)', key: 'wavelnth' },
				{ label: 'Quality', key: 'quality' }
			]
		};
	},
	methods: {
		onSubmit: function() {
			this.listSearchFilter = this.searchFilter.deepCopy();
		}
	}
};
</script>

<style lang="scss"></style>
