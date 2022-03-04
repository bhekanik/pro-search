import type {
	Auth0Client,
	LogoutOptions,
	PopupLoginOptions,
	RedirectLoginOptions
} from '@auth0/auth0-spa-js';
import createAuth0Client from '@auth0/auth0-spa-js';
import { config } from './config';

async function createClient(): Promise<Auth0Client> {
	const auth0Client = await createAuth0Client({
		domain: config.domain,
		client_id: config.clientId
	});

	return auth0Client;
}

async function loginWithRedirect(
	client: Auth0Client,
	options?: RedirectLoginOptions
): Promise<void> {
	try {
		await client.loginWithRedirect(options);
	} catch (e) {
		console.error(e);
	}
}

async function handleRedirectCallback(client: Auth0Client, url?: string): Promise<void> {
	try {
		await client.handleRedirectCallback(url);
	} catch (e) {
		console.error(e);
	}
}

async function loginWithPopup(client: Auth0Client, options?: PopupLoginOptions): Promise<void> {
	try {
		await client.loginWithPopup(options);

		if (client) {
			const authState = await client.isAuthenticated();
			console.log('authState:', authState);
			const userState = await client.getUser();
			console.log('userState:', userState);
		}
	} catch (e) {
		console.error(e);
	}
}

function logout(client: Auth0Client, options?: LogoutOptions): void | Promise<void> {
	return client.logout(options);
}

const auth = {
	createClient,
	handleRedirectCallback,
	loginWithPopup,
	loginWithRedirect,
	logout
};

export default auth;
