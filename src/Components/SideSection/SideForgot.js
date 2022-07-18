import React from "react";
import { useEffect, useRef } from "react";
import Lottie from "lottie-web";
import animation_4 from "../../Assets/Animations/Forgot.json";
import SideRoutesAnimation from "../RoutesAnimation/SideRouteAnimations";

const SideForgot = () => {
  const container = useRef(null);
  useEffect(() => {
    Lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: animation_4,
    });
  }, []);
  return (
    <SideRoutesAnimation>
      <div className="container" ref={container}></div>
      <div className="Login_signUp">
        <h1>Forgot your Password?</h1>
        <p>
          Don't worry we got you covered.<br></br>Provide your account
          details to change the password.
        </p>
      </div>
    </SideRoutesAnimation>
  );
};

export default SideForgot;
