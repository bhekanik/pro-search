<script lang="ts" context="module">
	import { supabase as supabaseClient } from '$lib/app/supabaseClient';
	import EmailAuthView from './EmailAuthView.svelte';
	import ForgottenPasswordView from './ForgottenPasswordView.svelte';
	import MagicLinkView from './MagicLinkView.svelte';
	import SocialAuthView from './SocialAuthView.svelte';

	export interface AuthProps {
		providers?: ('azure' | 'twitter' | 'bitbucket' | 'facebook' | 'github' | 'gitlab' | 'google')[];
		view?: 'sign_in' | 'sign_up' | 'magic_link' | 'forgotten_password';
		classes?: string;
		style?: string;
		socialLayout?: 'vertical' | 'horizontal';
		socialColors?: boolean;
		socialButtonSize?: 'medium' | 'large';
		redirectTo?: string;
	}
</script>

<script lang="ts">
	let classes = '';

	export { classes as class };
	export let style = '';
	export let socialLayout: AuthProps['socialLayout'] = 'vertical';
	export let socialColors = false;
	export let socialButtonSize: AuthProps['socialButtonSize'] = 'medium';
	export let providers: AuthProps['providers'] = [];
	export let view: AuthProps['view'] = 'sign_in';
	export let redirectTo = '';

	function setView(newView) {
		view = newView;
	}
</script>

<div class="component px-8 {classes}" {style}>
	<div class="container">
		<SocialAuthView
			{supabaseClient}
			{providers}
			{socialLayout}
			{socialButtonSize}
			{socialColors}
			{view}
			{redirectTo}
		/>

		{#if view == 'sign_in' || view == 'sign_up'}
			<EmailAuthView {supabaseClient} {view} {setView} />
		{:else if view == 'magic_link'}
			<MagicLinkView {supabaseClient} {setView} />
		{:else if view == 'forgotten_password'}
			<ForgottenPasswordView {supabaseClient} {setView} />
		{/if}
	</div>
</div>

<style>
	.component {
		width: 100%;
	}

	.container {
		display: flex;
		flex-direction: column;
	}
</style>
