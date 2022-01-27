import { derived } from 'svelte/store';
import { authReadiness, featureFlagsReadiness } from '.';

export const readiness = derived(
	[authReadiness, featureFlagsReadiness],
	([_authReadiness, _featureFlagsReadiness]) => {
		console.log('_featureFlagsReadiness:', _featureFlagsReadiness);
		console.log('_authReadiness:', _authReadiness);

		return _authReadiness && _featureFlagsReadiness;
	}
);
