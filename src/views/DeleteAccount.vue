<template>
	<b-container fluid>
		<b-card header="Delete Account" border-variant="danger" header-bg-variant="danger" header-text-variant="white" class="w-50 mx-auto mt-5">
			<b-card-text>Deleting your account will also delete all your data selections</b-card-text>
			<b-form @submit.prevent="deleteUser">
				<b-form-group label="Password" label-for="password" description="Your password is required to delete your account">
					<b-form-input id="password" v-model="password" type="password" required :trim="false"></b-form-input>
				</b-form-group>
				<b-button type="submit" variant="primary">Delete</b-button>
			</b-form>
		</b-card>
	</b-container>
</template>

<script>
export default {
	name: 'DeleteAccount',
	data: function() {
		return {
			password: null
		};
	},
	methods: {
		deleteUser: async function() {
			// TODO check what happens if password is wrong (do same as register form and maybe use generi error instead of passwordValid)
			try {
				await this.$SVO.deleteUser(this.password);
				this.$router.push({ name: 'Authentication' });
			} catch (error) {
				// TODO
			}
		}
	}
};
</script>
