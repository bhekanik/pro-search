<script lang="ts">
	import { goto } from '$app/navigation';
	import { initFirebase } from '$lib/app/auth/initFirebase';
	import type { AuthProvider } from 'firebase/auth';
	import {
		createUserWithEmailAndPassword,
		GoogleAuthProvider,
		signInWithEmailAndPassword,
		signInWithRedirect,
		TwitterAuthProvider
	} from 'firebase/auth';

	let loginError;
	let registerError;
	let closeModalButton = null;

	async function handleSubmit(e) {
		const { auth } = await initFirebase();

		const formData = new FormData(e.target);
		const formValues = Object.fromEntries(formData.entries());

		signInWithEmailAndPassword(auth, formValues.email as string, formValues.password as string)
			.then((user) => {
				console.log('user:', user);
				console.log('success');
				closeModalButton.click();
				goto('/');
			})
			.catch((error) => {
				console.log('errorMessage:', error.message);
				if (error.message === 'Firebase: Error (auth/user-not-found).') {
					createUserWithEmailAndPassword(
						auth,
						formValues.email as string,
						formValues.password as string
					)
						.then((user) => {
							console.log('user:', user);
							console.log('success');
							closeModalButton.click();
							goto('/');
						})
						.catch((error) => {
							console.log('error:', error.message);
							registerError = error.message.replace('Firebase: ', '');
						});
				} else {
					loginError = error.message.replace('Firebase: ', '');
				}
			});
	}

	async function handleSocialAuth(provider: AuthProvider) {
		const firebase = await initFirebase();
		const auth = firebase.auth;
		signInWithRedirect(auth, provider);
	}
</script>

<input type="checkbox" id="auth-modal" class="modal-toggle" />
<div class="modal">
	<div class="modal-box">
		<h3 class="font-bold text-lg p-8">Login/Register</h3>
		<form id="auth-form" on:submit|preventDefault={handleSubmit} class="flex flex-col gap-4 px-8">
			<input
				class={`input input-bordered ${loginError ? 'input-error' : ''} ${
					registerError === 'Error (auth/invalid-email).' ? 'input-error' : ''
				}`}
				name="email"
				type="text"
				placeholder="Email"
			/>
			<input
				class={`input input-bordered ${loginError ? 'input-error' : ''} ${
					registerError === 'Password should be at least 6 characters (auth/weak-password).'
						? 'input-error'
						: ''
				}`}
				name="password"
				type="password"
				placeholder="Password"
			/>
			{#if loginError}
				<p class="text-error">Invalid credentials. Try again.</p>
			{/if}
			{#if registerError}
				<p class="text-error">
					{registerError === 'Error (auth/invalid-email).' ? 'Invalid email.' : registerError}
				</p>
			{/if}
			<button type="submit" form="auth-form" class="btn btn-primary">Login/Register</button>
			<p class="w-full">Or use:</p>
			<div class="flex w-full gap-2">
				<button
					on:click={() => handleSocialAuth(new GoogleAuthProvider())}
					class="btn btn-primary flex-1">Google</button
				>
				<button
					on:click={() => handleSocialAuth(new TwitterAuthProvider())}
					class="btn btn-primary flex-1">Twitter</button
				>
				<!-- <button
					on:click={() => handleSocialAuth(new GithubAuthProvider())}
					class="btn btn-primary flex-1">Github</button
				> -->
			</div>
		</form>
		<div class="modal-action px-8 pb-8">
			<label for="auth-modal" bind:this={closeModalButton} class="btn w-full">Close</label>
		</div>
	</div>
</div>
