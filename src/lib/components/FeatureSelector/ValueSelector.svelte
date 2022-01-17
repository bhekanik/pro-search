<script lang="ts">
	import { FeatureFlagNames, featureFlagsStore } from '$lib/stores';
	import { onDestroy } from 'svelte';

	export let featureFlag: FeatureFlagNames;
	export let onValue;
	export let offValue;
	export let otherCondition = true;

	let value = $featureFlagsStore[featureFlag] === 'on' && otherCondition ? onValue : offValue;
	let unsubscribe;

	$: {
		unsubscribe = featureFlagsStore.subscribe((newValue) => {
			value = newValue[featureFlag] === 'on' && otherCondition ? onValue : offValue;
		});
	}

	onDestroy(() => unsubscribe());
</script>

<slot feature={value} />
