export interface SearchProvider {
	name: string;
	url: string;
}

export const searchProviders = [
	{
		name: 'Google',
		url: 'https://google.com/search?q='
	},
	{
		name: 'DuckDuckGo',
		url: 'https://duckduckgo.com/?q='
	},
	{
		name: 'Bing',
		url: 'https://bing.com/search?q='
	},
	{
		name: 'Yahoo',
		url: 'https://search.yahoo.com/search?q='
	}
];
