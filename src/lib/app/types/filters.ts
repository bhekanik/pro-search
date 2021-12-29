export type FilterType =
	| 'Site'
	| 'Link'
	| 'Related'
	| 'File Type'
	| 'Title'
	| 'URL'
	| 'Exclude'
	| 'Synonyms';

export const filtersThatDontRequireSearchTerm: FilterType[] = [
	'Synonyms',
	'Exclude',
	'Link',
	'Related',
	'Title',
	'URL'
];
