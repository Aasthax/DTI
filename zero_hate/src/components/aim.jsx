import React from "react";
import { Link } from "react-router-dom";
// import Header from "./header";
import aimImage from "./aim.jpeg";

const Aim = () => {
  return (
    <div>
      {/* <Header isLoggedIn={false} /> Pass isLoggedIn as false */}
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
        <div className="flex items-center justify-center h-full w-full">
          <div className="flex justify-center items-center h-full w-1/2">
            <img src={aimImage} alt="Aim Image" className="max-h-80" />
          </div>
          <div className="flex flex-col justify-center text-center px-8 w-1/2">
            <h1 className="text-4xl font-bold mb-4">Our Aim</h1>
            <p className="text-lg">
              Our hate speech detection system is one of the most important
              projects in the fight against the negative effects of online hate.
              With quick detection and response to hate speech across languages
              such as English, Hindi, and Hinglish, it develops a platform where
              everyone feels a sense of belonging and freedom from
              discrimination. The center of focus is mental health, forming an
              online community that promotes well-being and positivity. This
              approach is not only preventive but is also a catalyst for a
              digital culture that combines freedom of speech and responsible
              use. It keeps users protected against the danger of hate speech by
              creating a more tolerant and caring community.
            </p>
            {/* <Link
              to="/login"
              className="mt-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Back to Login
            </Link> */}
          </div>
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
          // to="/aim"
          className="text-white text-opacity-90 mr-12 underline"
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

export default Aim;
