<script lang="ts">
	import { splitClient } from '$lib/app/splitClient';
	import Head from '$components/Head/Head.svelte';
	import Header from '$components/Header/Header.svelte';
	import Nav from '$components/Nav/Nav.svelte';
	import ShareModal from '$components/SavedQueries/ShareModal.svelte';
	import { queryToShareStore } from '$stores';
	import * as Sentry from '@sentry/sveltekit';
	import { onDestroy, onMount } from 'svelte';
	// @ts-ignore - theme-change module has type issues
	import { themeChange } from 'theme-change';
	import '../global.css';

	let isProd = import.meta.env.MODE === 'production';

	if (isProd) {
		Sentry.init({
			dsn: 'https://02775679838d495d91eacec805880d2a@o1115887.ingest.sentry.io/6148918',
			tracesSampleRate: 0.5
		});
	}

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
