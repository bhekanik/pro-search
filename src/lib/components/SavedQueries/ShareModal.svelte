<script lang="ts">
	import { generateQueryUrl } from '$lib/utils/generateAndGo';

	export let query;

	let link = '';
	let copiedText = '';

	const onOpen = () => {
		link = generateQueryUrl({ query, skipSearchTermCheck: true }) as string;
	};

	const handleCopy = () => {
		navigator.clipboard.writeText(link);
		copiedText = 'Copied to Clipboard!';
		setTimeout(() => {
			copiedText = '';
		}, 2000);
	};

	const handleShare = async () => {
		try {
			await navigator.share({
				title: 'Pro-search | Build complex queries!',
				text: 'Query Title',
				url: link
			});
		} catch (error) {
			console.log('error:', error);
		}
	};
</script>

<input on:click={onOpen} type="checkbox" id={`share-modal-btn-${query.id}`} class="modal-toggle" />
<div class="modal">
	<div class="modal-box">
		<div class="w-full flex gap-2">
			<input type="text" class="input input-sm input-bordered w-full" readonly value={link} />
			<button on:click={handleCopy} class="btn btn-outline btn-sm">Copy</button>
		</div>
		<p class="text-sm w-full px-2">{copiedText}</p>

		<div class="modal-action">
			<button
				on:click={handleShare}
				for={`share-modal-btn-${query.id}`}
				class="btn btn-sm btn-primary">Share</button
			>
			<label for={`share-modal-btn-${query.id}`} class="btn btn-sm">Close</label>
		</div>
	</div>
</div>
