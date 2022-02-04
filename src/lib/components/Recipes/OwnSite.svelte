<script lang="ts">
	import { fade, scale } from 'svelte/transition';

	let siteUrl = '';
	let siteUrlInput = null;

	let queryTerm = '';
	let queryTermInput = null;

	const handleSearch = () => {
		window.open(
			'https://www.google.com/search?q=' + encodeURI(`site:${siteUrl} `) + encodeURI(queryTerm),
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
>
	<div class="mb-2">
		<h1 class="font-medium text-lg text-gray-300 whitespace-nowrap overflow-hidden text-ellipsis">
			Search your own website
		</h1>
		<div class="p-2">
			<div class="relative w-full flex gap-2 flex-col">
				<div class="relative">
					<input
						placeholder="Your website. For example, www.example.com"
						type="url"
						class="input input-sm input-bordered w-full pr-8"
						bind:value={siteUrl}
						bind:this={siteUrlInput}
						on:keydown={handleKeydown}
					/>
					{#if siteUrl}
						<button
							on:click={() => {
								siteUrl = '';
								siteUrlInput.focus();
							}}
							in:fade
							out:scale
							class="absolute top-1 right-2 btn-xs btn-ghost btn btn-circle">✕</button
						>
					{/if}
				</div>

				<div class="relative">
					<input
						placeholder="Query"
						type="text"
						class="input input-sm input-bordered w-full pr-8"
						bind:value={queryTerm}
						bind:this={queryTermInput}
						on:keydown={handleKeydown}
					/>

					{#if queryTerm}
						<button
							on:click={() => {
								queryTerm = '';
								queryTermInput.focus();
							}}
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
