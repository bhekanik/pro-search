<script lang="ts">
	import FilterBase from '$lib/components/Filters/Base/Base.svelte';
	import { queryStore } from '$lib/stores';

	const handleInput = (e: Event) => {
		const value = (e.target as HTMLInputElement).value;
		queryStore.update((currentQuery) => {
			const newQuery = { ...currentQuery };
			newQuery.filters.link = {
				type: 'Link',
				value,
				formatted: `link:${value.trim()} `
			};
			return newQuery;
		});
	};
</script>

<FilterBase
	on:input={handleInput}
	type="Link"
	hasInput
	label="... that point to this URL"
	textInputPlaceholder="URL (example: www.cnn.com)"
/>
