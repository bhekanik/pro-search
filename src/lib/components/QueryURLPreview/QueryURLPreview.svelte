<script lang="ts">
	import { queryStore } from '$lib/stores';
	import { generateQueryUrl } from '$lib/utils';

	let queryUrl = '';

	queryStore.subscribe(() => {
		queryUrl = encodeURI(generateQueryUrl({ skipSearchTermCheck: true }) as string);
	});
</script>

<div
	class="query-url text-xs whitespace-nowrap my-4 py-2 px-4 bordered bg-purple-600 bg-opacity-40 rounded-lg overflow-x-auto"
>
	{queryUrl}
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
