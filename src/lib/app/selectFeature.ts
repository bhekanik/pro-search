import { featureFlags } from '$lib/stores/featureFlags';
import { onDestroy } from 'svelte';

export const selectFeature = <T extends unknown>(
	featureFlag: string,
	onFeature: T,
	offFeature: T
): T => {
	let feature: T;

	const unsubscribe = featureFlags.subscribe((value) => {
		feature = value[featureFlag] === 'on' ? onFeature : offFeature;
	});

	onDestroy(unsubscribe);

	return feature;
};
