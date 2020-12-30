<template>
	<b-modal ref="datasetDetail" size="xl" :title="dataset.name" hide-footer>
		<b-card class="mb-2">
			<b-card-text v-html="dataset.description"></b-card-text>
			<div class="btn-bar">
				<b-button v-b-popover="telescopePopover" pill size="sm" variant="outline-info">{{ dataset.telescope }}</b-button>
				<b-button v-b-popover="instrumentPopover" pill size="sm" variant="outline-info">{{ dataset.instrument }}</b-button>
				<b-button pill size="sm" variant="outline-info" :href="dataset.archive_url" target="_blank">Archive webpage</b-button>
			</div>
		</b-card>
		<div><aia_lev1 :dataset="dataset" :search-filter="searchFilter"> </aia_lev1></div>
	</b-modal>
</template>

<script>
import { telescopes, instruments } from '@/test_data';
// @ is an alias to /src
// TODO just for testing, after use <component :is="aia_lev1">
import aia_lev1 from '@/components/metadata/aia_lev1.vue';

export default {
	name: 'DatasetDetail',
	// TODO just for testing
	components: {
		aia_lev1
	},
	props: {
		dataset: { type: Object, required: true },
		searchFilter: { type: Object, required: true }
	},
	data: function() {
		return {
			telescope: telescopes.objects[0],
			instrument: instruments.objects[0]
		};
	},
	computed: {
		telescopePopover: function() {
			return { title: this.telescope.name, content: this.telescope.description, html: true, placement: 'bottom', trigger: 'focus', customClass: 'popover-lg' };
		},
		instrumentPopover: function() {
			return { title: this.instrument.name, content: this.instrument.description, html: true, placement: 'bottom', trigger: 'focus', customClass: 'popover-lg' };
		}
	},
	methods: {
		show: function() {
			this.$refs.datasetDetail.show();
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.btn-bar > * {
	margin-right: 0.5rem;
}

/* increase size of popover */
.popover-lg {
	max-width: 50%;
}
</style>
