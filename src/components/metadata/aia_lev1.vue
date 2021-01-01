<template>
	<b-row>
		<b-col cols="4">
			<b-form @submit.prevent="onSubmit">
				<base-datetime-range v-model="localSearchFilter.observationDateRange" label="Observation date" min-label="Start" max-label="End"></base-datetime-range>
				<b-form-group label="Wavelength" label-for="selected-wavelengths">
					<b-form-select id="selected-wavelengths" v-model="localSearchFilter.wavelnth__in" :options="wavelnthOptions" multiple></b-form-select>
				</b-form-group>
				<b-form-group description="Only display data with a quality of 0">
					<b-form-checkbox v-model="localSearchFilter.quality" :value="bestQuality" :unchecked-value="null">Best quality only</b-form-checkbox>
				</b-form-group>
				<b-button type="submit" variant="primary">Search</b-button>
			</b-form>
		</b-col>
		<b-col cols="8">
			<metadata-list :dataset="dataset" :columns="columns" :search-filter="searchFilter"></metadata-list>
		</b-col>
	</b-row>
</template>

<script>
export default {
	name: 'AiaLev1',
	props: {
		dataset: { type: Object, required: true },
		searchFilter: { type: Object, required: true }
	},
	data: function() {
		return {
			localSearchFilter: {
				observationDateRange: { min: null, max: null },
				wavelnth__in: [],
				quality: null
			},
			columns: [
				{ label: 'Observation date', key: 'date_obs' , formatter: this.$utils.formatDate },
				{ label: 'Wavelength (Å)', key: 'wavelnth' },
				{ label: 'Quality', key: 'quality' }
			],
			wavelnth: [94, 131, 171, 193, 211, 304, 335, 1600, 1700, 4500],
			bestQuality: 0
		};
	},
	computed: {
		wavelnthOptions: function() {
			return this.wavelnth.map(w => ({ value: w, text: `${w} Å` }));
		}
	},
	methods: {
		onSubmit: function() {
			console.log('TODO update list');
		}
	}
};
</script>

<style lang="scss"></style>
