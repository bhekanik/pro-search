<script lang="ts">
	import { contentOptions } from '$lib/app/fixtures/contentOptions';
	import FilterBase from '$lib/components/Filters/Base/Base.svelte';
	import { queryStore } from '$lib/stores';

	const handleChange = (e: Event) => {
		const value = (e.target as HTMLSelectElement).value;
		queryStore.update((currentQuery) => {
			const newQuery = { ...currentQuery };
			newQuery.filters.contentType = {
				type: 'Content Type',
				value,
				formatted: `tbm=${encodeURIComponent(value)} `
			};
			return newQuery;
		});
	};
</script>

<FilterBase
	handleSelectChange={handleChange}
	type="Content Type"
	label="... of this content type"
	textInputPlaceholder="Select content type"
	options={contentOptions}
/>
