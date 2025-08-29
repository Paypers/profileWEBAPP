// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbpV20IDdhiO_mloiWvRr73pJZkXQKnrE",
  authDomain: "profi-a7bb3.firebaseapp.com",
  projectId: "profi-a7bb3",
  storageBucket: "profi-a7bb3.firebasestorage.app",
  messagingSenderId: "148313838214",
  appId: "1:148313838214:web:7e58c0cd4776f19b9b3707",
  measurementId: "G-9EFQQ06PPZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize and export the Firebase services you want to use
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, analytics, auth, db, storage };