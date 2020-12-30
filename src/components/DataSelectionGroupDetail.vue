<template>
	<b-modal ref="dataSelectionGroupDetail" size="xl" :title="dataSelectionGroup.name" hide-footer>
		<b-table-simple small>
			<thead>
				<tr>
					<th>FTP</th>
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
						<b-button :href="getFtpDownloadUrl(dataSelection)" target="_blank" size="sm" variant="primary" title="Download selection via ftp"><b-icon icon="folder-symlink"></b-icon></b-button>
					</td>
					<td>
						<b-button :href="getZipDownloadUrl(dataSelection)" target="_blank" title="Download selection as zip file" size="sm" variant="primary" :disabled="dataSelection.number_items <= 100"
							><b-icon icon="file-earmark-zip"></b-icon
						></b-button>
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
		getZipDownloadUrl: function(dataSelection) {
			// TODO make proper (redundant with data selection group)
			return '/SDA/data_selection/data_selection_group/download_zip/' + dataSelection.id;
		},
		getFtpDownloadUrl: function(dataSelection) {
			// TODO make proper (redundant with data selection group)
			return this.dataSelectionGroup.ftp_link + dataSelection.name;
		},
		deleteDataSelection: function(dataSelection) {
			console.log('TODO: delete', dataSelection);
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
