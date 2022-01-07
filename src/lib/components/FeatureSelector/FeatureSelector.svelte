<script lang="ts">
	import { FeatureFlagNames, featureFlagsStore } from '$lib/stores';

	export let featureFlag: FeatureFlagNames;
	export let onFeature;
	export let offFeature;
	export let otherCondition = true;

	let featureState = $featureFlagsStore[featureFlag] === 'on' && otherCondition;
</script>

<slot feature={featureState ? onFeature : offFeature} />
