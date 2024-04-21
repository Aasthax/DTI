import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import profileIcon from "./profile_pic.svg";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

const Results = () => {
  const location = useLocation();
  const inputText = location.state ? location.state.inputText : ""; // Get the input text from the location state
  const predictedLabels = location.state ? location.state.predictedLabels : {};
  const navigate = useNavigate();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false); // State variable to track if profile dropdown is open
  const dropdownRef = useRef(null); // Reference to the dropdown element

  useEffect(() => {
    // Close dropdown when clicking outside
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    }
    // Add event listener when component mounts
    document.addEventListener("mousedown", handleClickOutside);
    // Remove event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is logged in
        console.log("User is logged in:", user);
      } else {
        // User is logged out
        console.log("User is logged out");
        navigate("/login"); // Redirect to the login page if the user is logged out
      }
    });

    return () => {
      // Unsubscribe from the observer when the component unmounts
      unsubscribe();
    };
  }, [navigate]);

  const handleAnalyzeMoreText = () => {
    // Redirect to the "analysis" page
    navigate("/analysis");
  };

  // Toggle profile dropdown
  const toggleProfileDropdown = () => {
    setShowProfileDropdown((prev) => !prev);
  };
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out successfully");
      // Redirect to the login page after successful logout
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="h-screen bg-black text-white flex flex-col items-center p-7">
      {/* Profile Dropdown */}
      <div className="absolute top-0 right-0 mt-8 mr-8" ref={dropdownRef}>
        <div className="relative">
          <div
            className="w-10 h-10 bg-white border-black rounded-full flex items-center justify-center cursor-pointer"
            onClick={toggleProfileDropdown}
          >
            {/* Replace white circle with profile icon */}
            <img src={profileIcon} alt="Profile" className="w-full h-full" />
          </div>
          {/* Dropdown menu */}
          {showProfileDropdown && (
            <div className="absolute mt-1 top-10 right-0 bg-black border border-white rounded-lg shadow-lg py-2">
              <Link
                // to="/profile"
                className="block px-4 py-2 text-white hover:bg-gray-700"
              >
                Profile
              </Link>
              <Link
                onClick={handleLogout}
                className="block px-4 py-2 text-white hover:bg-gray-700"
              >
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="text-white font-bold text-7xl mb-8 mt-10">ZeroHate</div>
      <div className="flex max-w-4xl w-full">
        <div className="mb-0 w-1/3 bg-white rounded-3xl mr-20">
          <label
            htmlFor="feedback"
            className="mr-2 text-gray-500 ml-2 text-bold"
          >
            <div style={{ paddingLeft: "10px" }}>
              {"\n"} {/* Add a newline character */}
            </div>
          </label>
          <textarea
            id="feedback"
            rows="4"
            className="rounded-lg px-4 py-2 w-full bg-transparent focus:outline-none text-black"
            style={{ height: "350px", marginRight: "auto" }}
            readOnly // Make the textarea read-only
            value={inputText} // Set the value to inputText
          />
        </div>
        <div className="flex flex-col w-1/2">
          <div className="text-white font-bold text-4xl mb-10">Analysis:</div>
          <div className="flex flex-col">
            {Object.entries(predictedLabels).map(([label, percentage]) => (
              <div key={label} className="flex justify-between mb-3">
                <div>
                  <div className="text-white font-bold text-2xl mt-5">
                    {label}
                  </div>
                  <span>{percentage}%</span>
                </div>
              </div>
            ))}
          </div>
          <button
            className="bg-white text-gray-700 py-2 px-8 rounded-full self-center mt-16 font-bold text-sm"
            onClick={handleAnalyzeMoreText}
          >
            Analyze more text
          </button>
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
        {/* <Link
          to="/goal"
          className="text-white text-opacity-90 mr-12 hover:underline"
        >
          Our Goal
        </Link> */}
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

export default Results;
