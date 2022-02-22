<script lang="ts">
	import { initFirebase } from '$lib/app/auth/initFirebase';
	import { searchProvidersWithAll, searchProvidersWithoutAll } from '$lib/app/config';
	import { configStore, firebaseAuth, isAuthenticated } from '$lib/stores';
	import { doc, setDoc } from 'firebase/firestore';
	import ValueSelector from '../FeatureSelector/ValueSelector.svelte';
	import SearchProviderSelect from '../SearchProvider/SearchProviderSelect.svelte';
	import BooleanOption from './BooleanOption.svelte';

	let defaultSearchProvier;

	async function handleAccept() {
		const { db } = await initFirebase();

		await setDoc(
			doc(db, 'users', $firebaseAuth.user.uid),
			{ config: $configStore },
			{ merge: true }
		);
	}

	function handleChange(e: Event, searchProviders) {
		defaultSearchProvier = searchProviders.find((searchProvider) => {
			if (searchProvider.id === (e.target as HTMLSelectElement).value) {
				configStore.set({
					...$configStore,
					defaultSearchProvider: searchProvider
				});
			}
		});
	}
</script>

{#if $isAuthenticated}
	<input type="checkbox" id="my-modal-2" class="modal-toggle" />

	<div class="modal">
		<div class="modal-box">
			<h3 class="font-bold text-xl mb-8">Settings</h3>
			<BooleanOption value={$configStore.autosaveQueries} label="Autosave Queries" />
			<ValueSelector
				featureFlag="Search_All_Providers"
				onValue={searchProvidersWithAll}
				offValue={searchProvidersWithoutAll}
				let:feature={searchProviders}
			>
				<span class="input-label mr-4">Default Search Provider: </span>
				<SearchProviderSelect
					{searchProviders}
					on:change={(e) => handleChange(e, searchProviders)}
				/>
			</ValueSelector>

			<div class="divider" />
			<div class="modal-action">
				<label on:click={handleAccept} for="my-modal-2" class="btn btn-primary">Accept</label>
				<label for="my-modal-2" class="btn">Cancel</label>
			</div>
		</div>
	</div>
{/if}
