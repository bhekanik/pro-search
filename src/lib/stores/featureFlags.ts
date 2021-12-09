import { splitClient } from '$lib/app/splitClient';
import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

const featureFlagNames = ['Search_All_Providers', 'Results_In_IFrame', 'Save_Search'] as const;

export type FeatureFlagNames = typeof featureFlagNames[number];

export interface FeatureFlags {
	Search_All_Providers: SplitIO.Treatment;
	Results_In_IFrame: SplitIO.Treatment;
}

export const featureFlags: Writable<FeatureFlags> = writable(
	splitClient.getTreatments(featureFlagNames.concat()) as unknown as FeatureFlags
);

splitClient.on(splitClient.Event.SDK_READY, function () {
	featureFlags.update(
		(value) => splitClient.getTreatments(Object.keys(value)) as unknown as FeatureFlags
	);
});

splitClient.on(splitClient.Event.SDK_UPDATE, function () {
	featureFlags.update(
		(value) => splitClient.getTreatments(Object.keys(value)) as unknown as FeatureFlags
	);
});
