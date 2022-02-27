import firebase from 'firebase/compat/app';
import "firebase/storage";
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyC8MG7LOwU8NG42uRel7Y1_CLwpjJjIqcg",
    authDomain: "trix-rwp.firebaseapp.com",
    databaseURL: "https://trix-rwp-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "trix-rwp",
    storageBucket: "trix-rwp.appspot.com",
    messagingSenderId: "454501759204",
    appId: "1:454501759204:web:4f6e2f205378bdf3aad4f1"
};

export const app = initializeApp(firebaseConfig);

export const storageDb = getStorage(app);