<script context="module">
	import { fade } from 'svelte/transition';
	export async function load({ fetch }) {
		const response = await fetch(`https://dev.to/api/articles?username=bhekanik`);
		const posts = await response.json();
		return {
			props: {
				posts
			}
		};
	}
</script>

<script>
	export let posts;
</script>

<svelte:head>
	<title>Blog</title>
</svelte:head>

<section>
	<h1 class="text-4xl text-center my-8 uppercase">Blog</h1>
	<div class="py-4 grid gap-4 grid-cols-1">
		{#each posts as post}
			<a
				class="p-6 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 text-left rounded-md shadow-sm hover:shadow-md flex "
				transition:fade
				href={`/blog/${post.id}`}
			>
				{#if post.cover_image}
					<img class="h-56 w-96 object-cover mr-4" src={post.cover_image} alt={post.title} />
				{/if}
				<div>
					<h2 class="text-2xl font-bold ">
						{post.title} | {post.reading_time_minutes} minute read
					</h2>
					<p class="text-xs my-2">{post.readable_publish_date}</p>
					<p class="text-md ">{post.description}</p>
				</div>
			</a>
		{/each}
	</div>
</section>
