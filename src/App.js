import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GetStarted from "./Pages/GetStarted/GetStarted";
import CustomizedSwitches from "./Components/Theme/Theme";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="themeSwitch">
          <CustomizedSwitches></CustomizedSwitches>
        </div>
        <GetStarted></GetStarted>
      </div>
    </BrowserRouter>
  );
}

export default App;
