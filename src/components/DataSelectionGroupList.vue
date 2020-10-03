<template>
	<div>
		<b-table-simple small hover>
			<thead>
				<tr>
					<th>FTP</th>
					<th>ZIP</th>
					<th># Items</th>
					<th>Name</th>
					<th>Date of creation</th>
					<th>Last update</th>
					<th>Delete</th>
				</tr>
			</thead>
			<tfoot>
				<tr>
					<td v-if="dataSelectionGroups.length > 0" class="text-center small" colspan="100">
						Click on any row to see data selection details
					</td>
					<td v-else class="text-center text-warning" colspan="100">
						You have not saved any data selection yet
					</td>
				</tr>
			</tfoot>
			<tbody>
				<tr v-for="dataSelectionGroup in dataSelectionGroups" :key="dataSelectionGroup.id" @click="showDataSelectionGroupDetail(dataSelectionGroup, $event)" role="button">
					<td>
						<b-button :href="dataSelectionGroup.ftp_link" target="_blank" size="sm" variant="primary" title="Download selection via ftp"><b-icon icon="folder-symlink"></b-icon></b-button>
					</td>
					<td>
						<b-button
							:href="getZipDownloadUrl(dataSelectionGroup)"
							target="_blank"
							size="sm"
							variant="primary"
							title="Download selection as zip file"
							:disabled="dataSelectionGroup.number_items <= 100"
							><b-icon icon="file-earmark-zip"></b-icon
						></b-button>
					</td>
					<td>{{ dataSelectionGroup.number_items }}</td>
					<td>{{ dataSelectionGroup.name }}</td>
					<td>{{ dataSelectionGroup.created | dateFormat }}</td>
					<td>{{ dataSelectionGroup.updated | dateFormat }}</td>
					<td>
						<b-button @click="deleteDataSelectionGroup(dataSelectionGroup)" size="sm" variant="danger" title="Delete data selection"><b-icon icon="trash"></b-icon></b-button>
					</td>
				</tr>
			</tbody>
		</b-table-simple>
		<data-selection-group-detail ref="dataSelectionGroupDetail" v-if="shownDataSelectionGroup" :data-selection-group="shownDataSelectionGroup"></data-selection-group-detail>
	</div>
</template>

<script>
import { data_selection_groups } from "@/test_data";

import DataSelectionGroupDetail from "@/components/DataSelectionGroupDetail.vue";

export default {
	name: "DataSelectionGroupList",
	components: {
		DataSelectionGroupDetail
	},
	data: function() {
		return {
			dataSelectionGroups: data_selection_groups.objects,
			shownDataSelectionGroup: null
		};
	},
	methods: {
		showDataSelectionGroupDetail: function(dataSelectionGroup, $event) {
			if ($event.target instanceof HTMLTableCellElement) {
				this.shownDataSelectionGroup = dataSelectionGroup;
				// Make sure the component is rendered before calling show
				this.$nextTick(function() {
					this.$refs.dataSelectionGroupDetail.show();
				});
			}
		},
		deleteDataSelectionGroup: function(dataSelectionGroup) {
			console.log("TODO: delete", dataSelectionGroup);
		},
		getZipDownloadUrl: function(dataSelectionGroup) {
			// TODO make proper
			return "/SDA/data_selection/data_selection_group/download_zip/" + dataSelectionGroup.id;
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
