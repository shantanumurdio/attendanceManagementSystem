// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjZQ3JZjfcll6_VzMeHI632ZFn23uQvSs",
  authDomain: "attendance-management-sy-9a3c3.firebaseapp.com",
  projectId: "attendance-management-sy-9a3c3",
  storageBucket: "attendance-management-sy-9a3c3.appspot.com",
  messagingSenderId: "741910458521",
  appId: "1:741910458521:web:9d31ed126fcea26ead4808",
  measurementId: "G-2367V3ETZY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();