<template>
	<b-form @submit.prevent="onSubmit">
		<b-form-group label="Email" label-for="email">
			<b-form-input id="email" v-model="email" type="email" trim></b-form-input>
		</b-form-group>
		<b-form-group label="Username" label-for="username">
			<b-form-input id="username" v-model="username" type="text" trim></b-form-input>
		</b-form-group>
		<b-form-group label="Password" label-for="password">
			<b-form-input id="password" v-model="password" type="password" :trim="false"></b-form-input>
		</b-form-group>
		<b-button type="submit" variant="primary">Register</b-button>
	</b-form>
</template>

<script>
export default {
	name: "RegisterForm",
	data: function() {
		return {
			email: null,
			username: null,
			password: null
		};
	},
	methods: {
		onSubmit: async function() {
			try {
				await this.$SDA.register(this.email, this.username, this.password);
			} catch (error) {
				// TODO check what happens if request is errored
			}
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.btn-bar > * {
	margin-right: 0.5rem;
}
</style>
