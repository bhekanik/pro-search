import { convexSavedQueriesStore } from './convexSavedQueries';
import type { Query } from './query';

// Use Convex saved queries directly
export const unifiedSavedQueriesStore = convexSavedQueriesStore;

export const saveQuery = async (query: Query) => {
	return await convexSavedQueriesStore.add(query);
};

export const deleteQuery = async (queryId: string) => {
	return await convexSavedQueriesStore.remove(queryId);
};

export const updateQuery = async (queryId: string, updates: Partial<Query>) => {
	return await convexSavedQueriesStore.updateQuery(queryId, updates);
};
