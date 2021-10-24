<script lang="ts">
	import FilterBase from '$lib/Filter/Base.svelte';
	import { query } from '../../stores/query';

	export let go: (e: any) => void = () => null;

	const handleInput = (e: any) => {
		const value = e.target.value;
		query.update((currentQuery) => {
			const newQuery = { ...currentQuery };
			value
				? (newQuery.filters.fileType = {
						value,
						formatted: `filetype:${value} `
				  })
				: delete newQuery.filters.fileType;
			return newQuery;
		});
	};
</script>

<FilterBase on:input={handleInput} type="File Type" hasInput on:keydown={go} />
