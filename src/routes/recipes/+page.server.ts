import { recipes } from '$lib/app/config/recipes';
import type { RecipeType } from '$lib/app/types';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET(): Promise<{ body: { recipes: RecipeType[] } }> {
	return {
		body: {
			recipes
		}
	};
}
