import React from "react";
import { Link } from "react-router-dom";
import CommunityBuildingImage from "./communityBuilding.png";
import SensitivityEducationImage from "./sensitivityEducation.png";
import MindfulInternetImage from "./mindful.png";

const Goals = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      {/* <Link
        to="/home"
        className="text-white text-opacity-90 mr-12 hover:underline"
      >
        Home
      </Link> */}
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
          //   to="/goals"
          className="text-white text-opacity-90 mr-12 hover:underline"
        >
          Our Goal
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

      <h1 className="text-7xl font-bold mb-20 mt-5">Goals:</h1>
      <div className="flex justify-center">
        {/* Container for Community Building */}
        <div className="flex flex-col items-center mr-24">
          <div className="mb-20">
            <img
              src={CommunityBuildingImage}
              alt="Community Building"
              style={{ width: "200px", height: "200px" }}
            />
            <p className="text-white ml-8 mt-4">Community Building</p>
          </div>
        </div>
        {/* Container for Sensitivity Education */}
        <div className="flex flex-col items-center ml-24 mr-24">
          <div className="mb-4">
            <img
              src={SensitivityEducationImage}
              alt="Sensitivity Education"
              style={{ width: "200px", height: "200px" }}
            />
          </div>
          <p className="text-white">Sensitivity Education</p>
        </div>
        {/* Container for Mindful Internet Practices */}
        <div className="flex flex-col items-center ml-24">
          <div className="mb-4">
            <img
              src={MindfulInternetImage}
              alt="Mindful Internet Practices"
              style={{ width: "200px", height: "200px" }}
            />
          </div>
          <p className="text-white">Mindful Internet Practices</p>
        </div>
      </div>
    </div>
  );
};

export default Goals;
