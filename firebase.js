// Firebase imports
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD2ipXpkLVAqR3c5uIsuGsC7bfPNKLY-7Y",
  authDomain: "wanderpetapp.firebaseapp.com",
  projectId: "wanderpetapp",
  storageBucket: "wanderpetapp.firebasestorage.app",
  messagingSenderId: "908321083778",
  appId: "1:908321083778:web:e4e01f40e7c537263a3f9b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore and Storage
export const db = getFirestore(app);
export const storage = getStorage(app);
