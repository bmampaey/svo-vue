<template>
	<b-container fluid>
		<b-card header="Delete Account" border-variant="danger" header-bg-variant="danger" header-text-variant="white" class="w-50 mx-auto mt-5">
			<b-card-text>Are you sure you want to delete your account ?</b-card-text>
			<b-button @click="deleteAccount">Yes, delete</b-button>
		</b-card>
	</b-container>
</template>

<script>
export default {
	name: 'DeleteAccount',
	methods: {
		deleteAccount: async function() {
			await this.$SDA.deleteAccount();
			this.$router.push({ name: 'Authentication' });
		}
	}
};
</script>

<style lang="scss"></style>
