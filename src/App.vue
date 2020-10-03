<template>
	<b-container fluid>
		<b-navbar toggleable="md" type="light" variant="light">
			<!-- The logo -->
			<b-navbar-brand href="http://solarnet.oma.be/">
				<img src="./assets/solarnet_logo.png" alt="SolarNet logo" style="max-width:100px; vertical-align: baseline;" />
			</b-navbar-brand>

			<!-- The button to collapse -->
			<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

			<!-- The collapsible menu -->
			<b-collapse id="nav-collapse" is-nav>
				<!-- Left aligned menu items -->
				<b-navbar-nav>
					<b-nav-item to="datasets">Datasets</b-nav-item>
					<b-nav-item to="data_selections">Data selections</b-nav-item>
					<b-nav-item to="events">Events</b-nav-item>
				</b-navbar-nav>

				<!-- Right aligned menu items -->
				<b-navbar-nav class="ml-auto"> </b-navbar-nav>
			</b-collapse>
		</b-navbar>
		<router-view />
	</b-container>
</template>

<script>
export default {
	name: "App"
};
</script>

<style lang="scss"></style>
