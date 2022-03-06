<script lang="ts">
	import Auth from '$lib/components/SupabaseAuthUI/Auth.svelte';
	import 'firebaseui/dist/firebaseui.css';

	export let closeModalButton = null;
	export let redirectTo = '';
</script>

<input type="checkbox" id="auth-modal" class="modal-toggle" />
<div class="modal">
	<div class="modal-box">
		<h3 class="font-bold text-lg p-8">Login/Register</h3>
		<!-- <div id="firebaseui-auth-container" class="w-full" /> -->
		<Auth providers={['google', 'github']} {redirectTo} />
		<div class="modal-action px-8 pb-8">
			<label for="auth-modal" bind:this={closeModalButton} class="btn w-full">Close</label>
		</div>
	</div>
</div>
