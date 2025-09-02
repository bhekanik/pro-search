/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type { ApiFromModules, FilterApi, FunctionReference } from 'convex/server';
import type * as auth from '../auth.js';
import type * as http from '../http.js';
import type * as savedQueries from '../savedQueries.js';
import type * as searchProviders from '../searchProviders.js';
import type * as settings from '../settings.js';

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
	auth: typeof auth;
	http: typeof http;
	savedQueries: typeof savedQueries;
	searchProviders: typeof searchProviders;
	settings: typeof settings;
}>;
export declare const api: FilterApi<typeof fullApi, FunctionReference<any, 'public'>>;
export declare const internal: FilterApi<typeof fullApi, FunctionReference<any, 'internal'>>;
