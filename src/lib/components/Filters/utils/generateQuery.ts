import { queryStore } from '$lib/stores';
import { get } from 'svelte/store';

/**
 * Formats the search input for the search engine according to the provided
 * filters
 *
 * @returns The formated query ready to be sent to the search engine
 */
export const formatQuery = (): string => {
	const query = get(queryStore);
	// put the filters together
	const prefix = Object.values(query.filters).reduce(
		(prev, curr) => `${prev}${curr.formatted}`,
		''
	);

	const formattedQuery = `${prefix} ${query.searchTerm}`;

	return formattedQuery;
};
