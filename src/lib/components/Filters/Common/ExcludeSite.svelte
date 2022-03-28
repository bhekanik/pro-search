<script lang="ts">
	import FilterBase from '$lib/components/Filters/Base/Base.svelte';
	import { queryStore } from '$lib/stores';

	const handleInput = (e: Event) => {
		const value = (e.target as HTMLInputElement).value;
		queryStore.update((currentQuery) => {
			const newQuery = { ...currentQuery };
			newQuery.filters.excludeSite = {
				type: 'ExcludeSite',
				value,
				formatted: `-site:${encodeURIComponent(value.trim())}`
			};
			return newQuery;
		});
	};
</script>

<FilterBase
	on:input={handleInput}
	type="ExcludeSite"
	hasInput
	label="... without any results from this website"
	textInputPlaceholder="Website to exclude (example: cnn.com)"
/>
