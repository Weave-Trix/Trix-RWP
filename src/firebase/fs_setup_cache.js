import { initializeFirestore, CACHE_SIZE_UNLIMITED } from "firebase/firestore";
import { app } from "./index"

export const firestoreDb = initializeFirestore(app, {
  cacheSizeBytes: CACHE_SIZE_UNLIMITED
});