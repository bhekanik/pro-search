<script lang="ts">
	export let text = '';

	let showInfo = true;
	// class="query-url text-xs whitespace-nowrap mb-4 py-2 px-4 bordered bg-[#1DA1F2] bg-opacity-40 rounded-lg overflow-x-auto"
</script>

<div
	class={`${
		showInfo === false && 'hidden'
	} query-url text-sm mb-4 py-2 px-4 bg-purple-600 bg-opacity-40 rounded-lg overflow-x-auto relative flex justify-between w-full`}
>
	<span>
		{text}
	</span>
	<button on:click={() => (showInfo = false)} class="btn btn-xs btn-ghost">Dismiss</button>
</div>

<style>
	.query-url::-webkit-scrollbar {
		width: 5px;
	}

	.query-url::-webkit-scrollbar-track {
		background-color: #374151;
		border-radius: 100px;
		width: 10px;
	}

	.query-url::-webkit-scrollbar-thumb {
		border-radius: 80px;
		border: 5px solid transparent;
		background-clip: content-box;
		background-color: #8070d4;
	}
</style>
