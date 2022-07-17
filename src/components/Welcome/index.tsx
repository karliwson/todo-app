import React, { useState, useContext } from "react";

import { UserContext } from "../../contexts/UserContext";

interface WelcomeProps {
  title: string;
  subtitle: string;
  image: string;
}

import donaLogo from "../../assets/welcome-icons/donaLogo.png";
import macCommand from "../../assets/welcome-icons/macCommand.png";
import donaLists from "../../assets/welcome-icons/donaLists.png";

import WelcomeStyles from "./styles";

function Welcome() {
  const { registerUser } = useContext(UserContext);

  const [activeWelcomePage, setActiveWelcomePage] = useState(4);
  const [name, setName] = useState("");
  const [animating, setAnimating] = useState(true);

  function handleContinue() {
    if (name) {
      registerUser(name);
      return;
    }

    if (activeWelcomePage >= 4) return;

    setActiveWelcomePage((prev) => prev + 1);
    setAnimating(true);
  }

  const handleData = (): WelcomeProps => {
    switch (activeWelcomePage) {
      case 1:
        return {
          title: "Welcome to Dona Clone",
          subtitle: "Dona is a back to-do list focused on fast and delightful user experience.",
          image: donaLogo,
        };
      case 2:
        return {
          title: "Powerful lists",
          subtitle: "Organize your tasks into fully customizable lists.",
          image: donaLists,
        };
      case 3:
        return {
          title: "We have shortcuts",
          subtitle: "Dona offers a lot of shortcuts. Test them out.",
          image: macCommand,
        };
      case 4:
        return {
          title: "What's your name?",
          subtitle: "",
          image: "",
        };
      default:
        return {
          title: "",
          subtitle: "",
          image: "",
        };
    }
  };

  const resolveClassName = () => {
    switch (activeWelcomePage) {
      case 1:
        return "";
      case 2:
        return "second-image";
      case 3:
        return "third-image";
      case 4:
        return "fourth-image";
      default:
        return;
    }
  };

  return (
    <WelcomeStyles activeWelcomePage={activeWelcomePage} onAnimationEnd={() => setAnimating(false)}>
      <div id="modal">
        <div id="modal-top" className={animating ? "modal-top-animation" : ""}>
          {activeWelcomePage !== 4 && (
            <img src={handleData().image} alt="" width={100} className={resolveClassName()} />
          )}
          {activeWelcomePage === 4 && (
            <span className={resolveClassName()}>
              <svg width="62" height="42" viewBox="0 0 62 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6 16.9091L24.7439 35.3121C25.1328 35.6941 25.756 35.6941 26.145 35.3121L56 6"
                  stroke="#6d6d6d"
                  stroke-width="8"
                  stroke-linecap="round"
                />
              </svg>
            </span>
          )}
        </div>
        <div id="modal-bottom">
          <span className={animating ? "slideLeft" : ""}>
            <h2>{handleData().title}</h2>
            <h3>{handleData().subtitle}</h3>
            {activeWelcomePage === 4 && (
              <input type="text" placeholder="Type it here..." onChange={(e) => setName(e.target.value)} />
            )}
          </span>
          <span className={animating ? "slideLeft nav-buttons" : "nav-buttons"}>
            <button onClick={handleContinue}>Continue</button>
          </span>
          <svg viewBox="0 0 70 10" width="70" height="10">
            <circle cx="5" cy="5" r="5" fill={activeWelcomePage === 1 ? "#008FFD" : "#d9d9d9"} />
            <circle cx="25" cy="5" r="5" fill={activeWelcomePage === 2 ? "#008FFD" : "#d9d9d9"} />
            <circle cx="45" cy="5" r="5" fill={activeWelcomePage === 3 ? "#008FFD" : "#d9d9d9"} />
            <circle cx="65" cy="5" r="5" fill={activeWelcomePage === 4 ? "#008FFD" : "#d9d9d9"} />
          </svg>
        </div>
      </div>
    </WelcomeStyles>
  );
}

export default Welcome;
