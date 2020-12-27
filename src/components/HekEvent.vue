<template>
	<div class="row">
		<div class="col-4">
			<hek-event-form v-model="searchFilter"></hek-event-form>
		</div>
		<div class="col-8">
			<hek-event-list :search-filter="searchFilter"></hek-event-list>
		</div>
	</div>
</template>

<script>
import HekEventForm from "@/components/HekEventForm.vue";
import HekEventList from "@/components/HekEventList.vue";
import { HekEventSearchFilter } from "@/utils";

export default {
	name: "HekEvent",
	components: {
		HekEventForm,
		HekEventList
	},
	props: {
		initialSearchFilter: { type: HekEventSearchFilter, required: true }
	},
	data: function() {
		return {
			searchFilter: this.initialSearchFilter
		};
	}
};
</script>

<style lang="scss"></style>
