<template>
	<b-container fluid>
		<app-menu></app-menu>
		<dataset :initial-search-filter="searchFilter"></dataset>
	</b-container>
</template>

<script>
// @ is an alias to /src
import AppMenu from "@/components/AppMenu.vue";
import Dataset from "@/components/Dataset.vue";
import { DatasetSearchFilter } from "@/utils";

export default {
	name: "Datasets",
	components: {
		AppMenu,
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
