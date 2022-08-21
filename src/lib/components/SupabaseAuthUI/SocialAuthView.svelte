<script lang="ts">
	import type { AuthProps } from '$lib/app/types';

	import type { Provider, SupabaseClient } from '@supabase/supabase-js';
	import Icon from './Icon.svelte';
	import Text from './Text.svelte';

	export let supabaseClient: SupabaseClient;
	export let providers: AuthProps['providers'] = [];
	export let socialLayout: AuthProps['socialLayout'] = 'vertical';
	// export let socialButtonSize: AuthProps['socialButtonSize'] = 'medium';
	// export let socialColors = false;
	export let view: AuthProps['view'] = 'sign_in';
	export let redirectTo: string;

	let error = '';

	const buttonStyles = {
		google: {
			'background-color': '#ce4430',
			color: 'white'
		},
		facebook: {
			'background-color': '#4267B2',
			color: 'white'
		},
		twitter: {
			'background-color': '#1DA1F2'
		},
		gitlab: {
			'background-color': '#FC6D27'
		},
		github: {
			'background-color': '#333',
			color: 'white'
		},
		bitbucket: {
			'background-color': '#205081',
			color: 'white'
		},
		azure: {
			'background-color': '#0072c6',
			color: 'white'
		}
	};

	$: hasProviders = providers && providers.length > 0;

	async function handleProviderSignIn(provider: Provider) {
		const options: Record<string, string> = {};

		if (redirectTo) {
			options.redirectTo = redirectTo;
		}

		const { error: signInError } = await supabaseClient.auth.signIn({ provider }, options);
		if (signInError) error = signInError.message;
	}
</script>

{#if hasProviders}
	<span class="heading">{view == 'sign_up' ? 'Sign up' : 'Sign in'} with</span>

	<div class="providers" class:horizontal={socialLayout == 'horizontal'}>
		{#each providers as provider}
			<button
				class="btn btn-primary flex w-full"
				style={Object.entries(buttonStyles[provider])
					.map(([key, value]) => {
						return `${key}: ${value}`;
					})
					.join(';')}
				on:click={() => handleProviderSignIn(provider)}
			>
				<span class="flex mr-2">
					<Icon name={provider} size={21} />
				</span>
				<span>
					{#if socialLayout == 'vertical'}{view == 'sign_up' ? 'Sign up' : 'Sign in'} with {provider}{/if}
				</span>
			</button>
		{/each}
	</div>
	<div role="separator" class="divider">
		<span>or continue with</span>
	</div>
{/if}

{#if error}
	<Text type="danger">{error}</Text>
{/if}

<style>
	.providers {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.providers.horizontal {
		flex-direction: row;
	}

	.divider {
		color: rgb(187, 187, 187);
		margin: 1rem 0;
		width: 100%;
		display: flex;
		align-items: center;
		white-space: nowrap;
		font-size: 0.9rem;
	}

	.divider span {
		margin: 1rem;
	}

	.divider::before,
	.divider::after {
		border-bottom-style: solid;
		border-bottom-width: 1px;
		top: 50%;
		content: '';
		position: relative;
		display: inline-block;
		width: 50%;
	}

	.heading {
		font-weight: 500;
		font-size: 0.875rem;
		line-height: 1.25rem;
		margin: 0 0 0.5rem 0;
	}
</style>
