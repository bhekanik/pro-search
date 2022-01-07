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

const saveNewQuery = (currentRecentQueries: Query[]) => {
	const query = get(queryStore);
	const newQuery = { ...query, id: uuidv4() };
	const newRecentQueries = [...currentRecentQueries, newQuery];

	window.localStorage?.setItem('recentQueries', JSON.stringify(newRecentQueries));

	return newRecentQueries;
};

export function updateRecentQueries(): void {
	const query = get(queryStore);
	const isAuthenticated = get(isAuthenticatedStore);

	if (!isAuthenticated) {
		return;
	}

	recentQueriesStore.update((currentRecentQueries) => {
		let newRecentQueries = [...currentRecentQueries];
		const newQuery = { ...query };
		delete newQuery.id;
		let exists = false;
		currentRecentQueries.length
			? currentRecentQueries.forEach((currentRecentQuery) => {
					if (JSON.stringify(newQuery) === JSON.stringify({ ...currentRecentQuery })) {
						exists = true;
					}
			  })
			: (newRecentQueries = saveNewQuery(newRecentQueries));

		if (!exists) newRecentQueries = saveNewQuery(newRecentQueries);

		return newRecentQueries;
	});
}

interface GenerateQueryUrlOptions {
	saveQuery: boolean;
}

export const generateQueryUrl = (
	type?: FilterType,
	{ saveQuery }: GenerateQueryUrlOptions = { saveQuery: false }
): string | string[] => {
	const query = get(queryStore);
	if (!query.searchTerm && !filtersThatDontRequireSearchTerm.includes(type)) return;

	if (saveQuery) updateRecentQueries();

	const formattedQuery = formatQuery();

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
