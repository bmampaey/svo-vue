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
				<b-nav-item :to="{ name: 'Datasets' }" active-class="active">Datasets</b-nav-item>
				<b-nav-item :to="{ name: 'DataSelections' }" active-class="active">Data selections</b-nav-item>
				<b-nav-item :to="{ name: 'HekEvents' }" active-class="active">HEK Events</b-nav-item>
			</b-navbar-nav>

			<!-- Right aligned menu items -->
			<b-navbar-nav class="ml-auto">
				<b-nav-item-dropdown id="app-menu-user" :text="userName" right>
					<b-dropdown-item aria-describedby="app-menu-user" @click="logout">Logout</b-dropdown-item>
					<b-dropdown-item :to="{ name: 'DeleteAccount' }" aria-describedby="app-menu-user">Delete account</b-dropdown-item>
				</b-nav-item-dropdown>
			</b-navbar-nav>
		</b-collapse>
	</b-navbar>
</template>

<script>
export default {
	name: 'AppMenu',
	computed: {
		userName: function() {
			return this.$SDA.currentUser.name;
		}
	},
	methods: {
		/* Logout the user from the SDA API and redirect to the Authentication view */
		logout: function() {
			this.$SDA.logout();
			this.$router.push({ name: 'Authentication' });
		}
	}
};
</script>

<style lang="scss"></style>
