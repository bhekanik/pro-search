import { writable } from 'svelte/store';
import { splitClient } from '../app/splitClient';

const featureFlagNames = ['Search_All_Providers', 'Results_In_IFrame', 'Save_Search'] as const;

export type FeatureFlagNames = typeof featureFlagNames[number];

export interface FeatureFlags {
	Search_All_Providers: SplitIO.Treatment;
	Results_In_IFrame: SplitIO.Treatment;
	Save_Search: SplitIO.Treatment;
}

export const featureFlagsReadiness = writable<boolean>(false);

export const featureFlagsStore = writable<FeatureFlags>(
	splitClient.getTreatments(featureFlagNames.concat()) as unknown as FeatureFlags
);

splitClient.on(splitClient.Event.SDK_READY, function () {
	featureFlagsStore.update(
		(value) => splitClient.getTreatments(Object.keys(value)) as unknown as FeatureFlags
	);
	featureFlagsReadiness.set(true);
});

splitClient.on(splitClient.Event.SDK_UPDATE, function () {
	featureFlagsStore.update(
		(value) => splitClient.getTreatments(Object.keys(value)) as unknown as FeatureFlags
	);
});
