import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const BetForm = ({
  setHaveBet,
  balance,
  setBalance,
  setBetSizing,
  setUserMultiplier,
  setStakeMultiplier,
}) => {
  const [showBetSizing, setShowBetSizing] = useState(false);
  const [showUserMultiplier, setShowUserMultiplier] = useState(false);
  const [errors, setErrors] = useState({});

  const play = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const betSizing = parseFloat(formData.get("betSizing"));
    const userMultiplier = parseFloat(formData.get("userMultiplier"));

    // Validate betSizing
    if (betSizing < 0.01 || betSizing > parseFloat(balance)) {
      setErrors({
        ...errors,
        betSizing: "Bet amount must be greater than 0 and less than balance.",
      });
      setShowBetSizing(true);
      return;
    } else {
      setShowBetSizing(false);
    }

    // Validate userMultiplier
    if (userMultiplier < 1.01) {
      setErrors({
        ...errors,
        userMultiplier: "Target multiplier must be greater than 1.",
      });
      setShowUserMultiplier(true);
      return;
    } else {
      setShowUserMultiplier(false);
    }

    setHaveBet(true);
    setBetSizing(betSizing);
    setUserMultiplier(userMultiplier);

    let tempBalance = parseFloat(balance);
    console.log("tempBalance", tempBalance);
    let payout = -betSizing;
    console.log("pre-payout", payout);
    let stake_multiplier = 1.0;
    let casino_odds = Math.floor(Math.random() * 100) + 1;
    if (casino_odds != 1) {
      let u = Math.random();
      stake_multiplier = 1 / (1 - u);
    }
    console.log(stake_multiplier);
    if (userMultiplier <= stake_multiplier) {
      payout += betSizing * userMultiplier;
    }
    console.log("post-payout", payout);
    tempBalance += payout;
    console.log("final-balance", tempBalance.toFixed(2));
    setBalance(tempBalance.toFixed(2));
    setStakeMultiplier(stake_multiplier.toFixed(2));
  };

  return (
    <form
      onSubmit={play}
      className="h-4/6 flex flex-col justify-center items-center shadow-sm rounded-lg bg-gray-800"
    >
      <div>
        <div className="flex-col flex flex-start mb-2">
          <label htmlFor="betSizing" className="text-white self-start pl-1">
            Bet Amount:
          </label>
          <input
            type="number"
            id="betSizing"
            name="betSizing"
            step="any"
            className="bg-gray-600 rounded-lg text-white font-bold h-10 w-48 flex items-center justify-between px-2"
          />
        </div>
      </div>
      <div className="flex-col flex flex-start">
        <label
          htmlFor="userMultiplier"
          className="text-white self-start pl-1 font-sans"
        >
          Target Multiplier:
        </label>
        <input
          type="number"
          id="userMultiplier"
          name="userMultiplier"
          step="any"
          className="bg-gray-600 rounded-lg text-white font-bold h-10 w-48 flex items-center justify-between px-2"
        />
        {errors.betSizing && showBetSizing && (
          <div>
            <div
              id="error-message"
              className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <svg
                className="flex-shrink-0 inline w-4 h-4 me-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="sr-only">Info</span>
              <div>
                <span className="font-medium pl-2">Error!</span>{" "}
                {errors.betSizing}
              </div>
            </div>
          </div>
        )}
        {errors.userMultiplier && showUserMultiplier && (
          <div>
            <div
              id="error-message"
              className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <svg
                className="flex-shrink-0 inline w-4 h-4 me-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="sr-only">Info</span>
              <div>
                <span className="font-medium pl-2">Error!</span>{" "}
                {errors.userMultiplier}
              </div>
            </div>
          </div>
        )}
      </div>
      <button
        type="submit"
        className="my-2 p-4 px-20 font-mono font-bold mt-10 mx-4"
        style={{ backgroundColor: "#00ff00" }}
      >
        Play
      </button>
    </form>
  );
};

export default BetForm;
