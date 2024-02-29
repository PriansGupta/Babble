import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GetStarted from "./Pages/GetStarted/GetStarted";
import CustomizedSwitches from "./Components/Theme/Theme";
import Chat from "./Pages/Messaging/Chat/Chat";
import { useSelector } from "react-redux";

function App() {
  const [loader, setLoader] = useState(true);
  const [theme, setTheme] = useState("light");
  const preloader = document.getElementById("preloader");
  const myState = useSelector((state) => state.UserUpdate);
  let token;
  // console.log(myState.tokens);
  useEffect(() => {}, [myState.tokens]);
  if (!localStorage.getItem("token"))
    localStorage.setItem("token", myState.tokens);

  token = localStorage.getItem("token");

  const ToggleTheme = () => {
    if (theme === "light") setTheme("dark");
    else setTheme("light");
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

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
          <Routes>
            <Route path="*" element={<GetStarted />}></Route>
            <Route path="/HomePage/*" element={<GetStarted />}></Route>
            <Route
              path="/User/chats/*"
              element={<Chat name={myState.name} email={myState.email} />}
            ></Route>
          </Routes>
          <div className="themeSwitch" onClick={ToggleTheme}>
            <CustomizedSwitches></CustomizedSwitches>
          </div>
        </div>
      </BrowserRouter>
    )
  );
}

export default App;
