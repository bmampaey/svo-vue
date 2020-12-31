<template>
	<b-modal ref="dataSelectionGroupDetail" size="xl" :title="dataSelectionGroup.name" hide-footer>
		<b-table-simple small>
			<thead>
				<tr>
					<th>ZIP</th>
					<th># Items</th>
					<th>Name</th>
					<th>Date of creation</th>
					<th>Delete</th>
				</tr>
			</thead>
			<tfoot>
				<tr>
					<td v-if="dataSelections.length > 0" class="text-center text-warning small" colspan="100">
						The data selection is empty
					</td>
				</tr>
			</tfoot>
			<tbody>
				<tr v-for="dataSelection in dataSelections" :key="dataSelection.id" role="button">
					<td>
						<b-button :href="getZipDownloadUrl(dataSelection)" target="_blank" title="Download selection as zip file" size="sm" variant="primary">
							<b-icon icon="file-earmark-zip"></b-icon>
						</b-button>
					</td>
					<td>{{ dataSelection.number_items }}</td>
					<td>{{ dataSelection.dataset.name }}</td>
					<td>{{ $utils.formatDate(dataSelection.created) }}</td>
					<td>
						<b-button size="sm" variant="danger" title="Delete data selection" @click="deleteDataSelection(dataSelection)"><b-icon icon="trash"></b-icon></b-button>
					</td>
				</tr>
			</tbody>
		</b-table-simple>
	</b-modal>
</template>

<script>
export default {
	name: 'DataSelectionDetail',
	props: {
		dataSelectionGroup: { type: Object, required: true }
	},
	data: function() {
		return {};
	},
	computed: {
		dataSelections: function() {
			return this.dataSelectionGroup.data_selections ? this.dataSelectionGroup.data_selections : [];
		}
	},
	methods: {
		show: function() {
			this.$refs.dataSelectionGroupDetail.show();
		},
		deleteDataSelection: function(dataSelection) {
			console.log('TODO: delete', dataSelection);
		},
		getZipDownloadUrl: function(dataSelection) {
			// TODO make proper (redundant with data selection group)
			return '/SDA/data_selection/data_selection/download_zip/' + dataSelection.id;
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
