import type { FilterType } from '$lib/app/types/filters';
import { filtersThatDontRequireSearchTerm } from '$lib/app/types/filters';
import { formatQuery } from '$lib/components/Filters/utils/generateQuery';
import type { Query } from '$lib/stores';
import {
	isAuthenticated as isAuthenticatedStore,
	queryStore,
	savedQueriesStore,
	SAVED_QUERIES_KEY
} from '$lib/stores';
import { get } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';

const saveNewQuery = (currentSavedQueries: Query[], query: Query) => {
	const newQuery = {
		...query,
		id: uuidv4(),
		createdAt: new Date().toISOString(),
		name: query.name || `Untitled Query - ${new Date().toUTCString()}`
	};
	const newSavedQueries = [...currentSavedQueries, newQuery];

	window.localStorage?.setItem(SAVED_QUERIES_KEY, JSON.stringify(newSavedQueries));

	savedQueriesStore.set(newSavedQueries);
};

export function updateSavedQueries(options?: { query?: Query }): void {
	const query = options.query || get(queryStore);
	const isAuthenticated = get(isAuthenticatedStore);

	if (!isAuthenticated) {
		return;
	}

	// Skip saving if the query is equal to the first saved query
	const currentSavedQueries = JSON.parse(window.localStorage?.getItem(SAVED_QUERIES_KEY) || '[]');
	const newSavedQueries = [...currentSavedQueries];
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { id, createdAt, ...queryWithoutIdAndDate } = query;
	let exists = false;
	if (currentSavedQueries.length) {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { id, createdAt, ...currentQueryWithoutIdAndDate } =
			currentSavedQueries[currentSavedQueries.length - 1];
		if (
			JSON.stringify(queryWithoutIdAndDate) === JSON.stringify({ ...currentQueryWithoutIdAndDate })
		) {
			exists = true;
		}
	}

	if (!exists) saveNewQuery(newSavedQueries, query);
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

	if (options.saveQuery) updateSavedQueries();

	const formattedQuery = formatQuery({ query });

	if (typeof query.provider.url === 'string') {
		return `${query.provider.url}${encodeURIComponent(formattedQuery)}`;
	} else {
		const url = [];
		for (const providerUrl of query.provider.url) {
			url.push(`${providerUrl}${encodeURIComponent(formattedQuery)}`);
		}
		return url;
	}
};
