import { get } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';
import { filtersThatDontRequireSearchTerm } from '../app/filters';
import { generateQuery } from '../components/Filters/generateQuery';
import type { FilterType } from '../components/Filters/types';
import type { Query } from '../stores';
import { query as queryStore, recentQueries } from '../stores';

export const generateQueryAndGo = (type?: FilterType): string | string[] => {
	const query = get(queryStore);
	if (!query.searchTerm && !filtersThatDontRequireSearchTerm.includes(type)) return;

	const saveNewQuery = (currentRecentQueries: Query[], newRecentQueries: Query[]) => {
		const newQuery = { ...query, id: uuidv4() };
		newRecentQueries = [...currentRecentQueries, newQuery];
		globalThis.localStorage?.setItem('recentQueries', JSON.stringify(newRecentQueries));
		return newRecentQueries;
	};

	recentQueries.update((currentRecentQueries) => {
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

	const formattedQuery = generateQuery(query);

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
