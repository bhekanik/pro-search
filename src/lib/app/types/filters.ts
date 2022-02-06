export type FilterType =
	| 'Site'
	| 'Area'
	| 'AdWords'
	| 'Personal'
	| 'Content Type'
	| 'Country'
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
