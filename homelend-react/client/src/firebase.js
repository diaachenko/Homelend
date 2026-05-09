// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCcvneineZtC3LT_MbtUCJM1BqnXIZbdoE",
  authDomain: "homelend-667e9.firebaseapp.com",
  projectId: "homelend-667e9",
  storageBucket: "homelend-667e9.firebasestorage.app",
  messagingSenderId: "753275794528",
  appId: "1:753275794528:web:272d4a7dfce011a56e3f05",
  measurementId: "G-NW0QWFXWK6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);