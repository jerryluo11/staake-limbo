import React from "react";
import "./Header.css";
const Header = ({ balance, soundFx, setSoundFx }) => {
  return (
    <nav className="bg-black shadow-md">
      <div className="headerColor mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* item 1 */}
          <div className="flex-shrink-0 flex items-center">
            <a
              href="#"
              className="text-3xl bg-gradient-to-r from-blue-600 to-green-500 inline-block text-transparent bg-clip-text"
            >
              Staake
            </a>
          </div>
          <div
            className="flex justify-between bg-gray-900 rounded-md shadow-lg py-1.5"
            style={{ width: "190px" }}
          >
            <p
              href="#"
              className="flex items-center pl-3 pr-0 py-2 rounded-md text-md font-medium font-sans font-bold text-blue-500"
            >
              Balance:
            </p>
            <p
              href="#"
              className="flex flexgrow items-center pr-3 pl-0 py-2 rounded-md text-md font-medium font-sans font-bold text-white"
            >
              $
              {balance != -1
                ? balance.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                : ""}
            </p>
          </div>
          <div className="hidden md:flex md:items-center">
            <button
              onClick={() => setSoundFx((curr) => !curr)}
              className={`text-white hover:text-white px-3 py-2 rounded-md text-sm font-medium ${
                soundFx ? "bg-green-500" : "bg-red-500"
              }`}
            >
              sound: {soundFx ? "on" : "off"}
            </button>
            <button
              href="#"
              className="ml-4 px-4 py-2 bg-blue-500 text-white bg-blue-600 rounded-md text-sm font-medium"
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
