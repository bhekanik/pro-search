<script lang="ts">
	import { featureFlags } from '$lib/stores/featureFlags';
	import { onDestroy } from 'svelte';

	export let featureFlag: string;
	export let onFeature;
	export let offFeature;

	let feature;

	const unsubscribe = featureFlags.subscribe((value) => {
		feature = value[featureFlag] === 'on' ? onFeature : offFeature;
	});

	onDestroy(unsubscribe);
</script>

<slot {feature} />
