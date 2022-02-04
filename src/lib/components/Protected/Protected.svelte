<script lang="ts">
	import { isAuthenticated } from '$lib/stores';
</script>

{#if $isAuthenticated}
	<slot />
{/if}
