<script lang="ts">
	interface FilterValue {
		enabled: boolean;
		value?: string;
	}

	export let filter: FilterValue;
	export let name: string;
	export let noInput = false;
	export let go: (e: any) => void = () => null;
</script>

<div class="flex my-2">
	<label class="flex items-center gap-2">
		<input
			class="w-7 h-7"
			type="checkbox"
			name={`${name}-checkbox`}
			id={`${name}-checkbox`}
			bind:checked={filter.enabled}
		/>
		{name}
	</label>
</div>

{#if filter.enabled && !noInput}
	<input
		disabled={!filter.enabled}
		class="w-full my-2 rounded-md text-lg p-4 border-2 border-gray-400 dark:border-gray-800"
		type="text"
		name="siteInput"
		id=""
		placeholder="Site"
		bind:value={filter.value}
		on:keydown={go}
	/>
{/if}
