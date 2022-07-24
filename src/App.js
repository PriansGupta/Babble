import "./App.css";
import React, { useState } from "react";
import { BrowserRouter} from "react-router-dom";
import GetStarted from "./Pages/GetStarted/GetStarted";
import CustomizedSwitches from "./Components/Theme/Theme";
import Logo from "./Components/Logo/Logo";

function App() {
  const [loader, setLoader] = useState(true);
  const preloader = document.getElementById("preloader");

  if (loader) {
    setTimeout(() => {
      preloader.style.display = "none";
      setLoader(false);
    }, 10);
  }
  return (
    !loader && (
      <BrowserRouter>
        <div className="App">
          <Logo></Logo>
          <div className="themeSwitch">
            <CustomizedSwitches></CustomizedSwitches>
          </div>
          <GetStarted></GetStarted>
        </div>
      </BrowserRouter>
    )
  );
}

export default App;
