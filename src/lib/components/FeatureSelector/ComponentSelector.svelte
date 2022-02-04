<script lang="ts">
	import { FeatureFlagNames, featureFlagsStore } from '$lib/stores';
	import { onDestroy } from 'svelte';

	export let featureFlag: FeatureFlagNames;
	export let onFeature;
	export let offFeature;
	export let otherCondition = true;
	export let props = {};

	let Feature = $featureFlagsStore[featureFlag] === 'on' && otherCondition ? onFeature : offFeature;
	let unsubscribe;

	$: {
		unsubscribe = featureFlagsStore.subscribe((newValue) => {
			Feature = newValue[featureFlag] === 'on' && otherCondition ? onFeature : offFeature;
		});
	}

	onDestroy(() => unsubscribe?.());
</script>

<svelte:component this={Feature} {...props} />
