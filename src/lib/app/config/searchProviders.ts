export interface SearchProvider {
	id: string;
	name: string;
	url: string | string[];
}

export type SearchProviderName = 'Google' | 'Bing' | 'DuckDuckGo' | 'Yahoo';

export const searchProvidersWithoutAll = [
	{
		id: '1',
		name: 'Google',
		url: 'https://google.com/search?q='
	},
	{
		id: '2',
		name: 'DuckDuckGo',
		url: 'https://duckduckgo.com/?q='
	},
	{
		id: '3',
		name: 'Bing',
		url: 'https://bing.com/search?q='
	},
	{
		id: '4',
		name: 'Yahoo',
		url: 'https://search.yahoo.com/search?q='
	}
];

export const searchProvidersWithAll = [
	...searchProvidersWithoutAll,
	{
		id: '5',
		name: 'All',
		url: [
			'https://search.yahoo.com/search?q=',
			'https://google.com/search?q=',
			'https://bing.com/search?q=',
			'https://duckduckgo.com/?q='
		]
	}
];
