<script lang="ts">
	import type { FilterType } from './types';

	let enabled = false;

	export let handleInput: (e: any) => void;
	export let type: FilterType;
	export let go: (e: any) => void = () => null;
	export let hasInput: boolean = false;
</script>

<div class="container">
	<label class="input-label">
		<input
			type="checkbox"
			name={`${type}-checkbox`}
			id={`${type}-checkbox`}
			bind:checked={enabled}
			on:input={handleInput}
		/>
		{type}
	</label>
</div>

{#if enabled && hasInput}
	<input
		disabled={!enabled}
		class="w-full my-2 rounded-md text-lg p-4 border-2 border-gray-400 dark:border-gray-400 bg-transparent"
		type="text"
		name={`${type}-input`}
		id=""
		placeholder={type}
		on:input={handleInput}
		on:keydown={go}
	/>
{/if}

<style lang="scss">
	.container {
		display: flex;
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
