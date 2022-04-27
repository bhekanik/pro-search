<script lang="ts">
	import FilterBase from '$lib/components/Filters/Base/Base.svelte';
	import { queryStore } from '$lib/stores';
	import { listCreateParams, QueryKeys } from '../utils/listApplyOperator';

	const handleInput = (e: Event) => {
		const value = (e.target as HTMLInputElement).value;
		queryStore.update((currentQuery) => {
			const newQuery = { ...currentQuery };
			newQuery.filters.excludeSite = {
				type: 'ExcludeSite',
				value,
				formatted: listCreateParams(value, QueryKeys.excludeSite)
			};
			return newQuery;
		});
	};
</script>

<FilterBase
	on:input={handleInput}
	type="ExcludeSite"
	hasInput
	label="... excluding results from any of these websites"
	textInputPlaceholder="Websites to exclude (example: cnn.com bbc.com)"
/>
