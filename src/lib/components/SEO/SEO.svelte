<script lang="ts">
	import { page } from '$app/stores';
	import { seo } from '$lib/stores';

	let isProd = process.env.NODE_ENV === 'production';
	const {
		url: { pathname, host, protocol }
	} = $page;
	let url = `${protocol}//${host}${pathname}`;
</script>

<svelte:head>
	<title>{$seo.title}</title>
	<link rel="canonical" href="https://pro-search.io" />
	<meta name="description" content={$seo.description} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={$seo.title} />
	<meta property="og:url" content={`${protocol}//${host}${pathname}`} />

	<meta name="twitter:title" content={$seo.title} />
	<meta name="twitter:description" content={$seo.description} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content={url} />
	<meta name="twitter:site" content="@bhekanik" />

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
