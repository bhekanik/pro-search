<script lang="ts">
	import ShareModal from '$lib/components/SavedQueries/ShareModal.svelte';
	import { queryStore } from '$lib/stores';
	import { fade, scale } from 'svelte/transition';

	export let recipe;

	const handleSearch = () => {
		queryStore.set({ ...recipe });
	};

	let queryName = '';
	let input = null;

	const handleKeydown = (e) => {
		if (e.keyCode === 13) {
			handleSearch();
		}
	};
</script>

<div
	class="flex flex-col justify-between card glass hover:bg-blue-800 bg-blue-900 shadow-md py-2 px-4 relative"
	in:fade
	out:scale|local
>
	<div class="flex flex-col justify-between mb-2">
		<h1 class="font-medium text-lg text-gray-300 whitespace-nowrap overflow-hidden text-ellipsis">
			{recipe.name}
		</h1>
		<div>
			<div class="w-full flex gap-2">
				<input
					bind:this={input}
					placeholder="Query"
					type="text"
					class="input input-sm input-bordered w-full"
					bind:value={queryName}
					on:keydown={handleKeydown}
				/>
			</div>
		</div>
	</div>
	<div>
		<div class="flex gap-1 align-middle items-center justify-end mt-2">
			<ShareModal query={recipe} />
			<button class="btn btn-sm glass text-gray-300" on:click={() => handleSearch()}>Search</button>
		</div>
	</div>
</div>
