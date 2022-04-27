import { TableNames } from '$lib/app/model';
import { supabase } from '$lib/app/supabaseClient';
import type { FilterType } from '$lib/app/types/filters';
import { filtersThatDontRequireSearchTerm } from '$lib/app/types/filters';
import { formatQuery } from '$lib/components/Filters/utils/formatQuery';
import { authStore, queryStore, savedQueriesStore, type Query } from '$lib/stores';
import { get } from 'svelte/store';

const saveNewQuery = async (currentSavedQueries: Query[], query: Query) => {
	const user = supabase.auth.user();

	const newQuery = {
		...query,
		name: query.name || `Untitled Query - ${new Date().toUTCString()}`,
		user_id: user.id
	};

	const { data } = await supabase
		.from(TableNames.savedQueries)
		.insert([
			{ ...newQuery, filters: JSON.stringify(query.filters), provider: query.provider.name }
		])
		.select('filters, created_at, id, name, provider(id, name, url), search_term');

	savedQueriesStore.set([
		...currentSavedQueries,
		...data.map((d) => ({ ...d, filters: JSON.parse(d.filters) }))
	]);
};

export async function updateSavedQueries(options?: { query?: Query }): Promise<void> {
	const query = options?.query || get(queryStore);

	if (!get(authStore).isLoggedIn) {
		return;
	}

	// Skip saving if the query is equal to the first saved query
	const { data: currentSavedQueries } = await supabase.from(TableNames.savedQueries).select(`
		search_term, filters, provider, name, user_id
	`);

	const newSavedQueries = [...currentSavedQueries];
	const { ...queryWithoutIdAndDate } = query;
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
		!query.search_term &&
		!filtersThatDontRequireSearchTerm.includes(options.type)
	) {
		return;
	}

	if (options.saveQuery) updateSavedQueries();

	const formattedQuery = formatQuery({ query });

	if (typeof query.provider.url === 'string') {
		return `${query.provider.url}${encodeURIComponent(formattedQuery).replace(/%2B/g, '+')}`;
	} else {
		const url = [];
		for (const providerUrl of query.provider.url) {
			url.push(`${providerUrl}${encodeURIComponent(formattedQuery).replace(/%2B/g, '+')}`);
		}
		return url;
	}
};
