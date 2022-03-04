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

	let selector: 'on' | 'off' = 'off';

	let features = {
		on: onFeature,
		off: offFeature
	};

	const handleChange = (ff: FeatureFlagNames | null, cond: boolean | null) => {
		if (ff !== null && cond !== null) {
			selector = $featureFlagsStore[ff] === 'on' && cond ? 'on' : 'off';
		} else if (ff !== null && cond === null) {
			selector = $featureFlagsStore[ff] === 'on' ? 'on' : 'off';
		} else if (ff === null && cond !== null) {
			selector = cond ? 'on' : 'off';
		}
	};

	$: {
		handleChange(featureFlag, condition);

		console.log(selector ? '' : '');
	}

	let unsubscribe: Unsubscriber;

	$: {
		unsubscribe = featureFlagsStore.subscribe((newValue) => {
			selector = newValue[featureFlag] === 'on' && condition ? 'on' : 'off';
		});
	}

	onDestroy(() => unsubscribe?.());
</script>

<svelte:component this={features[selector]} {...props} />
