<template>
	<b-overlay :show="loading" rounded="sm">
		<b-table-simple small hover id="hek-event-list-table">
			<thead>
				<tr>
					<th></th>
					<th>Type</th>
					<th>Start date</th>
					<th>End date</th>
				</tr>
			</thead>
			<tfoot>
				<tr>
					<td v-if="eventList.length > 0" class="text-center small" colspan="100">
						Click on any row to see the event details
					</td>
					<td v-else class="text-center text-warning" colspan="100">
						No event correspond to your search criteria
					</td>
				</tr>
			</tfoot>
			<tbody>
				<tr v-for="event in eventList" :key="event.kb_archivid" @click="showEventDetail(event, $event)" role="button">
					<td>
						<b-form-checkbox v-model="selectedEvents" :value="event" size="lg"></b-form-checkbox>
					</td>
					<td>{{ event.type }}</td>
					<td>{{ $utils.formatDate(event.startTime) }}</td>
					<td>{{ $utils.formatDate(event.endTime) }}</td>
				</tr>
			</tbody>
		</b-table-simple>
		<b-pagination v-model="pageNumber" :total-rows="rows" :per-page="perPage" aria-controls="hek-event-list-table" limit="3" hide-goto-end-buttons size="sm" @change="loadPage"></b-pagination>
		<div>
			<b-button :disabled="selectedEventsEmpty" variant="primary" @click="searchOverlappingDatasets" title="Select one or more event to search for overlapping data">Search overlapping</b-button>
		</div>
		<hek-event-detail ref="eventDetail" v-if="shownEvent" :event="shownEvent"></hek-event-detail>
		<b-modal ref="datasetModal" size="xl" :title="datasetModalTitle" hide-footer>
			<dataset :initial-search-filter="datasetSearchFilter"></dataset>
		</b-modal>
	</b-overlay>
</template>

<script>
import HekEventDetail from '@/components/HekEventDetail.vue';
import Dataset from '@/components/Dataset.vue';
import DatasetSearchFilter from '@/services/sda/DatasetSearchFilter';
import HekEventSearchFilter from '@/services/hek/EventSearchFilter';

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
			selectedEvents: [],
			shownEvent: null,
			loading: true,
			datasetSearchFilter: new DatasetSearchFilter(),
			datasetModalTitle: 'Datasets'
		};
	},
	computed: {
		selectedEventsEmpty: function() {
			return this.selectedEvents.length == 0;
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
		showEventDetail: function(event, $event) {
			if ($event.target instanceof HTMLTableCellElement) {
				this.shownEvent = event;
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
