import type { FilterType } from '$lib/app/types/filters';
import { filtersThatDontRequireSearchTerm } from '$lib/app/types/filters';
import { formatQuery } from '$components/Filters/utils/formatQuery';
import { queryStore, type Query } from '$stores';
import { get } from 'svelte/store';
import { updateSavedQueries } from './updateSavedQueries';
import { isValidSearchProviderUrl } from './sanitization';

interface GenerateQueryUrlOptions {
	saveQuery?: boolean;
	type?: FilterType;
	skipSearchTermCheck?: boolean;
	query?: Query;
}

export const generateQueryUrl = (
	options: GenerateQueryUrlOptions = { saveQuery: false, skipSearchTermCheck: false }
): string | string[] => {
	const query = options.query || get(queryStore);

	if (
		!options.skipSearchTermCheck &&
		!query.search_term &&
		!filtersThatDontRequireSearchTerm.includes(options.type!)
	) {
		return '';
	}

	if (options.saveQuery) updateSavedQueries();

	const formattedQuery = formatQuery({ query });

	if (typeof query.provider.url === 'string') {
		// Validate provider URL before using it
		const fullUrl = `${query.provider.url}${formattedQuery.replace(/%2B/g, '+')}`;
		if (!isValidSearchProviderUrl(fullUrl)) {
			console.error('Invalid search provider URL detected:', fullUrl);
			return '';
		}
		return fullUrl;
	} else {
		const url = [];
		for (const providerUrl of query.provider.url) {
			const fullUrl = `${providerUrl}${formattedQuery.replace(/%2B/g, '+')}`;
			// Validate each provider URL
			if (isValidSearchProviderUrl(fullUrl)) {
				url.push(fullUrl);
			} else {
				console.error('Invalid search provider URL detected:', fullUrl);
			}
		}
		return url;
	}
};
