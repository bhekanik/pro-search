<script lang="ts">
	import FilterBase from '$lib/components/Filters/Base/Base.svelte';
	import { listApplyOperator, Operator } from '$lib/components/Filters/utils/listApplyOperator';
	import { queryStore } from '$lib/stores';

	const handleInput = (e: Event) => {
		const value = (e.target as HTMLInputElement).value;
		queryStore.update((currentQuery) => {
			const newQuery = { ...currentQuery };
			newQuery.filters.exclude = {
				type: 'Exclude',
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
