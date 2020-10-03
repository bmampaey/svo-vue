<template>
	<div>
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
				<tr v-for="dataset in nonEmptyDatasets" :key="dataset.id" @click="showDatasetDetail(dataset, $event)" role="button">
					<td>
						<b-form-checkbox v-model="selectedDatasets" :value="dataset.id" size="lg"></b-form-checkbox>
					</td>
					<td>{{ dataset.name }}</td>
					<td>{{ dataset.metadata.number_items }}</td>
					<td>{{ dataset.instrument }}</td>
					<td>{{ dataset.telescope }}</td>
					<td>{{ dataset.characteristics | characteristicsAsList }}</td>
				</tr>
			</tbody>
		</b-table-simple>
		<dataset-detail ref="datasetDetail" v-if="shownDataset" :dataset="shownDataset" :search-filters="searchFilters"></dataset-detail>
	</div>
</template>

<script>
import { datasets } from "@/test_data";
import { DatasetSearchFilter } from "@/utils";

import DatasetDetail from "@/components/DatasetDetail.vue";

export default {
	name: "DatasetList",
	components: {
		DatasetDetail
	},
	props: {
		searchFilters: { type: DatasetSearchFilter, required: true }
	},
	data: function() {
		return {
			datasets: datasets.objects,
			selectedDatasets: [],
			shownDataset: null
		};
	},
	computed: {
		nonEmptyDatasets: function() {
			return this.datasets.filter(dataset => dataset.metadata && dataset.metadata.number_items > 0);
		}
	},
	methods: {
		showDatasetDetail: function(dataset, event) {
			if (event.target instanceof HTMLTableCellElement) {
				// replace by this.shownDatasetId = getDataset(dataset.id).then(this.$refs.datasetDetail.show())
				this.shownDataset = dataset;
				// Make sure the component is rendered before calling show
				this.$nextTick(function() {
					this.$refs.datasetDetail.show();
				});
			}
		}
	},
	filters: {
		characteristicsAsList: function(characteristics) {
			return characteristics.map(characteristic => characteristic.name).join(", ");
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
