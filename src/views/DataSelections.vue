<template>
	<b-container fluid>
		<app-menu></app-menu>
		<data-selection-group></data-selection-group>
	</b-container>
</template>

<script>
// @ is an alias to /src
import AppMenu from "@/components/AppMenu.vue";
import DataSelectionGroup from "@/components/DataSelectionGroup.vue";

export default {
	name: "DataSelections",
	components: {
		AppMenu,
		DataSelectionGroup
	}
};
</script>

<style lang="scss"></style>
