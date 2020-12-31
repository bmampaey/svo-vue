<template>
	<b-overlay :show="loading" rounded="sm">
		<b-table-simple small hover>
			<thead>
				<tr>
					<th></th>
					<th>Dataset</th>
					<th># Items</th>
					<th>Instrument</th>
					<th>Telescope</th>
					<th>Characteristics</th>
				</tr>
			</thead>
			<tfoot>
				<tr>
					<td v-if="nonEmptyDatasets.length > 0" class="text-center small" colspan="100">
						Click on any row to see dataset content or refine search
					</td>
					<td v-else class="text-center text-warning" colspan="100">
						No dataset correspond to your search criteria
					</td>
				</tr>
			</tfoot>
			<tbody>
				<tr v-for="dataset in nonEmptyDatasets" :key="dataset.id" role="button" @click="showDatasetDetail(dataset, $event)">
					<td>
						<b-form-checkbox v-model="selectedDatasets" :value="dataset.id" size="lg"></b-form-checkbox>
					</td>
					<td>{{ dataset.name }}</td>
					<td>{{ dataset.metadata.number_items }}</td>
					<td>{{ dataset.instrument }}</td>
					<td>{{ dataset.telescope }}</td>
					<td>{{ characteristicsAsList(dataset.characteristics) }}</td>
				</tr>
			</tbody>
		</b-table-simple>
		<div>
			<b-button :disabled="selectedDatasetsEmpty" variant="primary" title="Select one or more dataset to create or update a data selection" @click="saveSelection">Save selection</b-button>
		</div>
		<dataset-detail v-if="shownDataset" ref="datasetDetail" :dataset="shownDataset" :search-filter="searchFilter"></dataset-detail>
	</b-overlay>
</template>

<script>
import DatasetSearchFilter from '@/services/sda/DatasetSearchFilter';
import DatasetDetail from '@/components/DatasetDetail.vue';

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
		showDatasetDetail: function(dataset, event) {
			if (event.target instanceof HTMLTableCellElement) {
				// replace by this.shownDatasetId = getDataset(dataset.id).then(this.$refs.datasetDetail.show())
				this.shownDataset = dataset;
				// Make sure the component is rendered before calling show
				this.$nextTick(function() {
					this.$refs.datasetDetail.show();
				});
			}
		},
		saveSelection: function() {
			console.log('TODO save selection');
		},
		characteristicsAsList: function(characteristics) {
			return characteristics.map(characteristic => characteristic.name).join(', ');
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
