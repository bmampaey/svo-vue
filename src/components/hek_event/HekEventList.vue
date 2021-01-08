<template>
	<b-overlay :show="paginator.loading" rounded="sm">
		<b-table
			ref="eventListTable"
			:items="paginator.items"
			:fields="fields"
			primary-key="id"
			select-mode="single"
			:caption="caption"
			empty-text="No event correspond to your search criteria"
			small
			hover
			show-empty
			selectable
			@row-selected="showEventDetail"
		>
			<template #cell(checkbox)="data">
				<b-form-checkbox v-model="selectedEvents" :value="data.item" size="lg"></b-form-checkbox>
			</template>
		</b-table>

		<b-button-toolbar key-nav>
			<b-button :disabled="selectedEventsEmpty" variant="primary" title="Select one or more event to search for overlapping data" @click="searchOverlappingDatasets">Search overlapping</b-button>
			<span class="button-toolbar-spacer"></span>
			<b-pagination
				v-model="paginator.pageNumber"
				:total-rows="paginator.totalRows"
				:per-page="paginator.perPage"
				:aria-controls="eventListTableId"
				limit="3"
				class="mb-0"
				hide-goto-end-buttons
			></b-pagination>
		</b-button-toolbar>

		<hek-event-detail v-if="shownEvent" ref="eventDetail" :event="shownEvent"></hek-event-detail>

		<b-modal ref="datasetModal" size="xl" :title="datasetModalTitle" hide-footer>
			<dataset :initial-search-filter="datasetSearchFilter"></dataset>
		</b-modal>
	</b-overlay>
</template>

<script>
import Paginator from '@/services/hek/Paginator';
import HekEventSearchFilter from '@/services/hek/EventSearchFilter';
import DatasetSearchFilter from '@/services/sda/DatasetSearchFilter';
import Dataset from '@/components/dataset/Dataset';
import HekEventDetail from './HekEventDetail';

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
			paginator: new Paginator(this.$HEK),
			selectedEvents: [],
			shownEvent: null,
			eventListTableId: null,
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
			return this.paginator.items.length > 0 ? 'Click on any row to see the event details' : null;
		},
		selectedEventsEmpty: function() {
			return this.selectedEvents.length == 0;
		}
	},
	watch: {
		searchFilter: {
			handler: 'updatePaginator',
			immediate: true
		}
	},
	updated: function() {
		this.eventListTableId = this.$refs.eventListTable.$el.id;
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
		showEventDetail: function(selectedRows) {
			// selectedRows is always a list, but it will be empty when clearing selected rows
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
<style scoped lang="scss">
.button-toolbar-spacer {
	flex-grow: 1;
}
</style>
