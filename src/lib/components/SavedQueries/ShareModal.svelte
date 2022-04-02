<script lang="ts">
	import type { Query } from '$lib/stores';
	import { generateQueryUrl } from '$lib/utils';
	import QrGenerator from '../QRGenerator.svelte';

	export let query: Query;

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
			alert('An error occured while sharing');
		}
	};
</script>

<input on:click={onOpen} type="checkbox" id={`share-modal-btn-${query.id}`} class="modal-toggle" />
<div class="modal">
	<div class="modal-box">
		<div class="flex gap-2">
			<QrGenerator {link} />
			<div class="flex-1">
				<div class="w-full flex gap-2">
					<input type="text" class="input input-sm input-bordered w-full" readonly value={link} />
					<button on:click={handleCopy} class="btn btn-outline btn-sm">Copy</button>
				</div>
				<p class="text-sm w-full px-2">{copiedText}</p>
			</div>
		</div>

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
