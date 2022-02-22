import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

admin.initializeApp();

const db = admin.firestore();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

export const saveUser = functions
    .region("europe-west2")
    .auth.user()
    .onCreate(async (user) => {
      const userData = {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        phoneNumber: user.phoneNumber,
        providerData: user.providerData[0].providerId,
        emailVerified: user.emailVerified,
        uid: user.uid,
        disabled: user.disabled,
        config: {
          autosaveQueries: false,
          defaultSearchProvider: {
            id: "1",
            name: "Google",
            url: "https://google.com/search?q=",
          },
        },
      };

      console.log("userData:", userData);

      const userRef = await db.collection("users").doc(user.uid).set(userData);
      console.log("userRef:", userRef);
    });

export const deleteUser = functions
    .region("europe-west2")
    .auth.user()
    .onDelete(async (user) => {
      await db.collection("users").doc(user.uid).delete();
    });
