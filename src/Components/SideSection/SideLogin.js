import React from "react";
import { useEffect,useRef } from "react";
import { NavLink } from "react-router-dom";
import Lottie from "lottie-web";
import animation_1 from "../../Assets/Animations/SignUpAnimation.json";
import SideRoutesAnimation from "../RoutesAnimation/SideRouteAnimations";


const SideLogin = () => {
  const container = useRef(null);
  useEffect(() => {
    Lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: animation_1,
    });
  }, []);
  return (
    <SideRoutesAnimation>
      <div className="container" ref={container}></div>
      <div className="Login_signUp">
        <h1>New Here ?</h1>
        <p>Create a new Account and connect with your loved ones.</p>
        <NavLink to="/HomePage/SignUp">
          <button>Sign Up</button>
        </NavLink>
      </div>
    </SideRoutesAnimation>
  );
};

export default SideLogin;
