<script lang="ts">
	export let text = '';

	let showInfo = true;
</script>

<div
	class={`${
		showInfo === false && 'hidden'
	} query-url text-sm my-4 py-2 px-4 bg-purple-600 bg-opacity-40 rounded-lg overflow-x-auto relative flex justify-between w-full`}
>
	<span>
		{text}
	</span>
	<button on:click={() => (showInfo = false)} class="btn btn-xs btn-ghost btn-circle">✕</button>
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
