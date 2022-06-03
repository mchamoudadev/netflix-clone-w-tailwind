// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCGT_Wl2eHgA4alSmRH8FohY1mmJMsHIVg",
    authDomain: "netflix-demo-ba032.firebaseapp.com",
    projectId: "netflix-demo-ba032",
    storageBucket: "netflix-demo-ba032.appspot.com",
    messagingSenderId: "297292000323",
    appId: "1:297292000323:web:edc6279d7ae5e593e8f8f6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
