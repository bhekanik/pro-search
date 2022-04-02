import type { FilterType } from '$lib/app/types/filters';
import { filtersThatDontRequireSearchTerm } from '$lib/app/types/filters';
import { formatQuery } from '$lib/components/Filters/utils/formatQuery';
import { queryStore, type Query } from '$lib/stores';
import { get } from 'svelte/store';
import { updateSavedQueries } from './updateSavedQueries';

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
		return `${query.provider.url}${formattedQuery.replace(/%2B/g, '+')}`;
	} else {
		const url = [];
		for (const providerUrl of query.provider.url) {
			url.push(`${providerUrl}${formattedQuery.replace(/%2B/g, '+')}`);
		}
		return url;
	}
};
