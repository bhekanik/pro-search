<script lang="ts" context="module">
	export interface OptionType {
		label: string;
		value: string;
	}
</script>

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
	export let options: OptionType[] | null = null;
	export let handleSelectChange: (e: Event) => void = null;
	export let handleCheckboxChange: (e: Event) => void = null;

	const handleCheckboxInput = (e: Event) => {
		const value = (e.target as HTMLInputElement).checked;
		queryStore.update((currentQuery) => {
			const newQuery = { ...currentQuery };
			if (value === false) {
				delete newQuery.filters[Case.camel(type)];
				enabled = false;
			} else {
				enabled = true;
				if (type === 'Safe' && handleCheckboxChange) {
					handleCheckboxChange({ target: { value: 'active' } } as any);
				}
				if (options && handleSelectChange) {
					handleSelectChange({ target: { value: options[0].value } } as any);
				}
			}
			return newQuery;
		});
	};

	const onSelectChange = (e) => {
		handleSelectChange(e);
	};

	const handleKeydown = (e) => {
		if (e.key === 'Enter' || e.code === 'Enter') {
			window.open(generateQueryUrl({ type }) as string);
		}
	};

	export let hasInput = false;
</script>

<div class="container">
	<label class="input-label text-gray-300">
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

	{#if (enabled || Boolean($queryStore.filters[Case.camel(type)])) && options}
		<select
			in:slide
			out:slide
			class="select select-bordered"
			type="text"
			name={`${type}-input`}
			id={`${type}-input`}
			value={$queryStore.filters[Case.camel(type)]?.value || options[0].value}
			on:change={onSelectChange}
		>
			{#each options as option}
				<option
					class="rounded-md text-lg p-4 border-2 dark:bg-gray-600 border-gray-400 dark:border-gray-400"
					value={option.value}>{option.label}</option
				>
			{/each}
		</select>
	{/if}

	{#if (enabled || Boolean($queryStore.filters[Case.camel(type)])) && hasInput}
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
