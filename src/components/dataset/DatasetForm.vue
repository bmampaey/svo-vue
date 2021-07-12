<template>
	<b-form @submit.prevent="updateSearchFilter">
		<b-form-group label="Telescopes" label-for="telescopes">
			<b-form-select id="telescopes" v-model="searchFilter.telescopes" :options="$SVO.telescopeOptions" multiple></b-form-select>
		</b-form-group>
		<b-form-group label="Characteristics" label-for="characteristics">
			<b-form-select id="characteristics" v-model="searchFilter.characteristics" :options="$SVO.characteristicOptions" multiple></b-form-select>
		</b-form-group>
		<b-form-group label="Tags" label-for="tags">
			<b-form-select id="tags" v-model="searchFilter.tags" :options="$SVO.tagOptions" multiple></b-form-select>
		</b-form-group>
		<base-datetime-range v-model="searchFilter.dateRange" label="Observation date" min-label="Start" max-label="End"></base-datetime-range>
		<base-number-range v-model="searchFilter.wavelengthRange" label="Observation wavelength" unit="nm"></base-number-range>
		<b-button type="submit" variant="primary">Search</b-button>
	</b-form>
</template>

<script>
import DatasetSearchFilter from '@/services/svo/DatasetSearchFilter';

export default {
	name: 'DatasetForm',
	props: {
		value: { type: DatasetSearchFilter, required: true }
	},
	data: function() {
		return {
			searchFilter: this.value.deepCopy()
		};
	},
	methods: {
		updateSearchFilter: function() {
			// Send a copy of the searchFilter so that local modifications are not visible outside until the form is submitted
			this.$emit('input', this.searchFilter.deepCopy());
		}
	}
};
</script>
