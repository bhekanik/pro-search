<script lang="ts">
	import { query } from '$lib/stores';
	import { generateQueryAndGo } from '$lib/utils/generateAndGo';
	import { onMount } from 'svelte';

	let searchInput;
	export let executeQuery: (query: string | string[]) => void;

	const handleInput = (e) => {
		query.update((currentQuery) => {
			return { ...currentQuery, searchTerm: e.target.value.trim() };
		});
	};

	const handleKeydown = (e) => {
		if (e.keyCode === 13) {
			executeQuery(generateQueryAndGo());
			searchInput.focus();
		}
	};

	const handleClick = (e) => {
		executeQuery(generateQueryAndGo());
		searchInput.focus();
	};

	onMount(() => {
		searchInput.focus();
	});
</script>

<input
	class="input input-bordered input-primary w-full"
	placeholder="Search"
	on:keydown={handleKeydown}
	on:input={handleInput}
	value={$query.searchTerm}
	type="text"
	name=""
	id=""
	bind:this={searchInput}
/>
<button class="btn btn-primary" on:click={handleClick}>Search</button>
