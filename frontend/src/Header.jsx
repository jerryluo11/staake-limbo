import React from "react";
import "./Header.css";
const Header = ({ balance, soundFx, toggleSound }) => {
  return (
    <nav class="bg-black shadow-md">
      <div class="headerColor mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center h-16">
          {/* item 1 */}
          <div class="flex-shrink-0 flex items-center">
            <a
              href="#"
              class="text-3xl bg-gradient-to-r from-blue-600 to-green-500 inline-block text-transparent bg-clip-text"
            >
              Staake
            </a>
          </div>
          <div class="flex-grow flex justify-center">
            <a
              href="#"
              class="flex items-center hover:text-white px-3 py-2 rounded-md text-md font-medium font-sans font-bold bg-gradient-to-r from-green-500 to-yellow-400 inline-block text-transparent bg-clip-text"
            >
              Balance💰: $
              {balance != -1
                ? balance.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                : ""}
            </a>
          </div>
          <div class="hidden md:flex md:items-center">
            <button
              onClick={toggleSound}
              class={`text-white hover:text-white px-3 py-2 rounded-md text-sm font-medium ${
                soundFx ? "bg-green-500" : "bg-red-500"
              }`}
            >
              sound: {soundFx ? "on" : "off"}
            </button>
            <a
              href="#"
              class="ml-4 px-4 py-2 bg-blue-500 text-white bg-blue-600 rounded-md text-sm font-medium"
            >
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
