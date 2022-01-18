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

<label for={`share-modal-btn-${query.id}`} class="btn btn-ghost modal-button">Share</label>
<input on:click={onOpen} type="checkbox" id={`share-modal-btn-${query.id}`} class="modal-toggle" />
<div class="modal">
	<div class="modal-box">
		<div class="w-full flex gap-2">
			<input type="text" class="input input-bordered w-full" readonly value={link} />
			<button on:click={handleCopy} class="btn btn-outline">Copy</button>
		</div>
		<p>{copiedText}</p>

		<div class="modal-action">
			<button on:click={handleShare} for={`share-modal-btn-${query.id}`} class="btn btn-primary"
				>Share</button
			>
			<label for={`share-modal-btn-${query.id}`} class="btn">Close</label>
		</div>
	</div>
</div>
