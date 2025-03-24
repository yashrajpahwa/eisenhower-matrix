import React from "react";
import { FaKeyboard } from "react-icons/fa";
import ClipLoader from "react-spinners/ClipLoader";
import { auth } from "./firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import AppContent from "./AppContent"; // NEW: Moved main logic here
import SignIn from "./SignIn"; // NEW: SignIn component

const App = () => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ClipLoader color="#3b82f6" size={50} />
      </div>
    );
  }
  if (error) {
    console.error("Auth error:", error);
  }

  return user ? <AppContent user={user} /> : <SignIn />;
};

export default App;
