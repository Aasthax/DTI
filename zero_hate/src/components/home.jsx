import React, { useState } from "react";
import { Link } from "react-router-dom";
import Popup from "./popup";
import gifImage from "./giphy.gif"; // Import your GIF image
import newsImage1 from "./stock1.jpg";
import newsImage2 from "./stock2.jpg";
import newsImage3 from "./stock 3.jpg";
import newsImage4 from "./stock 4.jpg";
import newsImage5 from "./stock 5.jpg";

const Home = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [inputText, setInputText] = useState("");

  const handlePopup = () => {
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  // Dummy data for news carousel
  const news = [
    { image: newsImage1 },
    { image: newsImage2 },
    { image: newsImage3 },
    { image: newsImage4 },
    { image: newsImage5 },
    // { image: newsImage1 },
    // { image: newsImage1 },
    // { image: newsImage1 },
    // { image: newsImage1 },
    // { image: newsImage1 },
    // { image: newsImage1 },
    // { image: newsImage1 },
    // { image: newsImage1 },
    // { image: newsImage1 },
  ];

  return (
    <div className="min-h-screen flex flex-row items-start bg-black text-white relative">
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
              zIndex: 0, // Set a lower z-index
            }}
          />

          <div
            className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer z-10"
            onClick={handlePopup}
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

          {/* Popup */}
          {isPopupOpen && <Popup handleClose={handleClosePopup} />}
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
      {/* Links at the top left */}
      <div className="absolute top-0 left-0 ml-8 mt-8">
        <Link
          // to="/home"
          className="text-white text-opacity-90 mr-12 underline "
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
      {/* Login/Signup link at the top right */}
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
      {/* GIF at the bottom left */}
      <img
        src={gifImage}
        alt="Your GIF"
        style={{
          position: "absolute", // Changed to "fixed"
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

export default Home;
