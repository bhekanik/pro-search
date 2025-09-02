import { ConvexClient } from 'convex/browser';
import type { api } from '../../../convex/_generated/api';
import { ConvexHttpClient } from 'convex/browser';

// Use the actual Convex deployment URL
const PUBLIC_CONVEX_URL =
	typeof window !== 'undefined'
		? import.meta.env.PUBLIC_CONVEX_URL || 'https://sensible-shepherd-964.convex.cloud'
		: 'https://sensible-shepherd-964.convex.cloud';

export const convexClient = new ConvexClient(PUBLIC_CONVEX_URL);
export const httpClient = new ConvexHttpClient(PUBLIC_CONVEX_URL);
