<template>
	<b-form @submit.prevent="registerUser">
		<b-form-group label="Email" label-for="email">
			<b-form-input id="email" v-model="email" type="email" required trim></b-form-input>
		</b-form-group>
		<b-form-group label="First Name" label-for="first-name">
			<b-form-input id="first-name" v-model="firstName" trim></b-form-input>
		</b-form-group>
		<b-form-group label="Last Name" label-for="last-name">
			<b-form-input id="last-name" v-model="lastName" trim></b-form-input>
		</b-form-group>
		<b-form-group label="Password" label-for="password">
			<b-form-input id="password" v-model="password" type="password" required :trim="false"></b-form-input>
		</b-form-group>
		<b-button type="submit" variant="primary">Register</b-button>
	</b-form>
</template>

<script>
export default {
	name: 'RegisterForm',
	data: function() {
		return {
			email: null,
			firstName: null,
			lastName: null,
			password: null
		};
	},
	methods: {
		/* Try to register the user into the SDA API with the email and password specified in the form
		If successfull redirect to the Root view */
		registerUser: async function() {
			try {
				await this.$SDA.registerUser(this.email, this.firstName, this.lastName, this.password);
				this.$router.push({ name: 'Root' });
			} catch (error) {
				// TODO check what happens if request is errored
			}
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
