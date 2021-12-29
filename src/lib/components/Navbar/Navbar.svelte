<script lang="ts">
	import { isAuthenticated } from '$lib/stores';

	export let handleLogin: () => void;
</script>

<div class="navbar mb-2 shadow-lg bg-neutral text-neutral-content rounded-box">
	<div class="flex-1 hidden px-2 mx-2 lg:flex" />
	<div class="flex-none hidden px-2 mx-2 lg:flex">
		<div class="flex items-stretch">
			<button class="btn btn-ghost btn-sm rounded-btn">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					class="inline-block w-5 mr-2 stroke-current"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
					/>
				</svg>
				Config
			</button>
		</div>
	</div>
	<div class="flex-none">
		<button on:click={handleLogin} class="btn btn-square btn-ghost">
			{#if $isAuthenticated}
				<div class="avatar">
					<div class="rounded-full w-10 h-10 m-1">
						<img src="https://i.pravatar.cc/500?img=32" alt="Avatar" />
					</div>
				</div>
			{:else}
				Login
			{/if}
		</button>
	</div>
</div>
