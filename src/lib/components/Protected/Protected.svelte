<script lang="ts">
	import { authStore } from '$lib/stores';
</script>

{#if $authStore.isLoggedIn}
	<slot />
{/if}
