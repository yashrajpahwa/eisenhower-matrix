import React from "react";
import { FaKeyboard, FaSignOutAlt } from "react-icons/fa";
import ClipLoader from "react-spinners/ClipLoader";
import { auth } from "./firebaseConfig";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import AppContent from "./AppContent";
import SignIn from "./SignIn";

const App = () => {
  const [user, loading, error] = useAuthState(auth);
  const [signOut, signOutLoading] = useSignOut(auth);

  // Handle sign out with useSignOut hook
  const handleSignOut = async () => {
    const success = await signOut();
    if (success) {
      console.log("Successfully signed out");
    }
  };

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

  return user ? (
    <div className="relative">
      {/* Logout Button - Position it in top right corner */}
      <button
        onClick={handleSignOut}
        disabled={signOutLoading}
        className="absolute top-4 right-4 z-10 flex items-center justify-center bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-lg shadow-sm transition-all hover:shadow"
        aria-label="Sign out"
      >
        <FaSignOutAlt className="text-red-500" />
        <span className="ml-2 hidden md:inline">Sign Out</span>
      </button>

      <AppContent user={user} />
    </div>
  ) : (
    <SignIn />
  );
};

export default App;
