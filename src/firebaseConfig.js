import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCvwYsz-irRuSkF5oO5OAh0PUfwID2gp-k",
  authDomain: "webrtc-calling-5afd6.firebaseapp.com",
  projectId: "webrtc-calling-5afd6",
  storageBucket: "webrtc-calling-5afd6.firebasestorage.app",
  messagingSenderId: "831376177479",
  appId: "1:831376177479:web:27932c76d82cd53d533462",
  measurementId: "G-KJPZ5GCQ28",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export default firebase;
