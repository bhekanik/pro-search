import { writable } from 'svelte/store';

export const seo = writable({
	title: 'Pro-Search',
	description: 'Advanced search query builder'
});
