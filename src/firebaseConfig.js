// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// import * as firebase from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {connectStorageEmulator, getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2x-tCa8f1bBQEhcAu3mZg-ulgobTVttQ",
  authDomain: "eventoh.firebaseapp.com",
  projectId: "eventoh",
  storageBucket: "eventoh.appspot.com",
  messagingSenderId: "114955220751",
  appId: "1:114955220751:web:4c5baefdc94e196f8db07a",
  measurementId: "G-2FBQYPC1SF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {app, analytics, auth, db, storage};