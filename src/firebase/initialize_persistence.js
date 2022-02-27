import { enableIndexedDbPersistence } from "firebase/firestore"; 
import { storageDb } from "./index";

enableIndexedDbPersistence(storageDb)
  .catch((err) => {
      if (err.code == 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a a time.
          // ...
          console.log("firestore persistence can only persist data for one tab at a time, please remain within a single page")
      } else if (err.code == 'unimplemented') {
          // The current browser does not support all of the
          // features required to enable persistence
          // ...
          console.log("current browser does not support offline firestore")
      }
  });
// Subsequent queries will use persistence, if it was enabled successfully