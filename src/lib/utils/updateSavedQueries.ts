import { TableNames } from '$lib/app/model';
import { supabase } from '$lib/app/supabaseClient';
import { authStore, queryStore, type Query } from '$lib/stores';
import { get } from 'svelte/store';
import { saveNewQuery } from './saveNewQuery';

export async function updateSavedQueries(options?: { query?: Query }): Promise<void> {
	const query = options?.query || get(queryStore);

	if (!get(authStore).isLoggedIn) {
		return;
	}

	// Skip saving if the query is equal to the first saved query
	const { data: currentSavedQueries } = await supabase.from(TableNames.savedQueries).select(`
		search_term, filters, provider, name, user_id
	`);

	const newSavedQueries = [...(currentSavedQueries || [])];
	const { ...queryWithoutIdAndDate } = query;
	let exists = false;
	if (currentSavedQueries?.length) {
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
