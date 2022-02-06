import type { RecipeType } from '$lib/app/config/recipes';
import { recipes } from '$lib/app/config/recipes';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get(): Promise<{ body: { recipes: RecipeType[] } }> {
	return {
		body: {
			recipes
		}
	};
}
