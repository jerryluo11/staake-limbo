import React, { memo, useEffect, useState } from "react";
import PastBetsItem from "./PastBetsItem";
import "./PastBets.css";
const PastBets = ({ numbers = [], userMultiplier }) => {
  const [renderedNumbers, setRenderedNumbers] = useState([]);
  useEffect(() => {
    setRenderedNumbers(numbers);
  }, [numbers]);
  console.log(numbers);
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
          return (
            <PastBetsItem
              key={index}
              stakeMultiplier={number}
              userMultiplier={userMultiplier}
              className="number-item"
            />
          );
        })}
      </div>
    </>
  );
};
export default memo(PastBets);
