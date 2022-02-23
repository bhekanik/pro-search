<script lang="ts">
	import { SearchProviderName, searchProvidersWithoutAll } from '$lib/app/config';
	import type { InputType, RecipeInput } from '$lib/app/config/recipes';
	import { onMount } from 'svelte';
	import { fade, scale } from 'svelte/transition';

	export let bgColor = 'bg-blue-900';
	export let hoverBgColor = 'bg-blue-800';
	export let textColor = 'text-gray-300';
	export let inputs: RecipeInput[];
	export let name: string;
	export let queryTemplate: string;
	export let searchProvider: SearchProviderName;

	let state: InputType[] = [];
	let handleSearch: () => void;
	let parsedQuery: string;
	let baseUrl = 'https://www.google.com/search?q=';
	let handleInputFuncs: ((e: Event) => void)[] = [];
	let values: string[] = [];

	onMount(() => {
		baseUrl = searchProvidersWithoutAll.find((item) => item.name === searchProvider).url as string;

		for (const [i, input] of inputs.entries()) {
			state[i] = {
				...input,
				value: '',
				ref: null
			};

			handleInputFuncs[i] = (e: Event) => {
				values[i] = (e.target as HTMLInputElement).value;
			};

			if (input.shouldHandleSearch && !handleSearch) {
				handleSearch = () => {
					values.forEach((item, i) => {
						parsedQuery = (parsedQuery || queryTemplate).replace(`{{${state[i].name}}}`, item);
					});

					const url = `${baseUrl}${encodeURIComponent(parsedQuery)}`;

					parsedQuery = queryTemplate;

					window.open(url, '_blank');
				};
			}
		}
	});
</script>

<div
	class={`flex flex-col justify-between card glass ${hoverBgColor} ${bgColor} shadow-md py-2 px-4 relative`}
	in:fade
>
	<div class="mb-2">
		<h1 class={`font-medium text-lg ${textColor}`}>
			{name}
		</h1>
		<div class="p-2">
			<div class="relative w-full flex gap-2 flex-col">
				{#each state as input, i (input.name)}
					<div class="relative">
						<input
							placeholder={input.placeholder}
							type={input.type || 'text'}
							class="input input-sm input-bordered w-full pr-8"
							value={values[i] || ''}
							on:input={handleInputFuncs[i]}
							bind:this={input.ref}
							on:keydown={(e) => {
								const key = e.key || e.code;
								if (key === 'Enter') {
									input.shouldHandleSearch && handleSearch?.();
								}
							}}
						/>
						{#if input.value}
							<button
								on:click={() => {
									input.value = '';
									input.ref.focus();
								}}
								in:fade
								out:scale
								class="absolute top-1 right-2 btn-xs btn-ghost btn btn-circle">✕</button
							>
						{/if}
						{#if input.helperText}
							<span class="text-xs text-gray-900">{input.helperText}</span>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</div>
	<div>
		<div class="flex gap-1 align-middle items-center justify-end mt-2">
			<button class={`btn btn-sm glass ${textColor}`} on:click={() => handleSearch?.()}
				>Search</button
			>
		</div>
	</div>
</div>
