<script context="module">
	export async function load({ page, fetch }) {
		const response = await fetch(`https://dev.to/api/articles/${page.params.slug}`);
		const post = await response.json();
		return {
			props: {
				post
			}
		};
	}
</script>

<script lang="ts">
	interface Post {
		title: string;
		body_html: string;
		reading_time_minutes: number;
		readable_publish_date: string;
		cover_image: string;
	}

	export let post: Post;
</script>

<svelte:head>
	<title>{post.title}</title>
</svelte:head>

<article class="prose max-w-none my-8">
	{#if post.cover_image}
		<img class="w-full object-cover mr-4" src={post.cover_image} alt={post.title} />
	{/if}
	<h1 class="text-4xl text-center">
		{post.title}
	</h1>
	<p class="text-center font-bold">
		{post.readable_publish_date} | {post.reading_time_minutes} minute read
	</p>
	<hr />

	{@html post.body_html}
</article>
