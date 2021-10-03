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

<main>
	<div class="flex">
		<label class="flex w-24 items-center gap-2">
			<input type="checkbox" name="siteCheckbox" id="siteCheckbox" bind:checked={filter.enabled} />
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
</main>
