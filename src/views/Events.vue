<template>
	<div class="row">
		<div class="col-4">
			<event-form v-model="searchFilter"></event-form>
		</div>
		<div class="col-8">
			<event-list :search-filter="searchFilter"></event-list>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import EventForm from "@/components/EventForm.vue";
import EventList from "@/components/EventList.vue";
import { EventSearchFilter } from "@/utils";

export default {
	name: "Events",
	components: {
		EventForm,
		EventList
	},
	data: function() {
		return {
			searchFilter: new EventSearchFilter()
		};
	}
};
</script>

<style lang="scss"></style>
