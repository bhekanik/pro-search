<script>
	import { splitClient } from '$lib/app/splitClient';
	import { onDestroy } from 'svelte';
	import '../global.css';

	onDestroy(splitClient.destroy);
</script>

<div class="relative h-full pt-24 dark:bg-gray-600">
	<div class="p-8 max-w-6xl mx-auto">
		<slot />
	</div>
</div>
