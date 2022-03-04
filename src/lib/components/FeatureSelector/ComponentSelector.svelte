<script lang="ts">
	import { FeatureFlagNames, featureFlagsStore } from '$lib/stores';
	import { onDestroy } from 'svelte';

	export let featureFlag: FeatureFlagNames | null = null;
	export let onFeature;
	export let offFeature;
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

	let unsubscribe;

	$: {
		unsubscribe = featureFlagsStore.subscribe((newValue) => {
			Feature = newValue[featureFlag] === 'on' && condition ? onFeature : offFeature;
		});
	}

	onDestroy(() => unsubscribe?.());
</script>

<svelte:component this={Feature} {...props} />
