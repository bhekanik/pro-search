<script lang="ts">
	import { page } from '$app/stores';
	import { splitClient } from '$lib/app/splitClient';
	import Header from '$lib/components/Header/Header.svelte';
	import * as Sentry from '@sentry/browser';
	import { Integrations } from '@sentry/tracing';
	import LogRocket from 'logrocket';
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
		LogRocket.init('uetpov/pro-search');
	}

	onMount(() => {
		themeChange(false);
	});

	onDestroy(() => splitClient?.destroy());
</script>

<svelte:head>
	{#if isProd}
		<script>
			(function (h, o, t, j, a, r) {
				h.hj =
					h.hj ||
					function () {
						(h.hj.q = h.hj.q || []).push(arguments);
					};
				h._hjSettings = { hjid: 2801982, hjsv: 6 };
				a = o.getElementsByTagName('head')[0];
				r = o.createElement('script');
				r.async = 1;
				r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
				a.appendChild(r);
			})(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');
		</script>
	{:else}
		<script>
			(function (h, o, t, j, a, r) {
				h.hj =
					h.hj ||
					function () {
						(h.hj.q = h.hj.q || []).push(arguments);
					};
				h._hjSettings = { hjid: 2632849, hjsv: 6 };
				a = o.getElementsByTagName('head')[0];
				r = o.createElement('script');
				r.async = 1;
				r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
				a.appendChild(r);
			})(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');
		</script>
	{/if}
</svelte:head>

<Header />
<div class="tabs border-b px-8 mb-4 border-b-gray-400">
	<a href="/" class={`tab tab-bordered ${$page.url.pathname === '/' && 'tab-active'}`}>Search</a>
	<a href="/recipes" class={`tab tab-bordered ${$page.url.pathname === '/recipes' && 'tab-active'}`}
		>Recipies</a
	>
</div>

<slot />
