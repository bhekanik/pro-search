<script lang="ts">
	import { splitClient } from '$lib/app/splitClient';
	import Head from '$components/Head/Head.svelte';
	import Header from '$components/Header/Header.svelte';
	import Nav from '$components/Nav/Nav.svelte';
	import ShareModal from '$components/SavedQueries/ShareModal.svelte';
	import { queryToShareStore } from '$stores';
	import { onDestroy, onMount } from 'svelte';
	// @ts-ignore - theme-change module has type issues
	import { themeChange } from 'theme-change';
	import '../global.css';

	onMount(() => {
		themeChange(false);
	});

	onDestroy(() => splitClient?.destroy());
</script>

<Head />
<Header />
<Nav />
<slot />
{#if $queryToShareStore}
	<ShareModal query={$queryToShareStore} />
{/if}
