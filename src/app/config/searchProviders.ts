export interface SearchProvider {
	id: string;
	name: string;
	url: string;
}

export const searchProviders = [
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
