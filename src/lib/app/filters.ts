import type { FilterType } from '$lib/components/Filters/types';

export const filtersThatDontRequireSearchTerm: FilterType[] = [
	'Synonyms',
	'Exclude',
	'Link',
	'Related',
	'Title',
	'URL'
];
