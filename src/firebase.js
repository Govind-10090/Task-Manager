import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAycdC4FqLfihSnvK-nRQL8Egil3gewvQg",
  authDomain: "task-manager-82828.firebaseapp.com",
  projectId: "task-manager-82828",
  storageBucket: "task-manager-82828.firebasestorage.app",
  messagingSenderId: "1087055389872",
  appId: "1:1087055389872:web:f47f4eb3cce5adaa6e4775",
  measurementId: "G-4BS08TNC8S"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const analytics = getAnalytics(app);
