import { useState, useEffect } from "react";
import "../public/bling.mp3";
import "../public/dud.mp3";
import "../public/vineboom.mp3";
import "../public/trimmed_jackpot.mp3";
import "./App.css";
import Header from "./Header";
import "./Header.css";
import CountUp from "react-countup";
import { CircleDollarSignIcon } from "lucide-react";
import { Sidebar, SidebarItem } from "./SideBar";
import WelcomeModal from "./WelcomeModal";
import BetForm from "./BetForm";
import { SiGithub } from "react-icons/si";
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
      return;
    }
    let path = "";
    if (sound == "win") {
      path = "../public/bling.mp3";
    } else if (sound == "broke") {
      path = "../public/vineboom.mp3";
    } else if (sound == "load-in") {
      path = "../public/trimmed_jackpot.mp3";
    } else {
      path = "../public/dud.mp3";
    }
    const audio = new Audio(path);
    if (sound == "win") {
      audio.volume = 0.4;
    }
    audio.play();
  };

  return (
    <>
      {isModalOpen && (
        <WelcomeModal
          inputBalance={inputBalance}
          setInputBalance={setInputBalance}
          setBalance={setBalance}
          setIsModalOpen={setIsModalOpen}
        ></WelcomeModal>
      )}
      <div className="flex h-screen">
        <Sidebar>
          <SidebarItem
            icon={<CircleDollarSignIcon size={20} style={{ color: "white" }} />}
            text="Limbo"
          />
          {/* <SidebarItem
            icon={<SiGithub size={20} style={{ color: "white" }} />}
            text="My Github"
          /> */}
        </Sidebar>
        <div className="flex-1 bodyColor flex flex-col">
          <Header
            balance={balance}
            soundFx={soundFx}
            setSoundFx={setSoundFx}
          ></Header>
          <div className="px-16 py-16 flex-1">
            <div
              className="flex flex-grow headerColor bg-white rounded-lg shadow-lg 2xl:col-span-2 dark:border-gray-700 h-full"
              style={{ backgroundColor: "#19252E" }}
            >
              <div className="w-2/6 md:w-auto shadow-lg rounded-lg min-w-80 bg-gray-900">
                <BetForm
                  setHaveBet={setHaveBet}
                  balance={balance}
                  setBalance={setBalance}
                  setBetSizing={setBetSizing}
                  setUserMultiplier={setUserMultiplier}
                  setStakeMultiplier={setStakeMultiplier}
                ></BetForm>
                {/* <form
                  onSubmit={play}
                  className="h-4/6 flex flex-col justify-center items-center shadow-sm rounded-lg bg-gray-800"
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
                        className="bg-gray-600 rounded-lg text-white font-bold h-10 w-48 flex items-center justify-between px-2"
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
                      className="bg-gray-600 rounded-lg text-white font-bold h-10 w-48 flex items-center justify-between px-2"
                      onChange={(e) => setUserMultiplier(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    className="my-2 p-4 px-20 font-mono font-bold mt-10 mx-4"
                    style={{ backgroundColor: "#00ff00" }}
                  >
                    Play
                  </button>
                </form> */}

                <div className="h-2/6 flex flex-col justify-center items-center rounded-lg content-center">
                  <div className="flex flex-col items-center m-2 w-48">
                    <p className="text-white self-start pl-1">
                      Net Gain on Win:
                    </p>
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
                className="w-full rounded-lg flex justify-center"
                // style={{ borderLeft: "2px black" }}
              >
                {haveBet ? (
                  <div className="flex">
                    <CountUp
                      className={`text-9xl ${color} font-mono flex items-center`}
                      start={""}
                      end={stakeMultiplier}
                      decimals="2"
                      duration={0.2}
                      useEasing={false}
                    ></CountUp>
                    <p
                      className={`text-9xl ${color} font-mono flex items-center`}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
