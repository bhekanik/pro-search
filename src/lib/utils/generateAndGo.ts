import { initFirebase } from '$lib/app/auth/initFirebase';
import type { FilterType } from '$lib/app/types/filters';
import { filtersThatDontRequireSearchTerm } from '$lib/app/types/filters';
import { formatQuery } from '$lib/components/Filters/utils/formatQuery';
import {
	firebaseAuth,
	isAuthenticated as isAuthenticatedStore,
	Query,
	queryStore,
	savedQueriesStore,
	SAVED_QUERIES_KEY
} from '$lib/stores';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { get } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';

const saveNewQuery = async (currentSavedQueries: Query[], query: Query) => {
	const newQuery = {
		...query,
		id: uuidv4(),
		createdAt: new Date().toISOString(),
		name: query.name || `Untitled Query - ${new Date().toUTCString()}`
	};
	const newSavedQueries = [...currentSavedQueries, newQuery];
	const { db } = await initFirebase();

	await setDoc(
		doc(db, SAVED_QUERIES_KEY, get(firebaseAuth).user.uid),
		{ data: newSavedQueries },
		{ merge: true }
	);

	savedQueriesStore.set(newSavedQueries);
};

export async function updateSavedQueries(options?: { query?: Query }): Promise<void> {
	const query = options.query || get(queryStore);
	const isAuthenticated = get(isAuthenticatedStore);

	if (!isAuthenticated) {
		return;
	}

	const { db } = await initFirebase();

	// Skip saving if the query is equal to the first saved query
	const currentSavedQueries =
		(await getDoc(doc(db, SAVED_QUERIES_KEY, get(firebaseAuth).user.uid))).data()?.data ?? [];

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
		!query.searchTerm &&
		!filtersThatDontRequireSearchTerm.includes(options.type)
	) {
		return;
	}

	if (options.saveQuery) updateSavedQueries();

	const formattedQuery = formatQuery({ query });

	if (typeof query.provider.url === 'string') {
		return `${query.provider.url}${formattedQuery}`;
	} else {
		const url = [];
		for (const providerUrl of query.provider.url) {
			url.push(`${providerUrl}${formattedQuery}`);
		}
		return url;
	}
};
