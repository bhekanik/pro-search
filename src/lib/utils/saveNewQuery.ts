import { TableNames } from '$lib/app/model';
import { supabase } from '$lib/app/supabaseClient';
import { savedQueriesStore, type Query } from '$lib/stores';

export const saveNewQuery = async (currentSavedQueries: Query[], query: Query): Promise<void> => {
	const user = supabase.auth.user();

	const newQuery = {
		...query,
		name: query.name || `Untitled Query - ${new Date().toUTCString()}`,
		user_id: user?.id
	};

	const { data } = await supabase
		.from(TableNames.savedQueries)
		.insert([
			{ ...newQuery, filters: JSON.stringify(query.filters), provider: query.provider.name }
		])
		.select('filters, created_at, id, name, provider(id, name, url), search_term');

	savedQueriesStore.set([
		...currentSavedQueries,
		...(data?.map((d) => ({ ...d, filters: JSON.parse(d.filters) })) || [])
	]);
};
