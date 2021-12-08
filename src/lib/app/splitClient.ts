// Use the import let = require syntax on TS.

import { SplitFactory } from '@splitsoftware/splitio';

const authorizationKey = import.meta.env.VITE_SPLIT_API_KEY as string;

// Instantiate the SDK
const factory: SplitIO.ISDK = SplitFactory({
	core: {
		authorizationKey, // the key can be the logged in
		// user id, or the account id that
		// the logged in user belongs to.
		// The type of customer (user, account, custom)
		// is chosen during Split's sign-up process.
		key: 'key'
	},
	startup: {
		readyTimeout: 1.5 // 1.5 sec
	}
});

// And get the client instance you'll use
export const splitClient: SplitIO.IClient = factory.client();
