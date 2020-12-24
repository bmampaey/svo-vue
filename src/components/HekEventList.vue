<template>
	<b-overlay :show="loading" rounded="sm">
		<b-table-simple small hover>
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
					<td>{{ event.event_starttime | dateFormat }}</td>
					<td>{{ event.event_endtime | dateFormat }}</td>
				</tr>
			</tbody>
		</b-table-simple>
		<div>
			<b-button :disabled="selectedEventsEmpty" variant="primary" @click="searchOverlappingDatasets" title="Select one or more event to search for overlapping data">Search overlapping</b-button>
		</div>
		<hek-event-detail ref="eventDetail" v-if="shownEvent" :event="shownEvent"></hek-event-detail>
		<b-modal ref="datasetModal" size="xl" :title="datasetModalTitle" hide-footer>
			<dataset :search-filters="datasetSearchFilters"></dataset>
		</b-modal>
	</b-overlay>
</template>

<script>
import HekEventDetail from "@/components/HekEventDetail.vue";
import Dataset from "@/components/Dataset.vue";
import { HekEventSearchFilter, DatasetSearchFilter } from "@/utils";

export default {
	name: "HekEventList",
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
			datasetSearchFilters: new DatasetSearchFilter(),
			datasetModalTitle: "Datasets"
		};
	},
	computed: {
		selectedEventsEmpty: function() {
			return this.selectedEvents.length == 0;
		}
	},
	watch: {
		searchFilter: {
			handler: "updateEventList",
			immediate: true
		}
	},
	methods: {
		updateEventList: async function(searchFilter) {
			this.loading = true;
			try {
				this.eventList = await this.$HEK.searchEvents(searchFilter.getSearchParams());
			} catch (error) {
				console.log("TODO show error");
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
			console.log("TODO searchOverlappingDatasets");
			// 			var query_dict = {
			// 	'search': selected_events.map(function(e){
			// 		return '(date_beg__lt = ' + e.event_endtime + ' and date_end__gt = ' + e.event_starttime + ')';
			// 	}).join(' or '),
			// 	'date_end__gte': getPropFilter(selected_events, 'event_starttime').sort().shift(),
			// 	'date_beg__lte': getPropFilter(selected_events, 'event_endtime').sort().pop(),
			// };
			this.datasetSearchFilters = new DatasetSearchFilter([], [], [], null, null);
			let selectedEventTypes = new Set(this.selectedEvents.map(event => event.type));
			this.datasetModalTitle = "Datasets overlapping selected events: " + Array.from(selectedEventTypes).join(", ");
			this.$refs.datasetModal.show();
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
