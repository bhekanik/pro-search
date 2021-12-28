<script lang="ts">
	import FilterBase from '$lib/components/Filters/Base.svelte';
	import { queryStore } from '$lib/stores';

	const handleInput = (e: any) => {
		const value = e.target.value;
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
