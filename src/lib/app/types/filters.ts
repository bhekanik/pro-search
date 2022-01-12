export type FilterType =
	| 'Site'
	| 'Past'
	| 'Exact'
	| 'DateBefore'
	| 'DateAfter'
	| 'Text'
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
	'Exact',
	'Text',
	'Related',
	'Title',
	'URL'
];
