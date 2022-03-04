<script lang="ts">
	import { InboxIcon, KeyIcon, MailIcon } from 'svelte-feather-icons';
	import AzureIcon from './social-icons/AzureIcon.svelte';
	import BitbucketIcon from './social-icons/BitbucketIcon.svelte';
	import FacebookIcon from './social-icons/FacebookIcon.svelte';
	import GithubIcon from './social-icons/GithubIcon.svelte';
	import GitlabIcon from './social-icons/GitlabIcon.svelte';
	import GoogleIcon from './social-icons/GoogleIcon.svelte';
	import TwitterIcon from './social-icons/TwitterIcon.svelte';

	const map = {
		mail: MailIcon,
		key: KeyIcon,
		inbox: InboxIcon,
		google: GoogleIcon,
		facebook: FacebookIcon,
		twitter: TwitterIcon,
		github: GithubIcon,
		gitlab: GitlabIcon,
		bitbucket: BitbucketIcon,
		azure: AzureIcon
	};

	export let name;
	export let size = 10;
</script>

<svelte:component
	this={map[name]}
	size={name === 'mail' || name === 'key' || name === 'inbox' ? size.toString() : size}
/>
