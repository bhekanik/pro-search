import { derived } from 'svelte/store';
import { authReadiness, featureFlagsReadiness } from '.';

export const readiness = derived(
	[authReadiness, featureFlagsReadiness],
	([_authReadiness, _featureFlagsReadiness]) => {
		return _featureFlagsReadiness;
	}
);
