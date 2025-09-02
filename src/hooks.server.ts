import type { Handle } from '@sveltejs/kit';
import { getCSPHeader } from '$lib/utils/sanitization';

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);

	// Add Content Security Policy header
	response.headers.set('Content-Security-Policy', getCSPHeader());

	// Add other security headers
	response.headers.set('X-Frame-Options', 'DENY');
	response.headers.set('X-Content-Type-Options', 'nosniff');
	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
	response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

	return response;
};
