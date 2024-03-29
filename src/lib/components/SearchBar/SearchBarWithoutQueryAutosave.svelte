<script lang="ts">
	import { TableNames } from '$lib/app/model';
	import { supabase } from '$lib/app/supabaseClient';
	import { authStore, queryStore, savedQueriesStore } from '$lib/stores';
	import { fade } from 'svelte/transition';
	import SearchBarBase from './SearchBarBase.svelte';

	export let executeQuery: (query: string | string[]) => void;

	let queryName = '';
	let input = null;

	const saveSearch = async () => {
		const user = supabase.auth.user();

		const { data, error } = await supabase
			.from(TableNames.savedQueries)
			.insert([
				{
					...$queryStore,
					name: queryName,
					user_id: user.id,
					filters: JSON.stringify($queryStore.filters),
					provider: $queryStore.provider.name
				}
			])
			.select('filters, created_at, id, name, provider(id, name, url), search_term');

		if (error) {
			console.error(error);
			alert('Error while saving query');
			return;
		}

		savedQueriesStore.set([
			...$savedQueriesStore,
			...data.map((d) => ({ ...d, filters: JSON.parse(d.filters) }))
		]);

		queryStore.reset();
		queryName = '';
	};

	const handleInput = (e: Event) => {
		const value = (e.target as HTMLInputElement).checked;
		if (value === true) {
			input.focus();
		}
	};

	const handleKeydown = (e: any) => {
		if (e.key === 'Enter' || e.code === 'Enter') {
			saveSearch();
		}
	};
</script>

<SearchBarBase {executeQuery} />
{#if $queryStore.search_term && $authStore.isLoggedIn}
	<label for={`name-query-modal-btn-${$queryStore.id}`} in:fade class="btn btn-outlint">Save</label>
	<input
		on:input={handleInput}
		type="checkbox"
		id={`name-query-modal-btn-${$queryStore.id}`}
		class="modal-toggle"
	/>
	<div class="modal">
		<div class="modal-box">
			<h1 class="text-xl font-bold mb-4">Save Query</h1>
			<div class="w-full flex gap-2">
				<input
					bind:this={input}
					placeholder="Query Name"
					type="text"
					class="input input-bordered w-full"
					bind:value={queryName}
					on:keydown={handleKeydown}
				/>
			</div>

			<div class="modal-action">
				<button
					on:click={saveSearch}
					for={`name-query-modal-btn-${$queryStore.id}`}
					class="btn btn-primary">Save</button
				>
				<label for={`name-query-modal-btn-${$queryStore.id}`} class="btn">Close</label>
			</div>
		</div>
	</div>
{/if}
