<script lang="ts">
	import { FeatureFlagNames, featureFlagsStore } from '$lib/stores';

	export let featureFlag: FeatureFlagNames;
	export let onValue;
	export let offValue;
	export let otherCondition = true;

	let value = $featureFlagsStore[featureFlag] === 'on' && otherCondition ? onValue : offValue;

	$: {
		featureFlagsStore.subscribe((newValue) => {
			value = newValue[featureFlag] === 'on' && otherCondition ? onValue : offValue;
		});
	}
</script>

<slot feature={value} />
