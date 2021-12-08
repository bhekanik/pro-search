import { splitClient } from '$lib/app/splitClient';
import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

export interface FeatureFlags {
	searchAll: SplitIO.Treatment;
}

export const featureFlags: Writable<FeatureFlags> = writable({
	searchAll: splitClient.getTreatment('Search_All_Providers')
});

splitClient.on(splitClient.Event.SDK_READY, function () {
	featureFlags.update(() => ({
		searchAll: splitClient.getTreatment('Search_All_Providers')
	}));
});

splitClient.on(splitClient.Event.SDK_UPDATE, function () {
	featureFlags.update(() => ({
		searchAll: splitClient.getTreatment('Search_All_Providers')
	}));
});
