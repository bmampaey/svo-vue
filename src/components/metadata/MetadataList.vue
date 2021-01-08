<template>
	<b-overlay :show="paginator.loading" rounded="sm">
		<b-table
			ref="metadataListTable"
			:items="paginator.items"
			:fields="fields"
			primary-key="oid"
			select-mode="single"
			:caption="caption"
			empty-text="No metadata correspond to your search criteria"
			small
			hover
			show-empty
			selectable
			@row-selected="showMetadataDetail"
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
			<span class="button-toolbar-spacer"></span>
			<b-pagination v-model="paginator.pageNumber" :total-rows="paginator.totalRows" :per-page="paginator.perPage" :aria-controls="metadataListTableId" limit="5" class="mb-0"></b-pagination>
		</b-button-toolbar>

		<metadata-detail v-if="shownMetadata" ref="metadataDetail" :metadata="shownMetadata" :dataset="dataset"></metadata-detail>
	</b-overlay>
</template>

<script>
import Paginator from '@/services/sda/Paginator';
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
			paginator: new Paginator(this.$SDA[this.dataset.id]),
			selectedMetadata: [],
			shownMetadata: null,
			metadataListTableId: null // for the aria-controls of the table pagination
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
			return this.paginator.items.length > 0 ? 'Click on any row to see data details' : null;
		},
		selectedMetadataEmpty: function() {
			return this.selectedMetadata.length == 0;
		}
	},
	watch: {
		searchFilter: {
			handler: 'updatePaginator',
			immediate: true
		}
	},
	updated: function() {
		// $refs.metadataListTable.$el.id is only available after updated is called
		this.metadataListTableId = this.$refs.metadataListTable.$el.id;
	},
	methods: {
		updatePaginator: function(searchFilter) {
			this.paginator.searchParams = searchFilter.getSearchParams();
			try {
				this.paginator.loadPage(1);
			} catch (error) {
				console.log('TODO updatePaginator error');
			}
		},
		showMetadataDetail: function(selectedRows) {
			// selectedRows is always a list, but it will be empty when clearing selected rows
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
.button-toolbar-spacer {
	flex-grow: 1;
}
</style>
