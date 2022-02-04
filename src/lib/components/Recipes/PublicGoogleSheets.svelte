<script lang="ts">
	import { fade, scale } from 'svelte/transition';

	let searchTerm = '';

	const handleSearch = () => {
		window.open(
			'https://www.google.com/search?q=' +
				encodeURI(`site:docs.google.com/spreadsheets `) +
				encodeURI(`intitle:"${searchTerm}"`),
			'_blank'
		);
	};

	const handleKeydown = (e) => {
		if (e.keyCode === 13) {
			handleSearch();
		}
	};
</script>

<div
	class="flex flex-col justify-between card glass hover:bg-[#11b666] bg-[#0F9D58] shadow-md py-2 px-4 relative"
	in:fade
	out:scale|local
>
	<div class="mb-2">
		<h1 class="font-medium text-lg text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis">
			Search public Google Sheets
		</h1>
		<div class="p-2">
			<div class="relative w-full">
				<input
					placeholder="Query"
					type="text"
					class="input input-sm input-bordered w-full pr-8"
					bind:value={searchTerm}
					on:keydown={handleKeydown}
				/>
				{#if searchTerm}
					<button
						on:click={() => (searchTerm = '')}
						in:fade
						out:scale
						class="absolute top-1 right-3 btn-xs btn-ghost btn btn-circle">✕</button
					>
				{/if}
				<span class="text-xs text-gray-900"
					>Example: Try searching for Startup tools or Angel or Salaries</span
				>
			</div>
		</div>
	</div>
	<div>
		<div class="flex gap-1 align-middle items-center justify-end mt-2">
			<button class="btn btn-sm glass text-gray-900" on:click={() => handleSearch()}>Search</button>
		</div>
	</div>
</div>
