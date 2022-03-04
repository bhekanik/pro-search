import type { Query } from '$lib/stores';
import { queryStore } from '$lib/stores';
import { get } from 'svelte/store';

const queryParamFilters = [
	'adWords',
	'area',
	'contentType',
	'country',
	'dateAfter',
	'dateBefore',
	'exact',
	'exclude',
	'fileType',
	'link',
	'locale',
	'past',
	'personal',
	'publishLanguage',
	'related',
	'rights',
	'safe',
	'site',
	'sortBy'
];

/**
 * Formats the search input for the search engine according to the provided
 * filters
 *
 * @returns The formatted query ready to be sent to the search engine
 */
export const formatQuery = (options?: { query?: Query }): string => {
	const query = options.query || get(queryStore);
	const {
		provider: { name: searchProviderName }
	} = query;

	if (searchProviderName === 'Google') {
		// put the filters together
		const prefix = Object.entries(query.filters)
			.filter((filter) => !queryParamFilters.includes(filter[0]))
			.reduce((prev, curr) => `${prev}${curr[1].formatted}`, '');

		const queryParams = Object.entries(query.filters)
			.filter((filter) => queryParamFilters.includes(filter[0]))
			.map((filter) => filter[1].formatted.trim())
			.join('&');

		const formattedQuery = `${prefix}${query.search_term}${
			queryParams.trim() ? `&${queryParams}` : ''
		}`;

		return formattedQuery;
	} else if (searchProviderName === 'Bing') {
		// put the filters together
		const prefix = Object.entries(query.filters)
			.filter((filter) => !['save'].includes(filter[0]))
			.reduce((prev, curr) => `${prev}${curr[1].formatted}`, '');

		const queryParams = Object.entries(query.filters)
			.filter((filter) => ['save'].includes(filter[0]))
			.map((filter) => filter[1].formatted.trim())
			.join('&');

		const formattedQuery = `${prefix}${query.search_term}${
			queryParams.trim() ? `&${queryParams}` : ''
		}`;

		return formattedQuery;
	} else {
		// put the filters together
		const prefix = Object.entries(query.filters).reduce(
			(prev, curr) => `${prev}${curr[1].formatted}`,
			''
		);

		const formattedQuery = `${prefix}${query.search_term}`;

		return formattedQuery;
	}
};
