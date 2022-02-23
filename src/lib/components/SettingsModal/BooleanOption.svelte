<script lang="ts">
	import { slide } from 'svelte/transition';

	export let enabled = false;
	export let label = '';
	export let name: string;
	export let textInputPlaceholder = '';
	export let value: boolean;
	export let handleCheckboxChange;

	export let hasInput = false;
</script>

<div class="container">
	<label class="input-label">
		<input
			type="checkbox"
			class="toggle toggle-primary"
			{name}
			id={`${label}-checkbox`}
			{value}
			on:input={handleCheckboxChange}
		/>
		{label}
	</label>

	{#if enabled && hasInput}
		<input
			in:slide
			out:slide
			class="input input-bordered"
			type="text"
			name={`${label}-input`}
			id=""
			placeholder={textInputPlaceholder || label}
			value={'some value'}
			on:input
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
