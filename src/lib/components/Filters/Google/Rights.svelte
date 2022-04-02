<script lang="ts">
	import { rightsOptions } from '$lib/app/fixtures';
	import FilterBase from '$lib/components/Filters/Base/Base.svelte';
	import { queryStore } from '$lib/stores';

	const handleChange = (e: Event) => {
		const value = (e.target as HTMLSelectElement).value;
		queryStore.update((currentQuery) => {
			const newQuery = { ...currentQuery };
			newQuery.filters.rights = {
				type: 'Rights',
				value,
				formatted: `as_rights=${encodeURIComponent(value)}`
			};
			return newQuery;
		});
	};
</script>

<FilterBase
	handleSelectChange={handleChange}
	type="Rights"
	label="... that have the following rights"
	options={rightsOptions}
/>
