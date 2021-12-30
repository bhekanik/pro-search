<script lang="ts">
	import type { ConfigOption } from '$lib/stores';
	import { configStore } from '$lib/stores';
	import { slide } from 'svelte/transition';

	export let enabled = false;
	export let label = '';
	export let textInputPlaceholder = '';
	export let option: ConfigOption;

	export let hasInput = false;
</script>

<div class="container">
	<label class="input-label">
		<!-- svelte-ignore missing-declaration -->
		<input
			type="checkbox"
			class="toggle toggle-primary"
			name={`${label}-checkbox`}
			id={`${label}-checkbox`}
			bind:checked={$configStore[option]}
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
