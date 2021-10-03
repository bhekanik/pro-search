<script context="module">
	export async function load({ fetch }) {
		const url = `https://pokeapi.co/api/v2/pokemon?limit=150`;
		const res = await fetch(url);
		const data = await res.json();
		const loadedPokemon = data.results.map((data, index) => {
			return {
				name: data.name,
				id: index + 1,
				image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
					index + 1
				}.png`
			};
		});

		return {
			props: {
				pokemon: loadedPokemon
			}
		};
	}
	export const prerender = true;
</script>

<script lang="ts">
	interface Pokeman {
		name: string;
		id: number;
		image: string;
	}
	export let pokemon: Pokeman[];
	import PokemanCard from '$lib/pokemanCard.svelte';

	let searchTerm = '';
	let filterPokemon = [];

	$: {
		if (searchTerm) {
			filterPokemon = pokemon.filter((pokeman) =>
				pokeman.name.toLowerCase().includes(searchTerm.toLowerCase())
			);
		} else {
			filterPokemon = [...pokemon];
		}
	}
</script>

<svelte:head>
	<title>PokeDex</title>
</svelte:head>

<main>
	<h1 class="text-4xl text-center my-8 uppercase">PokeDex</h1>
	<input
		class="w-full rounded-md text-lg p-4 border-2 border-gray-200 dark:border-gray-800"
		placeholder="Search Pokemon"
		bind:value={searchTerm}
		type="text"
		name=""
		id=""
	/>
	<div class="py-4 grid gap-4 md:grid-cols-2 grid-cols-1">
		{#each filterPokemon as pokeman}
			<PokemanCard {pokeman} />
		{/each}
	</div>
</main>
