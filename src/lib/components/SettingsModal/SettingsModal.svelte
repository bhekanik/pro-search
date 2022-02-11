<script>
	import { initFirebase } from '$lib/app/auth/initFirebase';
	import { configStore, firebaseAuth, isAuthenticated } from '$lib/stores';
	import { doc, setDoc } from 'firebase/firestore';
	import BaseOption from './BaseOption.svelte';

	async function handleAccept() {
		const { db } = await initFirebase();

		await setDoc(
			doc(db, 'users', $firebaseAuth.user.uid),
			{ config: $configStore },
			{ merge: true }
		);
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
