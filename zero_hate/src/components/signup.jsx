import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { GoogleAuthProvider } from "firebase/auth";
import photo from "./google_logo.svg";

import { createUserWithEmailAndPassword } from "firebase/auth";

const Signup = () => {
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User signed up successfully:", userCredential.user);
      navigate("/login");
    } catch (error) {
      console.error("Error signing up:", error.message);
      // Handle specific Firebase errors and display appropriate messages to the user
      if (error.code === "auth/email-already-in-use") {
        // Handle email already in use error
      } else if (error.code === "auth/invalid-email") {
        // Handle invalid email error
      } else if (error.code === "auth/weak-password") {
        // Handle weak password error
      } else {
        // Handle other errors
      }
    }
  };

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
      <h1 className="text-6xl font-bold mb-8">Welcome!</h1>
      <div className="w-full max-w-xs">
        <form className="bg-transparent" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email-address" className="block text-lg mb-2">
              E-mail:
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="shadow appearance-none border-b border-gray-300 w-full py-2 px-3 bg-transparent leading-tight focus:outline-none focus:border-white text-white"
              placeholder=""
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-lg mb-2">
              Set Password:
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              className="shadow appearance-none border-b border-gray-300 w-full py-2 px-3 bg-transparent leading-tight focus:outline-none focus:border-white text-white"
              placeholder=""
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="w-32 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
            >
              Sign up
            </button>
          </div>

          <div className="flex items-center justify-center mt-4">
            <hr className="w-1/3 border-gray-300 border-t-2" />
            <span className="mx-2 text-gray-400 font-bold text-sm">OR</span>
            <hr className="w-1/3 border-gray-300 border-t-2" />
          </div>
          <div className="flex items-center justify-center mt-4">
            <button
              type="button"
              onClick={handleGoogleSignUp}
              className="flex items-center justify-center w-60 bg-transparent border border-gray-300 hover:border-gray-500 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
            >
              <img src={photo} alt="Google Logo" className="h-5 w-5 mr-2" />
              Sign up with Google
            </button>
          </div>
        </form>
      </div>
      <footer className="absolute bottom-4"></footer>
      <div className="absolute top-0 left-0 ml-8 mt-8">
        <Link
          to="/home"
          className="text-white text-opacity-90 mr-12 hover:underline"
        >
          Home
        </Link>
        <Link
          to="/aim"
          className="text-white text-opacity-90 mr-12 hover:underline"
        >
          Objective
        </Link>
        <Link
          to="/contact"
          className="text-white text-opacity-90 mr-12 hover:underline"
        >
          Contact Us
        </Link>
        <Link
          to="/help"
          className="text-white text-opacity-90 mr-12 hover:underline"
        >
          Help Us
        </Link>
      </div>
      <div className="absolute top-0 right-0 mr-8 mt-8">
        <Link
          to="/login"
          className="text-white text-opacity-90 mr-12 hover:underline"
        >
          Login
        </Link>
        <Link
          // to="/signup"
          className="text-white text-opacity-90 underline"
        >
          Signup
        </Link>
      </div>
    </div>
  );
};

export default Signup;
