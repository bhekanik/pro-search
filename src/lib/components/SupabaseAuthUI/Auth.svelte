<script lang="ts">
	import { supabase as supabaseClient } from '$lib/app/supabaseClient';
	import type { AuthProps } from '$lib/app/types';
	import EmailAuthView from './EmailAuthView.svelte';
	import ForgottenPasswordView from './ForgottenPasswordView.svelte';
	import MagicLinkView from './MagicLinkView.svelte';
	import SocialAuthView from './SocialAuthView.svelte';

	let classes = '';

	export { classes as class };
	export let style = '';
	export let socialLayout: AuthProps['socialLayout'] = 'vertical';
	// export let socialColors = false;
	// export let socialButtonSize: AuthProps['socialButtonSize'] = 'medium';
	export let providers: AuthProps['providers'] = [];
	export let view: AuthProps['view'] = 'sign_in';
	export let redirectTo = '';

	function setView(newView: AuthProps['view']) {
		view = newView;
	}
</script>

<div class="component px-8 {classes}" {style}>
	<div class="container">
		<SocialAuthView {supabaseClient} {providers} {socialLayout} {view} {redirectTo} />

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
