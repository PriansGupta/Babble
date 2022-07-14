import React, { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import { Eye } from "react-ionicons";
import { EyeOff } from "react-ionicons";
import RoutesAnimation from "../../Components/RoutesAnimation/RoutesAnimation";
import { NavLink } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [hide, setHide] = useState(true);
  const [passwordType, setPasswordType] = useState("password");
  const HideToggle = () => {
    if (!hide) setPasswordType("password");
    else setPasswordType("Text");
    setHide(!hide);
  };

  return (
    <RoutesAnimation>
      <Container className="p-0" fluid>
        <Row className="Login_form">
          <h1>Login to your Account</h1>
          <div className="form">
            <form>
              <input type="email" placeholder="Email"></input>
              <input type={passwordType} placeholder="Password"></input>
              <div className="passwordHide" onClick={HideToggle}>
                {!hide && (
                  <Eye
                    color={"#00000"}
                    title="hide"
                    height="30px"
                    width="30px"
                  />
                )}
                {hide && (
                  <EyeOff
                    color={"#00000"}
                    title="Show"
                    height="30px"
                    width="30px"
                  />
                )}
              </div>
              <NavLink to="/Forgot" className="forgotLink">
                Forgot your Password?
              </NavLink>
              <button type="submit">Login In</button>
            </form>
          </div>
        </Row>
      </Container>
    </RoutesAnimation>
  );
};

export default Login;
