<template>
	<div>
		<b-table ref="dataSelectionTable" :items="dataSelectionList" :fields="dataSelectionTableFields" primary-key="id" empty-text="The data selection is empty" small show-empty>
			<template #cell(zip_button)="data">
				<b-button :href="getZipDownloadUrl(data.item)" target="_blank" size="sm" variant="primary" title="Download selection as zip file">
					<b-icon icon="file-earmark-zip"></b-icon>
				</b-button>
			</template>
			<template #cell(delete_button)="data">
				<b-button size="sm" variant="danger" title="Delete data selection" @click="deleteDataSelection(data.item)">
					<b-icon icon="trash"></b-icon>
				</b-button>
			</template>
		</b-table>
	</div>
</template>

<script>
export default {
	name: 'DataSelectionDetail',
	props: {
		dataSelectionGroup: { type: Object, required: true }
	},
	computed: {
		dataSelectionList: function() {
			return this.dataSelectionGroup.data_selections ? this.dataSelectionGroup.data_selections : [];
		},
		dataSelectionTableFields: function() {
			return [
				{ key: 'zip_button', label: 'ZIP' },
				{ key: 'number_items', label: '# Items' },
				{ key: 'dataset', label: 'Dataset', formatter: dataset => dataset.name },
				{ key: 'created', label: 'Date of creation', formatter: this.$utils.formatDate },
				{ key: 'delete_button', label: 'Delete' }
			];
		}
	},
	methods: {
		deleteDataSelection: function(dataSelection) {
			try {
				this.$SVO.data_selection.delete(dataSelection.resource_uri);
				// TODO you should not change prop
				this.dataSelectionGroup.data_selections = this.dataSelectionGroup.data_selections.filter(v => v.resource_uri != dataSelection.resource_uri);
				this.dataSelectionGroup.number_items -= dataSelection.number_items;
			} catch (error) {
				console.log('TODO deleteDataSelection error');
			}
		},
		getZipDownloadUrl: function(dataSelection) {
			// TODO make proper (redundant with data selection group)
			return '/SVO/data_selection/data_selection/download_zip/' + dataSelection.id;
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
