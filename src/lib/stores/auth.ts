import { writable } from 'svelte/store';

export const authReadiness = writable<boolean>(false);

// Re-export Convex auth as the main auth store
export { unifiedAuthStore as authStore, signOut } from './unifiedAuth';
export type { UnifiedUser } from './unifiedAuth';
