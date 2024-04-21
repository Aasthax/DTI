import React, { useState } from "react";
import { Link } from "react-router-dom";

const ThankYou = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
    <h2 className="text-3xl font-bold mb-4">Thank You for Your Feedback!</h2>
    <p className="text-lg">We appreciate your valuable feedback.</p>
    <Link to="/home" className="mt-8 underline">
      Go Back to Home
    </Link>
  </div>
);

const Help = () => {
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Assume successful submission for simplicity
    setSubmitted(true);
  };

  if (submitted) {
    return <ThankYou />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white relative">
      <div className="flex items-center justify-center h-full w-full">
        <div className="flex flex-col justify-center items-start w-1/2 pl-20">
          <h1 className="text-5xl font-bold mb-6" style={{ marginLeft: "20%" }}>
            {" "}
            Help us Out!
          </h1>
          <p className="text-lg mb-4">
            We need your help to make this world a better place. Help us out by
            giving us your feedback to help train our model for the better and
            make it more effective.
          </p>
          <p className="text-lg mb-4">
            We are open to any and all suggestions!
          </p>
          <p className="text-lg mb-8">Let’s build a safer tomorrow.</p>
        </div>
        <div className="flex flex-col items-center justify-center w-1/2">
          <div className="mb-0 w-2/3 bg-white rounded-3xl">
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
              style={{ height: "250px" }}
              placeholder="Enter your feedback here..."
              value={feedback} // Bind value to feedback state
              onChange={handleFeedbackChange} // Handle input change
            />
          </div>
          <div
            className="absolute left-1/10 bottom-1/5 text-center"
            style={{ marginLeft: "25%", marginBottom: "-25%" }}
          >
            <button onClick={handleSubmit} className="text-white">
              Send
            </button>
          </div>
        </div>
      </div>
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
        <Link className="text-white text-opacity-90 mr-12 underline">
          Help Us
        </Link>
      </div>
    </div>
  );
};

export default Help;
