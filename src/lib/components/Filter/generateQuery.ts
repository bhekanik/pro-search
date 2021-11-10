import type { Query } from '$lib/stores';

/**
 * Formats the search input for the search engine according to the provided
 * filters
 *
 * @param query Object containin the selected filters together with their
 * parameters and the search term
 * @returns The formated query ready to be sent to the search engine
 */
export const generateQuery = (query: Query): string => {
	// put the filters together
	const prefix = Object.values(query.filters).reduce(
		(prev, curr) => `${prev}${curr.formatted}`,
		''
	);

	const formattedQuery = `${prefix} ${query.searchTerm}`;

	return formattedQuery;
};
