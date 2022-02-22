<script lang="ts">
	import FilterBase from '$lib/components/Filters/Base/Base.svelte';
	import { queryStore } from '$lib/stores';

	const handleInput = (e: Event) => {
		const value = (e.target as HTMLInputElement).value;
		queryStore.update((currentQuery) => {
			const newQuery = { ...currentQuery };
			newQuery.filters.site = {
				type: 'Site',
				value,
				formatted: `as_sitesearch=${encodeURIComponent(value.trim())} `
			};
			return newQuery;
		});
	};
</script>

<FilterBase
	on:input={handleInput}
	type="Site"
	hasInput
	label="... from this website or domain"
	textInputPlaceholder="Website (examples: cnn.com, .com, .org)"
/>
