<script lang="ts">
	import type { FeatureFlagNames } from '$lib/stores';
	import { featureFlagsStore } from '$lib/stores';

	export let featureFlag: FeatureFlagNames;
	export let onFeature;
	export let offFeature;
</script>

<slot feature={$featureFlagsStore[featureFlag] === 'on' ? onFeature : offFeature} />
