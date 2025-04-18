// firebase.js
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // 🆕

const firebaseConfig = {
  apiKey: "AIzaSyBCQUWqiWqt4ewl4zd8KaNck3jFS49eDqw",
  authDomain: "web1-52d67.firebaseapp.com",
  projectId: "web1-52d67",
  storageBucket: "web1-52d67.firebasestorage.app",
  messagingSenderId: "636060423091",
  appId: "1:636060423091:web:7fdcf02c01085d654471c6",
  measurementId: "G-T8YF487PMJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app); // ✅ add this line
