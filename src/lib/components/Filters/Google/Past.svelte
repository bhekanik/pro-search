<script lang="ts">
	import { pastOptions } from '$lib/app/config/pastOptions';
	import FilterBase from '$lib/components/Filters/Base/Base.svelte';
	import { queryStore } from '$lib/stores';

	const handleChange = (e: Event) => {
		const value = (e.target as HTMLSelectElement).value;
		queryStore.update((currentQuery) => {
			const newQuery = { ...currentQuery };
			newQuery.filters.past = {
				type: 'Past',
				value,
				formatted: `as_qdr=${encodeURIComponent(value)}`
			};
			return newQuery;
		});
	};
</script>

<FilterBase
	handleSelectChange={handleChange}
	type="Past"
	label="... that were published in ..."
	options={pastOptions}
/>
