import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB2nPLhpfHGNCTn7l96kF3rlNdYYGHerfE",
  authDomain: "scoutlink-e1fc1.firebaseapp.com",
  projectId: "scoutlink-e1fc1",
  storageBucket: "scoutlink-e1fc1.firebasestorage.app",
  messagingSenderId: "706486531725",
  appId: "1:706486531725:web:1b5a4559403f74675f54c4",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);