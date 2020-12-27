<template>
	<b-modal ref="metadataDetail" :title="dataset.name" hide-footer>
		<b-img :src="imageURL" fluid-grow alt="Data thumbnail"></b-img>

		<b-table :items="cards" :fields="fields" :filter="searchFilter" :filter-included-fields="filterIncludedFields" primary-key="id" sticky-header show-empty small>
			<template #head(text)="data">
				<b-form-group>
					<b-input-group>
						<b-form-input v-model="searchFilter" type="search" placeholder="Filter metadata" debounce="500"></b-form-input>
						<b-input-group-append>
							<b-button :disabled="!searchFilter" @click="clearSearchFilter">Clear</b-button>
						</b-input-group-append>
					</b-input-group>
				</b-form-group>
			</template>
		</b-table>
	</b-modal>
</template>

<script>
export default {
	name: "MetadataDetail",
	props: {
		dataset: { type: Object, required: true },
		metadata: { type: Object, required: true }
	},
	data: function() {
		return {
			searchFilter: "",
			fields: ["text"],
			filterIncludedFields: ["text"]
		};
	},
	methods: {
		show: function() {
			this.$refs.metadataDetail.show();
		},
		clearSearchFilter: function() {
			this.searchFilter = "";
		}
	},
	computed: {
		imageURL: function() {
			return this.metadata.data_location.thumbnail_url ? this.metadata.data_location.thumbnail_url : require("@/assets/no_preview_available.jpg");
		},
		cards: function() {
			let cards = [];
			let fits_header = this.metadata.fits_header ? this.metadata.fits_header.trimEnd() : null;
			if (fits_header) {
				cards = fits_header.match(/[^]{1,80}/g).map((text, id) => ({ id, text }));
			} else {
				cards = Object.entries(this.metadata)
					.filter(([, value]) => !(value instanceof Object))
					.map(([key, value], id) => ({ id, text: `${key} = ${value}` }));
			}
			return cards;
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.btn-bar > * {
	margin-right: 0.5rem;
}
</style>
