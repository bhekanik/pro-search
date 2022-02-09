import type { DocumentData, DocumentReference } from 'firebase/firestore';

export enum Collections {
	SaveQueries = 'savedQueries',
	Recipes = 'recipes',
	Queries = 'queries'
}

export interface Repository {
	getData: <T>(collectionName: Collections, params?: Record<string, unknown>) => Promise<T[]>;
	saveData: (
		collectionName: Collections,
		data: DocumentData
	) => Promise<DocumentReference<DocumentData>>;
	updateData: (collectionName: Collections, docId: string, data: DocumentData) => Promise<void>;
	deleteData: (collectionName: Collections, docId: string) => Promise<void>;
}
