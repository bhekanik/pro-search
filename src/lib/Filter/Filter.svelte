<script lang="ts">
	import { filters } from '../../stores/filters';
	export let type: 'Site' | 'File Type' | 'Title' | 'URL';
	export let go: (e: any) => void = () => null;

	let enabled = false;

	const handleInput = (e: any) => {
		const isCheckbox = e.target.type === 'checkbox';
		const value = isCheckbox ? e.target.checked : e.target.value;
		if (type === 'Title') {
			filters.update((currentFilters) => {
				const newFilters = { ...currentFilters };
				value === true ? (newFilters.title = `intitle:"replace_me"`) : delete newFilters.title;
				return newFilters;
			});
		}
		if (type === 'Site') {
			filters.update((currentFilters) => {
				const newFilters = { ...currentFilters };
				if (!isCheckbox) {
					value ? (newFilters.site = `site:${value} `) : delete newFilters.site;
				} else {
					console.log('value:', value);
					value === false && delete newFilters.site;
				}
				return newFilters;
			});
		}
		if (type === 'File Type') {
			filters.update((currentFilters) => {
				const newFilters = { ...currentFilters };
				if (!isCheckbox) {
					value ? (newFilters.fileType = `filetype:${value} `) : delete newFilters.fileType;
				} else {
					value === false && delete newFilters.fileType;
				}
				return newFilters;
			});
		}
		if (type === 'URL') {
			filters.update((currentFilters) => {
				const newFilters = { ...currentFilters };
				value === true ? (newFilters.url = `inurl:"replace_me"`) : delete newFilters.url;
				return newFilters;
			});
		}
		console.log('filters:', $filters);
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
