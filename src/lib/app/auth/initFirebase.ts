import type { FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';

export async function initFirebase(): Promise<{
	auth: Auth;
	app: FirebaseApp;
	db: Firestore;
}> {
	if (typeof window !== 'undefined') {
		const firebaseConfig = {
			apiKey: import.meta.env.VITE_API_KEY as string,
			authDomain: import.meta.env.VITE_AUTH_DOMAIN as string,
			projectId: import.meta.env.VITE_PROJECT_ID as string,
			storageBucket: import.meta.env.VITE_STORAGE_BUCKET as string,
			messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID as string,
			appId: import.meta.env.VITE_APP_ID as string,
			measurementId: import.meta.env.VITE_MEASUREMENT_ID as string
		};

		const { getApps, initializeApp } = await import('firebase/app');
		const { getAuth } = await import('firebase/auth');
		// const { isSupported, getAnalytics } = await import('firebase/analytics');
		const { getFirestore } = await import('firebase/firestore');

		const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

		const db = getFirestore(app);
		const auth = getAuth(app);

		// const analytics = (await isSupported()) ? await getAnalytics(app) : null;

		return { auth, app, db };
	}
}
