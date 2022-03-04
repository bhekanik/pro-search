<script lang="ts">
	import type { FeatureFlagNames } from '$lib/stores';
	import { featureFlagsStore } from '$lib/stores';
	import { onDestroy } from 'svelte';
	import type { Unsubscriber } from 'svelte/store';

	export let featureFlag: FeatureFlagNames | null = null;
	export let onValue: any;
	export let offValue: any;
	export let condition: boolean | null = null;

	let value = offValue;

	$: {
		if (featureFlag !== null && condition !== null) {
			value = $featureFlagsStore[featureFlag] === 'on' && condition ? onValue : offValue;
		} else if (featureFlag !== null && condition === null) {
			value = $featureFlagsStore[featureFlag] === 'on' ? onValue : offValue;
		} else if (featureFlag === null && condition !== null) {
			value = condition ? onValue : offValue;
		}
	}

	let unsubscribe: Unsubscriber;

	$: {
		unsubscribe = featureFlagsStore.subscribe((newValue) => {
			value = newValue[featureFlag] === 'on' && condition ? onValue : offValue;
		});
	}

	onDestroy(() => unsubscribe?.());
</script>

<slot feature={value} />
