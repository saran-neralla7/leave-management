import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD3fkX37fhoA_65hh4sA4TWZ2tFYshFW3c",
  authDomain: "leave-management-384c0.firebaseapp.com",
  projectId: "leave-management-384c0",
  storageBucket: "leave-management-384c0.firebasestorage.app",
  messagingSenderId: "397881567517",
  appId: "1:397881567517:web:1c12e4e93b6e71dc8bd9f4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
