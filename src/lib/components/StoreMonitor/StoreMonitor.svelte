<script>
	import {
		configStore,
		featureFlagsStore,
		queryStore,
		readiness,
		recentQueriesStore,
		user
	} from '$lib/stores';

	let selected = 'featureFlags';

	const flags = {
		featureFlags: $featureFlagsStore,
		auth: $user,
		query: $queryStore,
		recentQueries: $recentQueriesStore,
		readiness: $readiness,
		config: $configStore
	};

	function handleClick(e) {
		const { id } = e.target;
		selected = id;
	}
</script>

<div class="collapse z-50 my-2 border rounded-box border-base-300 collapse-arrow absolute top-0">
	<input type="checkbox" />
	<div class="collapse-title text-xl font-medium">Store Monitor</div>
	<div class="collapse-content pointer-events-none">
		<div class="btn-group pointer-events-auto">
			<input
				on:click={handleClick}
				type="radio"
				name="options"
				id="featureFlags"
				data-title="featureFlags"
				class="btn"
				checked={selected === 'featureFlags'}
			/>
			<input
				on:click={handleClick}
				type="radio"
				name="options"
				id="auth"
				data-title="auth"
				class="btn"
				checked={selected === 'auth'}
			/>
			<input
				on:click={handleClick}
				type="radio"
				name="options"
				id="query"
				data-title="query"
				class="btn"
				checked={selected === 'query'}
			/>
			<input
				on:click={handleClick}
				type="radio"
				name="options"
				id="recentQueries"
				data-title="recentQueries"
				class="btn"
				checked={selected === 'recentQueries'}
			/>
			<input
				on:click={handleClick}
				type="radio"
				name="options"
				id="config"
				data-title="config"
				class="btn"
				checked={selected === 'config'}
			/>
			<input
				on:click={handleClick}
				type="radio"
				name="options"
				id="readiness"
				data-title="readiness"
				class="btn"
				checked={selected === 'readiness'}
			/>
		</div>

		<pre class="bg-slate-800">{JSON.stringify(flags[selected], null, 2)}</pre>
	</div>
</div>
