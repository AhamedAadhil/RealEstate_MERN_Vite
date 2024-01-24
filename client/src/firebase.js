// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "realestate-mern-d0208.firebaseapp.com",
  projectId: "realestate-mern-d0208",
  storageBucket: "realestate-mern-d0208.appspot.com",
  messagingSenderId: "283759300678",
  appId: "1:283759300678:web:6e95d9a3b388f941367a47",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
