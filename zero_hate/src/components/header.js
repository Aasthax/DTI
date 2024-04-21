import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import profileIcon from "./profile_pic.svg"; // Import your profile icon

const Header = ({ isLoggedIn }) => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const dropdownRef = useRef(null);

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

  const toggleProfileDropdown = () => {
    setShowProfileDropdown((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out successfully");
      // Redirect to the login page after successful logout
      // You can add the necessary logic here to redirect to the appropriate page
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className=" bg-black text-white relative">
      {isLoggedIn && ( // Render dropdown menu if user is logged in
        <div className="absolute top-0 right-0 mt-8 mr-8" ref={dropdownRef}>
          <div className="relative">
            <div
              className="w-10 h-10 bg-white border-black rounded-full flex items-center justify-center cursor-pointer"
              onClick={toggleProfileDropdown}
            >
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
      )}

      {!isLoggedIn && ( // Render login/signup links if user is not logged in
        <div className="absolute top-0 right-0 mr-8 mt-8">
          <Link
            to="/login"
            className="text-white text-opacity-90 mr-12 hover:underline"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="text-white text-opacity-90 hover:underline"
          >
            Signup
          </Link>
        </div>
      )}

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
          to="/goals"
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

export default Header;
