// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:"AIzaSyBCNkvwmQ_WFsTw5koOUaTasUi3h15EVGs",
  authDomain: "mern-realestate-33394.firebaseapp.com",
  projectId: "mern-realestate-33394",
  storageBucket: "mern-realestate-33394.firebasestorage.app",
  messagingSenderId: "47260828086",
  appId: "1:47260828086:web:72d6a826806ef108b64117"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);