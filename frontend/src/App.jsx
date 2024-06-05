import { useState, useEffect } from "react";
import "../public/bling.mp3";
import "../public/dud.mp3";
import "../public/vineboom.mp3";
import "../public/trimmed_jackpot.mp3";
import "./App.css";
import Header from "./Header";
import "./Header.css";
import CountUp from "react-countup";
import Sidebar from "./SideBar";

function App() {
  const [balance, setBalance] = useState(-1);
  const [inputBalance, setInputBalance] = useState(0.0);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const [betSizing, setBetSizing] = useState(0);
  const [userMultiplier, setUserMultiplier] = useState(-1);

  const [haveBet, setHaveBet] = useState(false);
  const [stakeMultiplier, setStakeMultiplier] = useState(0);
  const [color, setColor] = useState("stakeLoss");

  const [soundFx, setSoundFx] = useState(true);

  useEffect(() => {
    if (!haveBet) {
      return;
    }
    console.log("Stake:", stakeMultiplier);
    console.log("Balance:", balance);

    if (stakeMultiplier >= userMultiplier) {
      setColor("stakeWin");
      playSound("win", soundFx);
    } else if (balance == 0) {
      playSound("broke", soundFx);
    } else {
      setColor("stakeLoss");
      playSound("loss", soundFx);
    }
  }, [stakeMultiplier, balance]);

  const playSound = (sound, soundFx) => {
    if (!soundFx) {
      console.log("no sound allowed");
      return;
    }
    let path = "";
    if (sound == "win") {
      path = "../public/bling.mp3";
    } else if (sound == "broke") {
      path = "../public/vineboom.mp3";
    } else {
      path = "../public/dud.mp3";
    }
    const audio = new Audio(path);
    audio.play();
  };
  const assignBalance = async (e) => {
    //don't auto refresh page
    e.preventDefault();
    setIsModalOpen(false);
    setBalance(inputBalance);

    const data = {
      desiredBalance: inputBalance,
    };
    const url = "http://127.0.0.1:5000/set_balance";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, options);
    console.log(response);
  };

  const play = async (e) => {
    e.preventDefault();
    setHaveBet(true);

    if (parseFloat(betSizing) > parseFloat(balance)) {
      console.log("bet sizing: ", typeof betSizing);
      console.log("balance: ", typeof balance);
      console.log("Invalid bet sizing");
      return;
    }
    const data = {
      betSizing,
      userMultiplier,
    };
    const url = "http://127.0.0.1:5000/play";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, options);
    const result = await response.json();
    setBalance(result.balance.toFixed(2));
    setStakeMultiplier(result.stakeMultiplier);
  };

  const toggleSound = () => {
    if (soundFx) {
      console.log("Changing to false");
      setSoundFx(false);
    } else {
      console.log("Changing to true");
      setSoundFx(true);
    }
  };

  // dynamically import and initialize countUp, sets value of `countUpAnim`
  // you don't have to import this way, but this works best for next.js

  return (
    <>
      {isModalOpen && (
        <div className="modal justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
          <div className="modal-content rounded-lg shadow dark:bg-gray-700">
            <form onSubmit={assignBalance}>
              <label htmlFor="desiredBalance">Desired Balance:</label>
              <input
                type="number"
                id="desiredBalance"
                value={inputBalance != 0 ? inputBalance : ""}
                onChange={(e) => setInputBalance(e.target.value)}
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}

      <div className="bodyColor h-full">
        <Header
          balance={balance}
          soundFx={soundFx}
          toggleSound={toggleSound}
        ></Header>

        <div className="flex headerColor m-8 h-5/6 bg-white  rounded-lg shadow-lg 2xl:col-span-2 dark:border-gray-700 dark:bg-gray-800">
          <div className="w-2/6 border-2 border-gray-500 rounded-lg">
            <form
              onSubmit={play}
              className="h-4/6 flex flex-col justify-center items-center"
            >
              <div>
                <div className="flex-col flex flex-start mb-2">
                  <label
                    htmlFor="betSizing"
                    className="text-white self-start pl-1"
                  >
                    Bet Amount:
                  </label>
                  <input
                    type="number"
                    id="betSizing"
                    value={betSizing != 0 ? betSizing : ""}
                    className="bg-gray-600 rounded text-white font-bold h-10 w-60 flex items-center justify-between px-2"
                    onChange={(e) => setBetSizing(e.target.value)}
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
                  value={userMultiplier != -1 ? userMultiplier : ""}
                  className="bg-gray-600 rounded text-white font-bold h-10 w-60 flex items-center justify-between px-2"
                  onChange={(e) => setUserMultiplier(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="my-2 p-4 px-24 font-mono font-bold mt-10"
                style={{ backgroundColor: "#00ff00" }}
              >
                Play
              </button>
            </form>

            <div
              className="h-2/6 flex flex-col justify-center items-center content-center "
              style={{ borderTop: "2px solid #6B7280" }}
            >
              <div className="flex flex-col items-center m-2 w-48">
                <p className="text-white self-start pl-1">Net Gain on Win:</p>
                <div className="bg-gray-600 rounded-lg text-white font-bold h-10 w-48 flex items-center justify-between px-2">
                  <span>
                    {userMultiplier != -1 && userMultiplier != ""
                      ? ((userMultiplier - 1) * betSizing).toFixed(2)
                      : ""}
                  </span>
                  <span>$</span>
                </div>
              </div>
              <div className="flex flex-col m-2 w-48">
                <p className="text-white self-start pl-1">Win Chance:</p>
                <div className="bg-gray-600 rounded-lg text-white font-bold h-10 w-48 flex items-center justify-between px-2">
                  <span>
                    {userMultiplier != -1 && userMultiplier != ""
                      ? (100 * (0.99 / userMultiplier)).toFixed(6)
                      : ""}
                  </span>
                  <span>%</span>
                </div>
              </div>
            </div>
          </div>
          {/* <button
          onClick={() => setIsModalOpen(true)}
          class="px-2 py-1 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
        >
          edit
        </button> */}
          <div
            className="w-4/6 rounded-lg flex justify-center"
            // style={{ borderLeft: "2px black" }}
          >
            {haveBet ? (
              <div className="flex">
                <CountUp
                  className={`text-9xl ${color} font-mono flex items-center`}
                  start={1.0}
                  end={stakeMultiplier}
                  decimals="2"
                  duration={0.2}
                  useEasing={false}
                ></CountUp>
                <p className={`text-9xl ${color} font-mono flex items-center`}>
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
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
