import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ThankYou = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
    <h2 className="text-3xl font-bold mb-4">Thank You for Contacting Us!</h2>
    <p className="text-lg">We will get back to you shortly.</p>
    <Link to="/home" className="mt-8 underline">
      Go Back to Home
    </Link>
  </div>
);

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false); // State to track if form is submitted

  const navigate = useNavigate();

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleMessageChange = (e) => setMessage(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/submit-to-google-sheets",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, message }),
        }
      );

      if (response.ok) {
        console.log("Contact details sent successfully");
        setSubmitted(true);
      } else {
        console.error("Failed to send contact details");
      }
    } catch (error) {
      console.error("Error sending contact details:", error);
    }
  };
  if (submitted) {
    return <ThankYou />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-black">
      <div className="bg-white rounded-3xl p-8 w-2/5 flex flex-col items-center mt-10 opacity-80 mb-4">
        <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
        <div className="mb-0 w-full">
          <label htmlFor="name" className="mr-2">
            Your Name:
          </label>
          <input
            type="text"
            id="name"
            className="rounded-full px-4 py-2 w-full bg-transparent focus:outline-none"
            value={name}
            onChange={handleNameChange}
          />
          <hr className="border-b mb-4 border-gray-400 my-0 w-full" />
        </div>
        <div className="mb-0 w-full">
          <label htmlFor="email" className="mr-2">
            Your Email:
          </label>
          <input
            type="email"
            id="email"
            className="rounded-full px-4 py-2 w-full bg-transparent focus:outline-none"
            value={email}
            onChange={handleEmailChange}
          />
          <hr className="border-b mb-4 border-gray-400 my-0 w-full" />
        </div>
        <div className="mb-0 w-full">
          <label htmlFor="message" className="mr-2">
            Your Message:
          </label>
          <textarea
            id="message"
            rows="4"
            className="rounded-lg px-4 py-2 w-full bg-transparent focus:outline-none"
            style={{ height: "70px" }}
            value={message}
            onChange={handleMessageChange}
          />
          <hr className="border-b border-gray-400 my-0 w-full" />
        </div>
      </div>
      <button
        onClick={handleSubmit}
        className=" bg-blue-500 hover:bg-blue-700 text-xl text-white rounded-full px-6 py-3 w-1/6"
      >
        Submit
      </button>
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
          // to="/contact"
          className="text-white text-opacity-90 mr-12 underline"
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

export default Contact;
