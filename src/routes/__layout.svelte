<script>
	import Header from '$lib/header.svelte';
	import '../global.css';
</script>

<div class="relative dark:bg-gray-600">
	<Header />
	<div class="p-8 max-w-6xl mx-auto">
		<slot />
	</div>
</div>
