import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { GoogleAuthProvider } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import photo from "./google_logo.svg";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential.user);
      navigate("/analysis");
    } catch (error) {
      console.error("Error:", error.message);
      setError("Invalid email or password");
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is logged in, redirect to the analysis page
        navigate("/analysis");
      }
    });

    // Cleanup the subscription on component unmount
    return () => unsubscribe();
  }, [navigate]);

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      console.log(userCredential.user);

      // Check if the user exists in your database
      // Here you can implement your logic to check if the user exists
      const userExists = true; // Placeholder logic, replace with actual logic to check user existence

      if (userExists) {
        navigate("/analysis"); // Redirect to the analysis page if the user exists
      } else {
        navigate("/signup"); // Redirect to the signup page if the user does not exist
      }
    } catch (error) {
      console.error("Error:", error.message);
      setError("Failed to sign in with Google");
    }
  };

  return (
    <div>
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
        <h1 className="text-6xl font-bold mb-8">Welcome Back !</h1>
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
                className="shadow appearance-none border-b border-gray-300 w-full py-2 px-3 bg-white leading-tight focus:outline-none focus:border-white rounded-full"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-lg mb-2">
                Password:
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="shadow appearance-none border-b border-gray-300 w-full py-2 px-3 bg-white leading-tight focus:outline-none focus:border-white rounded-full"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <button
              type="submit"
              className="w-36 mr-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline mr-2"
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="w-36 ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
            >
              Sign Up
            </button>
            <div className="flex items-center justify-center mt-4">
              <hr className="w-1/4 border-gray-300 border-t-2" />
              <span className="mx-2 mt-5 mb-5 text-gray-400 font-bold text-xs">
                Or Continue with
              </span>
              <hr className="w-1/4 border-gray-300 border-t-2" />
            </div>
            <div className="flex items-center justify-center">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="flex items-center justify-center w-60 bg-transparent hover:border-transparent focus:outline-none focus:border-transparent"
              >
                <img src={photo} alt="Google Logo" className="h-12 w-12 mr-2" />
              </button>
            </div>
          </form>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </div>
      {/* Links at the top left */}
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
    </div>
  );
};

export default Login;
