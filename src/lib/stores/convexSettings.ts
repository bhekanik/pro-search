import { writable } from 'svelte/store';
import { convexClient } from '$lib/app/convexClient';
import { api } from '../../../convex/_generated/api';
import type { Settings } from './settings';

const createSettingsStore = () => {
	const defaultSettings: Settings = {
		autosave_queries: true,
		query_preview: true,
		default_search_provider: null
	};

	const { subscribe, set, update } = writable<Settings>(defaultSettings);

	return {
		subscribe,
		set,
		update,

		load: async () => {
			try {
				const settings = await convexClient.query(api.settings.getUserSettings);
				if (settings) {
					const formattedSettings: Settings = {
						autosave_queries: settings.autosaveQueries,
						query_preview: settings.queryPreview,
						default_search_provider: settings.defaultSearchProviderId
							? { id: settings.defaultSearchProviderId, name: '', url: '' }
							: null
					};
					set(formattedSettings);
					return formattedSettings;
				}
				return defaultSettings;
			} catch (error) {
				console.error('Failed to load settings:', error);
				return defaultSettings;
			}
		},

		save: async (updates: Partial<Settings>) => {
			try {
				await convexClient.mutation(api.settings.updateSettings, {
					autosaveQueries: updates.autosave_queries,
					queryPreview: updates.query_preview,
					defaultSearchProviderId: updates.default_search_provider?.id
				});

				update((current) => ({ ...current, ...updates }));
			} catch (error) {
				console.error('Failed to save settings:', error);
				throw error;
			}
		},

		reset: () => {
			set(defaultSettings);
		}
	};
};

export const convexSettingsStore = createSettingsStore();
