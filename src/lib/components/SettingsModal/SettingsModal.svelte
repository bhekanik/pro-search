<script>
	import { configStore, isAuthenticated } from '$lib/stores';
	import BaseOption from './BaseOption.svelte';

	function handleAccept() {
		window.localStorage?.setItem('config', JSON.stringify($configStore));
	}
</script>

{#if $isAuthenticated}
	<input type="checkbox" id="my-modal-2" class="modal-toggle" />
	<div class="modal">
		<div class="modal-box">
			<BaseOption option={'autosaveQueries'} label="Autosave Queries" />
			<div class="modal-action">
				<label on:click={handleAccept} for="my-modal-2" class="btn btn-primary">Accept</label>
				<label for="my-modal-2" class="btn">Close</label>
			</div>
		</div>
	</div>
{/if}
