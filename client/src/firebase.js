// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Import App Check
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

// Your web app's Firebase configuration
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

// Initialize App Check
// IMPORTANT: Replace 'YOUR_RECAPTCHA_V3_SITE_KEY' with your actual site key.
// 1. Go to https://cloud.google.com/recaptcha-enterprise/ and create a new key.
// 2. Choose "Website" and add your domain (e.g., profi-a7bb3.web.app).
// 3. Uncheck "Enable "Are you a robot?" checkbox challenge".
// 4. Copy the generated Site Key here.
initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('YOUR_RECAPTCHA_V3_SITE_KEY'),

  // Optional: set to true if you want to allow auto-refresh.
  isTokenAutoRefreshEnabled: true
});

// Initialize and export the Firebase services you want to use
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, analytics, auth, db, storage };