<script lang="ts">
	import { fileTypes } from '$lib/app/config';
	import FilterBase from '$lib/components/Filters/Base/Base.svelte';
	import { queryStore } from '$lib/stores';

	const handleChange = (e: Event) => {
		const value = (e.target as HTMLSelectElement).value;
		queryStore.update((currentQuery) => {
			const newQuery = { ...currentQuery };
			newQuery.filters.fileType = {
				value,
				formatted: `filetype:${value.trim()} `
			};
			return newQuery;
		});
	};
</script>

<FilterBase
	on:change={handleChange}
	type="File Type"
	label="Only return results of this file type"
	textInputPlaceholder="File type (example: pdf)"
	options={fileTypes}
/>
