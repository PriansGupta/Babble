import React from "react";
import { useEffect, useRef } from "react";
import Lottie from "lottie-web";
import animation_3 from "../../Assets/Animations/Password.json";
import SideRoutesAnimation from "../RoutesAnimation/SideRouteAnimations";


const SidePassword = () => {
  const container = useRef(null);
  useEffect(() => {
    Lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: animation_3,
    });
  }, []);
  return (
    <SideRoutesAnimation>
      <div className="container" ref={container}></div>
      <div className="Login_signUp">
        <h1>Your Password is safe with us.</h1>
        <p>Make sure to create a strong password for better security.</p>
      </div>
    </SideRoutesAnimation>
  );
};

export default SidePassword;
