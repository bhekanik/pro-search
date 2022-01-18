import type { FilterType } from '$lib/app/types/filters';
import { filtersThatDontRequireSearchTerm } from '$lib/app/types/filters';
import { formatQuery } from '$lib/components/Filters/utils/generateQuery';
import type { Query } from '$lib/stores';
import {
	isAuthenticated as isAuthenticatedStore,
	queryStore,
	recentQueriesStore
} from '$lib/stores';
import { get } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';

const saveNewQuery = (currentRecentQueries: Query[], query: Query) => {
	const newQuery = {
		...query,
		id: uuidv4(),
		createdAt: new Date().toISOString(),
		name: query.name || `Untitled Query - ${new Date().toUTCString()}`
	};
	const newRecentQueries = [...currentRecentQueries, newQuery];

	window.localStorage?.setItem('recentQueries', JSON.stringify(newRecentQueries));

	recentQueriesStore.set(newRecentQueries);
};

export function updateRecentQueries(options?: { query?: Query }): void {
	const query = options.query || get(queryStore);
	const isAuthenticated = get(isAuthenticatedStore);

	if (!isAuthenticated) {
		return;
	}

	// Skip saving if the query is equal to the first recent query
	const currentRecentQueries = JSON.parse(window.localStorage?.getItem('recentQueries') || '[]');
	const newRecentQueries = [...currentRecentQueries];
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { id, createdAt, ...queryWithoutIdAndDate } = query;
	let exists = false;
	if (currentRecentQueries.length) {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { id, createdAt, ...currentQueryWithoutIdAndDate } =
			currentRecentQueries[currentRecentQueries.length - 1];
		if (
			JSON.stringify(queryWithoutIdAndDate) === JSON.stringify({ ...currentQueryWithoutIdAndDate })
		) {
			exists = true;
		}
	}

	if (!exists) saveNewQuery(newRecentQueries, query);
}

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
		query.searchTerm &&
		!filtersThatDontRequireSearchTerm.includes(options.type)
	)
		return;

	if (options.saveQuery) updateRecentQueries();

	const formattedQuery = formatQuery({ query });

	if (typeof query.provider.url === 'string') {
		return `${query.provider.url}${encodeURI(formattedQuery)}`;
	} else {
		const url = [];
		for (const providerUrl of query.provider.url) {
			url.push(`${providerUrl}${encodeURI(formattedQuery)}`);
		}
		return url;
	}
};
