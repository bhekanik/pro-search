<script lang="ts">
	import type { FilterType } from '$lib/app/types/filters';
	import { queryStore } from '$lib/stores';
	import { generateQueryUrl } from '$lib/utils/generateAndGo';
	import Case from 'case';
	import { slide } from 'svelte/transition';

	export let type: FilterType;
	export let enabled = false;
	export let label = '';
	export let textInputPlaceholder = '';

	const handleCheckboxInput = (e: Event) => {
		const value = (e.target as HTMLInputElement).checked;
		queryStore.update((currentQuery) => {
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

	const handleKeydown = (e) => {
		if (e.keyCode === 13) {
			window.open(generateQueryUrl(type) as string);
		}
	};

	export let hasInput = false;
</script>

<div class="container">
	<label class="input-label">
		<input
			type="checkbox"
			class="toggle toggle-primary"
			name={`${type}-checkbox`}
			id={`${type}-checkbox`}
			checked={Boolean($queryStore.filters[Case.camel(type)])}
			on:input={handleCheckboxInput}
		/>
		{label || type}
	</label>

	{#if enabled && hasInput}
		<input
			in:slide
			out:slide
			class="input input-bordered"
			type="text"
			name={`${type}-input`}
			id=""
			placeholder={textInputPlaceholder || type}
			value={$queryStore.filters[Case.camel(type)]?.value || ''}
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