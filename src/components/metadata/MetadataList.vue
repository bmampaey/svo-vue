<template>
	<b-overlay :show="loading" rounded="sm">
		<b-table
			ref="metadataListTable"
			:items="metadataList"
			:fields="fields"
			primary-key="oid"
			select-mode="single"
			:caption="caption"
			empty-text="No metadata correspond to your search criteria"
			small
			hover
			show-empty
			selectable
			@row-selected="onRowSelected"
		>
			<template #cell(checkbox)="data">
				<b-form-checkbox v-model="selectedMetadata" :value="data.item.oid" size="lg"></b-form-checkbox>
			</template>
			<template #cell(download_button)="data">
				<b-button :href="data.value" target="_blank" title="Download file" size="sm" variant="primary" :disabled="data.item.data_location.offline">
					<b-icon icon="download"></b-icon>
				</b-button>
			</template>
		</b-table>

		<b-button-toolbar key-nav>
			<b-button :disabled="selectedMetadataEmpty" variant="primary" title="Select one or more metadata to create or update a data selection" @click="saveSelection">Save selection</b-button>
			<b-button variant="primary" title="Create or update a data selection with all metadata" @click="saveAll">Save all</b-button>
			<b-button :disabled="selectedMetadataEmpty" title="Select one or more metadata to search for overlapping data" @click="searchOverlappingDatasets">Search overlapping</b-button>
		</b-button-toolbar>

		<metadata-detail v-if="shownMetadata" ref="metadataDetail" :metadata="shownMetadata" :dataset="dataset"></metadata-detail>
	</b-overlay>
</template>

<script>
import MetadataDetail from './MetadataDetail';

export default {
	name: 'MetadataList',
	components: {
		MetadataDetail
	},
	props: {
		dataset: { type: Object, required: true },
		searchFilter: { type: Object, required: true },
		columns: { type: Array, required: true }
	},
	data: function() {
		return {
			metadataList: [],
			selectedMetadata: [],
			shownMetadata: null,
			loading: true
		};
	},
	computed: {
		fields: function() {
			return [
				{ key: 'checkbox', label: '' },
				{ key: 'download_button', label: 'Download', formatter: (value, index, metadata) => (metadata.data_location.offline ? null : metadata.data_location.file_url) },
				...this.columns,
				{ key: 'tags', label: 'Tags', formatter: tags => tags.map(tag => tag.name).join(', ') }
			];
		},
		caption: function() {
			return this.metadataList.length > 0 ? 'Click on any row to see data details' : null;
		},
		selectedMetadataEmpty: function() {
			return this.selectedMetadata.length == 0;
		}
	},
	watch: {
		searchFilter: {
			handler: 'updateMetadataList',
			immediate: true
		}
	},
	methods: {
		updateMetadataList: async function(searchFilter) {
			this.loading = true;
			try {
				this.metadataList = await this.$SDA[this.dataset.id].all(searchFilter.getSearchParams());
			} catch (error) {
				console.log('TODO updateMetadataList error');
			}
			this.loading = false;
		},
		onRowSelected: function(selectedRows) {
			if (selectedRows.length > 0) {
				this.shownMetadata = selectedRows[0];
				// Clear the selection so that the row can be selected again
				this.$refs.metadataListTable.clearSelected();
				// Make sure the component is rendered before calling show
				this.$nextTick(function() {
					this.$refs.metadataDetail.show();
				});
			}
		},
		saveSelection: function() {
			console.log('TODO saveSelection');
		},
		saveAll: function() {
			console.log('TODO saveAll');
		},
		searchOverlappingDatasets: function() {
			console.log('TODO searchOverlappingDatasets');
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
// TODO Should be in global
.btn-toolbar > *:not(:last-child) {
	margin-right: 0.5rem;
}
</style>
