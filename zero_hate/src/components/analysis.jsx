import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Results from "./results"; // Import the Results component
import gifImage from "./giphy.gif"; // Import your GIF image
import profileIcon from "./profile_pic.svg";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import newsImage1 from "./stock1.jpg";
import newsImage2 from "./stock2.jpg";
import newsImage3 from "./stock 3.jpg";
import newsImage4 from "./stock 4.jpg";
import newsImage5 from "./stock 5.jpg";

const Analysis = () => {
  const [inputText, setInputText] = useState("");
  const [predictedLabels, setPredictedLabels] = useState([]);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false); // State variable to track if profile dropdown is open
  const navigate = useNavigate();
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

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleAnalysis = async () => {
    if (inputText.trim() !== "") {
      try {
        const response = await fetch("http://127.0.0.1:5001/predict", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ texts: [inputText] }),
        });
        const data = await response.json();
        setPredictedLabels(data);
        navigate("/results", { state: { inputText, predictedLabels: data } });
      } catch (error) {
        console.error("Error analyzing text:", error);
      }
    } else {
      alert("Enter some text to analyse...");
    }
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

  // Toggle profile dropdown
  const toggleProfileDropdown = () => {
    setShowProfileDropdown((prev) => !prev);
  };

  // Dummy data for news carousel
  const news = [
    { image: newsImage1 },
    { image: newsImage2 },
    { image: newsImage3 },
    { image: newsImage4 },
    { image: newsImage5 },
  ];

  return (
    <div className="min-h-screen flex flex-row items-start bg-black text-white relative">
      {/* Profile Dropdown */}
      <div className="absolute top-0 right-0 mt-8 mr-8" ref={dropdownRef}>
        <div className="relative">
          <div
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer"
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

      {/* Links at the top left */}
      <div className="absolute top-0 left-0 ml-8 mt-8">
        <Link
          // to="/home"
          className="text-white text-opacity-90 mr-12 underline"
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

      {/* Left Section */}
      <div className="ml-8 flex-grow mt-8">
        <div className="text-white font-bold text-8xl mt-24 ml-14">
          ZeroHate
        </div>
        <div className="bg-white ml-14 bg-opacity-90 mt-10 mb-20 rounded-full p-5 w-2/3 relative overflow-hidden">
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            placeholder={inputText ? "" : "Enter your text here..."}
            className="rounded-full px-4 py-2 w-full text-black bg-transparent"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 0,
            }}
          />

          <div
            className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer z-10"
            onClick={handleAnalysis}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-black"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M13.707 9.293a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0 1 1 0 010-1.414L11.586 10 8.293 6.707a1 1 0 010-1.414 1 1 0 011.414 0l5 5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
      {/* // Right Section */}

      <div className="ml-auto flex flex-col items-center justify-center w-1/4">
        {/* News Carousel */}
        <div
          className="bg-black rounded p-5 w-full mt-20 mb-30 h-80 overflow-y-scroll"
          style={{ height: "450px" }}
        >
          {/* Adjusted height to 120 pixels */}
          {news.map((item, index) => (
            <div
              key={index}
              className="bg-white p-11 rounded-3xl mb-2 w-3/4 h-1/3 flex items-center"
              style={{ position: "relative", overflow: "hidden" }} // Add overflow hidden to ensure the image stays within the container
            >
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover" // Set the image to cover the entire container
                style={{ objectFit: "cover" }} // Set object-fit to cover
              />
              <div>{item.title}</div>
            </div>
          ))}
        </div>
      </div>
      {/* GIF at the bottom left */}
      <img
        src={gifImage}
        alt="Your GIF"
        style={{
          position: "absolute",
          bottom: "50px",
          left: "90px",
          width: "400px",
          height: "200px",
          zIndex: 1,
        }}
      />
    </div>
  );
};

export default Analysis;
