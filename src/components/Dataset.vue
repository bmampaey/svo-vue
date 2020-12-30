<template>
	<div class="row">
		<div class="col-4"><dataset-form v-model="searchFilter"></dataset-form></div>
		<div class="col-8"><dataset-list :search-filter="searchFilter"></dataset-list></div>
	</div>
</template>

<script>
import DatasetSearchFilter from '@/services/sda/DatasetSearchFilter';
import DatasetForm from '@/components/DatasetForm.vue';
import DatasetList from '@/components/DatasetList.vue';

export default {
	name: 'Dataset',
	components: {
		DatasetForm,
		DatasetList
	},
	props: {
		initialSearchFilter: { type: DatasetSearchFilter, required: true }
	},
	data: function() {
		return {
			searchFilter: this.initialSearchFilter
		};
	}
};
</script>

<style lang="scss"></style>
