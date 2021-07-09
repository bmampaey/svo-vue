<template>
	<b-container fluid>
		<app-menu></app-menu>
		<b-card header="Update Account" class="w-50 mx-auto mt-5">
			<b-form @submit.prevent="updateUser">
				<b-form-group label="First Name" label-for="first-name" description="Optional, fill in only if you want to change your first name">
					<b-form-input id="first-name" v-model="firstName" autocomplete="given-name" trim></b-form-input>
				</b-form-group>
				<b-form-group label="Last Name" label-for="last-name" description="Optional, fill in only if you want to change your last name">
					<b-form-input id="last-name" v-model="lastName" autocomplete="family-name" trim></b-form-input>
				</b-form-group>
				<b-form-group label="New Password" label-for="new-password" description="Optional, fill in only if you want to change your password">
					<b-form-input id="new-password" v-model="newPassword" type="password" autocomplete="new-password"></b-form-input>
				</b-form-group>
				<b-form-group label="Current password" label-for="current-password" description="Your current password is required to update your account">
					<b-form-input id="current-password" v-model="currentPassword" type="password" autocomplete="current-password" required></b-form-input>
				</b-form-group>
				<b-button type="submit" variant="primary">Update</b-button>
			</b-form>
		</b-card>
	</b-container>
</template>

<script>
export default {
	name: 'UpdateAccount',
	data: function() {
		return {
			firstName: null,
			lastName: null,
			newPassword: null,
			currentPassword: null
		};
	},
	methods: {
		updateUser: async function() {
			// TODO check what happens if password is wrong (do same as register form and maybe use generi error instead of passwordValid)
			try {
				await this.$SVO.updateUser(this.firstName, this.lastName, this.newPassword, this.currentPassword);
				this.$router.push({ name: 'Authentication' });
			} catch (error) {
				// TODO
			}
		}
	}
};
</script>
