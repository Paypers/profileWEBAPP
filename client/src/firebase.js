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
  apiKey: "AIzaSyD_Ap94Z6cqly4lQU5U-O3AWsha1A__l-8",
  authDomain: "jobapplications-3e9a3.firebaseapp.com",
  projectId: "jobapplications-3e9a3",
  storageBucket: "jobapplications-3e9a3.firebasestorage.app",
  messagingSenderId: "704426824434",
  appId: "1:704426824434:web:7eee82cea9f5b410b3f66b",
  measurementId: "G-K0LJQWNQBL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize and export the Firebase services you want to use
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, analytics, auth, db, storage };