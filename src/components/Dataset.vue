<template>
	<div class="row">
		<div class="col-4"><dataset-form v-model="searchFilters"></dataset-form></div>
		<div class="col-8"><dataset-list :search-filters="searchFilters"></dataset-list></div>
	</div>
</template>

<script>
import { DatasetSearchFilter } from "@/utils";
import DatasetForm from "@/components/DatasetForm.vue";
import DatasetList from "@/components/DatasetList.vue";

export default {
	name: "Dataset",
	components: {
		DatasetForm,
		DatasetList
	},
	props: {
		searchFilters: { type: DatasetSearchFilter, required: true }
	}
};
</script>

<style lang="scss"></style>
