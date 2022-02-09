<script lang="ts">
	import { recipes } from '$lib/app/config/recipes';
	import Recipe from '$lib/components/Recipes/Recipe.svelte';
</script>

<div
	class="px-4 h-full grid gap-2 auto-rows-max grid-cols-[repeat(auto-fill,minmax(200px,1fr))] overflow-auto recipes-list"
>
	{#each recipes as recipe (recipe.id)}
		<Recipe
			searchProvider={recipe.searchProvider}
			hoverBgColor={recipe.hoverBgColor}
			bgColor={recipe.bgColor}
			textColor={recipe.textColor}
			inputs={recipe.inputs}
			queryTemplate={recipe.queryTemplate}
			name={recipe.name}
		/>
	{/each}
</div>

<style>
	.recipes-list::-webkit-scrollbar {
		width: 15px;
	}

	.recipes-list::-webkit-scrollbar-track {
		background-color: #555555;
		border-radius: 100px;
	}

	.recipes-list::-webkit-scrollbar-thumb {
		border-radius: 80px;
		border: 5px solid transparent;
		background-clip: content-box;
		background-color: #6174c3;
	}
</style>
