<template>
	<div>
		<b-overlay :show="metadataPaginator.loading" rounded="sm">
			<b-table
				:id="metadataPaginator.ariaControl"
				ref="metadataTable"
				:items="metadataPaginator.items"
				:fields="metadataTableFields"
				:caption="metadataTableCaption"
				primary-key="oid"
				select-mode="single"
				empty-text="No metadata correspond to your search criteria"
				small
				hover
				show-empty
				selectable
				@row-selected="showMetadataDetailModal"
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
				<b-button :disabled="selectedMetadataEmpty" variant="primary" title="Select one or more metadata to create or update a data selection" @click="saveSelection"
					>Save selection ({{ selectedMetadata.length }})</b-button
				>
				<b-button variant="primary" title="Create or update a data selection with all metadata" @click="saveAll">Save all</b-button>
				<b-button :disabled="selectedMetadataEmpty" title="Select one or more metadata to search for overlapping data" @click="searchOverlappingDatasets">Search overlapping</b-button>
				<span class="button-toolbar-spacer"></span>
				<b-pagination
					v-model="metadataPaginator.pageNumber"
					:total-rows="metadataPaginator.totalRows"
					:per-page="metadataPaginator.perPage"
					:aria-controls="metadataPaginator.ariaControl"
					limit="5"
					class="mb-0"
				></b-pagination>
			</b-button-toolbar>
		</b-overlay>

		<b-modal ref="metadataDetailModal" size="md" :title="metadataDetailModalTitle" hide-footer>
			<metadata-detail v-if="metadataDetailModalMetadata" :metadata="metadataDetailModalMetadata"></metadata-detail>
		</b-modal>
	</div>
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
			metadataPaginator: new Paginator(this.$SDA[this.dataset.id]),
			selectedMetadata: [],
			metadataDetailModalTitle: this.dataset.name,
			metadataDetailModalMetadata: null
		};
	},
	computed: {
		metadataTableFields: function() {
			return [
				{ key: 'checkbox', label: '' },
				{
					key: 'download_button',
					label: 'Download',
					formatter: (value, index, metadata) => (metadata.data_location.offline ? null : metadata.data_location.file_url)
				},
				...this.columns,
				{ key: 'tags', label: 'Tags', formatter: tags => tags.map(tag => tag.name).join(', ') }
			];
		},
		metadataTableCaption: function() {
			return this.metadataPaginator.items.length > 0 ? 'Click on any row to see data details' : null;
		},
		selectedMetadataEmpty: function() {
			return this.selectedMetadata.length == 0;
		}
	},
	watch: {
		searchFilter: {
			handler: 'updateMetadataPaginator',
			immediate: true
		}
	},
	methods: {
		updateMetadataPaginator: function(searchFilter) {
			this.metadataPaginator.searchParams = searchFilter.getSearchParams();
			try {
				this.metadataPaginator.loadPage(1);
				this.selectedMetadata = [];
			} catch (error) {
				console.log('TODO updateMetadataPaginator error');
			}
		},
		showMetadataDetailModal: function(selectedRows) {
			// selectedRows is always a list, but it will be empty when clearing selected rows
			if (selectedRows.length > 0) {
				this.metadataDetailModalMetadata = selectedRows[0];
				// Clear the selection so that the row can be selected again
				this.$refs.metadataTable.clearSelected();
				// Make sure the component is rendered before calling show
				this.$nextTick(function() {
					this.$refs.metadataDetailModal.show();
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
<style scoped lang="scss"></style>
