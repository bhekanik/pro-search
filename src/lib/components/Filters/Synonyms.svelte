<script lang="ts">
	import FilterBase from '$lib/components/Filters/Base/Base.svelte';
	import { queryStore } from '$lib/stores';
	import { listApplyOperator, Operator } from './utils/listApplyOperator';

	const handleInput = (e: Event) => {
		const value = (e.target as HTMLInputElement).value;
		queryStore.update((currentQuery) => {
			const newQuery = { ...currentQuery };
			newQuery.filters.synonyms = {
				type: 'Synonyms',
				value,
				formatted: listApplyOperator(value, Operator.Synonym)
			};
			return newQuery;
		});
	};
</script>

<FilterBase
	on:input={handleInput}
	type="Synonyms"
	hasInput
	label="... with these words and their synonyms"
	textInputPlaceholder="Words to include (example: amazed sailor)"
/>
