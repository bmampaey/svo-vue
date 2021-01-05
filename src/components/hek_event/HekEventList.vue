<template>
	<b-overlay :show="loading" rounded="sm">
		<b-table
			ref="eventListTable"
			:items="eventList"
			:fields="fields"
			primary-key="kb_archivid"
			select-mode="single"
			:caption="caption"
			empty-text="No event correspond to your search criteria"
			small
			hover
			show-empty
			selectable
			@row-selected="onRowSelected"
		>
			<template #cell(checkbox)="data">
				<b-form-checkbox v-model="selectedEvents" :value="data.item" size="lg"></b-form-checkbox>
			</template>
		</b-table>

		<b-button-toolbar key-nav justify>
			<b-button :disabled="selectedEventsEmpty" variant="primary" title="Select one or more event to search for overlapping data" @click="searchOverlappingDatasets">Search overlapping</b-button>
			<b-pagination
				v-model="pageNumber"
				:total-rows="eventTotalCount"
				:per-page="pageSize"
				aria-controls="hek-event-list-table"
				limit="3"
				class="mb-0"
				hide-goto-end-buttons
				@change="loadPage"
			></b-pagination>
		</b-button-toolbar>

		<hek-event-detail v-if="shownEvent" ref="eventDetail" :event="shownEvent"></hek-event-detail>

		<b-modal ref="datasetModal" size="xl" :title="datasetModalTitle" hide-footer>
			<dataset :initial-search-filter="datasetSearchFilter"></dataset>
		</b-modal>
	</b-overlay>
</template>

<script>
import HekEventSearchFilter from '@/services/hek/EventSearchFilter';
import HekEventDetail from './HekEventDetail';

import DatasetSearchFilter from '@/services/sda/DatasetSearchFilter';
import Dataset from '@/components/dataset/Dataset';


export default {
	name: 'HekEventList',
	components: {
		HekEventDetail,
		Dataset
	},
	props: {
		searchFilter: { type: HekEventSearchFilter, required: true }
	},
	data: function() {
		return {
			eventList: [],
			pageNumber: 1,
			selectedEvents: [],
			shownEvent: null,
			loading: true,
			datasetSearchFilter: new DatasetSearchFilter(),
			datasetModalTitle: 'Datasets'
		};
	},
	computed: {
		fields: function() {
			return [
				{ key: 'checkbox', label: '' },
				{ key: 'type', label: 'Type' },
				{ key: 'startTime', label: 'Start time', formatter: this.$utils.formatDate },
				{ key: 'endTime', label: 'End time', formatter: this.$utils.formatDate }
			];
		},
		caption: function() {
			return this.eventList.length > 0 ? 'Click on any row to see the event details' : null;
		},
		selectedEventsEmpty: function() {
			return this.selectedEvents.length == 0;
		},
		eventTotalCount: function() {
			// We don't know how many events there is, so
			// if we received less events than requested, it is the last page
			// Else there is maybe 1 or more page left
			if (this.eventList.length < this.pageSize) {
				return this.pageNumber * this.pageSize - 1;
			} else {
				return this.pageNumber * this.pageSize + 1;
			}
		},
		pageSize: function() {
			return this.searchFilter.pageSize;
		}
	},
	watch: {
		searchFilter: {
			handler: 'updateEventList',
			immediate: true
		}
	},
	methods: {
		updateEventList: async function(searchFilter, pageNumber = null) {
			this.loading = true;
			try {
				this.eventList = await this.$HEK.searchEvents(searchFilter.getSearchParams(), pageNumber);
			} catch (error) {
				console.log('TODO updateEventList error');
			}
			this.loading = false;
		},
		loadPage: function() {
			this.updateEventList(this.searchFilter, this.pageNumber);
		},
		onRowSelected: function(selectedRows) {
			if (selectedRows.length > 0) {
				this.shownEvent = selectedRows[0];
				// Clear the selection so that the row can be selected again
				this.$refs.eventListTable.clearSelected();
				// Make sure the component is rendered before calling show
				this.$nextTick(function() {
					this.$refs.eventDetail.show();
				});
			}
		},
		searchOverlappingDatasets: function() {
			let selectedEventTypes = new Set(this.selectedEvents.map(event => event.type));
			this.datasetModalTitle = 'Datasets overlapping selected events: ' + Array.from(selectedEventTypes).join(', ');
			this.datasetSearchFilter = new DatasetSearchFilter({
				dateRange: {
					min: new Date(Math.min(...this.selectedEvents.map(e => e.startTime))),
					max: new Date(Math.max(...this.selectedEvents.map(e => e.endTime)))
				},
				search: this.selectedEvents.map(e => '(date_beg__lt = ' + e.endTime.toISOString() + ' and date_end__gt = ' + e.startTime.toISOString() + ')').join(' or ')
			});

			this.$refs.datasetModal.show();
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
