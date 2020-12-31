<template>
	<b-overlay :show="loading" rounded="sm">
		<b-table
			ref="dataSelectionGroupListTable"
			:items="dataSelectionGroupList"
			:fields="fields"
			primary-key="id"
			select-mode="single"
			caption="Click on any row to see data selection details"
			empty-text="You have not saved any data selection yet"
			small
			hover
			show-empty
			selectable
			@row-selected="onRowSelected"
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

		<data-selection-group-detail v-if="shownDataSelectionGroup" ref="dataSelectionGroupDetail" :data-selection-group="shownDataSelectionGroup"></data-selection-group-detail>
	</b-overlay>
</template>

<script>
import DataSelectionGroupDetail from '@/components/DataSelectionGroupDetail.vue';

export default {
	name: 'DataSelectionGroupList',
	components: {
		DataSelectionGroupDetail
	},
	data: function() {
		return {
			dataSelectionGroupList: [],
			shownDataSelectionGroup: null,
			loading: true
		};
	},
	computed: {
		fields: function() {
			return [
				{ key: 'ftp_button', label: 'FTP' },
				{ key: 'zip_button', label: 'ZIP' },
				{ key: 'number_items', label: '# Items' },
				{ key: 'name', label: 'Name' },
				{ key: 'created', label: 'Date of creation', formatter: this.$utils.formatDate },
				{ key: 'updated', label: 'Last update', formatter: this.$utils.formatDate },
				{ key: 'delete_button', label: 'Delete' }
			];
		}
	},
	activated: async function() {
		await this.updatedataSelectionGroupList();
	},
	methods: {
		updatedataSelectionGroupList: async function() {
			this.loading = true;
			try {
				this.dataSelectionGroupList = await this.$SDA.data_selection_group.all();
			} catch (error) {
				console.log('TODO updatedataSelectionGroupList error');
			}
			this.loading = false;
		},
		onRowSelected: function(selectedRows) {
			if (selectedRows.length > 0) {
				this.shownDataSelectionGroup = selectedRows[0];
				// Clear the selection so that the row can be selected again
				this.$refs.dataSelectionGroupListTable.clearSelected();
				// Make sure the component is rendered before calling show
				this.$nextTick(function() {
					this.$refs.dataSelectionGroupDetail.show();
				});
			}
		},
		deleteDataSelectionGroup: function(dataSelectionGroup) {
			console.log('TODO: delete', dataSelectionGroup);
		},
		getZipDownloadUrl: function(dataSelectionGroup) {
			// TODO make proper
			return '/SDA/data_selection/data_selection_group/download_zip/' + dataSelectionGroup.id;
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
