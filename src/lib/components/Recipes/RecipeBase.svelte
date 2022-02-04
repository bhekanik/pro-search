<script lang="ts">
	import { fade, scale } from 'svelte/transition';

	interface InputType {
		name: string;
		type: string;
		placeholder: string;
		ref: any;
		handleSearch?: () => void;
		handleInput: (e: any) => void;
		value: string;
		helperText?: string;
	}

	export let bgColor = 'bg-blue-900';
	export let hoverBgColor = 'bg-blue-800';
	export let name: string;
	export let textColor = 'text-gray-300';
	export let inputs: InputType[];
	export let handleSearch: () => void;
</script>

<div
	class={`flex flex-col justify-between card glass hover:${hoverBgColor} ${bgColor} shadow-md py-2 px-4 relative`}
	in:fade
>
	<div class="mb-2">
		<h1 class={`font-medium text-lg ${textColor} whitespace-nowrap overflow-hidden text-ellipsis`}>
			{name}
		</h1>
		<div class="p-2">
			<div class="relative w-full flex gap-2 flex-col">
				{#each inputs as input (input.name)}
					<div class="relative">
						<input
							placeholder={input.placeholder}
							type="text"
							class="input input-sm input-bordered w-full pr-8"
							value={input.value}
							on:input={input.handleInput}
							bind:this={input.ref}
							on:keydown={(e) => {
								const key = e.key || e.code;
								if (key === 'Enter') {
									input.handleSearch?.();
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
			<button class={`btn btn-sm glass ${textColor}`} on:click={() => handleSearch()}>Search</button
			>
		</div>
	</div>
</div>
