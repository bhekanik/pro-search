<script>
	import {
		configStore,
		featureFlagsStore,
		queryStore,
		readiness,
		recentQueriesStore,
		user
	} from '$lib/stores';
	import { onDestroy } from 'svelte';

	let selected = 'featureFlags';

	const stores = {
		featureFlags: { value: $featureFlagsStore, name: featureFlagsStore },
		auth: { value: $user, name: user },
		query: { value: $queryStore, name: queryStore },
		recentQueries: { value: $recentQueriesStore, name: recentQueriesStore },
		readiness: { value: $readiness, name: readiness },
		config: { value: $configStore, name: configStore }
	};

	$: value = stores[selected].value;

	let unsubscribe;

	$: {
		unsubscribe = stores[selected].name.subscribe((newValue) => {
			value = newValue;
		});
	}

	function handleClick(e) {
		const { id } = e.target;
		selected = id;
	}

	onDestroy(unsubscribe);
</script>

<div class="collapse z-50 my-2 border rounded-box border-base-300 collapse-arrow absolute top-0">
	<input type="checkbox" />
	<div class="collapse-title text-xl font-medium">Store Monitor</div>
	<div class="collapse-content pointer-events-none">
		<div class="btn-group pointer-events-auto">
			{#each Object.keys(stores) as store}
				<input
					on:click={handleClick}
					type="radio"
					name="options"
					id={store}
					data-title={store}
					class="btn"
					checked={selected === store}
				/>
			{/each}
		</div>

		<pre class="bg-slate-800">{JSON.stringify(value, null, 2)}</pre>
	</div>
</div>
