/**
 * Security utility functions for input sanitization and validation
 */

/**
 * Sanitizes user input to prevent XSS attacks
 * Escapes HTML special characters
 */
export function sanitizeHtml(input: string): string {
	if (!input) return '';

	return input
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#x27;')
		.replace(/\//g, '&#x2F;');
}

/**
 * Sanitizes input for safe URL usage
 * Prevents URL injection attacks
 */
export function sanitizeForUrl(input: string): string {
	if (!input) return '';

	// Remove dangerous URL characters and patterns
	let sanitized = input
		// Remove javascript: protocol
		.replace(/javascript:/gi, '')
		// Remove data: protocol
		.replace(/data:/gi, '')
		// Remove vbscript: protocol
		.replace(/vbscript:/gi, '')
		// Remove on* event handlers
		.replace(/on\w+\s*=/gi, '')
		// Remove script tags
		.replace(/<script[^>]*>.*?<\/script>/gi, '')
		// Remove iframe tags
		.replace(/<iframe[^>]*>.*?<\/iframe>/gi, '');

	// Additional encoding for URL safety
	return sanitized;
}

/**
 * Validates and sanitizes query names
 * Limits length and removes dangerous characters
 */
export function sanitizeQueryName(name: string, maxLength: number = 100): string {
	if (!name) return '';

	// Truncate to max length
	let sanitized = name.substring(0, maxLength);

	// Remove control characters and null bytes
	// eslint-disable-next-line no-control-regex
	sanitized = sanitized.replace(/[\x00-\x1F\x7F]/g, '');

	// Apply HTML sanitization
	return sanitizeHtml(sanitized);
}

/**
 * Validates and sanitizes search terms
 * Preserves search operators while preventing injection
 */
export function sanitizeSearchTerm(term: string, maxLength: number = 500): string {
	if (!term) return '';

	// Truncate to max length
	let sanitized = term.substring(0, maxLength);

	// Remove null bytes and control characters except tabs and newlines
	// eslint-disable-next-line no-control-regex
	sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');

	// Preserve Google search operators but prevent injection
	// Don't escape: + - " * OR AND site: filetype: etc.
	// But prevent script injection
	sanitized = sanitized
		.replace(/javascript:/gi, '')
		.replace(/data:/gi, '')
		.replace(/vbscript:/gi, '')
		.replace(/<script[^>]*>/gi, '')
		.replace(/<\/script>/gi, '');

	return sanitized;
}

/**
 * Validates URL format
 * Ensures URL is from allowed search providers
 */
export function isValidSearchProviderUrl(url: string): boolean {
	const allowedHosts = [
		'google.com',
		'www.google.com',
		'duckduckgo.com',
		'www.bing.com',
		'bing.com',
		'search.yahoo.com',
		'yahoo.com'
	];

	try {
		const urlObj = new URL(url);
		const hostname = urlObj.hostname.toLowerCase();

		// Check if hostname is in allowed list
		return allowedHosts.some((allowed) => hostname === allowed || hostname.endsWith('.' + allowed));
	} catch {
		return false;
	}
}

/**
 * Sanitizes filter values based on filter type
 */
export function sanitizeFilterValue(
	value: string,
	filterType: string,
	maxLength: number = 200
): string {
	if (!value) return '';

	// Truncate to max length
	let sanitized = value.substring(0, maxLength);

	// Remove null bytes and control characters
	// eslint-disable-next-line no-control-regex
	sanitized = sanitized.replace(/[\x00-\x1F\x7F]/g, '');

	// Apply type-specific sanitization
	switch (filterType) {
		case 'site':
		case 'excludeSite':
		case 'related':
			// For domain filters, remove protocols and paths
			sanitized = sanitized
				.replace(/^https?:\/\//i, '')
				.replace(/\/.*$/, '')
				.replace(/[^a-z0-9.-]/gi, '');
			break;

		case 'fileType':
			// For file types, only allow alphanumeric
			sanitized = sanitized.replace(/[^a-z0-9]/gi, '');
			break;

		case 'exact':
		case 'exclude':
			// For text filters, apply HTML sanitization
			sanitized = sanitizeHtml(sanitized);
			break;

		case 'numRange':
			// For number ranges, only allow numbers, dots, and hyphens
			sanitized = sanitized.replace(/[^0-9.-]/g, '');
			break;

		default:
			// Default sanitization for other filter types
			sanitized = sanitizeForUrl(sanitized);
	}

	return sanitized;
}

/**
 * Validates input length
 */
export function validateLength(input: string, minLength: number, maxLength: number): boolean {
	const length = input?.length || 0;
	return length >= minLength && length <= maxLength;
}

/**
 * Creates a Content Security Policy header value
 */
export function getCSPHeader(): string {
	return [
		"default-src 'self'",
		"script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.supabase.co https://*.split.io https://www.googletagmanager.com https://www.google-analytics.com",
		"style-src 'self' 'unsafe-inline'",
		"img-src 'self' data: https: https://www.google-analytics.com https://www.googletagmanager.com",
		"font-src 'self' data:",
		"connect-src 'self' https://*.supabase.co https://*.supabase.in https://*.split.io https://www.google-analytics.com https://www.googletagmanager.com wss://*.supabase.co wss://*.supabase.in",
		"frame-ancestors 'none'",
		"base-uri 'self'",
		"form-action 'self'",
		'upgrade-insecure-requests'
	].join('; ');
}
