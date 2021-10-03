<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { Pokeman } from '../stores/pokestore';
	export let pokeman: Pokeman;
</script>

<a
	class="p-6 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200  text-center rounded-md shadow-sm hover:shadow-md flex flex-col items-center"
	href={`/pokemon/${pokeman.id}`}
	transition:fade
>
	<img class="h-40 w-40" src={pokeman.image} alt={pokeman.name} />
	<h2 class="uppercase text-xl">{pokeman.id}. {pokeman.name}</h2>
</a>
