<template>
	<b-modal ref="metadataDetail" :title="dataset.name" hide-footer>
		<b-img :src="imageURL" fluid-grow alt="Data thumbnail"></b-img>
		<b-table-simple small>
			<thead>
				<tr>
					<th>
						<b-form-input v-model="cardFilter" type="text" placeholder="Filter on FITS keywords"></b-form-input>
					</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="card in filteredCards" :key="card.id">
					<td>{{ card.text }}</td>
				</tr>
			</tbody>
		</b-table-simple>
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
			cardFilter: ""
		};
	},
	methods: {
		show: function() {
			this.$refs.metadataDetail.show();
		}
	},
	computed: {
		imageURL: function() {
			return this.metadata.data_location.thumbnail_url ? this.metadata.data_location.thumbnail_url : "./no_preview_available.jpg";
		},
		cards: function() {
			let cards = [];
			if (this.metadata.fits_header) {
				cards = this.metadata.fits_header.match(/[^]{1,80}/g).map((text, id) => ({ id, text }));
			} else {
				cards = Object.entries(this.metadata)
					.filter(([, value]) => !(value instanceof Object))
					.map(([key, value], id) => ({ id, text: `${key} = ${value}` }));
			}
			return cards;
		},
		filteredCards: function() {
			let regex = this.cardFilter ? new RegExp(this.cardFilter, "i") : /\S/;
			return this.cards.filter(card => regex.test(card.text));
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
