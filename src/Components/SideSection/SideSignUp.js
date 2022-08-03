import React from "react";
import { useEffect,useRef } from "react";
import { NavLink } from "react-router-dom";
import Lottie from "lottie-web";
import animation_2 from "../../Assets/Animations/loginAnimation.json";
import SideRoutesAnimation from "../RoutesAnimation/SideRouteAnimations";


const SideSignUp = () => {
  const container = useRef(null);
  useEffect(() => {
    Lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: animation_2,
    });
  }, []);
  return (
    <SideRoutesAnimation>
      <div className="container" ref={container}></div>
      <div className="Login_signUp">
        <h1>Already have an account?</h1>
        <p>Login with your credentials and start chatting.</p>
        <NavLink to="/HomePage/Login">
          <button>Login</button>
        </NavLink>
      </div>
    </SideRoutesAnimation>
  );
};

export default SideSignUp;
