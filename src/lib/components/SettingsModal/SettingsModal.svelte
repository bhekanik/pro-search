<script lang="ts">
	import { searchProvidersWithAll, searchProvidersWithoutAll } from '$lib/app/config';
	import { TableNames } from '$lib/app/model';
	import { supabase } from '$lib/app/supabaseClient';
	import { isAuthenticated, settingsStore } from '$lib/stores';
	import ValueSelector from '../FeatureSelector/ValueSelector.svelte';
	import SearchProviderSelect from '../SearchProvider/SearchProviderSelect.svelte';
	import BooleanOption from './BooleanOption.svelte';

	async function handleAccept() {
		const user = await supabase.auth.user();

		const record = await supabase.from(TableNames.config).select();

		if (record.data.length > 0) {
			const { data, error } = await supabase
				.from(TableNames.config)
				.update([
					{
						...$settingsStore,
						user_id: user.id
					}
				])
				.match({
					user_id: user.id
				});
		} else {
			const { data, error } = await supabase.from(TableNames.config).insert([
				{
					...$settingsStore,
					user_id: user.id
				}
			]);
		}
	}

	function handleChange(e: Event, searchProviders) {
		searchProviders.find((searchProvider) => {
			if (searchProvider.id === (e.target as HTMLSelectElement).value) {
				settingsStore.set({
					...$settingsStore,
					default_search_provider: searchProvider
				});
			}
		});
	}

	function handleCheckboxChange(e: Event) {
		const { checked, name } = e.target as HTMLInputElement;

		settingsStore.set({
			...$settingsStore,
			[name]: checked
		});
	}
</script>

{#if $isAuthenticated}
	<input type="checkbox" id="my-modal-2" class="modal-toggle" />

	<div class="modal">
		<div class="modal-box">
			<h3 class="font-bold text-xl mb-8">Settings</h3>
			<BooleanOption
				name="autosaveQueries"
				{handleCheckboxChange}
				value={$settingsStore.autosave_queries}
				label="Autosave Queries"
			/>
			<BooleanOption
				name="queryPreview"
				{handleCheckboxChange}
				value={$settingsStore.query_preview}
				label="Query URL Preview"
			/>
			<ValueSelector
				featureFlag="Search_All_Providers"
				onValue={searchProvidersWithAll}
				offValue={searchProvidersWithoutAll}
				let:feature={searchProviders}
			>
				<span class="input-label mr-4">Default Search Provider: </span>
				<SearchProviderSelect
					value={$settingsStore.default_search_provider.id}
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
