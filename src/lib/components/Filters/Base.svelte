<script lang="ts">
	import { query, recentQueries } from '$lib/stores';
	import Case from 'case';
	import { slide } from 'svelte/transition';
	import { generateQuery } from './generateQuery';
	import type { FilterType } from './types';

	export let type: FilterType;
	export let enabled = false;
	export let label = '';
	export let textInputPlaceholder = '';

	const handleCheckboxInput = (e: any) => {
		const value = e.target.checked;
		query.update((currentQuery) => {
			const newQuery = { ...currentQuery };
			if (value === false) {
				delete newQuery.filters[Case.camel(type)];
				enabled = false;
			} else {
				enabled = true;
			}
			return newQuery;
		});
	};

	const generateQueryAndGo = () => {
		if (!$query.searchTerm) return;
		const formattedQuery = generateQuery($query);

		recentQueries.update((currentRecentQueries) => {
			const newRecentQueries = [...currentRecentQueries, { ...$query }];
			globalThis.localStorage?.setItem('recentQueries', JSON.stringify(newRecentQueries));

			return newRecentQueries;
		});

		window.open(`${$query.provider.url}${encodeURI(formattedQuery)}`);
	};

	const handleKeydown = (e) => {
		if (e.keyCode === 13) {
			generateQueryAndGo();
		}
	};

	export let hasInput: boolean = false;
</script>

<div class="container">
	<label class="input-label">
		<input
			type="checkbox"
			class="toggle toggle-primary"
			name={`${type}-checkbox`}
			id={`${type}-checkbox`}
			checked={Boolean($query.filters[Case.camel(type)])}
			on:input={handleCheckboxInput}
		/>
		{label || type}
	</label>

	{#if (enabled || Boolean($query.filters[Case.camel(type)])) && hasInput}
		<input
			in:slide
			out:slide
			class="input input-bordered"
			type="text"
			name={`${type}-input`}
			id=""
			placeholder={textInputPlaceholder || type}
			value={$query.filters[Case.camel(type)]?.value || ''}
			on:input
			on:keydown={handleKeydown}
		/>
	{/if}
</div>

<style>
	.container {
		display: grid;
		gap: 1rem;
		margin: 0.5rem 0;
	}

	.input-label {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
</style>
