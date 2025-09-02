<script lang="ts">
	import FilterBase from '$lib/components/Filters/Base/Base.svelte';
	import { queryStore } from '$lib/stores';
	import { sanitizeFilterValue } from '$lib/utils/sanitization';

	const handleInput = (e: Event) => {
		const rawValue = (e.target as HTMLInputElement).value;
		// Sanitize the site value to prevent injection
		const value = sanitizeFilterValue(rawValue, 'site');
		queryStore.update((currentQuery) => {
			const newQuery = { ...currentQuery };
			newQuery.filters.site = {
				type: 'Site',
				value,
				formatted: `site:${value.trim()} `
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
