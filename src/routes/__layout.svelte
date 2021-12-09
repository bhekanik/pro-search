<script>
	import { splitClient } from '$lib/app/splitClient';
	import { onDestroy, onMount } from 'svelte';
	import { themeChange } from 'theme-change';
	import '../global.css';

	onMount(() => {
		themeChange(false);
	});

	onDestroy(splitClient.destroy);
</script>

<div class="relative h-full pt-24 dark:bg-gray-600">
	<div class="p-8 max-w-6xl mx-auto h-full">
		<slot />
	</div>
</div>
