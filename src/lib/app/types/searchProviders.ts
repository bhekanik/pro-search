export interface SearchProvider {
	id: number;
	name: string;
	url: string | string[];
}

export type SearchProviderName = 'Google' | 'Bing' | 'DuckDuckGo' | 'Yahoo';
