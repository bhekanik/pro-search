<script lang="ts">
	import { fade, scale } from 'svelte/transition';

	let siteUrl = '';
	let searchTerm = '';

	const handleSearch = () => {
		window.open(
			'https://www.google.com/search?q=' + encodeURI(`site:${siteUrl} `) + encodeURI(searchTerm),
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
	class="flex flex-col justify-between card glass hover:bg-blue-800 bg-blue-900 shadow-md py-2 px-4 relative"
	in:fade
	out:scale|local
>
	<div class="mb-2">
		<h1 class="font-medium text-lg text-gray-300 whitespace-nowrap overflow-hidden text-ellipsis">
			Search your own site
		</h1>
		<div class="p-2">
			<div class="relative w-full flex gap-2 flex-col">
				<div class="relative">
					<input
						placeholder="Your site. For example, www.example.com"
						type="url"
						class="input input-sm input-bordered w-full pr-8"
						bind:value={siteUrl}
						on:keydown={handleKeydown}
					/>
					{#if siteUrl}
						<button
							on:click={() => (siteUrl = '')}
							in:fade
							out:scale
							class="absolute top-1 right-2 btn-xs btn-ghost btn btn-circle">✕</button
						>
					{/if}
				</div>

				<div class="relative">
					<input
						placeholder="Search Term"
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
							class="absolute top-1 right-2 btn-xs btn-ghost btn btn-circle">✕</button
						>
					{/if}
				</div>
			</div>
		</div>
	</div>
	<div>
		<div class="flex gap-1 align-middle items-center justify-end mt-2">
			<button class="btn btn-sm glass text-gray-300" on:click={() => handleSearch()}>Search</button>
		</div>
	</div>
</div>
