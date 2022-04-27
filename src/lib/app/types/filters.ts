export type FilterType =
	| 'AdWords'
	| 'Area'
	| 'Content Type'
	| 'Country'
	| 'DateAfter'
	| 'DateBefore'
	| 'Exact'
	| 'Exclude'
	| 'ExcludeSite'
	| 'File Type'
	| 'Link'
	| 'Locale'
	| 'NumRange'
	| 'Past'
	| 'Personal'
	| 'Publish Language'
	| 'Related'
	| 'Rights'
	| 'Safe'
	| 'Site'
	| 'Sort By'
	| 'Synonyms'
	| 'Text'
	| 'Title'
	| 'URL';

export const filtersThatDontRequireSearchTerm: FilterType[] = [
	'Exact',
	'Link',
	'Related',
	'Synonyms',
	'Text',
	'Title',
	'URL'
];
