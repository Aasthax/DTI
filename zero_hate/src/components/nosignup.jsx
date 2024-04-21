import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { GoogleAuthProvider } from "firebase/auth";

const NoSignUp = () => {
  const navigate = useNavigate();

  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      console.log(userCredential.user);
      navigate("/analysis"); // Redirect user to analysis page after successful Google sign-up
    } catch (error) {
      console.error("Error:", error.message);
      // Handle error if Google sign-up fails
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-6xl font-bold mb-8">
        Sorry, we didn’t recognize that account.
      </h1>
      <p className="text-lg mb-8">
        Would you like to create a new ZeroHate account?
      </p>
      <button
        onClick={handleGoogleSignUp}
        className="w-60 bg-transparent border border-gray-300 hover:border-gray-500 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
      >
        Sign up with Google
      </button>
      <div className="mt-8">
        <Link to="/login" className="text-blue-500 hover:underline">
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default NoSignUp;
