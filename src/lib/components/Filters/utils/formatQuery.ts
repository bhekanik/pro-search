import type { Query } from '$lib/stores';
import { queryStore } from '$lib/stores';
import { get } from 'svelte/store';
import { sanitizeSearchTerm, sanitizeFilterValue } from '$lib/utils/sanitization';

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

const postFixFilters = ['excludeSite', 'numRange'];

const getPostfix = (query: Query): string =>
	Object.entries(query.filters)
		.filter((filter) => postFixFilters.includes(filter[0]))
		.map((filter) => {
			const sanitized = sanitizeFilterValue((filter[1] as any).formatted.trim(), filter[0]);
			return sanitized;
		})
		.join('+');

/**
 * Formats the search input for the search engine according to the provided
 * filters
 *
 * @returns The formatted query ready to be sent to the search engine
 */
export const formatQuery = (options?: { query?: Query }): string => {
	const query = options?.query || get(queryStore);
	const {
		provider: { name: searchProviderName }
	} = query;

	if (searchProviderName === 'Google') {
		// put the filters together with sanitization
		const prefix = Object.entries(query.filters)
			.filter(
				(filter) => !queryParamFilters.includes(filter[0]) && !postFixFilters.includes(filter[0])
			)
			.reduce((prev, curr) => {
				const sanitized = sanitizeFilterValue((curr[1] as any).formatted, curr[0]);
				return `${prev}${sanitized}`;
			}, '');

		const queryParams = Object.entries(query.filters)
			.filter(
				(filter) => queryParamFilters.includes(filter[0]) && !postFixFilters.includes(filter[0])
			)
			.map((filter) => {
				const sanitized = sanitizeFilterValue((filter[1] as any).formatted.trim(), filter[0]);
				return sanitized;
			})
			.join('&');

		const postfix = getPostfix(query);

		// Sanitize the search term
		const sanitizedSearchTerm = sanitizeSearchTerm(query.search_term);

		const formattedQuery = `${prefix}${sanitizedSearchTerm}${postfix.trim() && `+${postfix} `}`;

		const formattedQueryWithParams = `${encodeURIComponent(formattedQuery)}${
			queryParams.trim() ? `&${queryParams}` : ''
		}`;

		return formattedQueryWithParams;
	} else if (searchProviderName === 'Bing') {
		// put the filters together with sanitization
		const prefix = Object.entries(query.filters)
			.filter((filter) => !['save'].includes(filter[0]) && !postFixFilters.includes(filter[0]))
			.reduce((prev, curr) => {
				const sanitized = sanitizeFilterValue((curr[1] as any).formatted, curr[0]);
				return `${prev}${sanitized}`;
			}, '');

		const queryParams = Object.entries(query.filters)
			.filter((filter) => ['save'].includes(filter[0]) && !postFixFilters.includes(filter[0]))
			.map((filter) => {
				const sanitized = sanitizeFilterValue((filter[1] as any).formatted.trim(), filter[0]);
				return sanitized;
			})
			.join('&');

		const postfix = getPostfix(query);

		// Sanitize the search term
		const sanitizedSearchTerm = sanitizeSearchTerm(query.search_term);

		const formattedQuery = `${prefix}${sanitizedSearchTerm}${postfix.trim() && `+${postfix} `}`;

		const formattedQueryWithParams = `${encodeURIComponent(formattedQuery)}${
			queryParams.trim() ? `&${queryParams}` : ''
		}`;

		return formattedQueryWithParams;
	} else {
		// put the filters together with sanitization
		const prefix = Object.entries(query.filters)
			.filter((filter) => !postFixFilters.includes(filter[0]))
			.reduce((prev, curr) => {
				const sanitized = sanitizeFilterValue((curr[1] as any).formatted, curr[0]);
				return `${prev}${sanitized}`;
			}, '');

		const postfix = getPostfix(query);

		// Sanitize the search term
		const sanitizedSearchTerm = sanitizeSearchTerm(query.search_term);

		const formattedQuery = `${prefix}${sanitizedSearchTerm}${postfix.trim() && `+${postfix}`} `;

		return encodeURIComponent(formattedQuery);
	}
};
