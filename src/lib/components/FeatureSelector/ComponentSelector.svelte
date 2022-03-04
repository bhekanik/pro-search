<script lang="ts">
	import type { FeatureFlagNames } from '$lib/stores';
	import { featureFlagsStore } from '$lib/stores';
	import { onDestroy } from 'svelte';
	import type { Unsubscriber } from 'svelte/store';

	export let featureFlag: FeatureFlagNames | null = null;
	export let onFeature: any;
	export let offFeature: any;
	export let condition: boolean | null = null;
	export let props = {};

	let Feature = offFeature;

	$: {
		if (featureFlag !== null && condition !== null) {
			Feature = $featureFlagsStore[featureFlag] === 'on' && condition ? onFeature : offFeature;
		} else if (featureFlag !== null && condition === null) {
			Feature = $featureFlagsStore[featureFlag] === 'on' ? onFeature : offFeature;
		} else if (featureFlag === null && condition !== null) {
			console.log('final condition:', condition);
			console.log('featureFlag:', featureFlag);
			console.log('props:', props);
			Feature = condition ? onFeature : offFeature;
		}
	}

	let unsubscribe: Unsubscriber;

	$: {
		unsubscribe = featureFlagsStore.subscribe((newValue) => {
			Feature = newValue[featureFlag] === 'on' && condition ? onFeature : offFeature;
		});
	}

	onDestroy(() => unsubscribe?.());
</script>

<svelte:component this={Feature} {...props} />
