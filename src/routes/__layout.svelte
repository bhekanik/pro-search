<script lang="ts">
	import { page } from '$app/stores';
	import { splitClient } from '$lib/app/splitClient';
	import Header from '$lib/components/Header/Header.svelte';
	import ShareModal from '$lib/components/SavedQueries/ShareModal.svelte';
	import Seo from '$lib/components/SEO/SEO.svelte';
	import { isAuthenticated, queryToShareStore } from '$lib/stores';
	import * as Sentry from '@sentry/browser';
	import { Integrations } from '@sentry/tracing';
	import { onDestroy, onMount } from 'svelte';
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

<Seo />

<Header />
<div class="tabs border-b px-8 border-b-gray-400">
	<a href="/" class={`tab tab-bordered ${$page.url.pathname === '/' && 'tab-active'}`}>Search</a>
	<a href="/recipes" class={`tab tab-bordered ${$page.url.pathname === '/recipes' && 'tab-active'}`}
		>Recipes</a
	>
	{#if $isAuthenticated}
		<a
			href="/saved-queries"
			class={`tab tab-bordered ${$page.url.pathname === '/saved-queries' && 'tab-active'}`}
			>Saved Queries</a
		>
	{/if}
</div>

<slot />

{#if $queryToShareStore}
	<ShareModal query={$queryToShareStore} />
{/if}
