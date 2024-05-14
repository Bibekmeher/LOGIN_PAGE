// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8I5fIJZcrtsUjilHig-75r0z3T85MhqA",
  authDomain: "verifyotp-de494.firebaseapp.com",
  projectId: "verifyotp-de494",
  storageBucket: "verifyotp-de494.appspot.com",
  messagingSenderId: "623581977507",
  appId: "1:623581977507:web:370f10f2c9016468d0d816"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
