<script lang="ts">
	import { splitClient } from '$lib/app/splitClient';
	import Head from '$lib/components/Head/Head.svelte';
	import Header from '$lib/components/Header/Header.svelte';
	import Nav from '$lib/components/Nav/Nav.svelte';
	import ShareModal from '$lib/components/SavedQueries/ShareModal.svelte';
	import { queryToShareStore } from '$lib/stores';
	import * as Sentry from '@sentry/browser';
	import { Integrations } from '@sentry/tracing';
	import { onDestroy, onMount } from 'svelte';
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	import { themeChange } from 'theme-change';
	import '../global.css';

	let isProd = process.env.NODE_ENV === 'production';

	if (isProd) {
		Sentry.init({
			dsn: 'https://02775679838d495d91eacec805880d2a@o1115887.ingest.sentry.io/6148918',
			integrations: [new Integrations.BrowserTracing()],

			// Set tracesSampleRate to 1.0 to capture 100%
			// of transactions for performance monitoring.
			// We recommend adjusting this value in production
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
