<script lang="ts">
	import { FeatureFlagNames, featureFlags } from '$lib/stores';
	import { onDestroy } from 'svelte';

	export let featureFlag: FeatureFlagNames;
	export let onFeature;
	export let offFeature;

	let feature;

	const unsubscribe = featureFlags.subscribe((value) => {
		feature = value[featureFlag] === 'on' ? onFeature : offFeature;
	});

	onDestroy(unsubscribe);
</script>

<slot {feature} />
