import { TableNames } from '$lib/app/model';
import { supabase } from '$lib/app/supabaseClient';
import { savedQueriesStore, type Query } from '$stores';
import { sanitizeQueryName, validateLength } from './sanitization';

export const saveNewQuery = async (currentSavedQueries: Query[], query: Query): Promise<void> => {
	const {
		data: { user }
	} = await supabase.auth.getUser();

	// Sanitize query name
	const sanitizedName = sanitizeQueryName(
		query.name || `Untitled Query - ${new Date().toUTCString()}`
	);

	// Validate length (1-100 characters)
	if (!validateLength(sanitizedName, 1, 100)) {
		throw new Error('Query name must be between 1 and 100 characters');
	}

	const newQuery = {
		...query,
		name: sanitizedName,
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
		...(data?.map((d: any) => ({ ...d, filters: JSON.parse(d.filters) })) || [])
	]);
};
