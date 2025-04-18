import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBCQUWqiWqt4ewl4zd8KaNck3jFS49eDqw",
  authDomain: "web1-52d67.firebaseapp.com",
  projectId: "web1-52d67",
  storageBucket: "web1-52d67.appspot.com", // ✅ fixed
  messagingSenderId: "636060423091",
  appId: "1:636060423091:web:7fdcf02c01085d654471c6",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
