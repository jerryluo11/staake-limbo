import React, { memo, useEffect, useState } from "react";
import PastBetsItem from "./PastBetsItem";
import "./PastBets.css";
const PastBets = ({ numbers = [], userMultiplier }) => {
  const [renderedNumbers, setRenderedNumbers] = useState([]);
  useEffect(() => {
    setRenderedNumbers(numbers);
  }, [numbers]);
  console.log(numbers);
  console.log(renderedNumbers);
  return (
    <>
      <div
        id="pastBets"
        className="past-bets flex h-16 justify-end items-center gap-4 px-4"
        style={{
          position: "absolute",
          top: "0",
          right: "0",
          width: "472px",
        }}
      >
        {renderedNumbers.map((number, index) => {
          let modifiers = "number-item"; // Not used, could be used in className conditionally
          console.log("number", number);
          console.log("index", index);
          console.log("number length", numbers.length);
          if (numbers.length == 5 && index == 4) {
            modifiers = "number-item fadeOut";
          }
          return (
            <PastBetsItem
              key={index} // Ensure key is unique and stable
              stakeMultiplier={number}
              userMultiplier={userMultiplier}
              className={modifiers} // 'modifiers' variable usage
            />
          );
        })}
      </div>
    </>
  );
};
export default memo(PastBets);
