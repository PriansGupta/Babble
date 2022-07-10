import React, { useState, useEffect, useRef } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { NavLink } from "react-router-dom";
import Lottie from "lottie-web";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
import Password from "../PassWord/Password";
import { Route, Routes } from "react-router-dom";
import animation_1 from "../../Assets/Animations/loginAnimation.json";
// import animation_2 from "../../Assets/Animations/SignUpAnimation.json";
import "bootstrap/dist/css/bootstrap.min.css";
import "./GetStarted.css";
import RoutesAnimation from "../../Components/RoutesAnimation/RoutesAnimation";

const GetStarted = () => {
  const [prefer, setPrefer] = useState(true);
  const [Message, setMessage] = useState("New Here?");
  const [Text, setText] = useState("Sign Up and Connect with your Loved Ones.");
  const [address, setAddress] = useState("/SignUp");
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

  const Toggle = () => {
    if (prefer) {
      setMessage("Already have an account?");
      setText("Login using your Credentials.");
      setAddress("/Login");
    } else {
      setMessage("New Here?");
      setText("Sign Up and Connect with your Loved Ones.");
      setAddress("/SignUp");
    }
    setPrefer(!prefer);
  };
  return (
    <Container className="p-0" fluid>
      <Row style={{ marginLeft: 0, marginRight: 0 }}>
        <Col xs={8} className="first_Col">
          <Row></Row>
          <Row>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/SignUp" element={<SignUp />} />
              <Route path="/Password" element={<Password />} />
            </Routes>
          </Row>
        </Col>
        <Col className="second_Col">
          <div className="container" ref={container}></div>
          <RoutesAnimation>
            <div className="Login_signUp">
              <h1>{Message}</h1>
              <p>{Text}</p>
              <NavLink to={address}>
                <button onClick={Toggle}>{prefer ? "Sign Up" : "Login"}</button>
              </NavLink>
            </div>
          </RoutesAnimation>
        </Col>
      </Row>
    </Container>
  );
};

export default GetStarted;
