import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBmeUovLvTwjWrZT6Pc0B7K68bF0RgBPHU",
  authDomain: "aayuchat-54ad1.firebaseapp.com",
  projectId: "aayuchat-54ad1",
  storageBucket: "aayuchat-54ad1.appspot.com",
  messagingSenderId: "8117014981",
  appId: "1:8117014981:web:aad792220856e71ab1fbac"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth=getAuth();
export const storage = getStorage();
export const db=getFirestore();