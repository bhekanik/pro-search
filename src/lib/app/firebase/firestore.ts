import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	DocumentData,
	DocumentReference,
	getDocs,
	query,
	updateDoc,
	where
} from 'firebase/firestore';
import { firestore } from '.';
import type { Collections, Repository } from './types';

export const db: Repository = {
	getData: async <T>(
		collectionName: Collections,
		params?: Record<string, unknown>
	): Promise<T[]> => {
		let snapShot;
		if (params && Object.keys(params).length !== 0) {
			const whereClause = Object.entries(params).map(([key, value]) => {
				return { key, value: key === 'amount' ? Number(value) : value };
			})[0];

			snapShot = await getDocs(
				query(
					collection(firestore, collectionName),
					where(whereClause.key, '==', whereClause.value)
				)
			);
		} else snapShot = await getDocs(collection(firestore, collectionName));

		const result: T[] = [];
		snapShot.forEach((doc) => {
			result.push({ ...doc.data().data, id: doc.id });
		});

		return result;
	},

	saveData: async (
		collectionName: Collections,
		data: DocumentData
	): Promise<DocumentReference<DocumentData>> => {
		return await addDoc<DocumentData>(collection(firestore, collectionName), {
			data
		});
	},

	updateData: async (
		collectionName: Collections,
		docId: string,
		data: DocumentData
	): Promise<void> => {
		return await updateDoc<DocumentData>(doc(firestore, collectionName, docId), {
			data
		});
	},

	deleteData: async (collectionName: Collections, docId: string): Promise<void> => {
		return await deleteDoc(doc(firestore, collectionName, docId));
	}
};

export async function createUser(uid: string, data: any): Promise<void> {
	return await updateDoc<DocumentData>(doc(firestore, 'users', uid), { uid, ...data });
}
