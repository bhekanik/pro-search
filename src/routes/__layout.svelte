<script>
	import Header from '$lib/header.svelte';
	import '../global.css';
</script>

<Header />

<slot />

<style>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
