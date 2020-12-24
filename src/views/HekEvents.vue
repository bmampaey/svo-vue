<template>
	<b-container fluid>
		<app-menu></app-menu>
		<hek-event></hek-event>
	</b-container>
</template>

<script>
// @ is an alias to /src
import AppMenu from "@/components/AppMenu.vue";
import HekEvent from "@/components/HekEvent.vue";

export default {
	name: "HekEvents",
	components: {
		AppMenu,
		HekEvent
	}
};
</script>

<style lang="scss"></style>
