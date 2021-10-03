<script context="module">
	export const prerender = true;
</script>

<script>
	import { pokemon } from '../stores/pokestore';
</script>

<svelte:head>
	<title>PokeDex</title>
</svelte:head>

<main>
	<h1>PokeDex</h1>
	{#each $pokemon as pokeman}
		<p>{pokeman.name}</p>
	{/each}
</main>
