import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const ThankYou = ({ handleClose }) => {
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(".popup")) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [handleClose]);

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 h-2/5 bg-gradient-to-b from-[#ffc0cb] via-[#ffb6c1] to-[#d8bfd8] rounded-3xl p-8 shadow-lg z-50 opacity-100 text-black popup">
      <div className="text-3xl font-bold mb-4">Thank you!</div>
      <button
        className="text-black py-2 px-4 rounded-full absolute top-0 right-0 -mt-4 -mr-4"
        onClick={handleClose}
      >
        &times;
      </button>
    </div>
  );
};

export default ThankYou;
