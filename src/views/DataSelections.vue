<template>
	<b-container fluid>
		<app-menu></app-menu>
		<data-selection-group class="mt-3"></data-selection-group>
	</b-container>
</template>

<script>
import DataSelectionGroup from '@/components/data_selection/DataSelectionGroup';

export default {
	name: 'DataSelections',
	components: {
		DataSelectionGroup
	}
};
</script>
