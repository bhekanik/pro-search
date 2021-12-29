<script lang="ts">
	import FilterBase from '$lib/components/Filters/Base/Base.svelte';
	import { queryStore } from '$lib/stores';

	const handleInput = (e: Event) => {
		const value = (e.target as HTMLInputElement).value;
		queryStore.update((currentQuery) => {
			const newQuery = { ...currentQuery };
			value
				? (newQuery.filters.fileType = {
						value,
						formatted: `filetype:${value.trim()} `
				  })
				: delete newQuery.filters.fileType;
			return newQuery;
		});
	};
</script>

<FilterBase
	on:input={handleInput}
	type="File Type"
	hasInput
	label="Only return results of this file type"
	textInputPlaceholder="File type (example: pdf)"
/>
