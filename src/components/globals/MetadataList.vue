<template>
	<div>
		<b-table-simple small hover>
			<thead>
				<tr>
					<th><!-- Checkbox --></th>
					<th><!-- Download --></th>
					<th v-for="column in columns" :key="column.field">{{ column.header }}</th>
					<th>Tags</th>
				</tr>
			</thead>
			<tfoot>
				<tr>
					<td v-if="metadataList.length > 0" class="text-center small" colspan="100">
						Click on any row to see data details
					</td>
					<td v-else class="text-center text-warning" colspan="100">
						No metadata correspond to your search criteria
					</td>
				</tr>
			</tfoot>
			<tbody>
				<tr v-for="metadata in metadataList" :key="metadata.oid" role="button" @click="showMetadataDetail(metadata, $event)">
					<td>
						<b-form-checkbox v-model="selectedMetadata" :value="metadata.oid" no-click size="lg"></b-form-checkbox>
					</td>
					<td>
						<b-button :href="getDataDownloadUrl(metadata)" target="_blank" title="Download file" size="sm" variant="primary" :disabled="metadata.data_location.offline">
							<b-icon icon="download"></b-icon>
						</b-button>
					</td>
					<td v-for="column in columns" :key="column.field">{{ metadata[column.field] }}</td>
					<td>{{ tagsAsList(metadata.tags) }}</td>
				</tr>
			</tbody>
		</b-table-simple>
		<metadata-detail v-if="shownMetadata" ref="metadataDetail" :metadata="shownMetadata" :dataset="dataset"></metadata-detail>
	</div>
</template>

<script>
import { metadataList } from '@/test_data';

import MetadataDetail from './MetadataDetail.vue';

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
			metadataList: metadataList.objects,
			selectedMetadata: [],
			shownMetadata: null
		};
	},
	computed: {},
	methods: {
		showMetadataDetail: function(metadata, event) {
			if (event.target instanceof HTMLTableCellElement) {
				this.shownMetadata = metadata;
				// Make sure the component is rendered before calling show
				this.$nextTick(function() {
					this.$refs.metadataDetail.show();
				});
			}
		},
		//TODO should this be defined on a Metadata object ?
		getDataDownloadUrl: function(metadata) {
			// TODO could we return null
			return metadata.data_location.offline ? '#' : metadata.data_location.file_url;
		},
		tagsAsList: function(tags) {
			return tags.map(tag => tag.name).join(', ');
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
