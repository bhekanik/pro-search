import { FeatureFlagNames, featureFlagsStore } from '$lib/stores';
import { get } from 'svelte/store';

export function featureSelector<T>(
	featureFlag: FeatureFlagNames,
	onFeature: T,
	offFeature: T,
	otherCondition = true
): T {
	const featureFlagsStoreValue = get(featureFlagsStore);

	const featureState = featureFlagsStoreValue[featureFlag] === 'on' && otherCondition;

	return featureState ? onFeature : offFeature;
}
