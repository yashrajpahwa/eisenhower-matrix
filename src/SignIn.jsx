import React from "react";
import firebase from "firebase/compat/app";
import { auth } from "./firebaseConfig";

const SignIn = () => {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <button
        onClick={signInWithGoogle}
        className="px-6 py-3 bg-blue-500 text-white rounded shadow"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default SignIn;
