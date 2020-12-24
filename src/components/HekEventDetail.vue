<template>
	<b-modal ref="eventDetail" size="md" :title="event.type" hide-footer>
		<b-img center fluid v-if="event.gs_thumburl" :src="event.gs_thumburl" alt="Image of the event"></b-img>
		<dl class="dl-horizontal">
			<dt>Start time</dt>
			<dd>{{ event.event_starttime | dateFormat }}</dd>
			<dt>End time</dt>
			<dd>{{ event.event_endtime | dateFormat }}</dd>
			<dt>Recognition method</dt>
			<dd>{{ event.frm_name }}</dd>
			<dt>Identifier name</dt>
			<dd>{{ event.frm_identifier }}</dd>
		</dl>
		<a :href="event.detailUrl" target="_blank">See more details</a>
	</b-modal>
</template>

<script>
export default {
	name: "HekEventDetail",
	props: {
		event: { type: Object, required: true }
	},
	methods: {
		show: function() {
			this.$refs.eventDetail.show();
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
