<template>
	<b-navbar toggleable="md" type="light" variant="light">
		<!-- The logo -->
		<b-navbar-brand href="http://solarnet.oma.be/">
			<img src="@/assets/solarnet_logo.png" alt="SolarNet logo" style="max-width:100px; vertical-align: baseline;" />
		</b-navbar-brand>

		<!-- The button to collapse -->
		<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

		<!-- The collapsible menu -->
		<b-collapse id="nav-collapse" is-nav>
			<!-- Left aligned menu items -->
			<b-navbar-nav>
				<b-nav-item to="datasets">Datasets</b-nav-item>
				<b-nav-item to="data_selections">Data selections</b-nav-item>
				<b-nav-item to="hek_events">HEK Events</b-nav-item>
			</b-navbar-nav>

			<!-- Right aligned menu items -->
			<b-navbar-nav class="ml-auto">
				<b-nav-item-dropdown :text="$SDA.user.userName" right id="app-menu-user">
					<b-dropdown-item @click="$SDA.logout" aria-describedby="app-menu-user">Logout</b-dropdown-item>
					<b-dropdown-item to="delete_account" aria-describedby="app-menu-user">Delete account</b-dropdown-item>
				</b-nav-item-dropdown>
			</b-navbar-nav>
		</b-collapse>
	</b-navbar>
</template>

<script>
export default {
	name: "AppMenu"
};
</script>

<style lang="scss"></style>
