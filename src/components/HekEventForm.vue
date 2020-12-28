<template>
	<b-form @submit.prevent="onSubmit">
		<b-form-group label="Event types" label-for="event-type">
			<b-form-select v-model="searchFilter.eventType" :options="searchFilter.eventTypeOptions" id="event-type" multiple></b-form-select>
		</b-form-group>
		<base-datetime-range v-model="searchFilter.eventTimeRange" label="Event time" min-label="Start" max-label="End"></base-datetime-range>
		<b-button type="submit" variant="primary">Search</b-button>
	</b-form>
</template>

<script>
import HekEventSearchFilter from "@/services/hek/EventSearchFilter";

export default {
	name: "HekEventForm",
	props: {
		value: { type: HekEventSearchFilter, required: true }
	},
	data: function() {
		return {
			// TODO shouyld this be a deepCopy
			searchFilter: this.value
		};
	},
	methods: {
		onSubmit: function() {
			this.$emit("input", new HekEventSearchFilter(this.searchFilter));
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
