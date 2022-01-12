<script lang="ts">
	import FilterBase from '$lib/components/Filters/Base/Base.svelte';
	import { queryStore } from '$lib/stores';
	import { listApplyOperator, Operator } from './utils/listApplyOperator';

	const handleInput = (e: Event) => {
		const value = (e.target as HTMLInputElement).value;
		queryStore.update((currentQuery) => {
			const newQuery = { ...currentQuery };
			newQuery.filters.exclude = {
				value,
				formatted: listApplyOperator(value, Operator.Exclude)
			};
			return newQuery;
		});
	};
</script>

<FilterBase
	on:input={handleInput}
	type="Exclude"
	hasInput
	label="... without any of these words"
	textInputPlaceholder="Words to exclude (example: detect plagiarism)"
/>
