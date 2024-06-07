import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const BetForm = ({
  numbers,
  setNumbers,
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

  const [displayBetSizing, setDisplayBetSizing] = useState(0);
  const [displayUserMultiplier, setDisplayUserMultiplier] = useState(-1);
  const [allIn, setAllIn] = useState(false);

  const handleMaxClick = () => {
    setDisplayBetSizing(parseFloat(balance)); // Set the desired max value here
    setAllIn(true);
  };

  const handleChange = (e) => {
    setDisplayBetSizing(e.target.value);
    setAllIn(false); // Ensure allIn is false when user types
  };

  const play = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const betSizing = parseFloat(formData.get("betSizing"));
    const userMultiplier = parseFloat(formData.get("userMultiplier"));

    // Validate betSizing
    if (
      isNaN(betSizing) ||
      betSizing < 0.01 ||
      betSizing > parseFloat(balance)
    ) {
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
    if (isNaN(userMultiplier) || userMultiplier < 1.01) {
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

    let payout = -betSizing;

    let stake_multiplier = 1.0;
    let casino_odds = Math.floor(Math.random() * 100) + 1;
    if (casino_odds != 1) {
      let u = Math.random();
      stake_multiplier = 1 / (1 - u);
    }
    if (userMultiplier <= stake_multiplier) {
      payout += betSizing * userMultiplier;
    }

    tempBalance += payout;

    setNumbers((prevNumbers) => {
      const updatedNumbers = [...prevNumbers, stake_multiplier.toFixed(2)];
      if (updatedNumbers.length > 4) {
        updatedNumbers.shift(); // Remove the first element if there are more than 5 numbers
      }
      return updatedNumbers;
    });
    setBalance(tempBalance.toFixed(2));
    setStakeMultiplier(stake_multiplier.toFixed(2));
  };

  return (
    <div className="w-2/6 md:w-auto shadow-lg rounded-lg min-w-80 bg-gray-900">
      <form
        onSubmit={play}
        className="h-4/6 flex flex-col justify-center items-center shadow-sm rounded-lg bg-gray-800"
      >
        <div>
          <div className="flex-col flex flex-start mb-2">
            <label
              htmlFor="betSizing"
              className="text-white self-start pl-1 mb-1"
            >
              Bet Amount:
            </label>
            <div className="flex items-center w-48 mb-2">
              {allIn && (
                <input
                  type="number"
                  id="betSizing"
                  name="betSizing"
                  step="any"
                  value={displayBetSizing}
                  onChange={(e) => handleChange(e)}
                  className="user-input bg-gray-600 rounded-l-lg text-white font-bold h-10 w-full items-center justify-between px-2"
                  style={{ outline: "none" }}
                />
              )}
              {!allIn && (
                <input
                  type="number"
                  id="betSizing"
                  name="betSizing"
                  step="any"
                  onChange={(e) => handleChange(e)}
                  className="user-input bg-gray-600 rounded-l-lg text-white font-bold h-10 w-full items-center justify-between px-2"
                  style={{ outline: "none" }}
                />
              )}
              <button
                type="button"
                onClick={handleMaxClick}
                className="border-gray-300 bg-gray-300 text-gray-600 px-2 py-2 font-bold hover:bg-gray-400 transition duration-200"
                style={{
                  borderTopLeftRadius: "0",
                  borderBottomLeftRadius: "0",
                  borderWidth: "1px",
                }}
              >
                MAX
              </button>
            </div>
          </div>
        </div>
        <div className="flex-col flex flex-start">
          <label
            htmlFor="userMultiplier"
            className="text-white self-start pl-1 font-sans mb-1"
          >
            Target Multiplier:
          </label>
          <input
            type="number"
            id="userMultiplier"
            name="userMultiplier"
            step="any"
            onChange={(e) => setDisplayUserMultiplier(e.target.value)}
            className="user-input bg-gray-600 rounded-lg text-white font-bold h-10 w-48 flex items-center justify-between px-2"
            style={{ outline: "none" }}
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

      <div className="h-2/6 flex flex-col justify-center items-center rounded-lg content-center">
        <div className="flex flex-col items-center m-2 w-48">
          <p className="text-white self-start pl-1 mb-1">Net Gain on Win:</p>
          <div className="bg-gray-600 rounded-lg text-white user-input font-bold h-10 w-48 flex items-center justify-between px-2">
            <span>
              {displayUserMultiplier != -1 &&
              displayUserMultiplier >= 1 &&
              displayUserMultiplier != ""
                ? ((displayUserMultiplier - 1) * displayBetSizing).toFixed(2)
                : ""}
            </span>
            <span>$</span>
          </div>
        </div>
        <div className="flex flex-col m-2 w-48">
          <p className="text-white self-start pl-1 mb-1">Win Chance:</p>
          <div className="bg-gray-600 rounded-lg text-white user-input font-bold h-10 w-48 flex items-center justify-between px-2">
            <span>
              {displayUserMultiplier != -1 &&
              displayUserMultiplier >= 1 &&
              displayUserMultiplier != ""
                ? (100 * (0.99 / displayUserMultiplier)).toFixed(6)
                : ""}
            </span>
            <span>%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BetForm;
