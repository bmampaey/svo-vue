<template>
	<b-overlay :show="loading" rounded="sm">
		<b-form @submit.prevent="onSubmit">
			<b-form-group label="Telescopes" label-for="selected-telescopes">
				<b-form-select v-model="searchFilter.telescopes" :options="telescopeOptions" id="selected-telescopes" multiple></b-form-select>
			</b-form-group>
			<b-form-group label="Characteristics" label-for="selected-characteristics">
				<b-form-select v-model="searchFilter.characteristics" :options="characteristicOptions" id="selected-characteristics" multiple></b-form-select>
			</b-form-group>
			<b-form-group label="Tags" label-for="selected-tags">
				<b-form-select v-model="searchFilter.tags" :options="tagOptions" id="selected-tags" multiple></b-form-select>
			</b-form-group>
			<base-datetime-range v-model="searchFilter.dateRange" label="Observation date" min-label="Start" max-label="End"></base-datetime-range>
			<base-number-range v-model="searchFilter.wavelengthRange" label="Observation wavelength" unit="nm"></base-number-range>
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
			searchFilter: this.value.deepCopy(),
			telescopeOptions: [],
			characteristicOptions: [],
			tagOptions: [],
			loading: true
		};
	},
	methods: {
		onSubmit: function() {
			this.$emit("input", this.searchFilter.deepCopy());
		}
	},
	created: async function() {
		this.loading = true;
		try {
			// TODO Parralelize this and manage errors
			let telescopes = await this.$SDA.telescope.all();
			let characteristics = await this.$SDA.characteristic.all();
			let tags = await this.$SDA.tag.all();
			this.telescopeOptions = telescopes.map(telescope => ({ value: telescope.name, text: telescope.name })).sort();
			this.characteristicOptions = characteristics.map(characteristic => ({ value: characteristic.name, text: characteristic.name }));
			this.tagOptions = tags.map(tag => ({ value: tag.name, text: tag.name }));
		} catch (error) {
			console.log("TODO DatasetForm created error");
		}
		this.loading = false;
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
