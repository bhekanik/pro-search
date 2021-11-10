<script lang="ts">
	import { query } from '$lib/stores';

	export let type: 'Site' | 'File Type' | 'Title' | 'URL';
	export let go: (e: any) => void = () => null;

	let enabled = false;

	const handleInput = (e: any) => {
		const isCheckbox = e.target.type === 'checkbox';
		const value = isCheckbox ? e.target.checked : e.target.value;
		if (type === 'Title') {
			query.update((currentQuery) => {
				const newQuery = { ...currentQuery };
				value === true
					? (newQuery.filters.title = { value, formatted: `intitle:"replace_me"` })
					: delete newQuery.filters.title;
				return newQuery;
			});
		}
		if (type === 'Site') {
			query.update((currentQuery) => {
				const newQuery = { ...currentQuery };
				if (!isCheckbox) {
					value
						? (newQuery.filters.site = { value, formatted: `site:${value} ` })
						: delete newQuery.filters.site;
				} else {
					value === false && delete newQuery.filters.site;
				}
				return newQuery;
			});
		}
		if (type === 'File Type') {
			query.update((currentQuery) => {
				const newQuery = { ...currentQuery };
				if (!isCheckbox) {
					value
						? (newQuery.filters.fileType = { value, formatted: `filetype:${value} ` })
						: delete newQuery.filters.fileType;
				} else {
					value === false && delete newQuery.filters.fileType;
				}
				return newQuery;
			});
		}
		if (type === 'URL') {
			query.update((currentQuery) => {
				const newQuery = { ...currentQuery };
				value === true
					? (newQuery.filters.url = { value, formatted: `inurl:"replace_me"` })
					: delete newQuery.filters.url;
				return newQuery;
			});
		}
	};
</script>

<div class="flex my-2">
	<label class="flex items-center gap-2">
		<input
			class="w-7 h-7"
			type="checkbox"
			name={`${type}-checkbox`}
			id={`${type}-checkbox`}
			bind:checked={enabled}
			on:input={handleInput}
		/>
		{type}
	</label>
</div>

{#if enabled && type !== 'Title' && type !== 'URL'}
	<input
		disabled={!enabled}
		class="w-full my-2 rounded-md text-lg p-4 border-2 border-gray-400 dark:border-gray-400 bg-transparent"
		type="text"
		name={`${type}-input`}
		id=""
		placeholder={type}
		on:input={handleInput}
		on:keydown={go}
	/>
{/if}
