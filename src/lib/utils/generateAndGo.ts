import { filtersThatDontRequireSearchTerm } from '$lib/app/filters';
import { generateQuery } from '$lib/components/Filters/generateQuery';
import type { FilterType } from '$lib/components/Filters/types';
import type { Query } from '$lib/stores';
import { queryStore, recentQueriesStore } from '$lib/stores';
import { get } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';

const saveNewQuery = (currentRecentQueries: Query[], newRecentQueries: Query[]) => {
	const query = get(queryStore);
	const newQuery = { ...query, id: uuidv4() };
	newRecentQueries = [...currentRecentQueries, newQuery];
	globalThis.localStorage?.setItem('recentQueries', JSON.stringify(newRecentQueries));
	return newRecentQueries;
};

export function updateRecentQueries(): void {
	const query = get(queryStore);
	recentQueriesStore.update((currentRecentQueries) => {
		let newRecentQueries = [...currentRecentQueries];
		currentRecentQueries.length > 0
			? currentRecentQueries.forEach((currentRecentQuery) => {
					if (JSON.stringify(query) === JSON.stringify({ ...currentRecentQuery, id: '' })) {
						globalThis.localStorage?.setItem('recentQueries', JSON.stringify(newRecentQueries));
					} else {
						newRecentQueries = saveNewQuery(currentRecentQueries, newRecentQueries);
					}
			  })
			: (newRecentQueries = saveNewQuery(currentRecentQueries, newRecentQueries));

		return newRecentQueries;
	});
}

export const generateQueryAndGo = (type?: FilterType): string | string[] => {
	const query = get(queryStore);
	if (!query.searchTerm && !filtersThatDontRequireSearchTerm.includes(type)) return;

	updateRecentQueries();

	const formattedQuery = generateQuery();

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
