import { writable, derived } from 'svelte/store';
import { convexClient } from '$lib/app/convexClient';
import { api } from '../../../convex/_generated/api';
import type { Query } from './query';

const createSavedQueriesStore = () => {
	const { subscribe, set, update } = writable<Query[]>([]);

	return {
		subscribe,
		set,
		update,

		load: async () => {
			try {
				const queries = await convexClient.query(api.savedQueries.listSavedQueries);
				const formattedQueries = queries.map((q) => ({
					id: q._id,
					search_term: q.searchTerm,
					filters: JSON.parse(q.filters),
					provider: { name: q.provider, url: '', id: '' }, // Will be enhanced later
					name: q.name,
					created_at: new Date(q._creationTime).toISOString()
				}));
				set(formattedQueries);
				return formattedQueries;
			} catch (error) {
				console.error('Failed to load saved queries:', error);
				return [];
			}
		},

		add: async (query: Query) => {
			try {
				const id = await convexClient.mutation(api.savedQueries.createSavedQuery, {
					searchTerm: query.search_term,
					filters: JSON.stringify(query.filters),
					provider: query.provider.name,
					name: query.name || `Untitled Query - ${new Date().toUTCString()}`
				});

				const newQuery = {
					...query,
					id,
					created_at: new Date().toISOString()
				};

				update((queries) => [...queries, newQuery]);
				return newQuery;
			} catch (error) {
				console.error('Failed to add saved query:', error);
				throw error;
			}
		},

		remove: async (queryId: string) => {
			try {
				await convexClient.mutation(api.savedQueries.deleteSavedQuery, {
					queryId: queryId as any
				});
				update((queries) => queries.filter((q) => q.id !== queryId));
			} catch (error) {
				console.error('Failed to delete saved query:', error);
				throw error;
			}
		},

		updateQuery: async (queryId: string, updates: Partial<Query>) => {
			try {
				const updateData: any = {
					queryId: queryId as any
				};

				if (updates.name !== undefined) updateData.name = updates.name;
				if (updates.search_term !== undefined) updateData.searchTerm = updates.search_term;
				if (updates.filters !== undefined) updateData.filters = JSON.stringify(updates.filters);
				if (updates.provider !== undefined) updateData.provider = updates.provider.name;

				await convexClient.mutation(api.savedQueries.updateSavedQuery, updateData);

				update((queries) => queries.map((q) => (q.id === queryId ? { ...q, ...updates } : q)));
			} catch (error) {
				console.error('Failed to update saved query:', error);
				throw error;
			}
		}
	};
};

export const convexSavedQueriesStore = createSavedQueriesStore();
