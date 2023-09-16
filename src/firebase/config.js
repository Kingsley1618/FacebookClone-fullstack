// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'
const firebaseConfig = {
  apiKey: "AIzaSyCBDRQwdxwL2PC8Tq443rsJD4pDZuZtivA",
  authDomain: "facebook-7d8ae.firebaseapp.com",
  projectId: "facebook-7d8ae",
  storageBucket: "facebook-7d8ae.appspot.com",
  messagingSenderId: "838754933380",
  appId: "1:838754933380:web:02b8c5e725dffceeffc0d1"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig)
export const auth = firebase.auth()
export const db = firebase.firestore()
export const storage = firebase.storage()