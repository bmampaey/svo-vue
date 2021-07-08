<template>
	<div>
		<b-overlay :show="loading" rounded="sm">
			<b-table
				ref="dataSelectionGroupTable"
				:items="dataSelectionGroupList"
				:fields="dataSelectionGroupTableFields"
				primary-key="id"
				select-mode="single"
				:caption="dataSelectionGroupTableCaption"
				small
				hover
				selectable
				@row-selected="showDataSelectionGroupDetailModal"
			>
				<template #cell(ftp_button)="data">
					<b-button :href="data.item.ftp_link" target="_blank" size="sm" variant="primary" title="Download selection via ftp">
						<b-icon icon="folder-symlink"></b-icon>
					</b-button>
				</template>
				<template #cell(zip_button)="data">
					<b-button :href="getZipDownloadUrl(data.item)" target="_blank" size="sm" variant="primary" title="Download selection as zip file">
						<b-icon icon="file-earmark-zip"></b-icon>
					</b-button>
				</template>
				<template #cell(delete_button)="data">
					<b-button size="sm" variant="danger" title="Delete data selection" @click="deleteDataSelectionGroup(data.item)">
						<b-icon icon="trash"></b-icon>
					</b-button>
				</template>
			</b-table>
		</b-overlay>
		<b-modal ref="dataSelectionGroupDetailModal" size="xl" :title="dataSelectionGroupDetailModalTitle" hide-footer>
			<data-selection-group-detail v-if="dataSelectionGroupDetailModalDataSelectionGroup" :data-selection-group="dataSelectionGroupDetailModalDataSelectionGroup"></data-selection-group-detail>
		</b-modal>
	</div>
</template>

<script>
import DataSelectionGroupDetail from './DataSelectionGroupDetail';

export default {
	name: 'DataSelectionGroupList',
	components: {
		DataSelectionGroupDetail
	},
	data: function() {
		return {
			dataSelectionGroupList: [],
			dataSelectionGroupDetailModalDataSelectionGroup: null,
			dataSelectionGroupDetailModalTitle: '',
			loading: true
		};
	},
	computed: {
		dataSelectionGroupTableFields: function() {
			return [
				{ key: 'ftp_button', label: 'FTP' },
				{ key: 'zip_button', label: 'ZIP' },
				{ key: 'number_items', label: '# Items' },
				{ key: 'name', label: 'Name' },
				{ key: 'created', label: 'Date of creation', formatter: this.$utils.formatDate },
				{ key: 'updated', label: 'Last update', formatter: this.$utils.formatDate },
				{ key: 'delete_button', label: 'Delete' }
			];
		},
		dataSelectionGroupTableCaption: function() {
			return this.dataSelectionGroupList.length > 0 ? 'Click on any row to see data selection details' : 'You have not saved any data selection yet';
		}
	},
	activated: async function() {
		// Refresh the dataSelectionGroupList each time the view is displayed because the User may have added or deleted dataSelectionGroup since the view was last displayed
		await this.updateDataSelectionGroupList();
	},
	methods: {
		updateDataSelectionGroupList: async function() {
			this.loading = true;
			try {
				this.dataSelectionGroupList = await this.$SVO.data_selection_group.getAll();
			} catch (error) {
				console.log('TODO updateDataSelectionGroupList error');
			}
			this.loading = false;
		},
		showDataSelectionGroupDetailModal: function(selectedRows) {
			// selectedRows is always a list, but it will be empty when clearing selected rows
			if (selectedRows.length > 0) {
				this.dataSelectionGroupDetailModalDataSelectionGroup = selectedRows[0];
				this.dataSelectionGroupDetailModalTitle = this.dataSelectionGroupDetailModalDataSelectionGroup.name;
				// Clear the selection so that the row can be selected again
				this.$refs.dataSelectionGroupTable.clearSelected();
				// Make sure the component is rendered before calling show
				this.$nextTick(function() {
					this.$refs.dataSelectionGroupDetailModal.show();
				});
			}
		},
		deleteDataSelectionGroup: function(dataSelectionGroup) {
			try {
				this.$SVO.data_selection_group.delete(dataSelectionGroup.resource_uri);
				this.dataSelectionGroupList = this.dataSelectionGroupList.filter(v => v.resource_uri != dataSelectionGroup.resource_uri);
			} catch (error) {
				console.log('TODO deleteDataSelectionGroup error');
			}
		},
		getZipDownloadUrl: function(dataSelectionGroup) {
			// TODO make proper
			return '/SVO/data_selection/data_selection_group/download_zip/' + dataSelectionGroup.id;
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
