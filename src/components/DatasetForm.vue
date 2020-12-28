<template>
	<b-overlay :show="loading" rounded="sm">
		<b-form @submit.prevent="onSubmit">
			<b-form-group label="Telescopes" label-for="selected-telescopes">
				<b-form-select v-model="telescopes" :options="telescopeOptions" id="selected-telescopes" multiple></b-form-select>
			</b-form-group>
			<b-form-group label="Characteristics" label-for="selected-characteristics">
				<b-form-select v-model="characteristics" :options="characteristicOptions" id="selected-characteristics" multiple></b-form-select>
			</b-form-group>
			<b-form-group label="Tags" label-for="selected-tags">
				<b-form-select v-model="tags" :options="tagOptions" id="selected-tags" multiple></b-form-select>
			</b-form-group>
			<base-datetime-range v-model="dateRange" label="Observation date" min-label="Start" max-label="End"></base-datetime-range>
			<base-number-range v-model="wavelengthRange" label="Observation wavelength" unit="nm"></base-number-range>
			<b-button type="submit" variant="primary">Search</b-button>
		</b-form>
	</b-overlay>
</template>

<script>
import DatasetSearchFilter from "@/services/sda/DatasetSearchFilter";

export default {
	name: "DatasetForm",
	props: {
		value: { type: DatasetSearchFilter, required: true }
	},
	data: function() {
		return {
			telescopes: [...this.value.telescopes],
			characteristics: [...this.value.characteristics],
			tags: [...this.value.tags],
			dateRange: { min: this.value.minDate, max: this.value.maxDate },
			wavelengthRange: { min: this.value.minWavelength, max: this.value.maxWavelength },
			telescopeOptions: [],
			characteristicOptions: [],
			tagOptions: [],
			loading: true
		};
	},
	methods: {
		onSubmit: function() {
			let searchFilter = new DatasetSearchFilter({
				telescopes: this.telescopes,
				characteristics: this.characteristics,
				tags: this.tags,
				minDate: this.dateRange.min,
				maxDate: this.dateRange.max,
				minWavelength: this.wavelengthRange.min,
				maxWavelength: this.wavelengthRange.max
			});
			this.$emit("input", searchFilter);
		}
	},
	created: async function() {
		this.loading = true;
		// TODO put this in routeur
		await this.$SDA.setup();
		// TODO Parralelize this and manage errors
		let telescopes = await this.$SDA.telescope.all();
		let characteristics = await this.$SDA.characteristic.all();
		let tags = await this.$SDA.tag.all();
		this.telescopeOptions = telescopes.objects.map(telescope => ({ value: telescope.name, text: telescope.name })).sort();
		this.characteristicOptions = characteristics.objects.map(characteristic => ({ value: characteristic.name, text: characteristic.name }));
		this.tagOptions = tags.objects.map(tag => ({ value: tag.name, text: tag.name }));
		this.loading = false;
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
