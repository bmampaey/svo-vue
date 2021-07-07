<template>
	<b-form @submit.prevent="logInUser">
		<b-form-group label="Email" label-for="email">
			<b-form-input id="email" v-model="email" type="email" required trim></b-form-input>
		</b-form-group>
		<b-form-group label="Password" label-for="password" :state="passwordValid" :invalid-feedback="passwordFeedback">
			<b-form-input id="password" v-model="password" type="password" :trim="false" :state="passwordValid"></b-form-input>
		</b-form-group>
		<b-button type="submit" variant="primary">Login</b-button>
	</b-form>
</template>

<script>
export default {
	name: 'LoginForm',
	data: function() {
		return {
			email: null,
			password: null,
			passwordValid: null,
			passwordFeedback: 'The password is invalid! If you have forgotten your password, please send an email to solsysadm@oma.be'
		};
	},
	methods: {
		/* Try to log in the user into the SDA API with the email and password specified in the form
		If successfull redirect to the Root view */
		logInUser: async function() {
			// TODO check what happens if password is wrong (do same as register form and maybe use generi error instead of passwordValid)
			try {
				this.passwordValid = null;
				await this.$SDA.logInUser(this.email, this.password);
				this.$router.push({ name: 'Root' });
			} catch (error) {
				this.passwordValid = false;
			}
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
