<script lang="ts">
	import { FeatureFlagNames, featureFlagsStore } from '$lib/stores';
	import { onDestroy } from 'svelte';

	export let featureFlag: FeatureFlagNames | null = null;
	export let onValue;
	export let offValue;
	export let condition: boolean | null = null;

	let value = offValue;

	if (featureFlag !== null && condition !== null) {
		value = $featureFlagsStore[featureFlag] === 'on' && condition ? onValue : offValue;
	} else if (featureFlag !== null && condition === null) {
		value = $featureFlagsStore[featureFlag] === 'on' ? onValue : offValue;
	} else if (featureFlag === null && condition !== null) {
		value = condition ? onValue : offValue;
	}

	let unsubscribe;

	$: {
		unsubscribe = featureFlagsStore.subscribe((newValue) => {
			value = newValue[featureFlag] === 'on' && condition ? onValue : offValue;
		});
	}

	onDestroy(() => unsubscribe?.());
</script>

<slot feature={value} />
