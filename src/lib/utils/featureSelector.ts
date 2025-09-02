import type { FeatureFlagNames } from '$stores';
import { featureFlagsStore } from '$stores';
import { get } from 'svelte/store';

export function featureSelector<T>(
	featureFlag: FeatureFlagNames,
	onFeature: T,
	offFeature: T,
	otherCondition = true
): T {
	const featureFlagsStoreValue = get(featureFlagsStore);

	const featureState = (featureFlagsStoreValue as any)[featureFlag] === 'on' && otherCondition;

	return featureState ? onFeature : offFeature;
}
