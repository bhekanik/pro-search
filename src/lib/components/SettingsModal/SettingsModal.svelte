<script lang="ts">
	import { TableNames } from '$lib/app/model';
	import { supabase } from '$lib/app/supabaseClient';
	import { authStore, queryStore, searchProvidersStore, settingsStore } from '$lib/stores';
	import Protected from '../Protected/Protected.svelte';
	import SearchProviderSelect from '../SearchProvider/SearchProviderSelect.svelte';
	import BooleanOption from './BooleanOption.svelte';

	let newSettings = $settingsStore;

	async function handleAccept() {
		const { error, data } = await supabase
			.from(TableNames.settings)
			.update([
				{
					...newSettings,
					default_search_provider: newSettings.default_search_provider.name
				}
			])
			.match({
				user_id: $authStore.user.id
			})
			.select(`autosave_queries, default_search_provider(id, url, name), query_preview`)
			.single();

		if (error) {
			console.error(error);
			alert('There was an error saving your settings.');
			return;
		}

		if (data) {
			settingsStore.set(data);
			queryStore.update((currentQuery) => ({
				...currentQuery,
				provider: data.default_search_provider
			}));
		}
	}

	function handleChange(e: Event) {
		const newSearchProvider = $searchProvidersStore.find(
			(searchProvider) => searchProvider.id === Number((e.target as HTMLSelectElement).value)
		);

		newSettings = {
			...newSettings,
			default_search_provider: newSearchProvider
		};
	}

	function handleCheckboxChange(e: Event) {
		const { checked, name } = e.target as HTMLInputElement;

		newSettings = {
			...newSettings,
			[name]: checked
		};
	}
</script>

<Protected>
	<input type="checkbox" id="my-modal-2" class="modal-toggle" />

	<div class="modal">
		<div class="modal-box">
			<h3 class="font-bold text-xl mb-8">Settings</h3>
			<BooleanOption
				name="autosave_queries"
				{handleCheckboxChange}
				value={$settingsStore.autosave_queries}
				label="Autosave Queries"
			/>
			<BooleanOption
				name="query_preview"
				{handleCheckboxChange}
				value={$settingsStore.query_preview}
				label="Query URL Preview"
			/>
			<span class="input-label mr-4">Default Search Provider: </span>
			<SearchProviderSelect
				value={$settingsStore.default_search_provider.id}
				searchProviders={$searchProvidersStore}
				on:change={(e) => handleChange(e)}
			/>

			<div class="divider" />
			<div class="modal-action">
				<label on:click={handleAccept} for="my-modal-2" class="btn btn-primary">Accept</label>
				<label for="my-modal-2" class="btn">Cancel</label>
			</div>
		</div>
	</div>
</Protected>
