<script>
	import { page } from '$app/stores';
</script>

<header>
	<div class="left">
		<img src="//unspash.it/900" alt="logo" />
	</div>
	<nav>
		<ul>
			<li class:active={$page.path === '/'}>
				<a href="/">Home</a>
			</li>
			<li class:active={$page.path === '/about'}>
				<a href="/about">About</a>
			</li>
			<li class:active={$page.path === '/blog'}>
				<a href="/blog">Blog</a>
			</li>
		</ul>
	</nav>

	<div class="right" />
</header>

<style>
	.left img {
		width: 2rem;
		height: 2rem;
		object-fit: contain;
	}

	header {
		height: 3rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	nav {
		background: tomato;
		padding: 1rem;
	}

	ul {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		list-style: none;
	}

	a {
		color: white;
	}

	.active {
		font-weight: bold;
		border-bottom: 2px solid firebrick;
	}
</style>
