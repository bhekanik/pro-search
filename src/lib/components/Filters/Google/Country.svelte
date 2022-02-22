<script lang="ts">
	import { googleCountries } from '$lib/app/config/googleCountries';
	import FilterBase from '$lib/components/Filters/Base/Base.svelte';
	import { queryStore } from '$lib/stores';

	const handleChange = (e: Event) => {
		const value = (e.target as HTMLSelectElement).value;
		queryStore.update((currentQuery) => {
			const newQuery = { ...currentQuery };
			newQuery.filters.country = {
				type: 'Country',
				value,
				formatted: `cr=${encodeURIComponent(`country${value.toUpperCase()}`)}`
			};
			return newQuery;
		});
	};
</script>

<FilterBase
	handleSelectChange={handleChange}
	type="Country"
	label="Only return results in this country"
	textInputPlaceholder="Results Country"
	options={googleCountries}
/>
