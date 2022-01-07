<script lang="ts">
	import { FeatureFlagNames, featureFlagsStore } from '$lib/stores';

	export let featureFlag: FeatureFlagNames;
	export let onFeature;
	export let offFeature;
	export let otherCondition = true;
	export let props = {};

	let Feature = $featureFlagsStore[featureFlag] === 'on' && otherCondition ? onFeature : offFeature;

	$: {
		featureFlagsStore.subscribe((newValue) => {
			Feature = newValue[featureFlag] === 'on' && otherCondition ? onFeature : offFeature;
		});
	}
</script>

<svelte:component this={Feature} {...props} />
