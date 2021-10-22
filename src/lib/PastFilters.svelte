<script lang="ts">
	import { recentQueries } from '../stores/recentQueries';
</script>

<ul>
	{#each $recentQueries as query}
		<li>{query}</li>
	{/each}
</ul>
