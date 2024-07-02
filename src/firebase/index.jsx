import { initializeApp  } from "firebase/app";

import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBR8e2JdDUoCS-Va1dQkQvpUkQ4GECPwIc",
    authDomain: "final-year-project-ae2d6.firebaseapp.com",
    projectId: "final-year-project-ae2d6",
    storageBucket: "final-year-project-ae2d6.appspot.com",
    messagingSenderId: "216851555930",
    appId: "1:216851555930:web:6be54bb23f813807b81a63"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);