<script>
	import { page } from '$app/stores';
</script>

<header class="bg-gray-100 py-8 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
	<nav class="flex justify-center w-full">
		<ul class="flex justify-center w-full">
			<li class="mx-4 text-lg" class:active={$page.path === '/'}>
				<a href="/">Home</a>
			</li>
			<li class="mx-4 text-lg" class:active={$page.path === '/about'}>
				<a href="/about">About</a>
			</li>
			<li class="mx-4 text-lg" class:active={$page.path.includes('/blog')}>
				<a href="/blog">Blog</a>
			</li>
		</ul>
	</nav>
</header>

<style>
	.active {
		font-weight: bold;
		border-bottom: 2px solid firebrick;
	}
</style>
