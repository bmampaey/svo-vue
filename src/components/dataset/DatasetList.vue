<template>
	<b-overlay :show="loading" rounded="sm">
		<b-table
			ref="datasetListTable"
			:items="nonEmptyDatasets"
			:fields="fields"
			primary-key="id"
			select-mode="single"
			:caption="caption"
			empty-text="No dataset correspond to your search criteria"
			small
			hover
			show-empty
			selectable
			@row-selected="onRowSelected"
		>
			<template #cell(checkbox)="data">
				<b-form-checkbox v-model="selectedDatasets" :value="data.item.id" size="lg"></b-form-checkbox>
			</template>
		</b-table>

		<b-button-toolbar key-nav>
			<b-button :disabled="selectedDatasetsEmpty" variant="primary" title="Select one or more dataset to create or update a data selection" @click="saveSelection">Save selection</b-button>
		</b-button-toolbar>

		<dataset-detail v-if="shownDataset" ref="datasetDetail" :dataset="shownDataset" :search-filter="searchFilter"></dataset-detail>
	</b-overlay>
</template>

<script>
import DatasetSearchFilter from '@/services/sda/DatasetSearchFilter';
import DatasetDetail from './DatasetDetail.vue';

export default {
	name: 'DatasetList',
	components: {
		DatasetDetail
	},
	props: {
		searchFilter: { type: DatasetSearchFilter, required: true }
	},
	data: function() {
		return {
			datasetList: [],
			selectedDatasets: [],
			shownDataset: null,
			loading: true
		};
	},
	computed: {
		nonEmptyDatasets: function() {
			return this.datasetList.filter(dataset => dataset.metadata && dataset.metadata.number_items > 0);
		},
		fields: function() {
			return [
				{ key: 'checkbox', label: '' },
				{ key: 'name', label: 'Dataset' },
				{ key: 'metadata', label: '# Items', formatter: metadata => metadata.number_items },
				{ key: 'instrument', label: 'Instrument' },
				{ key: 'telescope', label: 'Telescope' },
				{ key: 'characteristics', label: 'Characteristics', formatter: characteristics => characteristics.map(characteristic => characteristic.name).join(', ') }
			];
		},
		caption: function() {
			return this.nonEmptyDatasets.length > 0 ? 'Click on any row to see dataset content or refine search' : null;
		},
		selectedDatasetsEmpty: function() {
			return this.selectedDatasets.length == 0;
		}
	},
	watch: {
		searchFilter: {
			handler: 'updateDatasetList',
			immediate: true
		}
	},
	methods: {
		updateDatasetList: async function(searchFilter) {
			this.loading = true;
			try {
				this.datasetList = await this.$SDA.dataset.all(searchFilter.getSearchParams());
			} catch (error) {
				console.log('TODO updateDatasetList error');
			}
			this.loading = false;
		},
		onRowSelected: function(selectedRows) {
			if (selectedRows.length > 0) {
				this.shownDataset = selectedRows[0];
				// Clear the selection so that the row can be selected again
				this.$refs.datasetListTable.clearSelected();
				// Make sure the component is rendered before calling show
				this.$nextTick(function() {
					this.$refs.datasetDetail.show();
				});
			}
		},
		saveSelection: function() {
			console.log('TODO save selection');
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
