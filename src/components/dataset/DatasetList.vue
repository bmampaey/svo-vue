<template>
	<div>
		<b-overlay :show="loading" rounded="sm">
			<b-table
				ref="datasetTable"
				:items="datasetList"
				:fields="datasetTableFields"
				primary-key="id"
				select-mode="single"
				:caption="datasetTableCaption"
				empty-text="No dataset correspond to your search criteria"
				small
				hover
				show-empty
				selectable
				@row-selected="showDatasetDetailModal"
			>
				<template #cell(checkbox)="data">
					<b-form-checkbox v-model="selectedDatasets" :value="data.item.id" size="lg"></b-form-checkbox>
				</template>
			</b-table>

			<b-button-toolbar key-nav>
				<b-button :disabled="selectedDatasetsEmpty" variant="primary" title="Select one or more dataset to create or update a data selection" @click="saveSelection">Save selection</b-button>
			</b-button-toolbar>
		</b-overlay>

		<b-modal ref="datasetDetailModal" size="xl" :title="datasetDetailModalTitle" hide-footer>
			<dataset-detail v-if="datasetDetailModalDataset" :dataset="datasetDetailModalDataset" :search-filter="searchFilter"></dataset-detail>
		</b-modal>
	</div>
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
			datasetDetailModalDataset: null,
			datasetDetailModalTitle: '',
			loading: true
		};
	},
	computed: {
		datasetTableFields: function() {
			return [
				{ key: 'checkbox', label: '' },
				{ key: 'name', label: 'Dataset' },
				{ key: 'metadata', label: '# Items', formatter: metadata => metadata.number_items },
				{ key: 'instrument', label: 'Instrument' },
				{ key: 'telescope', label: 'Telescope' },
				{
					key: 'characteristics',
					label: 'Characteristics',
					formatter: characteristics => characteristics.map(characteristic => characteristic.name).join(', ')
				}
			];
		},
		datasetTableCaption: function() {
			return this.datasetList.length > 0 ? 'Click on any row to see dataset content or refine search' : null;
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
				let datasetList = await this.$SDA.dataset.getAll(searchFilter.getSearchParams());
				// Discard empty datasets
				this.datasetList = datasetList.filter(dataset => dataset.metadata && dataset.metadata.number_items > 0);
			} catch (error) {
				console.log('TODO updateDatasetList error');
			}
			this.loading = false;
		},
		showDatasetDetailModal: function(selectedRows) {
			// selectedRows is always a list, but it will be empty when clearing selected rows
			if (selectedRows.length > 0) {
				this.datasetDetailModalDataset = selectedRows[0];
				this.datasetDetailModalTitle = this.datasetDetailModalDataset.name;
				// Clear the selection so that the row can be selected again
				this.$refs.datasetTable.clearSelected();
				// Make sure the component is rendered before calling show
				this.$nextTick(function() {
					this.$refs.datasetDetailModal.show();
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
