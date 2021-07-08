<template>
	<div>
		<b-modal ref="dataSelectionGroupSaveModal" size="md" title="Save data selection" ok-title="Save" @ok="saveDataSelections">
			<b-overlay :show="loading" rounded="sm">
				<b-form @submit.prevent>
					<b-form-group label="New data selection name" label-for="data-selection-group-name">
						<b-form-input id="data-selection-group-name" v-model="dataSelectionGroupName" lazy required type="text"></b-form-input>
					</b-form-group>
					<b-form-group label="Existing data selection name" label-for="data-selection-group-select">
						<b-form-select id="data-selection-group-select" v-model="dataSelectionGroupName" :options="dataSelectionGroupSelectOptions"></b-form-select>
					</b-form-group>
				</b-form>
			</b-overlay>
		</b-modal>
	</div>
</template>

<script>
export default {
	name: 'DataSelectionGroupSave',
	data: function() {
		return {
			dataSelectionGroupName: null,
			dataSelectionGroupList: [],
			loading: true
		};
	},
	computed: {
		dataSelectionGroupSelectOptions: function() {
			return this.dataSelectionGroupList.map(v => ({ text: v.name, value: v.name }));
		}
	},
	methods: {
		save: function(dataSelections) {
			this.dataSelections = dataSelections;
			this.updateDataSelectionGroupList();
			this.$refs.dataSelectionGroupSaveModal.show();
		},
		updateDataSelectionGroupList: async function() {
			this.loading = true;
			try {
				this.dataSelectionGroupList = await this.$SVO.data_selection_group.getAll();
			} catch (error) {
				console.log('TODO updateDataSelectionGroupList error');
			}
			this.loading = false;
		},
		saveDataSelections: function(bvModalEvt) {
			// Prevent modal from closing if no dataSelectionGroupName was specified
			if (!this.dataSelectionGroupName) {
				bvModalEvt.preventDefault();
				return;
			}
			// Check if a data selection group of that name already exists and if not create it
			let dataSelectionGroup = this.dataSelectionGroupList.find(dataSelectionGroup => dataSelectionGroup.name == this.dataSelectionGroupName);
			if (!dataSelectionGroup) {
				dataSelectionGroup = this.$SVO.data_selection_group.create({ name: this.dataSelectionGroupName });
			}

			let dataSelections = this.dataSelections.map(dataSelection => ({ ...dataSelection, data_selection_group: dataSelectionGroup.resource_uri }));
			this.$SVO.data_selection.create(dataSelections);
		}
	}
};
</script>
