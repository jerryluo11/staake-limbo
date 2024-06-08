import React from "react";
import "./Header.css";
import "./PastBets.css";
const PastBetsItem = ({ stakeMultiplier, userMultiplier, className }) => {
  return (
    <>
      <div
        className={`user-input number-item flex bg-gray-900 rounded-3xl text-white font-bold h-10 w-24 items-center justify-center ${className} ${
          stakeMultiplier >= userMultiplier
            ? "stakeWinBackground text-gray-900"
            : ""
        }`}
      >
        {stakeMultiplier}x
      </div>
    </>
  );
};

export default PastBetsItem;
