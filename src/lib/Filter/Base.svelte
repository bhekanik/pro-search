<script lang="ts">
	import Case from 'case';
	import { query } from '../../stores/query';
	import type { FilterType } from './types';

	export let type: FilterType;
	export let enabled = false;

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

	export let handleInput: (e: any) => void;
	export let go: (e: any) => void = () => null;
	export let hasInput: boolean = false;
</script>

<div class="container">
	<label class="input-label">
		<input
			type="checkbox"
			name={`${type}-checkbox`}
			id={`${type}-checkbox`}
			checked={Boolean($query.filters[Case.camel(type)])}
			on:input={handleCheckboxInput}
		/>
		{type}
	</label>

	{#if (enabled || Boolean($query.filters[Case.camel(type)])) && hasInput}
		<input
			disabled={!Boolean($query.filters[Case.camel(type)])}
			class="w-full my-2 rounded-md text-lg p-4 border-2 border-gray-400 dark:border-gray-400 bg-transparent"
			type="text"
			name={`${type}-input`}
			id=""
			placeholder={type}
			value={$query.filters[Case.camel(type)]?.value || ''}
			on:input={handleInput}
			on:keydown={go}
		/>
	{/if}
</div>

<style lang="scss">
	.container {
		display: grid;
		gap: 2rem;
		margin: 0.5rem 0;

		.input-label {
			display: flex;
			align-items: center;
			gap: 0.5rem;

			input {
				width: 1.75rem;
				height: 1.75rem;
			}
		}
	}
</style>
