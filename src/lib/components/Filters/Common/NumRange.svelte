<script lang="ts">
	import FilterBase from '$lib/components/Filters/Base/Base.svelte';
	import { queryStore } from '$lib/stores';
	import { listApplyOperator, Operator } from '../utils/listApplyOperator';

	const handleInput = (e: Event) => {
		const value = (e.target as HTMLInputElement).value;
		queryStore.update((currentQuery) => {
			const newQuery = { ...currentQuery };
			newQuery.filters.numRange = {
				type: 'NumRange',
				value,
				formatted: listApplyOperator(value, Operator.NumRange)
			};
			return newQuery;
		});
	};
</script>

<FilterBase
	on:input={handleInput}
	type="NumRange"
	hasInput
	label="... with results that fall within this numbers range"
	textInputPlaceholder="numbers range (example: $100 $200)"
/>
