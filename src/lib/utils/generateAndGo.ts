import { v4 as uuidv4 } from 'uuid';
import { filtersThatDontRequireSearchTerm } from '../app/filters';
import { generateQuery } from '../components/Filters/generateQuery';
import type { FilterType } from '../components/Filters/types';
import type { Query } from '../stores';
import { recentQueries } from '../stores';

export const generateQueryAndGo = (query: Query, type?: FilterType): string => {
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

	return `${query.provider.url}${encodeURI(formattedQuery)}`;
};
