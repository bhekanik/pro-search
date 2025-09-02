<script lang="ts">
	import { fileTypes } from '$lib/app/fixtures';
	import FilterBase from '$components/Filters/Base/Base.svelte';
	import { queryStore } from '$stores';

	const handleChange = (e: Event) => {
		const value = (e.target as HTMLSelectElement).value;
		queryStore.update((currentQuery: any) => {
			const newQuery = { ...currentQuery };
			newQuery.filters.fileType = {
				type: 'File Type',
				value,
				formatted: `filetype:${value.trim()} `
			};
			return newQuery;
		});
	};
</script>

<FilterBase
	handleSelectChange={handleChange}
	type="File Type"
	label="... of this file type"
	textInputPlaceholder="File type"
	options={fileTypes}
/>
