// Import the functions you need from the SDKs you need
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: import.meta.env.VITE_API_KEY as string,
	authDomain: import.meta.env.VITE_AUTH_DOMAIN as string,
	projectId: import.meta.env.VITE_PROJECT_ID as string,
	storageBucket: import.meta.env.VITE_STORAGE_BUCKET as string,
	messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID as string,
	appId: import.meta.env.VITE_APP_ID as string,
	measurementId: import.meta.env.VITE_MEASUREMENT_ID as string
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const firestore = getFirestore(app);
const auth = getAuth(app);

const analytics = isSupported().then((value) => {
	return value && getAnalytics(app);
});

export { app, firestore, analytics, auth };
