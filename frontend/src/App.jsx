import { useState, useEffect } from "react";
import bling from "/bling.mp3";
import dud from "/dud.mp3";
import vine from "/vineboom.mp3";

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
      playSound(bling, soundFx);
    } else if (balance == 0) {
      playSound(vine, soundFx);
    } else {
      setColor("stakeLoss");
      playSound(dud, soundFx);
    }
  }, [stakeMultiplier, balance]);

  const playSound = (sound, soundFx) => {
    if (!soundFx) {
      return;
    }

    const audio = new Audio(sound);
    if (sound == bling) {
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
              <BetForm
                setHaveBet={setHaveBet}
                balance={balance}
                setBalance={setBalance}
                setBetSizing={setBetSizing}
                setUserMultiplier={setUserMultiplier}
                setStakeMultiplier={setStakeMultiplier}
              ></BetForm>
              <div
                className="w-full rounded-lg flex justify-center"
                // style={{ borderLeft: "2px black" }}
              >
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
