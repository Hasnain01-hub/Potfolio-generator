// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQO5QS-FX2g48lZXVF1-FbE9gaW9AsiHs",
  authDomain: "influencer-asthetech.firebaseapp.com",
  projectId: "influencer-asthetech",
  storageBucket: "influencer-asthetech.appspot.com",
  messagingSenderId: "402429558961",
  appId: "1:402429558961:web:4e2faf9658e091f8902290",
  measurementId: "G-YC9NRK231W"
};

// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const db = app.firestore();
export const logout1 = () => {
  auth.signOut();
};