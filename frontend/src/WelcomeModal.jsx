import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import "./Header.css";

//passes variables by refernce
const WelcomeModal = ({
  inputBalance,
  setInputBalance,
  setBalance,
  setIsModalOpen,
}) => {
  const [errorMessage, setErrorMessage] = useState("");

  const assignBalance = async (e) => {
    //don't auto refresh page
    e.preventDefault();
    const parsedValue = parseFloat(inputBalance);

    if (isNaN(parsedValue) || parsedValue <= 0) {
      setErrorMessage("Balance must be greater than 0.");
    } else {
      setIsModalOpen(false);
      setBalance(parseFloat(inputBalance).toFixed(2));
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bodyColor dark:bg-gray-700 py-6 px-2 rounded-lg shadow-lg w-11/12 max-w-md mx-auto">
        <h2
          className="text-2xl underline underline-offset-0 font-semibold text-white mt-4"
          style={{ textUnderlineOffset: "4px" }}
        >
          Welcome to Limbo!
        </h2>
        <p className="text-xs font-light text-white mb-8">
          presented by Staake
        </p>
        <p className="text-md font-extralight text-white dark:text-gray-200 px-4">
          <span className="font-semibold">How to play: </span>The user selects a
          betting amount and target multiplier. Every time the "PLAY" button is
          clicked, the user pays the bet amount and a random multiplier will be
          generated—higher multipliers are rarer than lower ones. If the
          generated multiplier is GREATER than or equal to the user's target
          multiplier, the user wins their bet amount multiplied by their TARGET
          multiplier. <br />
          Happy gambling!💰{" "}
        </p>
        <form
          onSubmit={assignBalance}
          className="flex justify-center items-center mt-6"
          noValidate
        >
          <div className="flex-col flex items-center w-1/2">
            <label
              htmlFor="desiredBalance"
              className="block text-sm font-medium text-white mb-1 self-start"
            >
              Desired Balance:
            </label>
            <div className="flex items-center w-full mb-2">
              <span className="inline-block p-2 bg-gray-200 text-white rounded-l-md border-gray-300 bg-gray-600">
                $
              </span>
              <input
                type="number"
                id="desiredBalance"
                step="any"
                className="specific-input w-full block p-2 text-white font-semibold border-gray-200 bg-gray-700"
                onChange={(e) => setInputBalance(e.target.value)}
              />

              {errorMessage && (
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
                      {errorMessage}
                    </div>
                  </div>
                </div>
              )}
              <button
                type="submit"
                className="border-gray-300 bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 transition duration-200"
                style={{
                  borderTopLeftRadius: "0",
                  borderBottomLeftRadius: "0",
                  borderWidth: "0px",
                }}
              >
                <ArrowRight></ArrowRight>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WelcomeModal;
