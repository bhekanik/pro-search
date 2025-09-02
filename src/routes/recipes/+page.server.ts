import { recipes } from '$lib/app/config/recipes';
import type { RecipeType } from '$lib/app/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		recipes
	};
};
