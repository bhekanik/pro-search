<script lang="ts">
	import { isAuthenticated, queryStore } from '$lib/stores';
	import { updateRecentQueries } from '$lib/utils/generateAndGo';
	import { fade } from 'svelte/transition';
	import SearchBarBase from './SearchBarBase.svelte';

	export let executeQuery: (query: string | string[]) => void;

	let queryName = '';
	let input = null;

	const saveSearch = () => {
		updateRecentQueries({
			query: {
				...$queryStore,
				name: queryName
			}
		});
		queryStore.reset();
		queryName = '';
	};

	const handleInput = (e: Event) => {
		const value = (e.target as HTMLInputElement).checked;
		if (value === true) {
			input.focus();
		}
	};

	const handleKeydown = (e) => {
		if (e.keyCode === 13) {
			saveSearch();
		}
	};
</script>

<SearchBarBase {executeQuery} />
{#if $queryStore.searchTerm && $isAuthenticated}
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
