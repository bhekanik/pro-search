<script lang="ts">
	import FilterBase from '$lib/Filter/Base.svelte';
	import { query } from '../../stores/query';

	export let go: (e: any) => void = () => null;

	const handleInput = (e: any) => {
		const isCheckbox = e.target.type === 'checkbox';
		const value = isCheckbox ? e.target.checked : e.target.value;
		query.update((currentQuery) => {
			const newQuery = { ...currentQuery };
			if (!isCheckbox) {
				value
					? (newQuery.filters.fileType = {
							value,
							formatted: `filetype:${value} `
					  })
					: delete newQuery.filters.fileType;
			} else {
				value === false && delete newQuery.filters.fileType;
			}
			return newQuery;
		});
	};
</script>

<FilterBase {handleInput} type="File Type" hasInput value={$query.filters.fileType?.value} {go} />
