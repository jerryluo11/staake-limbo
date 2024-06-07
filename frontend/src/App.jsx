import { useState, useEffect } from "react";
import bling from "/bling.mp3";
import dud from "/dud.mp3";
import vine from "/vineboom.mp3";

import "./App.css";
import Header from "./Header";
import "./Header.css";

import { CircleDollarSignIcon } from "lucide-react";
import { Sidebar, SidebarItem } from "./SideBar";
import WelcomeModal from "./WelcomeModal";
import Body from "./Body";
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
      <div id="everything" className="flex h-screen">
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
        <div id="main" className="flex-1 bodyColor flex flex-col">
          <Header
            balance={balance}
            soundFx={soundFx}
            setSoundFx={setSoundFx}
          ></Header>
          <Body
            color={color}
            haveBet={haveBet}
            setHaveBet={setHaveBet}
            balance={balance}
            setBalance={setBalance}
            setBetSizing={setBetSizing}
            userMultiplier={userMultiplier}
            setUserMultiplier={setUserMultiplier}
            stakeMultiplier={stakeMultiplier}
            setStakeMultiplier={setStakeMultiplier}
          ></Body>
        </div>
      </div>
      {isModalOpen && (
        <WelcomeModal
          inputBalance={inputBalance}
          setInputBalance={setInputBalance}
          setBalance={setBalance}
          setIsModalOpen={setIsModalOpen}
        ></WelcomeModal>
      )}
    </>
  );
}

export default App;
