import { queryStore } from '$lib/stores';
import { get } from 'svelte/store';

const queryParamFilters = ['past', 'rights', 'safe'];

/**
 * Formats the search input for the search engine according to the provided
 * filters
 *
 * @returns The formated query ready to be sent to the search engine
 */
export const formatQuery = (): string => {
	const query = get(queryStore);
	// put the filters together
	const prefix = Object.entries(query.filters)
		.filter((filter) => !queryParamFilters.includes(filter[0]))
		.reduce((prev, curr) => `${prev}${curr[1].formatted}`, '');

	const queryParams = Object.entries(query.filters)
		.filter((filter) => queryParamFilters.includes(filter[0]))
		.map((filter) => filter[1].formatted)
		.join('&');

	const formattedQuery = `${prefix} ${query.searchTerm}&${queryParams.trim()}`;

	return formattedQuery;
};
