import React, { useState } from "react";
import BetForm from "./BetForm";
import CountUp from "react-countup";
import PastBets from "./PastBets";

const Body = ({
  color,
  haveBet,
  setHaveBet,
  balance,
  setBalance,
  setBetSizing,
  userMultiplier,
  setUserMultiplier,
  stakeMultiplier,
  setStakeMultiplier,
}) => {
  const [numbers, setNumbers] = useState([]);
  return (
    <div className="px-16 py-16 justify-center items-center flex-grow">
      <div
        className="flex flex-grow headerColor bg-white rounded-lg shadow-lg 2xl:col-span-2 dark:border-gray-700 h-full relative"
        //style={{ position: "relative" }}
      >
        <BetForm
          setNumbers={setNumbers}
          setHaveBet={setHaveBet}
          balance={balance}
          setBalance={setBalance}
          setBetSizing={setBetSizing}
          setUserMultiplier={setUserMultiplier}
          setStakeMultiplier={setStakeMultiplier}
        ></BetForm>
        <div className="w-full rounded-lg flex justify-center">
          {haveBet ? (
            <div className="flex">
              <CountUp
                className={`text-9xl ${
                  balance == 0 ? "stakeLoss" : color
                } font-mono flex items-center`}
                start={""}
                end={stakeMultiplier}
                decimals="2"
                duration={0.2}
                useEasing={false}
              ></CountUp>
              <p
                className={`text-9xl ${
                  balance == 0 ? "stakeLoss" : color
                } font-mono flex items-center`}
              >
                x
              </p>
            </div>
          ) : (
            //{" "}
            <h2
              className={`text-9xl text-slate-500 font-mono flex items-center`}
            >
              1.00x{" "}
            </h2>
          )}
          <PastBets numbers={numbers} userMultiplier={userMultiplier} />
        </div>
      </div>
    </div>
  );
};

export default Body;
