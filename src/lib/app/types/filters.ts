export type FilterType =
	| 'Site'
	| 'Area'
	| 'Locale'
	| 'Publish Language'
	| 'Past'
	| 'Safe'
	| 'Rights'
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
	'Link',
	'Exact',
	'Text',
	'Related',
	'Title',
	'URL'
];
