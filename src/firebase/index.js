import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyBAmMtEtdFILnGSwPE3m-UhEpfaPNZ32qs",
    authDomain: "library-app-acb51.firebaseapp.com",
    projectId: "library-app-acb51",
    storageBucket: "library-app-acb51.appspot.com",
    messagingSenderId: "219538725807",
    appId: "1:219538725807:web:83734e8650c5c8ce566d5a",
    measurementId: "G-2KXJLTBQTQ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
export {db,auth,storage}