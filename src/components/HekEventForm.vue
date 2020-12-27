<template>
	<b-form @submit.prevent="onSubmit">
		<b-form-group label="Event types" label-for="event-type">
			<b-form-select v-model="eventType" :options="eventTypeOptions" id="event-type" multiple></b-form-select>
		</b-form-group>
		<base-datetime-range v-model="eventTimeRange" label="Event time" min-label="Start" max-label="End"></base-datetime-range>
		<b-button type="submit" variant="primary">Search</b-button>
	</b-form>
</template>

<script>
import { HEK_EVENT_TYPE_NAMES } from "@/constants";
import { HekEventSearchFilter } from "@/utils";

export default {
	name: "HekEventForm",
	props: {
		value: { type: HekEventSearchFilter, required: true }
	},
	data: function() {
		return {
			eventType: [...this.value.eventType],
			eventTimeRange: { min: this.value.eventStartTime, max: this.value.eventEndTime },
			eventTypeOptions: []
		};
	},
	methods: {
		onSubmit: function() {
			let searchFilter = new HekEventSearchFilter({
				eventType: this.eventType,
				eventStartTime: this.eventTimeRange.min,
				eventEndTime: this.eventTimeRange.max
			});
			this.$emit("input", searchFilter);
		}
	},
	created: function() {
		this.eventTypeOptions = Object.entries(HEK_EVENT_TYPE_NAMES).map(([key, value]) => ({ value: key, text: value }));
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
