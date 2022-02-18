<script lang="ts">
	import { goto } from '$app/navigation';
	import { initFirebase } from '$lib/app/auth/initFirebase';
	import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

	async function handleSubmit(e) {
		const { auth } = await initFirebase();

		const formData = new FormData(e.target);
		const formValues = Object.fromEntries(formData.entries());

		signInWithEmailAndPassword(auth, formValues.email as string, formValues.password as string)
			.then(() => {
				console.log('success');
				goto('/');
			})
			.catch((error) => {
				console.log('errorMessage:', error.message);
				if (error.message === 'Firebase: Error (auth/user-not-found).')
					createUserWithEmailAndPassword(
						auth,
						formValues.email as string,
						formValues.password as string
					)
						.then((user) => {
							console.log('user:', user);
							console.log('success');
							goto('/');
						})
						.catch((error) => {
							console.log('error:', error);
						});
			});
	}
</script>

<input type="checkbox" id="auth-modal" class="modal-toggle" />
<div class="modal">
	<div class="modal-box">
		<form
			id="auth-form"
			on:submit|preventDefault={handleSubmit}
			class="flex flex-col gap-4 bg-teal-400 p-8 px-12"
		>
			<input class="input input-bordered" name="email" type="text" placeholder="Email" />
			<input class="input input-bordered" name="password" type="password" placeholder="Password" />
			<button type="submit" form="auth-form" class="btn btn-primary">Login</button>
			<button type="submit" form="auth-form" class="btn btn-primary">Login With Google</button>
			<button type="submit" form="auth-form" class="btn btn-primary">Login With Twitter</button>
		</form>
		<div class="modal-action">
			<!-- <label on:click={handleAccept} for="auth-modal" class="btn btn-primary">Accept</label> -->
			<label for="auth-modal" class="btn">Close</label>
		</div>
	</div>
</div>
